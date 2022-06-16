const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

describe("basic_dong", function () {
  it("Calculates the dong correctly", async function () {
    const [user1, user2, user3] = await ethers.getSigners();

    const Dong = await ethers.getContractFactory("basic_dong");
    const dong = await Dong.deploy("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", 12, 4, "Kami");
    await dong.deployed();

    const number = BigNumber.from("3000000000000000000");

    await dong.payDong("sina", {value: number});
    expect(await dong.payment(user1)).to.equal(BigNumber.from(3000000000000000000));
  });
});
