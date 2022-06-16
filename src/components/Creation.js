import React, {useState} from "react";
import { ethers } from "ethers";
import DongAbi from "../DongAbi.json";
import DongbyteCode from "../DongByteCode.json";
import { Link } from "react-router-dom";


function Creation() {

    const [address_c, setAddress_c] = useState(null);
    const [name_c, setName_c] = useState(null);
    const [amount_c, setAmount_c] = useState(null);
    const [contributors_c, setContributors_c] = useState(null);

    const [newContract, setNewContract] = useState("No new contract!");

    const handleAddressChange = (event) => {
        const data = event.target.value;
        setAddress_c(data);
    };

    const handleNameChange = (event) => {
        const data = event.target.value;
        setName_c(data);
    };

    const handleAmountChange = (event) => {
        const data = event.target.value;
        setAmount_c(data);
    };

    const handleContributorsChange = (event) => {
        const data = event.target.value;
        setContributors_c(data);
    };

    const handleContractCreation = async (event) => {
        event.preventDefault();

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();

        const factory = new ethers.ContractFactory(DongAbi.abi, DongbyteCode.byteCode, signer);

        const newDongContract = await factory.deploy(address_c, amount_c, contributors_c, name_c);

        const transactionReceipt = await newDongContract.deployTransaction.wait();

        setNewContract(transactionReceipt.contractAddress)
        console.log(transactionReceipt);
    }


    return (
        <div className="App-header">
            <br></br>
            <p>Provide these information to create your custom contract</p>
            <form onSubmit={handleContractCreation}>
                <input className="input" placeholder="Beneficiary address" onChange={handleAddressChange}></input><br></br>
                <input className="input" placeholder="Beneficiary name" onChange={handleNameChange}></input><br></br>
                <input className="input" placeholder="Total amount of ETH" onChange={handleAmountChange}></input><br></br>
                <input className="input" placeholder="Number of contributors" onChange={handleContributorsChange}></input><br></br>

                <input className="button" type="submit" value="Create new contract"></input><br></br>
            </form>
            <div className="div1">
                <p>Contract Address:  <b>{newContract}</b></p>
            </div>
            <p>Copy the above address to paste it on the payment page</p>
            <p>Once you are ready to pay a share click the below button</p>
            <Link to="/payment"><button className="button">Payment Page</button></Link>
        </div>
    );
}
  
export default Creation;