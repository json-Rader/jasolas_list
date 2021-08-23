import React from 'react';
import {Link} from 'react-router-dom';
import '../css/LogInError.css';

const LogInError = () => {
    return (
        <div id="log-in-error">
            <h1>Error! Username or Password is incorrect.</h1>
            <Link id="login-link" to="/login">Back to Log In</Link>
        </div>
    )
}

export default LogInError