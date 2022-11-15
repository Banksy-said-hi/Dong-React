import React from "react";
import { Link } from "react-router-dom";
import admin from "../images/admin.png";


function Home() {

    return (
        <div className="App home-background">
            <div className="home-warning">
                <p> <b>(1)</b> Add this test network to interact with this Dapp</p><br></br>
                <hr></hr><br></br>
                <p> Network Name: <b>Polygon Mumbai</b></p><br></br>
                <p> New RPC URL: <b>https://rpc-mumbai.maticvigil.com/</b></p><br></br>
                <p> Chain ID: <b>8001</b></p><br></br>
                <p> Currency Symbol: <b>MATIC</b></p><br></br>
                <p> Block Explorer URL: <b>https://polygonscan.com/</b></p><br></br>
            </div>

            <div className="home-warning">
                <p><b>(2)</b> get some free tokens from the faucet below</p><br></br>
                <hr></hr><br></br>
                <p><a href="https://mumbaifaucet.com">FAUCET</a></p>
            </div>
            <br></br>
            <br></br>

            <Link className="link" to="./creation">
                <div className="home-card">
                    <h1>Create Dong</h1>
                    <img className="home-image" src={admin}></img>
                </div>
            </Link>


        </div>
    );
}
  
export default Home;

