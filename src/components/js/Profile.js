import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import PostBoard from "./Market";
import '../css/Profile.css';

const Profile = ({handleMessageInbox, postBoard, setPostBoard, loggedIn}) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        handleMessageInbox(setMessages)
    },[])

    const sentMessages = [];
    const inbox = [];
    
    messages.map((message)=>{
        if (message.fromUser.username === `${localStorage.getItem("username")}`) {
            sentMessages.push(message)
        } else {
            inbox.push(message)
        }
    })

    return (
        <>
            <h1 id="greeting">Welcome {localStorage.getItem("username")}</h1>
            <div id = "profile">
                <div>
                    <h3 className="inbox">Inbox</h3>  
                    <div>
                        {inbox.map((messages, index) => {
                            return (
                                <div className="message" key={index}>
                                    <h2>From: {messages.fromUser.username}</h2>
                                    <p>{messages.content}</p>
                                    <Link onClick={(event)=>linkToPost(event, messages.post._id)}><h4>INQUIRIES: {messages.post.title}</h4></Link>
                                </div>
                            )})
                        }
                    </div>
                </div>
                <div className="sent">
                    <h3>Sent</h3>
                    <div>
                        {sentMessages.map((messages, index) => {
                            return (
                                <div className="message" key={index}>
                                    <h2>From: {messages.fromUser.username}</h2>
                                    <p>{messages.content}</p>
                                    <Link><h4>INTERESTED IN: {messages.post.title}</h4></Link>
                                </div>
                            )})
                        }
                    </div>
                </div>
                {!postBoard
                    ?
                        <>
                        </>
                    : <PostBoard 
                        postBoard={postBoard}
                        setPostBoard={setPostBoard}
                        loggedIn={loggedIn}
                    />
                } 
            </div> 
         </>   
    )
}

export default Profile