import React from "react";
import { Link } from "react-router-dom";
import admin from "../images/admin.png";
import group from "../images/group.png";



function Home() {

    return (
        <div className="App home-background">
            <div className="home-warning">
                <p>This platform is still in the development phase</p>
                <p>(1) Please change your network to the <b>Polygon Mumbai</b></p>
                <p>(2) Get some free tokens from the faucet below</p><br></br><br></br>
                <a href="https://mumbaifaucet.com">FAUCET</a>
            </div>

            <Link className="link" to="./creation">
                <div className="home-card">
                    <h1>Create Dong</h1>
                    <h4>Click here to set up a bill for your group</h4>
                    <img className="home-image" src={admin}></img>
                </div>
            </Link>
        </div>
    );
}
  
export default Home;

