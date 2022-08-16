import './App.css';
import Payment from "./components/Payment.js";
import Creation from "./components/Creation.js";
import Home from "./components/Home.js";
import { Switch, BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";

// TODO:

// (1) At the Home Page, design a segment where shows the network user is connected to 
// plus the network they have to be connected to afterwards

// Once the project is live on a server, change value of the QRCode JSX to 
// the payment page link including contract address 

// Make the HomePage and PaymentPage button accessible at the top of all pages,
// Create a template header

// The data should be refreshed automatically at the payment page to make sure it is updated

// Provide a table to show name of the paid people

// URL of a payment page should include the contract address after either the contract address is submitted
// or the QRCode is scanned 


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/creation" element={<Creation />} />
            <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
