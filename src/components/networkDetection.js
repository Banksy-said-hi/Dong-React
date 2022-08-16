import "../App.css";
import { useEffect, useState } from "react";

const NetworkDetection = () => {

    const[networkMessage, setNetworkMessage] = useState("Let's see which network you are connected to!");

    const NetworkFinder = () => {
        if (window.ethereum.networkVersion === 80001) {
            setNetworkMessage("Good to go! You are connected to the Polygon Mumbai");
        } else {
            setNetworkMessage("Please connect to Polygon Mumbai network");
        }
    }

    useEffect(() => {
        NetworkFinder();
    })
    


    return (
        <div className="networkDetection">
            <header>Hi this is header</header>
            <p>{networkMessage}</p>
            {/* <button onClick={networkGetter}>Network Getter</button> */}
            <footer>Bye Bye there</footer>
        </div>
    )
}

export default NetworkDetection;