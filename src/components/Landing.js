import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Landing.css";

function Landing() {

  const navigate = useNavigate()
  return (
    <div className='landing'>
        <button onClick={() => navigate("/login")}>Sign in</button>
        <button onClick={() => navigate("/register")}>Register</button>
    </div>
  )
}

export default Landing