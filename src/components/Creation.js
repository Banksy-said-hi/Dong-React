import React, {useState} from "react";
import { ethers } from "ethers";
import DongAbi from "../DongAbi.json";
import DongbyteCode from "../DongByteCode.json";
import QRCode from "react-qr-code";
import WalletInfo from "./WalletInfo";
import Header from "./Header";



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
            <div>
                <form className="form" onSubmit={handleContractCreation}>
                    <div>
                        <label>Admin's wallet address</label>
                        <input type="text" placeholder="0x326893Eb03efB342bb9CCDC47E444531f5BeD651" onChange={(x) => setBeneficiaryAddress(x.target.value)}></input>
                    </div>
                    
                    <div>
                        <label>Admin's name</label>
                        <input type="text" placeholder="Kami" onChange={(x) => setBeneficiaryName(x.target.value)}></input>
                    </div>
                    
                    <div>
                        <label>Total amount to be spent</label>
                        <input type="text" placeholder="10" onChange={(x) => setAmount(x.target.value)}></input>
                    </div>
                    
                    <div>
                        <label>Number of contributors</label>
                        <input type="text" placeholder="4" onChange={(x) => setContributors(x.target.value)}></input>
                    </div>
                    
                    <input className="button" type="submit" value="Create new contract" ></input>
                </form>

                <div className="div1">
                    <p>Contract Address:  <b>{newContract}</b></p>
                    <div>{image}</div>
                </div>
            </div>
        </div>
    );
}
  
export default Creation;