const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config({ path: './connect.env' });
// Create express app
const app = express();
const port = 3000;
// Create pool
const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DATABASE,
  
  password: process.env.PSQL_PASSWORD,
  port: process.env.PSQL_PORT
});

// Add process hook to shutdown pool
process.on('SIGINT', function() {
  pool.end();
  console.log('Application successfully shutdown');
  process.exit(0);
});


//This is just a example functions
function updateInventoryQuantity() {
  // construct the SQL query to update the quantity of all ingredients to 100
  const sql = "UPDATE inventory SET quantity = 100";

  // execute the SQL query using the pool object
  pool.query(sql, (err, result) => {
    if (err) {
      console.error('Error updating inventory:', err);
      return;
    }
    console.log('Inventory updated successfully!');
  });
}

let conn = null;
let stmt;
let ZReport = "";
let prevDate = "";
let max_invent_quant;
//1 -> DONE
//helper to add item to order
function handleOrder(newOrder, smoothieList, sizeList, date) {
  for (let i = 0; i < smoothieList.length; i++) {
    let price = getItemPrice(smoothieList[i]);
    let size = sizeList[i];

    // Adjust price based on size
    switch (size) {
      case "12":
        price *= 0.75;
        break;
      case "20":
        break;
      case "32":
        price *= 1.25;
        break;
      case "40":
        price *= 1.5;
        break;
      default:
        break;
    }

    const sqlStatement = `INSERT INTO smoothie_order (order_id, smoothie_array, smoothie_sizes_array, date, price) VALUES ('${newOrder.orderID}', '${smoothieList[i]}', '${sizeList[i]}', '${date}', ${price});`;
    console.log(sqlStatement);
    sendQuery(sqlStatement);
    handleInventory(smoothieList, sizeList);

    // const check_fillable_query = `SELECT ingredient FROM inventory WHERE ingredient IN (SELECT ingredient FROM menu WHERE smoothie_name = '${smoothieList[i]}') AND quantity = 0;`;
    // const update_inventory_query = `UPDATE inventory SET quantity = quantity - 1 WHERE ingredient IN (SELECT ingredient FROM menu WHERE smoothie_name = '${smoothieList[i]}')`;
  }
}

//2 -> DONE
async function getItemPrice(smoothie) {
  let price = 0.0;
  try {
    const sqlStatement = `SELECT price FROM prices WHERE smoothie='${smoothie}';`;
    const result = await pool.query(sqlStatement);
    price = result.rows[0].price;
  } catch (e) {
    console.error(e);
  }
  return price;
}


//3 -> DONE
async function getOrderTotal(orderID) {
  let total = 0.0;
  const client = await pool.connect();
  try {
    const sqlStatement = `SELECT price FROM smoothie_order WHERE order_id='${orderID}'`;
    const result = await client.query(sqlStatement);
    result.rows.forEach(row => {
      total += row.price;
    });
  } catch (e) {
    console.error(e);
  } finally {
    client.release();
  }
  return total;
}



//4 -> DONE
async function processNewItem(name, ingredients) {
  const existingIngredients = await getIngredientList();

  // Set price
  try {
    const sqlStatement = `INSERT INTO prices (smoothie, price) VALUES ('${name}', 5.0)`;
    console.log(sqlStatement);
    await sendQuery(sqlStatement);
  } catch (e) {
    console.error(e);
  }

  // Iterate over new ingredient list, add each item to Menu table
  const items = ingredients.split(',');
  for (const item of items) {
    try {
      const sqlStatement = `INSERT INTO menu (smoothie_name, ingredient, blend_type) VALUES ('${name}', '${item}', 'seasonal')`;
      console.log(sqlStatement);
      await sendQuery(sqlStatement);

      if (!existingIngredients.includes(item)) {
        const sqlStatement = `INSERT INTO inventory (ingredient, quantity) VALUES ('${item}', 100)`;
        console.log(sqlStatement);
        await sendQuery(sqlStatement);
      }
    } catch (e) {
      console.error(e);
    }
  }
  // for each item, check if any are new. Add new to inventory
}

