import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import admin from "../images/admin.png";
import group from "../images/group.png";


// import NetworkDetection from "./networkDetection";

function Home() {

    return (
        <div>
            <Header></Header>
            <div className="home-container">
                {/* <label>Admin</label> */}
                <Link to="./creation"><img className="home-image" src={admin}></img></Link>
                {/* <label>Group Members</label> */}
                <Link to="./payment"><img className="home-image" src={group}></img></Link>
            </div>
        </div>
    );
}
  
export default Home;