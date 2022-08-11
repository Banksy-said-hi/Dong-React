import React, {useState} from "react";
import { ethers } from "ethers";
import DongAbi from "../DongAbi.json";
import DongbyteCode from "../DongByteCode.json";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import Header from "./Header";
import Footer from "./Footer";



function Creation() {

    const [beneficiaryAddress, setBeneficiaryAddress] = useState(null);
    const [beneficiaryName, setBeneficiaryName] = useState(null);
    const [amount, setAmount] = useState(null);
    const [contributors, setContributors] = useState(null);

    const [newContract, setNewContract] = useState(null);

    const handleContractCreation = async (event) => {
        event.preventDefault();

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();

        const factory = new ethers.ContractFactory(DongAbi.abi, DongbyteCode.byteCode, signer);

        const newDongContract = await factory.deploy(beneficiaryAddress, amount, contributors, beneficiaryName);
        console.log("Working on the deployment...");

        const transactionReceipt = await newDongContract.deployTransaction.wait();

        setNewContract(transactionReceipt.contractAddress);

        console.log("Contract was deployed successfully!");
        console.log(`Contract Address: ${transactionReceipt.contractAddress}`);
        console.log(`Gas consumption: ${transactionReceipt.gasUsed.toString()}`);
        console.log("Transaction Receipt below:");
        console.log(transactionReceipt);

    }

    let image = "";
    if (newContract) {
        image = <QRCode fgColor="blue" bgColor="black" size={300} value={`https://polygonscan.com/address/${newContract}`}/>
    } else {
        image = null
    }

    return (
        <div>

            <br></br>
            <br></br>
            <Header></Header>
            <br></br>
            <br></br>

            <hr/>

            <br></br>
            <br></br>
            <p>Provide these information to create your custom contract</p>

            <form onSubmit={handleContractCreation}>

                <input className="input" placeholder="Beneficiary's MATIC address" onChange={(x) => setBeneficiaryAddress(x.target.value)}></input><br></br>
                <input className="input" placeholder="Beneficiary's name" onChange={(x) => setBeneficiaryName(x.target.value)}></input><br></br>
                <input className="input" placeholder="Total amount in MATIC" onChange={(x) => setAmount(x.target.value)}></input><br></br>
                <input className="input" placeholder="Number of contributors" onChange={(x) => setContributors(x.target.value)}></input><br></br>

                <input className="button" type="submit" value="Create new contract"></input><br></br><br></br>
            </form>
            <br></br>
            <br></br>

            <hr/>

            <br></br>
            <br></br>
            <div className="div1">
                <p>Contract Address:  <b>{newContract}</b></p><br></br>
                <div>{image}</div><br></br>
            </div>
            <br></br>
            <br></br>

            <hr/>

            <br></br>
            <br></br>
            <Footer></Footer>
            <br></br>
            <br></br>
        </div>
    );
}
  
export default Creation;