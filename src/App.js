import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Landing from "./components/Landing";
import Account from "./components/Account";
import Login from "./components/Login";
import Register from "./components/Register";


function App() {
  return (
    <Router>
        <div className="App">
            <header className="App-header">
                <h1>BPS</h1>
                <Routes>
                    <Route exact path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path ="/users/:user_id" element={<Account />} />
                </Routes>
            </header>
        </div>  
    </Router>

  );
}

export default App;
