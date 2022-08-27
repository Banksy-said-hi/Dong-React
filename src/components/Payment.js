import React,{useState, useEffect, lengthOf} from "react";
import {ethers, utils} from "ethers";
import DongAbi from "../DongAbi.json";
import { Link } from "react-router-dom";
import WalletInformation from "./WalletInformation";





function Payment() {

    const [people] = useState([]);
    const [loadButtonMessage, setLoadButtonMessage] = useState("LOAD CONTRACT");

    const [contractAddress, setContractAddress] = useState(null);
    const [instance, setInstance] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null);

    const [name, setName] = useState(null);
    const [totalRemainingAmount, setTotalRemainingAmount] = useState(null);
    const [dong, setDong] = useState(null);
    const [contributors, setContributors] = useState(null);
    const [engaged, setEngaged] = useState(null);
    const [beneficiaryName, setBeneficiaryName] = useState(null);
    const [beneficiaryAddress, setBeneficiaryAddress] = useState(null);

//=======================================================
// PayDong form handler

    const handleChange = (event) => {
        const data = event.target.value;
        setName(data);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (contractAddress == null) {
            alert("Oh, Sorry! You need to specify your contract address first");
        } else {
            if (window.ethereum) {
                console.log(`${name} is trying to pay ${dong} Matic tokens`)
                try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
            
                    const signer = provider.getSigner();
            
                    const contract = new ethers.Contract(contractAddress, DongAbi.abi, signer);
    
                    const response = await contract.payDong(name, {value: utils.parseEther(dong)});
                    console.log("response: ", response);
                    setTimeout(() => {
                        console.log("Updating data after 20 seconds");
                        updateData(instance);
                    }, 20000);
                } catch (err) {
                    console.log("error: ", err);
                }
            } else {
                console.log("Metamask does not exist!")
            }
        }
    }

//=======================================================
// Load contract handler

    const handleLoadAddressChange = (event) => {
        const data = event.target.value;
        setContractAddress(data);
    }

    const loadContract = (event) => {
        event.preventDefault();
        console.log("Trying to fetch data ...");
        setLoadButtonMessage("FETCHING CONTRACT DATA")
        if (window.ethereum) {
            window.ethereum.request({ method: "eth_requestAccounts" })
                .then(result => {
                    setWalletAddress(result[0]);
                    getContract(contractAddress);
                });
        } else {
            alert("You need to install Metamask first!");
        }
    }

    const getContract = async (contractAddress) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const instance = new ethers.Contract(contractAddress, DongAbi.abi, provider);
        setInstance(instance);
        updateData(instance);
    }

    const updateData = async (instance) => {
        const response = await window.ethereum.request({ method: "eth_requestAccounts" })
        const aid = response[0];

        const beneficiary_name = await instance.beneficiaryName();
        setBeneficiaryName(beneficiary_name);

        const dongValue = await instance.dong();
        setDong(utils.formatEther(dongValue));

        const totalEngaged = await instance.payment(aid);
        setEngaged(utils.formatEther(totalEngaged));

        const totalRemaining = await instance.remainingAmount();
        setTotalRemainingAmount(utils.formatEther(totalRemaining));

        const totalContributors = await instance.contributors();
        setContributors(totalContributors.toString());
        
        const beneficiary_add = await instance.beneficiary();
        setBeneficiaryAddress(beneficiary_add);



        console.log("Data successfully fetched");
        setLoadButtonMessage("Data successfully fetched");

        const helper = totalContributors - (totalRemaining/dongValue);

        for(let i = 1; i <= helper; i++) {
            const result = await instance.names(i);
            console.log(`Participant ${i}: ${result}`);
            if (people.includes(result) === false) {
                people.push(result);
            }
        }

        console.log(people);

        setLoadButtonMessage("LOAD CONTRACT");
    }

    return (
        <div className="background">
            <Link className="link" to="/"><div className="navigator-card">Home</div></Link>
            <Link className="link" to="/creation"><div className="navigator-card">Creation</div></Link>
            {/* <button onClick={test}>Click here</button> */}
            <WalletInformation></WalletInformation>

            <form className="form" onSubmit={loadContract}>
                <input type="text" placeholder=" CONTRACT ADDRESS HERE!" onChange={handleLoadAddressChange}></input><br></br>
                <input className="creation-button" type="submit" value={loadButtonMessage}></input>
                <br></br>
                <br></br>
                <div className="App">
                    <div className="div0">
                        <p>Beneficiary Name:<br></br><b>{beneficiaryName}</b></p>
                        <p>Your share: <br></br><b>{dong}</b></p>
                    </div>

                    <div className="div0">
                        People who have paid: {people.map((item, index) => <h2 key={index}>{index+1}- {item}</h2>)}
                    </div>

                    <div className="div0">
                        <p className="text">You have paid: {engaged} Matic</p>
                    </div>

                    <div className="div0">
                        <p className="text">Total remaining amount: {totalRemainingAmount} Matic</p>
                    </div>

                    <div className="div0">
                        <p>Total contributors: {contributors}</p>
                    </div>

                    <button className="button" onClick={loadContract}>REFRESH DATA</button>
                </div>
            </form>
            

            <form className="form" onSubmit={handleSubmit}>
                <h1>Write your name and submit</h1>
                <input type="text" placeholder="NAME" onChange={handleChange}></input><br></br>
                <input className="creation-button" type="submit" value="PAY DONG"></input><br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </form>
        </div>
    );
}

export default Payment;