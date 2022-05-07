import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import bps from "../assets/images/bps.png";
import signin from "../assets/images/signin.png";
import "../styles/Header.css";

function Header() {
    const navigate = useNavigate()
  return (
        <header className='app-header'>
            <div className='header-left'>
                <img 
                    onClick={() => navigate("/")}
                    src={bps} 
                    alt="bsp logo" />
                <div className='nav-div'>
                    <Link to="">Start Shipping</Link>
                    <Link to="">Tracking</Link>
                    <Link to="">API</Link>
                    <Link to="">Contact Us</Link>  
                </div>
            </div>
            <div className='header-right'>
                <div>
                    Language
                </div>
                <div className='signin' onClick={() => navigate("/login")}>
                    <img src={signin} alt="signin" />
                    <h4>Sign in</h4>
                </div>
            </div>
        </header>
  )
}

export default Header