import React, {useState} from "react";
import { ethers } from "ethers";
import DongAbi from "../DongAbi.json";
import DongbyteCode from "../DongByteCode.json";
import { Link, useNavigate } from "react-router-dom";
import WalletInformation from "./WalletInformation.js";


function Creation() {
 
    const navigate = useNavigate();

    const [deploymentMessage, setDeploymentMessage] = useState("CREATE");

    const [beneficiaryName, setBeneficiaryName] = useState(null);
    const [amount, setAmount] = useState(null);
    const [contributors, setContributors] = useState(null);

    const handleContractCreation = async (event) => {
        event.preventDefault();
        let address;

        if (window.ethereum) {
            try {
                setDeploymentMessage("CONNECTING WALLET");
                const result = await window.ethereum.request({method: "eth_requestAccounts"});
                address = result[0];
                console.log(`Connected wallet address: ${address}`);
                setDeploymentMessage("WALLET IS CONNECTED");
            } catch {
                alert("cannot connect the wallet to the Dapp");
            }

            if (beneficiaryName && amount && contributors) {
                try {
                    setDeploymentMessage("DEPLOYING THE CONTRACT");
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    console.log("Successfully got the provider and signer");

                    const factory = new ethers.ContractFactory(DongAbi.abi, DongbyteCode.byteCode, signer);
                    console.log("Successfully got the ContractFactory");
                    
                    const newDongContract = await factory.deploy(address, amount, contributors, beneficiaryName);
                    console.log("Trying to deploy the contract");
                    setDeploymentMessage("PLEASE WAIT ABOUT 20 SEC");

                    const transactionReceipt = await newDongContract.deployTransaction.wait();
                    console.log("Contract was deployed successfully!");
                    setDeploymentMessage("SUCCESSFULY DEPLOYED");

                    console.log(`Contract Address: ${transactionReceipt.contractAddress}`);
                    console.log(`Gas consumption: ${transactionReceipt.gasUsed.toString()}`);

                    console.log("Heading to the payment page!");
                    
                    navigate(`/payment/${transactionReceipt.contractAddress}`);

                } catch {
                    alert("Failed in contract deployment! Check the console for more details");
                    setDeploymentMessage("CREATE");
                }
            } else {
                alert("You need to fill out all three inputs to deploy your contract");
                setDeploymentMessage("CREATE");
            }
        } else {
            alert("Please use your phone's Metamask app to interact with this platform");
        }
    }


    return (
        <div className="background">
            <Link className="link" to="/"><div className="navigator-card">Home</div></Link>
            <hr className="hr"></hr>
            <WalletInformation></WalletInformation>

            <form className="form" onSubmit={handleContractCreation}>
                <p>Provide this information to create your bill</p>
                <input type="text" placeholder="Your name" onChange={(x) => setBeneficiaryName(x.target.value)}></input>
                <input type="text" placeholder="Bill amount" onChange={(x) => setAmount(x.target.value)}></input>
                <input type="text" placeholder="Size of the group" onChange={(x) => setContributors(x.target.value)}></input>
                <br></br>
                <input className="creation-button" type="submit" value={deploymentMessage}></input>
            </form>
        </div>
    );
}
  
export default Creation;