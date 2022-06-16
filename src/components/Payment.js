import React,{useState} from "react";
import {ethers, utils} from "ethers";
import DongAbi from "../DongAbi.json";
import { Link } from "react-router-dom";



function Payment() {

    const [contractAddress, setContractAddress] = useState(null);
    const [name, setName] = useState(null);
    const [totalRemainingAmount, setTotalRemainingAmount] = useState(null);
    const [dong, setDong] = useState(null);
    const [contributors, setContributors] = useState(null);
    const [engaged, setEngaged] = useState(null);
    const [beneficiaryName, setBeneficiaryName] = useState(null);
    const [beneficiaryAddress, setBeneficiaryAddress] = useState(null);


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
                try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
            
                    const signer = provider.getSigner();
            
                    const contract = new ethers.Contract(contractAddress, DongAbi.abi, signer);
    
                    const response = await contract.payDong(name, {value: utils.parseEther(dong)});
                    console.log("response: ", response);
                } catch (err) {
                    console.log("error: ", err);
                }
            } else {
                console.log("Metamask does not exist!")
            }
        }
    }

    const handleLoadAddressChange = (event) => {
        const data = event.target.value;
        setContractAddress(data);
    }

    const loadContract = (event) => {
        event.preventDefault();
        if (window.ethereum) {
            window.ethereum.request({ method: "eth_requestAccounts" })
                .then(result => {
                    updateData(result[0]);
                });
        } else {
            alert("You need to install Metamask first!");
        }
    }

    const updateData = async (address) => {

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // const signer = provider.getSigner();

        const instance = new ethers.Contract(contractAddress, DongAbi.abi, provider);

        const dongValue = await instance.dong();
        setDong(utils.formatEther(dongValue));

        const totalRemaining = await instance.remainingAmount();
        setTotalRemainingAmount(utils.formatEther(totalRemaining));

        const totalContributors = await instance.contributors();
        setContributors(totalContributors.toString());

        const totalEngaged = await instance.payment(address);
        setEngaged(utils.formatEther(totalEngaged));

        const beneficiary_add = await instance.beneficiary();
        setBeneficiaryAddress(beneficiary_add);

        const beneficiary_name = await instance.beneficiaryName();
        setBeneficiaryName(beneficiary_name)

        // await provider.getBalance(address).then(
        //     (result) => {
        //         setBalance(utils.formatEther(result));
        //     }
        // );
        
        const helper = totalContributors - (totalRemaining/dongValue);
        for(let i = 1; i <= helper; i++) {
            const result = await instance.names(i);
            console.log(result);
        }
    }

    


    return (
        <div className="App">
            <br></br>
            <br></br>
            <form>
                <p>Put your contract address in the below box and click the load contarct button</p>
                <input className="input" placeholder="Paste the contract address here!" onChange={handleLoadAddressChange}></input><br></br>
                <button className="button" onClick={loadContract}>Load contract</button><br></br>
            </form>
            <br></br>
            <br></br>
            <br></br>

            <div className="div00">
                <p>Beneficiary:<br></br><b>{beneficiaryName} {beneficiaryAddress}</b></p>
                <p>Your share: <br></br><b>{dong}</b></p>
            </div>

            <form onSubmit={handleSubmit}><br></br>
                <input className="input" placeholder="Please type your name here!" onChange={handleChange}></input>
                <input className="button" type="submit" value="Pay Dong"></input><br></br>
            </form>
            <br></br>
            <div className="div0">
                <p className="text">Total contributors</p>
                <h4 className="text">{contributors}</h4>
            </div>

            <div className="div0">
                <p className="text">Total remaining amount</p>
                <h4 className="text">{totalRemainingAmount} ETH</h4>
            </div>

            <div className="div0">
                <p className="text">Dong</p>
                <h4 className="text">{dong} ETH</h4>
            </div>

            <div className="div0">
                <p className="text">You have paid</p>
                <h4 className="text">{engaged} ETH</h4>
            </div>
            <br></br><br></br>
            <Link to="/creation"><button className="button">Creation Page</button></Link> 
        </div>
    );
}

export default Payment;