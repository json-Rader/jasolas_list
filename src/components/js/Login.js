import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import '../css/LogIn.css';

const LogIn = ({ handleLogIn, setLoggedIn }) => {
    const [user, setUser] = useState({username: '', password: ''});

    function handleInput(event) {
        const userKey = event.target.attributes['name'].value;
        const newState = {...user};
        newState[userKey] = event.target.value;
        setUser(newState);
    }

    const history = useHistory() 

    async function handleSubmit(event) { 
        event.preventDefault();
        await handleLogIn(user);
        if (localStorage.getItem('token')) {
            setLoggedIn(true);
            localStorage.setItem('username', user.username);
            history.push('/');
        } else {
            history.push('/loginerror') 
        }
    }
    
    return (
        <div id="login-page">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange= {handleInput}
                        required
                    />
                </div>
                <div>
                    <input
                        type= "password"
                        name="password"
                        placeholder="Password"
                        onChange= {handleInput} 
                        required
                    />
                </div>
                <button className= "login-button">Log In</button>
            </form>
            <Link id="register-link" to="/register">Don't have an account? Register now to Buy and Sell!</Link>
        </div>
    )
}

export default LogIn;