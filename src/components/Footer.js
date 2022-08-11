import "../App";
import { Link } from "react-router-dom";
import "../App.css";


const Footer = () => {
    return (
        <div>
            <ul>
                <li><Link to="/"><button className="button">Home Page</button></Link></li>
                <li><Link to="/Creation"><button className="button">Creation</button></Link></li>
                <li><Link to="/Payment"><button className="button">Payment</button></Link></li>
            </ul>
        </div>
    )
}

export default Footer;