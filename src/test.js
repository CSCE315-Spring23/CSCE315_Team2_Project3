const { getBlendList } = require('./index2');

async function test() {
    const blends = await getBlendList();
    console.log('blends:', blends);
}
  
test();  