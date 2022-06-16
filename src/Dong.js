import React, {useState} from "react";
import './App.css';
import {ethers, utils} from "ethers";
import DongAbi from "./DongAbi.json";
import DongbyteCode from "./DongByteCode.json";

const Dong = () => {

    const [contractAddress, setContractAddress] = useState("");
    
    const [totalRemainingAmount, setTotalRemainingAmount] = useState(null);
    const [dong, setDong] = useState(null);
    const [contributors, setContributors] = useState(null);
    const [name, setName] = useState(null);
    const [engaged, setEngaged] = useState(null);

    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [defaultAccount, setdefaultAccount] = useState(null);
    const [balance, setBalance] = useState(0);
    const [beneficiaryName, setBeneficiaryName] = useState(null);
    const [beneficiaryAddress, setBeneficiaryAddress] = useState(null);

    const [address_c, setAddress_c] = useState(null);
    const [name_c, setName_c] = useState(null);
    const [amount_c, setAmount_c] = useState(null);
    const [contributors_c, setContributors_c] = useState(null);

    const [newContract, setNewContract] = useState("No new contract!");

    const [loadAddress, setLoadAddress] = useState(null);



//============================================================
// Retrieving data about a specific contract from the Blockchain


    const handleChange = (event) => {
        const data = event.target.value;
        setName(data);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (contractAddress == null) {
            alert("Oh, Sorry! You need to specify your contract address");
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


//============================================================
// Retrieving data about a specific contract from the Blockchain


    const updateData = async (address) => {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);

        const signer = provider.getSigner();
        setSigner(signer);

        const instance = new ethers.Contract(contractAddress, DongAbi.abi, provider);
        setContract(instance);

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

        await provider.getBalance(address).then(
            (result) => {
                setBalance(utils.formatEther(result));
            }
        );
        
        const helper = totalContributors - (totalRemaining/dongValue);
        for(let i = 1; i <= helper; i++) {
            const result = await instance.names(i);
            console.log(result);
        }
    }


//============================================================
// Contract creation form dependencies

    const handleAddressChange = (event) => {
        const data = event.target.value;
        setAddress_c(data);
    };

    const handleNameChange = (event) => {
        const data = event.target.value;
        setName_c(data);
    };

    const handleAmountChange = (event) => {
        const data = event.target.value;
        setAmount_c(data);
    };

    const handleContributorsChange = (event) => {
        const data = event.target.value;
        setContributors_c(data);
    };

// Create new contract button

    const handleContractCreation = async (event) => {
        event.preventDefault();

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();

        const factory = new ethers.ContractFactory(DongAbi.abi, DongbyteCode.byteCode, signer);

        const newDongContract = await factory.deploy(address_c, amount_c, contributors_c, name_c);

        const transactionReceipt = await newDongContract.deployTransaction.wait();

        setNewContract(transactionReceipt.contractAddress)
        console.log(transactionReceipt);
    }


//============================================================
// Loading the new contract


    const handleLoadAddressChange = (event) => {
        const data = event.target.value;
        setContractAddress(data);
    }

    const loadContract = (event) => {
        event.preventDefault();
        if (window.ethereum) {
            window.ethereum.request({ method: "eth_requestAccounts" })
                .then(result => {
                    setdefaultAccount(result[0]);
                    updateData(result[0]);
                });
        } else {
            alert("You need to install Metamask first!");
        }
    }


//============================================================


    return (
        <div>
            <div className="App-header">
                <br></br>
                <p>Provide these information to create your custom contract</p>
                <form onSubmit={handleContractCreation}>
                    <input className="input" placeholder="Beneficiary address" onChange={handleAddressChange}></input><br></br>
                    <input className="input" placeholder="Beneficiary name" onChange={handleNameChange}></input><br></br>
                    <input className="input" placeholder="Total amount of ETH" onChange={handleAmountChange}></input><br></br>
                    <input className="input" placeholder="Number of contributors" onChange={handleContributorsChange}></input><br></br>

                    <input className="button" type="submit" value="Create new contract"></input><br></br>
                </form>
                <div className="div1">
                    <p>Contract Address:  <b>{newContract}</b></p>
                </div>
                <p>Copy and paste the above address on the payment page</p>
            </div>


            {/* <div className='App-header'>
                <div><br></br>
                    <h5>{errorMessage}</h5>

                    <div className="div1">
                        <p>{welcomeMessage}:<br></br>{defaultAccount}</p>
                        <p>Balance:<br></br>{balance}  ETH</p>
                    </div>
                    
                    <button className="button" onClick={connectWalletHandler}> {connectButtonText} </button><br></br><br></br>
                </div>
            </div> */}

            
            <br></br>
            <div>
                <form>
                    <input className="input" placeholder="Paste the contract address here!" onChange={handleLoadAddressChange}></input><br></br>
                    <button className="button" onClick={loadContract}>Load contract</button><br></br>
                </form>
                
            </div>

            <div className="div00">
                <p>Beneficiary:<br></br><b>{beneficiaryName} {beneficiaryAddress}</b></p>
            </div>

            <div className="App">
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
            </div>

            <div className="App-header">
                <form onSubmit={handleSubmit}><br></br>
                    <input className="input" placeholder="Please type your name here!" onChange={handleChange}></input>
                    <input className="button" type="submit" value="Pay Dong"></input><br></br>
                </form>
                <p>By clicking "Pay Dong" you will send <b>{dong}</b> units to <b>Mr.{beneficiaryName}</b></p>
            </div>
        </div>
    );
}

export default Dong;


