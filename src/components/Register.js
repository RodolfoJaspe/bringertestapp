import axios from 'axios';
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { currentUrl } from '../utils/backendUrl';


function Register() {

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

    const createUser = user => {
        axios.post(`${currentUrl}/api/users/register/`, user)
            .then(res => {
                console.log(res)
                window.localStorage.setItem('token', res.data.token)
                navigate(`/users/${res.data.newUser.user_id}`)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const formSubmit = e => {
        e.preventDefault();
        createUser(user)
        setUser(initialUser)
    }

  return (
    <div>
        <form onSubmit={formSubmit}>
            <div>
                <h2>Register</h2>
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
                        type="password"
                        onChange={changeHandler}
                        value={user.password}
                        placeholder="enter a password" 
                    />
                </label>
                <button>Submit</button>
            </div>         
        </form> 
        <div>
            <p>already a member?</p>
            <button onClick={() => navigate("/login")}>Login</button>
        </div>
    </div>
    
  )
}

export default Register