// async function getIngredientList() {
//   const sqlStatement = 'SELECT DISTINCT ingredient FROM inventory';
//   const result = await sendQuery(sqlStatement);
//   const ingredients = result.rows.map(row => row.ingredient);
//   return ingredients;
// }

// async function sendQuery(sqlStatement) {
//   try {
//     const client = await pool.connect();
//     const result = await client.query(sqlStatement);
//     client.release();
//     if (result && result.rows) {
//       return result;
//     } else {
//       throw new Error('Invalid query result');
//     }
//   } catch (e) {
//     console.error(e);
//     throw e;
//   }
// }



//5 -> DONE
// helper that returns an ArrayList of all smoothie names
async function getSmoothieList() {
  const smoothies = [];
  try {
    const sqlStatement = 'SELECT DISTINCT smoothie_name FROM menu';
    const result = await sendQuery(sqlStatement);
    result.rows.forEach(row => smoothies.push(row.smoothie_name));
  } catch (e) {
    console.error(e);
  }
  return smoothies;
}

async function getBlendList() {
  const blends = [];
  try {
    const sqlStatement = 'SELECT DISTINCT blend_type FROM menu';
    const result = await sendQuery(sqlStatement);
    result.rows.forEach(row => blends.push(row.blend_type));
  } catch (e) {
    console.error(e);
  }
  return blends;
}

// async function sendQuery(sqlStatement) {
//   const client = await pool.connect();
//   try {
//     const result = await client.query(sqlStatement);
//     return result;
//   } finally {
//     client.release();
//   }
// }

//6 -> DONE
// helper returnss list of ingredients
async function getIngredientList() {
  const items = [];
  try {
    const sqlStatement = 'SELECT DISTINCT ingredient FROM menu';
    const result = await sendQuery(sqlStatement);
    result.rows.forEach(row => items.push(row.ingredient));
  } catch (e) {
    console.error(e);
  }
  return items;
}

//7 -> DONE
async function getSeasonal() {
  const smoothies = [];
  try {
    const sqlStatement = 'SELECT DISTINCT smoothie_name FROM menu WHERE blend_type=\'seasonal\'';
    const result = await sendQuery(sqlStatement);
    result.rows.forEach(row => smoothies.push(row.smoothie_name));
  } catch (e) {
    console.error(e);
  }
  return smoothies;
}

//8 -> DONE
//generates excess report String
async function excessReport(start, end) {
  let excess = `List of ingredients that sold less than 10% inventory between ${start} and ${end}:\n\n`;
  const ingredients = await getIngredientList();
  const smoothies = await getSmoothieList();

  //set default counts
  const dictionary = {};
  for (const key of ingredients) {
    dictionary[key] = 0;
  }

  // for every smoothie, get count from orders and check if under 10
  for (const smoothie of smoothies) {
    try {
      const sqlStatement = `SELECT COUNT(*) FROM smoothie_order WHERE (date BETWEEN '${start}' AND '${end}') AND (smoothie_array='${smoothie}')`;
      const itemsToCount = await getIngredients(smoothie);

      const result = await pool.query(sqlStatement);

      const quantitySold = result[0][0]['COUNT(*)'];

      for (const item of itemsToCount) {
        dictionary[item] += quantitySold;
      }
    } catch (e) {
      console.error(e);
    }
  }

  for (const key in dictionary) {
    const value = dictionary[key];
    if (value < 10) {
      excess += `\t${key}\tsold: ${value}\n`;
    }
  }

  console.log(excess);
  return excess;
}


//9
//Sales report -> DONE
async function salesReport(start, end, smoothieName) {
  let order_info = "";

  try {
    const sqlStatement = `SELECT COUNT(*) FROM smoothie_order WHERE (date BETWEEN '${start}' AND '${end}') AND (smoothie_array='${smoothieName}')`; // make query
    const result = await pool.query(sqlStatement); // run query

    if (result && result.length > 0) {
      order_info = `Number of orders between ${start} and ${end} for ${smoothieName}: ${result[0][0]['COUNT(*)']}`;
    } else {
      order_info = `No orders found between ${start} and ${end} for ${smoothieName}`;
    }
  } catch (error) {
    console.error(error);
  }

  console.log(order_info);
  return order_info;
}



