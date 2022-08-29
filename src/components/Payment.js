import React,{useState, useEffect} from "react";
import {ethers, utils} from "ethers";
import DongAbi from "../DongAbi.json";
import { Link, useParams } from "react-router-dom";
import WalletInformation from "./WalletInformation";
import QRCode from "react-qr-code";


const Payment = () => {

    const { id } = useParams();

    const [people] = useState([]);

    const [name, setName] = useState(null);
    const [totalRemainingAmount, setTotalRemainingAmount] = useState(null);
    const [dong, setDong] = useState(null);
    const [contributors, setContributors] = useState(null);
    const [engaged, setEngaged] = useState(null);
    const [beneficiaryName, setBeneficiaryName] = useState(null);

    const handleChange = (event) => {
        const data = event.target.value;
        setName(data);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (window.ethereum) {
            console.log(`${name} is trying to pay ${dong} Matic tokens`)
            try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            console.log("Successfully got the provider and the signer");

            const contract = new ethers.Contract(id, DongAbi.abi, signer);
            console.log("Successfully initialized the contract instance");
            
            const response = await contract.payDong(name, {value: utils.parseEther(dong)});
            console.log("Receipt", response);

            console.log("Waiting for the transaction to be submitted on the Blockchain");

            setTimeout(() => {
                fetchData();
                alert("Congrats! You have paid your share successfully :)");
            }, 20000);
            
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("Please use your phone's Metamask app to interact with this platform");
        }
    }


    const fetchData = async () => {
        const response = await window.ethereum.request({ method: "eth_requestAccounts" })
        const account = response[0];
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const instance = new ethers.Contract(id, DongAbi.abi, provider);

        const beneficiary_name = await instance.beneficiaryName();
        setBeneficiaryName(beneficiary_name);
        console.log(`Beneficiary name fetched: ${beneficiary_name}`);

        const dongValue = await instance.dong();
        setDong(utils.formatEther(dongValue));
        console.log(`Dong value fetched: ${utils.formatEther(dongValue)} MATIC`);

        const totalEngaged = await instance.payment(account);
        setEngaged(utils.formatEther(totalEngaged));
        console.log(`Total engaged fetched: ${utils.formatEther(totalEngaged)} MATIC`);

        const totalRemaining = await instance.remainingAmount();
        setTotalRemainingAmount(utils.formatEther(totalRemaining));
        console.log(`Total remaining fetched: ${utils.formatEther(totalRemaining)} MATIC`);

        const totalContributors = await instance.contributors();
        setContributors(totalContributors.toNumber());
        console.log(`Total contributors fetched: ${totalContributors.toNumber()}`);

        const payersCounter = totalContributors - (totalRemaining/dongValue);
        // const result = await instance.names(2);
        console.log(payersCounter);

        if (payersCounter == 0) {
            return
        } else {
            for(let i = 1; i <= payersCounter; i++) {
                const result = await instance.names(i);
                console.log(`Participant ${i}: ${result}`);
                if (people.includes(result) === false) {
                    people.push(result);
                }
            }
        }
    }


    let image = "";
    if (id) {
        image = <QRCode fgColor="white" bgColor="black" size={300} value={window.location.href}/>
    } else {
        image = null
    }

    fetchData();

    return (
        <div className="background">

            <Link className="link" to="/"><div className="navigator-card">Home</div></Link>
            <hr className="hr"></hr>
            <WalletInformation></WalletInformation>

            <div className="App">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div>{image}</div>
            </div>

            <form className="form" onSubmit={handleSubmit}>
                <h1>Write your name and submit</h1>
                <input type="text" placeholder="Name" onChange={handleChange}></input><br></br>
                <input className="creation-button" type="submit" value="PAY DONG"></input><br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </form>

            <div className="App background">
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
            </div>            
        </div>
    );
}

export default Payment;