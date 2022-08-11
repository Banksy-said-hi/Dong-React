import { useState, useEffect } from "react";
import {ethers} from "ethers";
import "../App";

const Header = () => {

    const [errorMessage, setErrorMessage] = useState("We are happy to see you here :)");
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [connButtonText, setConnButtonText] = useState("Connect Wallet");

    
    const connectWalletHandler = () => {
        if (window.ethereum) {
            window.ethereum.request({method: "eth_requestAccounts"})
            .then(result => {
                accountChangedHandler(result[0]);
                setConnButtonText("You are connected ")
            })
        } else {
            setErrorMessage("First, Install Metamask Please :)");
        }
    }
    
    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        getUserBalance(newAccount.toString());
    }

    const getUserBalance = (address) => {
        window.ethereum.request({method: "eth_getBalance", params: [address, "latest"]})
        .then(balance => {
            setUserBalance(ethers.utils.formatEther(balance).slice(0, 3));
        })
    }

    const chainChangedHandler = () => {
        window.location.reload();
    }

    window.ethereum.on("accountsChanged", accountChangedHandler);
    
    window.ethereum.on("chainChanged", chainChangedHandler);

    useEffect(() => {
        connectWalletHandler();
    });
    
    return (
        <div>
            <h1>Dong Prototype</h1>
            {errorMessage}
            <br></br>
            <br></br>

            <hr/>
            
            <br></br>
            <button onClick={connectWalletHandler} className="button">{connButtonText}</button>

            <div className="div1">
                <div className="accountDisplay">
                    <h3> Your Address: {defaultAccount} </h3>
                </div>
                <div className="balanceDisplay">
                    <h3>Your Matic Balance: {userBalance} Tokens</h3>
                </div>
            </div>

        </div>
    )
}

export default Header;