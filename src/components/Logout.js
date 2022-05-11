import React from 'react';
import { useNavigate } from "react-router-dom";


function Logout () {
    let navigate = useNavigate();
    const logout = () => {
        window.localStorage.removeItem('token');
        navigate("/")
    }
    return (
        <button 
            onClick={() => logout()}
            className="logout-button"
            >Logout</button>
    )
}

export default Logout