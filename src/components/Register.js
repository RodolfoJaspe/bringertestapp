import axios from 'axios';
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

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
        axios.post("https://bringertestapp.herokuapp.com/api/users/register/", user)
            .then(res => {
                console.log(res)
                localStorage.setItem('token', res.data.token)
                navigate("/account")
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
                    type="text"
                    onChange={changeHandler}
                    value={user.password}
                    placeholder="enter a password" 
                />
            </label>
            <button>Submit</button>
        </div>         
    </form>
  )
}

export default Register