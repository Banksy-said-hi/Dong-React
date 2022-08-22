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
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            let address;
            await signer.getAddress().then((x) => {
                address = x;
            })

            const factory = new ethers.ContractFactory(DongAbi.abi, DongbyteCode.byteCode, signer);

            const newDongContract = await factory.deploy(address, amount, contributors, beneficiaryName);
            console.log("Trying to deploy the contract");
            setDeploymentMessage("WORKING ...");
    
            const transactionReceipt = await newDongContract.deployTransaction.wait();
    
            setNewContract(transactionReceipt.contractAddress);
    
            console.log("Contract was deployed successfully!");
            setDeploymentMessage("SUCCESSFULY DEPLOYED ...");
            console.log(`Contract Address: ${transactionReceipt.contractAddress}`);
            console.log(`Gas consumption: ${transactionReceipt.gasUsed.toString()}`);
            console.log("Transaction Receipt below:");
            console.log(transactionReceipt);
            // navigate('/payment');
        } catch {
            alert("Something did not work!")
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

            <WalletInformation></WalletInformation>

            <form className="form" onSubmit={handleContractCreation}>
                <div>
                    <label>Name</label>
                    <input type="text" placeholder="Kami" onChange={(x) => setBeneficiaryName(x.target.value)}></input>
                </div>
                
                <div>
                    <label>Bill</label>
                    <input type="text" placeholder="10" onChange={(x) => setAmount(x.target.value)}></input>
                </div>
                
                <div>
                    <label>Contributors</label>
                    <input type="text" placeholder="4" onChange={(x) => setContributors(x.target.value)}></input>
                </div>
                
                <input className="button" type="submit" value={deploymentMessage} ></input>
            </form>
            
            <div className="App">
                <p>Contract Address:  <b>{newContract}</b></p>
                <div>{image}</div>
            </div>

            <Link className="link" to="/payment"><div className="navigator-card">Payment</div></Link>
        </div>
    );
}
  
export default Creation;