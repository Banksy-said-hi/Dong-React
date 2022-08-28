import React, {useState} from "react";
import { ethers, Wallet } from "ethers";
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
                console.log(address)
                setDeploymentMessage("WALLET IS CONNECTED");
            } catch {
                alert("cannot retreive user address from the provider");
            }

            if (beneficiaryName && amount && contributors) {
                try {
                    setDeploymentMessage("DEPLOYING THE CONTRACT");
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    console.log("Successfully got the provider and signer");

                    const factory = new ethers.ContractFactory(DongAbi.abi, DongbyteCode.byteCode, signer);
                    console.log("works fine untill here");
                    const newDongContract = await factory.deploy(address, amount, contributors, beneficiaryName);
                    console.log("Trying to deploy the contract");
                    setDeploymentMessage("IT TAKES 20 SEC");

                    const transactionReceipt = await newDongContract.deployTransaction.wait();
                    // setNewContract(transactionReceipt.contractAddress);
                    console.log("Contract was deployed successfully!");
                    setDeploymentMessage("SUCCESSFULY DEPLOYED");

                    console.log(`Contract Address: ${transactionReceipt.contractAddress}`);
                    console.log(`Gas consumption: ${transactionReceipt.gasUsed.toString()}`);
                    console.log("Transaction Receipt below:");
                    console.log(transactionReceipt);

                    // dispatch({type: "SET",payload: transactionReceipt.contractAddress});
                    console.log("works fine to here!!!");
                    setTimeout(() => {
                        setDeploymentMessage("CREATE");
                    }, 2000)
                    
                    navigate(`/payment/${transactionReceipt.contractAddress}`);

                } catch {
                    alert("Failed in contract deployment");
                    setDeploymentMessage("CREATE");
                }
            } else {
                alert("Sotun, first you need to fill all three inputs correctly !");
                setDeploymentMessage("CREATE");
            }
        } else {
            alert("Dadashe golam! Az Metamask wallet e gushit estefade kon!")
        }
    }


    return (
        <div className="background">
            <Link className="link" to="/"><div className="navigator-card">Home</div></Link>
            <hr className="hr"></hr>
            <WalletInformation></WalletInformation>

            <form className="form" onSubmit={handleContractCreation}>
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