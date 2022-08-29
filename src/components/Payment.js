import React,{useState, useEffect} from "react";
import {ethers, utils} from "ethers";
import DongAbi from "../DongAbi.json";
import { Link, useParams } from "react-router-dom";
import WalletInformation from "./WalletInformation";
import QRCode from "react-qr-code";


const Payment = () => {

    console.log("start");

    const { id } = useParams();

    const [payDongButton, setPayDongButton] = useState("PAY");

    const [people] = useState([]);
    const [people2] = useState(["Hary", "Son", "Loris"]);

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
            setPayDongButton("WORKING ...");
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
                setPayDongButton("PAY");
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
        const response = await window.ethereum.request({ method: "eth_requestAccounts" });
        const account = response[0];
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const instance = new ethers.Contract(id, DongAbi.abi, provider);

        const beneficiary_name = await instance.beneficiaryName();
        console.log(`Beneficiary name fetched: ${beneficiary_name}`);

        const dongValue = await instance.dong();
        console.log(`Dong value fetched: ${utils.formatEther(dongValue)} MATIC`);

        const totalEngaged = await instance.payment(account);
        console.log(`Total engaged fetched: ${utils.formatEther(totalEngaged)} MATIC`);

        const totalRemaining = await instance.remainingAmount();
        console.log(`Total remaining fetched: ${utils.formatEther(totalRemaining)} MATIC`);

        const totalContributors = await instance.contributors();
        console.log(`Total contributors fetched: ${totalContributors.toNumber()}`);

        const payersCounter = totalContributors - (totalRemaining/dongValue);
        console.log(`${payersCounter} people have contributed so far`);

        for(let i = 1; i <= payersCounter; i++) {
            const result = await instance.names(i);
            console.log(`Participant ${i}: ${result}`);
            if (people.includes(result) == false) {
                people.push(result);
            }
        }

        setBeneficiaryName(beneficiary_name);
        setDong(utils.formatEther(dongValue));
        setEngaged(utils.formatEther(totalEngaged));
        setTotalRemainingAmount(utils.formatEther(totalRemaining));
        setContributors(totalContributors.toNumber());
    }
    

    useEffect(() => {
        fetchData();
    }, []);


    let image = "";
    if (id) {
        image = <QRCode fgColor="white" bgColor="black" size={300} value={window.location.href}/>
    } else {
        image = null
    }

    // console.log(people)

    console.log("finish");

    return (
        <div className="background">

            <Link className="link" to="/"><div className="navigator-card">Home</div></Link>
            <hr className="hr"></hr>
            <WalletInformation></WalletInformation>
            <div className="App">
                <br></br>
                <br></br>
                <p>Your friends will be directed to the current page by scanning this QRCode</p>
                <br></br>
                <div>{image}</div>
            </div>

            <form className="form" onSubmit={handleSubmit}>
                <h1>Write your name and submit</h1>
                <input type="text" placeholder="Name" onChange={handleChange}></input><br></br>
                <input className="creation-button" type="submit" value={payDongButton}></input><br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </form>

            <div className="App background">
                <div className="div0">
                    <p>Beneficiary name:<br></br><b>{beneficiaryName}</b></p>
                    <p>Your Share: <br></br><b>{dong} MATIC</b></p>
                </div>

                <div className="div0">
                    Payers' names {people.map((item, index) => <h2 key={index}>{item}</h2>)}
                </div>

                <div className="div0">
                    <p className="text">You have paid: <b>{engaged}</b> MATIC</p>
                </div>

                <div className="div0">
                    <p className="text">Remaining amount: <b>{totalRemainingAmount}</b> MATIC</p>
                </div>

                <div className="div0">
                    <p>Contributors: <b>{contributors}</b></p>
                </div>
            </div>            
        </div>
    );
}

export default Payment;