const hre = require("hardhat");

async function main() {
  const REstate = await hre.ethers.getContractFactory("REstate");
  const restate = await REstate.deploy();

  await restate.deployed();

  console.log(
    `REstate deployed to ${restate.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
