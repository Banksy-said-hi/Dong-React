// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// TODO:

contract Dong {
    AggregatorV3Interface internal priceFeed;

    int256 public maticPrice;
    int256 public maticPriceDecimal = 1e8;

    int256 public dongDecimal = 1e2;
    // RemiaingDongInMatic has two decimals for precision
    int256 public remainingDongInMatic;
    // dongInMatic is intentionally multiplied by 100 for precision
    int256 public dongInMatic;

    int256 public totalDollarAmount;
    int256 public contributors;
    uint256 public counter;

    string public beneficiaryName;
    address public beneficiary;

    bool public finished;

    mapping(address => int256) public payment;
    mapping(uint256 => string) public names;

    constructor(
        address _beneficiary,
        int256 _totalDollarAmount,
        int256 _contributors,
        string memory _beneficiaryName
    ) {
        priceFeed = AggregatorV3Interface(
            0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
        );

        beneficiary = _beneficiary;
        totalDollarAmount = _totalDollarAmount;
        contributors = _contributors;
        beneficiaryName = _beneficiaryName;

        maticPrice = getLatestPrice();

        // RemiaingDongInMatic has two decimals for precision
        remainingDongInMatic =
            (totalDollarAmount * maticPriceDecimal * dongDecimal) /
            maticPrice;

        // dongInMatic is intentionally multiplied by 100 for precision
        dongInMatic = (105 * (remainingDongInMatic / contributors)) / 100;
    }

    function getLatestPrice() public view returns (int256) {
        (
            ,
            /*uint80 roundID*/
            int256 price,
            ,
            ,

        ) = priceFeed.latestRoundData(); /*uint80 answeredInRound*/ /*uint timeStamp*/ /*uint startedAt*/
        return price;
    }

    function payDong(string calldata _name) public payable {
        require(finished == false, "The process has already been finished");

        remainingDongInMatic -= int256(msg.value);
        payment[msg.sender] += int256(msg.value);

        names[counter] = _name;
        counter += 1;

        if (counter == uint256(contributors)) {
            payable(beneficiary).transfer(address(this).balance);
            finished = true;
        }
    }
}
