// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Dong = await hre.ethers.getContractFactory("Dong");
  const dong = await Dong.deploy("0x7599d1DB45B881A80c66FD6A02144c65E553a9E2", 10, 8, "Kami");

  await dong.deployed();

  console.log("Dong deployed to:", dong.address);

  console.log("=============================================");

  console.log("Retrieving our account!");
  const accounts = await ethers.getSigners();
  const balance = await accounts[0].getBalance();
  console.log(ethers.utils.formatEther(balance));
  console.log("Successfull")

  console.log("=============================================");

  console.log("Retrieving stored data!");

  const response = await dong.totalDollarAmount();
  console.log(`(1)-Bill in dollar: $${response}`);

  const response1 = await dong.contributors();
  console.log(`(2)-Contributors: ${response1} people`);

  const response2 = await dong.maticPrice();
  console.log(`(3)-Matic price: ${response2/1e8} dollars`);

  const response3 = await dong.remainingDongInMatic();
  console.log(`(4)-Total remiaing Dong in Matic: ${response3/100} MATIC`);

  const response4 = await dong.dongInMatic();
  console.log(`(5)-Each member has to pay ${response4/100} MATIC`);

  console.log("=============================================");

  console.log("Trying to pay a Dong");

  // await dong.payDong("Sina", {value: 1000}).then((x) => console.log(x));


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
