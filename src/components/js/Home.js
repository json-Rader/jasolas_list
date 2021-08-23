import React from 'react';
import '../css/Home.css';

const Home = ({loggedIn}) => {
     
    return (
        <div id="home-page">
            <h1>Jasolas' List!</h1>
            {loggedIn 
            ? 
                <div>
                    <h3>Logged in as {localStorage.getItem("username")}</h3> 
                </div>
            :
                <div>
                    <h3>Log in or Register to buy and sell today!</h3>
                </div>
            }
        </div>
    )
}

export default Home;