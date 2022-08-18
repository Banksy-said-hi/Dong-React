import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import admin from "../images/admin.png";
import group from "../images/group.png";


// import NetworkDetection from "./networkDetection";

function Home() {

    return (
        <div className="App">
            <Link to="./creation">
                <div className="home-card">
                    <h1>Contact Creation</h1>
                    <h3>Admin</h3>
                    <img className="home-image" src={admin}></img>
                </div>
            </Link>

            <Link to="./payment">
                <div className="home-card">
                    <h1>Payment</h1>
                    <h3>Members</h3>
                    <img className="home-image" src={admin}></img>
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