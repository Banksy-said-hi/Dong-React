import "../App.css";
import { useEffect, useState } from "react";
import {ethers} from "ethers";

const WalletInformation = () => {

    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [connButtonText, setConnButtonText] = useState("Connect Wallet");

    const connectWalletHandler = () => {
        if (window.ethereum) {
            if (window.ethereum.networkVersion == 80001) {
                window.ethereum.request({method: "eth_requestAccounts"})
                .then(result => {
                    accountChangedHandler(result[0]);
                })
            } else {
                alert("Please change your network to Polygon Mumbai");
            }
        } else {
            alert("Dadash!Install Metamask Please");
        }
    }

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        getUserBalance(newAccount.toString());
    }

    const getUserBalance = (address) => {
        window.ethereum.request({method: "eth_getBalance", params: [address, "latest"]})
        .then(balance => {
            setUserBalance(`${ethers.utils.formatEther(balance).slice(0, 4)} Matic`);
        })
        setConnButtonText("Connected")
    }


    return (
            <div className="wallet-information">
                <button className="button" onClick={connectWalletHandler}>{connButtonText}</button>
                <p>{defaultAccount}</p>
                <p>{userBalance} </p>
            </div>
    )
}

export default WalletInformation;