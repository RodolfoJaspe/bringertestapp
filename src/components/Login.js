import axios from 'axios';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { currentUrl } from '../utils/backendUrl';


function Login() {

    const navigate = useNavigate()

    const initialUser = {
        username: "",
        password: ""
    }

    const [user, setUser] = useState(initialUser)

    const changeHandler = e => {
        e.persist();
        setUser({
          ...user,
          [e.target.name]: e.target.value,
        });
    }

    const loginUser = user => {
        axios.post(`${currentUrl}/api/users/login/`, user)
            .then(res => {
                console.log(res)
                window.localStorage.setItem('token', res.data.token)
                navigate(`/users/${res.data.user.user_id}`)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const formSubmit = e => {
        e.preventDefault();
        loginUser(user)
    }

  return (
    <div>
        <form onSubmit={formSubmit}>
            <div>
                <h2>Login</h2>
                <label htmlFor="username">Username
                    <input
                        name="username"
                        id="username"
                        type="text"
                        onChange={changeHandler}
                        value={user.username}
                        placeholder="enter a username" 
                    />
                </label>
                <label htmlFor="password">Password
                    <input
                        name="password"
                        id="password"
                        type="text"
                        onChange={changeHandler}
                        value={user.password}
                        placeholder="enter a password" 
                    />
                </label>
                <button>Submit</button>
            </div>         
        </form>
        <div>
            <p>not a member?</p>
            <button onClick={() => navigate("/register")}>Register</button>
        </div>
    </div>
  )
}

export default Login