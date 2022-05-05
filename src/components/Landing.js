import React from 'react'
import { useNavigate } from 'react-router-dom'

function Landing() {

  const navigate = useNavigate()
  return (
    <div>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Register</button>
    </div>
  )
}

export default Landing