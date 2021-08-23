import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
  	Route,
  	Switch
} from 'react-router-dom';
import {
	Header,
  	Home,
  	LogIn,
  	Register,
  	Market,
  	LogInError,
  	RegisterError,
  	Profile
} from './components/js';
import {
  	handleRegister,
  	handleLogIn,
  	handleMessageInbox
} from './API/index.js'

const App = () => {
	const [loggedIn, setLoggedIn] = useState(null);
  	const [userPosts, setUserPosts] = useState([]);
  	const [postBoard, setPostBoard] = useState(null);

	useEffect(() => {
		{ localStorage.getItem('token') ? setLoggedIn(true) : setLoggedIn(false) };
	}, []);

  	return (
    	<>
      		<div className="app">
        		<Header 
					loggedIn={loggedIn}
          			setLoggedIn={setLoggedIn} 
				/>
        		<Switch>
          			<Route path="/login">
            			<LogIn 
							handleLogIn={handleLogIn}
              				loggedIn={loggedIn}
              				setLoggedIn={setLoggedIn}
            			/>
          			</Route>
          			<Route path="/register">
            			<Register 
							handleRegister={handleRegister}
              				setLoggedIn={setLoggedIn} 
						/>
          			</Route>
          			<Route path="/profile">
            			<Profile 
							handleMessageInbox={handleMessageInbox}
              				userPosts={userPosts}
              				setUserPosts={setUserPosts}
              				postBoard={postBoard}
              				setPostBoard={setPostBoard}
              				loggedIn={loggedIn} 
						/>
          			</Route>
          			<Route exact path="/">
            			<Home 
							loggedIn={loggedIn}
              				setLoggedIn={setLoggedIn} 
						/>
          			</Route>
          			<Route path="/market">
            			<Market 
							loggedIn={loggedIn}
              				userPosts={userPosts}
              				setUserPosts={setUserPosts}
              				userPosts={userPosts}
              				postBoard={postBoard}
              				setPostBoard={setPostBoard} />
          			</Route>
          			<Route path="/loginerror">
            			<LogInError />
          			</Route>
          			<Route path="/registererror">
            			<RegisterError />
          			</Route>
        		</Switch>
      		</div>
    	</>
  	)
}

ReactDOM.render(
	<Router>
		<App />
	</Router>, document.getElementById('app')
)