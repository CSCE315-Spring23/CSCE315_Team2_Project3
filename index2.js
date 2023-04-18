const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
// Create express app
const app = express();
const port = 3000;
// Create pool
const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DATABASE,
  password: process.env.PSQL_PASSWORD,
  port: process.env.PSQL_PORT,
  ssl: {rejectUnauthorized: false}
});

// Add process hook to shutdown pool
process.on('SIGINT', function() {
  pool.end();
  console.log('Application successfully shutdown');
  process.exit(0);
});

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

updateInventoryQuantity();