//excessReport("2020-01-01", "2020-10-20");

//10 - TO DO
async function XReport(id) {
  let order_info = '';

  try {
    const sqlStatement = `SELECT * FROM smoothie_order WHERE order_id BETWEEN '${id - 5}' AND '${id}';`;
    const result = await pool.query(sqlStatement);

    order_info = `Report for order ${id - 5} to order ${id}:\n\n`;

    while (result.next()) {
      order_info += '\tOrder ID: ';
      order_info += result.getString(1);

      order_info += '\tSmoothie: ';
      order_info += result.getString(2);

      order_info += '\tSize: '; //add Size
      order_info += result.getString(3);

      const add = result.getString(5); //get custom_add
      const rem = result.getString(6); //get custom_remove

      if (add != null) {
        order_info += '\n\tAdd: ';
        order_info += result.getString(5);
      }
      if (rem != null) {
        order_info += '\n\tRemove: ';
        order_info += result.getString(6);
      }

      order_info += '\n\n'; //spacing between items
    }
  } catch (e) {
    console.error(e);
  }

  console.log(order_info);
  return order_info;
}

module.exports = { getBlendList };

//11 DONE
async function getOrder(order_id) {
  let order_info = "";

  const query = `SELECT * FROM smoothie_order WHERE order_id = '${order_id}'`;
  const result = await pool.query(query);

  let row = result.rows[0]; // get the first row

  while (row) {
    order_info += "Smoothie: " + row[1];
    order_info += "\tSize: " + row[2];

    const add = row[4];
    const rem = row[5];

    if (add != null) {
      order_info += "\n\tAdd: " + add;
    }

    if (rem != null) {
      order_info += "\n\tRemove: " + rem;
    }

    order_info += "\n\t$" + row[6];
    order_info += "\n\n";

    row = result.rows.shift(); // get the next row
  }

  pool.end();

  return order_info;
}

//12 -> DONE
async function handleCustomizations(addOns, removeList, id, name) {
  try {
    // make SQL query using template literals
    const sqlStatement = `UPDATE smoothie_order SET (custom_add, custom_remove) = ('${addOns}', '${removeList}') WHERE order_id = '${id}' AND smoothie_array = '${name}'`;
    console.log(sqlStatement);
    
    // execute query using pool.query
    await pool.query(sqlStatement);

    // decrement each customization in the list
    for (const item of addOns) {
      const decrementQuery = `UPDATE inventory SET quantity = quantity - 1 WHERE ingredient = '${item}'`;
      console.log(decrementQuery);
      await pool.query(decrementQuery);
    }

    // increment each customization in the list
    for (const item of removeList) {
      const incrementQuery = `UPDATE inventory SET quantity = quantity + 1 WHERE ingredient = '${item}'`;
      console.log(incrementQuery);
      await pool.query(incrementQuery);
    }
  } catch (err) {
    console.error(err);
  }
}

//13 -> DONE
//helper to update prices
function handlePrices(name, newPrice) {
  const sqlStatement = `UPDATE prices SET price = '${newPrice}' WHERE smoothie = '${name}'`;
  console.log(sqlStatement);
  pool.query(sqlStatement, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(`Price for ${name} has been updated to ${newPrice}`);
  });
}

//14 -> DONE
async function handleInventory(smoothieList, sizeList) {
  // TODO: retrieve ingredients
  const ingredients = await getIngredients(smoothieList[0]);

  // TODO: edit each ingredient and cup inventory
  for(const item of ingredients) {
    const sqlStatement = `UPDATE inventory SET quantity = quantity - 1 WHERE ingredient = '${item}'`;
    console.log(sqlStatement);
    await pool.query(sqlStatement);
  }
}

//15 -> DONE -> returnig correct array
async function getIngredients(smoothie_name) {
  const ingredients = [];

  try {
    const sqlStatement = 'SELECT * FROM menu WHERE smoothie_name = $1';
    const result = await pool.query(sqlStatement, [smoothie_name]);

    result.rows.forEach(row => {
      ingredients.push(row.ingredient);
    });

  } catch (e) {
    console.error(e);
  }

  return ingredients;
}

