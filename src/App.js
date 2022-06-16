import './App.css';
import Dong from "./Dong.js";
import Payment from "./components/Payment.js";
import Creation from "./components/Creation.js";
import Home from "./components/Home.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/creation" element={<Creation />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
