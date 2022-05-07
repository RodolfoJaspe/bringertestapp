import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import Landing from "./components/Landing";
import Account from "./components/Account";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from './components/Header';
import Footer from './components/Footer';


function App() {

  return (
    <Router>
        <div className="App">
            <Header />
            <main className="app-main-div">
                <h1>BPS Tracking</h1>
                <Routes>
                    <Route exact path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path ="/users/:user_id" element={<Account />} />
                </Routes>
            </main>
            <Footer />
        </div>  
    </Router>

  );
}

export default App;