//TESTING
/*
getIngredients("caribbean_way")
  .then((ingredients) => console.log(ingredients))
  .catch((error) => console.error(error));
  */
  
  //16 -> DONE
  async function checkSmoothieAvailable(smoothie_name) {
    //TODO: improve efficiency by checking inventory first
    const ingredients = await getIngredients(smoothie_name);
    
  
    // iterate over all ingredients in smoothie
    for (const item of ingredients) {
      try {
        // get item quantity
        const sqlStatement = `SELECT * FROM inventory WHERE ingredient = '${item}';`;
        const result = await pool.query(sqlStatement);
  
        // if quantity for any ingredient is 0, the smoothie is NOT available
        if (parseInt(result.rows[0].quantity) <= 0) {
          return false;
        }
      } catch (e) {
        // console.error(e);
      }
    }
    // if all items are available, smoothie is available
    return true;
  }
  
  //17 -> DONE
  async function checkItemAvailable(item) {
    try {
      // get item quantity
      const sqlStatement = `SELECT * FROM inventory WHERE ingredient = '${item}';`;
      const result = await pool.query(sqlStatement);
  
      // if quantity is 0, item is unavailable
      if (parseInt(result.rows[0].quantity) <= 0) {
        return false;
      }
    } catch (e) {
      // console.error(e);
    }
  
    // item is available
    console.log(`${item} is available.`);
    return true;
    
  }
  
  //18 -> DONE
  async function getID() {
    try {
      // get and return the maximum order ID (most recent)
      const sqlStatement = "SELECT MAX(CAST(order_id AS INT)) FROM smoothie_order;";
      const result = await pool.query(sqlStatement);
      return result.rows[0].max;
    } catch (e) {
      // console.error(e);
    }
  
    return "";
  }
  
  //19 -> DONE
  async function sendQuery(sqlStatement) {
    try {
      const result = await pool.query(sqlStatement);
      return result;
    } catch (e) {
      console.error(e);
    }
  }  
  
  //20 -> DONE
  async function getRestockReport() {
    try {
      const selectQuery = `SELECT * FROM inventory WHERE quantity < ${max_invent_quant};`;
      const rs = await pool.query(selectQuery);
  
      // Create an array labeled restockList to hold the items
      const restockList = [];
      restockList.push(`Fill level for each item is below ${max_invent_quant}. Please restock the following items:`);
      let count = 1;
  
      while (rs.rows.length > 0) {
        const itemName = rs.rows[0][0];
        const itemQuant = rs.rows[0][1];
        const item = `${count}. ${itemName}: ---> Current Amount: ${itemQuant}, --- amount needed: ${max_invent_quant - parseInt(itemQuant)}`;
        restockList.push(item);
        count++;
        rs.rows.shift();
      }
  
      return restockList;
    } catch (e) {
      // console.error(e);
    }
  
    return null;
  }
  
  //21 -> DONE
  async function getInventory() {
    try {
      const selectQuery = "SELECT * FROM inventory";
      const rs = await pool.query(selectQuery);
  
      const inventoryList = [];
      let count = 1;
  
      inventoryList.push("Inventory:");
  
      rs.rows.forEach((row) => {
        const itemName = row[0];
        const itemQuant = row[1];
  
        const item = `${itemName}: ---> Current Amount: ${itemQuant}`;
        inventoryList.push(`${count}. ${item}`);
        count++;
      });
  
      return inventoryList;
    } catch (err) {
      console.error(err);
    }
  }
  
  //22 -> DONE
  async function restockingInventory() {
    try {
      const inventoryToRestock = await getRestockReport();
      if (!inventoryToRestock) {
        // console.log("No items need to be restocked.");
        return;
      }
      for (const item of inventoryToRestock) {
        if (!item) {
          break;
        }
        const updateQuery = `UPDATE inventory SET quantity = ${max_invent_quant} WHERE ingredient = '${item}'`;
        // console.log(updateQuery);
        await pool.query(updateQuery);
        // console.log(`${item} restocked!`);
      }
    } catch (err) {
      console.error(err);
    }
  }

