import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import faucet from "../images/faucet.png";

function Header(props) {
    return (
        <header>
            <nav className="nav">
                <Link to='/'><img src={logo} className="nav-logo"></img></Link>
                <ul className="nav-items">
                    <li><Link style={{textDecoration: 'none'}} to="/creation">Contract-Creation</Link></li>
                    <li><Link style={{textDecoration: 'none'}} to="/payment">Payment</Link></li>
                    {/* <img src={faucet} width="30" href="https://faucet.polygon.technology/"></img>
                    <img src={faucet} width="30"></img> */}
                </ul>
            </nav>
        </header>
    )
}

export default Header;