pragma solidity 0.8.0;

contract basic_dong {
    string public beneficiaryName;

    address public beneficiary;
    address private creator;

    uint256 public remainingAmount;
    uint256 public contributors;
    uint256 public dong;
    uint256 public counter;

    bool public finished;

    mapping(address => uint256) public payment;
    mapping(uint256 => string) public names;

    constructor(
        address _beneficiary,
        uint256 _totalAmount,
        uint256 _contributors,
        string memory _name
    ) {
        creator = 0x7599d1DB45B881A80c66FD6A02144c65E553a9E2;
        beneficiary = _beneficiary;
        beneficiaryName = _name;
        remainingAmount = _totalAmount * 1e18;
        contributors = _contributors;
        dong = (_totalAmount * 1e18) / contributors;
    }

    function payDong(string memory _name) public payable {
        require(msg.value >= dong, "msg.value must be at least equal to dong");
        require(finished == false, "The process has already been finished");

        uint256 reversal;
        uint256 net;

        if (msg.value <= remainingAmount) {
            reversal = msg.value % dong;
            net = msg.value - reversal;
        } else {
            reversal = msg.value - remainingAmount;
            net = remainingAmount;
        }

        remainingAmount -= net;
        payment[msg.sender] += net;

        counter += 1;
        names[counter] = _name;

        payable(msg.sender).transfer(reversal);

        if (remainingAmount == 0) {
            payable(beneficiary).transfer((9 * (address(this).balance)) / 10);
            payable(creator).transfer(address(this).balance);
            finished = true;
        }
    }
}
