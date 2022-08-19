import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import admin from "../images/admin.png";
import group from "../images/group.png";


// import NetworkDetection from "./networkDetection";

function Home() {

    return (
        <div className="App">
            <Link className="link" to="./creation">
                <div className="home-card">
                    <h1>Contract Creation</h1>
                    <h4>For Admin</h4>
                    <img className="home-image" src={admin}></img>
                </div>
            </Link>
            <Link className="link" to="./payment">
                <div className="home-card">
                    <h1>Payment</h1>
                    <h4>For Members</h4>
                    <img className="home-image" src={group}></img>
                </div>
            </Link>
        </div>
    );
}
  
export default Home;



            // <div className="home-container">
            //     {/* <label>Admin</label> */}
            //     {/* <label>Group Members</label> */}
            //     <Link to="./payment"><img className="home-image" src={group}></img></Link>
            // <