import React from 'react';
import {Link} from 'react-router-dom';
import '../css/RegisterError.css';

const RegisterError = () => {
    return (
        <div id="register-error">
            <h1>Error! Please enter the correct password.</h1>
            <Link id="register-link" to="/register">Back to Register</Link>
        </div>
    )
}

export default RegisterError
