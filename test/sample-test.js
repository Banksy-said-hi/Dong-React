const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");
// const { basic_dong } = require("../artifacts");

describe("Dong", async () => {
  beforeEach(async() => {
    const accounts = await ethers.getSigners();
    console.log(accounts[0]);
  })
});
