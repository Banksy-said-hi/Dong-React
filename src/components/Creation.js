import React, {useState} from "react";
import { ethers, Wallet } from "ethers";
import DongAbi from "../DongAbi.json";
import DongbyteCode from "../DongByteCode.json";
import QRCode from "react-qr-code";
import { Link, useNavigate } from "react-router-dom";
import WalletInformation from "./WalletInformation.js";



// setTimeout for changing the successfully deployed text on the create button after the contract deployment

function Creation() {
 
    const navigate = useNavigate();

    const [deploymentMessage, setDeploymentMessage] = useState("CREATE");

    const [beneficiaryName, setBeneficiaryName] = useState(null);
    const [amount, setAmount] = useState(null);
    const [contributors, setContributors] = useState(null);

    const [newContract, setNewContract] = useState(null);

    const handleContractCreation = async (event) => {
        event.preventDefault();

        // console.log(window.ethereum.enable());
        if (beneficiaryName && amount && contributors) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                let address;
                await signer.getAddress().then((x) => {
                    address = x;
                })
                console.log("Successfully got the provider, signer, and address");
    
                const factory = new ethers.ContractFactory(DongAbi.abi, DongbyteCode.byteCode, signer);
                console.log("Trying to deploy the contract");
                const newDongContract = await factory.deploy(address, amount, contributors, beneficiaryName);
                setDeploymentMessage("PLEASE WAIT 20 SECONDS");
        
                const transactionReceipt = await newDongContract.deployTransaction.wait();
                console.log("Contract was deployed successfully!");
                setNewContract(transactionReceipt.contractAddress);
                setDeploymentMessage("SUCCESSFULY DEPLOYED ...");
    
                console.log(`Contract Address: ${transactionReceipt.contractAddress}`);
                console.log(`Gas consumption: ${transactionReceipt.gasUsed.toString()}`);
                console.log("Transaction Receipt below:");
                console.log(transactionReceipt);
    
                setTimeout(() => {
                    setDeploymentMessage("CREATE");
                }, 3000)
    
                // navigate('/payment');
            } catch {
                alert("Check your internet connection, Make sure your wallet is connected");
            }
        } else {
            alert("Azize delam, all three inputs needs to be filled to create a contract");
        }
    }

    let image = "";
    if (newContract) {
        image = <QRCode fgColor="blue" bgColor="black" size={300} value={`https://polygonscan.com/address/${newContract}`}/>
    } else {
        image = null
    }

    return (
        <div>
            <Link className="link" to="/"><div className="navigator-card">Home</div></Link>
            <Link className="link" to="/payment"><div className="navigator-card">Payment</div></Link>
            <WalletInformation></WalletInformation>

            <form className="form" onSubmit={handleContractCreation}>
                <p>To create a new contract, fill out this form after connecting your wallet</p>
                <input type="text" placeholder="Your name" onChange={(x) => setBeneficiaryName(x.target.value)}></input>
                <input type="text" placeholder="Bill amount" onChange={(x) => setAmount(x.target.value)}></input>
                <input type="text" placeholder="Size of the group" onChange={(x) => setContributors(x.target.value)}></input>
                <br></br>
                <input className="button" type="submit" value={deploymentMessage} ></input>
            </form>
            
            <div className="App">
                <p>Contract Address:  <b>{newContract}</b></p>
                <div>{image}</div>
            </div>

        </div>
    );
}
  
export default Creation;