import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import '../css/Header.css';

const Header = ({loggedIn, setLoggedIn}) => {
	const history = useHistory()

  	function logOut() {
    	setLoggedIn(false)
    	localStorage.removeItem("message");
    	localStorage.removeItem("token");
    	localStorage.removeItem("username");
    	localStorage.removeItem("success");
    	history.push('/login');
  	}

	return (
    	<header>
      		<h1 id="running-title">Jasolas' List!</h1>
      			<div id="nav-bar">
        			<Link to="/">Home</Link>
        			<Link to="/market">Market</Link>
        			{loggedIn 
					?
						<>
              			<Link to="/profile">Profile</Link>
              			<Link onClick={logOut}>Log Out</Link>
            			</>
            		:
            			<Link to="/login">Log in</Link>
        			}
      			</div>
    	</header>
  	)
}

export default Header;