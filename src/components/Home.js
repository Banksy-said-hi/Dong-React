import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="App-home">
            <Link to="./creation"><button className="button">Create new contract</button></Link>
            <h1>DONG</h1>
            <Link to="./payment"><button className="button">Pay your share</button></Link>
        </div>
    );
}
  
export default Home;