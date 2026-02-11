const { redx, pathao } = require("./index");

async function test() {
  const redxData = await redx("RDX123456789");
  console.log(redxData);

  const pathaoData = await pathao("DM0902269TUGST", "01511194495");
  console.log(pathaoData);
}

test();
