import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import '../css/Register.css';

const Register = ({handleRegister, setLoggedIn}) => {
    const [newUser, setNewUser] = useState({username: '', password: ''});
    const [confirmPassword, setConfirmPassword] = useState({username: '', password: ''})

    const history = useHistory()

    function handleInput(event) {
        const userKey = event.target.attributes['name'].value;
        const newState = {...newUser};
        newState[userKey] = event.target.value;
        setNewUser(newState);
    }

    function handleConfirm(event) {
        const confirmPasswordKey = event.target.attributes['name'].value;
        const newState = {...confirmPassword};
        newState[confirmPasswordKey] = event.target.value;
        setConfirmPassword(newState);
    };

    async function handleSubmit(event) {
        event.preventDefault()
        if (newUser.password === confirmPassword.password) {
            await handleRegister(newUser);
            let storeToken = localStorage.getItem('token');
            if(storeToken) {
                setLoggedIn(true);
                localStorage.setItem('username', newUser.username);
                history.push('/');
            } 
        } else {
            history.push('/registererror');
        }
    }

    return (
        <div id="register-page">
            <h1>Register Here to Buy and Sell Today!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={newUser.username}
                        onChange= {handleInput}
                        required
                    />
                </div>
                <div>
                    <input
                        type= "password"
                        name="password"
                        placeholder="Password"
                        value={newUser.password}
                        onChange={handleInput} 
                        required
                    />
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Confirm Password"
                        value={confirmPassword.password}
                        onChange={handleConfirm} 
                        required
                    />
                </div>
                <button>Register</button>
            </form>
        </div>
    )
}

export default Register
