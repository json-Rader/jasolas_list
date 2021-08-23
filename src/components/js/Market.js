import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {
    handlePosts,
    handleDelete,
    handleNewPost,
    handleMessageSend,
} from "../../API/index.js";
import '../css/Market.css';

const NewPost = ({setNewUserPost}) => {
    const [newPost, setNewPost] = useState({title: '', description: '', price: '', location: '', willDeliver: false});

    function handleChange(event, postKey) {
        const newState = {...newPost};
        {postKey === 'willDeliver' 
            ? newState[postKey] = event.target.checked 
                ? true 
                : false 
            : newState[postKey] = event.target.value};
        setNewPost(newState);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        await handleNewPost(newPost);
        setNewUserPost(false);
    }

    return (
        <div id="new-post">
            <form>
                <button onClick={() => setNewUserPost(false)}>CLOSE</button>
                <div>
                    <input 
                        name='title'
                        onChange= {(event) => handleChange(event, 'title')}
                        placeholder='Title'
                        required
                    />
                    <input 
                        name='description'
                        onChange= {(event) => handleChange(event, 'description')}
                        placeholder='Description'
                        multiline
                        required
                    />
                    <input 
                        name='price'
                        onChange= {(event) => handleChange(event, 'price')}
                        placeholder='Price'
                        required
                    />
                    <input 
                        name='location'
                        onChange= {(event) => handleChange(event, 'location')}
                        placeholder='Location' 
                    />
                    <div>
                        <input 
                            id="checkbox" type="checkbox" 
                            name='willDeliver'
                            onChange={(event) => handleChange(event, 'willDeliver')}
                        />Delivery?
                    </div>
                    <button onClick={handleSubmit}>List in Market</button>
                </div>
            </form>
        </div>
    )
}

const PostBoard = ({postBoard, setPostBoard, loggedIn}) => {
    const [messageContent, setMessageContent] = useState({content: ''});
    const postId = postBoard._id;
    const isAuthor = postBoard.isAuthor;

    function handleChange(event, messageKey) {
        const newState = {...messageContent};
        newState[messageKey] = event.target.value;
        setMessageContent(newState);
    }

    function onSubmit(event) {
        event.preventDefault();
        handleMessageSend(postId, messageContent);
        document.getElementById('messenger').value = '';
    }

    return (
        <div id="featured-post">
            <div className="post-inquiry">
                <button onClick={() => setPostBoard(false)}>CLOSE</button>
                <h1>{postBoard.title}</h1>
                <p>{postBoard.description}</p>
                <h4>Price: {postBoard.price}</h4>
                <h3>Seller: {postBoard.author.username}</h3>
                <h4>Location: {postBoard.location}</h4>
                <h4>Delivery? {postBoard.willDeliver 
                    ? `Yes` 
                    : `No`}
                </h4>
                {loggedIn 
                    ? isAuthor 
                        ? 
                            <div className="post-messages">
                                <h3>MESSAGES</h3>
                            </div>
                        :
                            <>
                                <h3>Message {postBoard.author.username} about this sale</h3>
                                <input 
                                    id="messenger"
                                    name="content"
                                    placeholder="Message"
                                    multiline
                                    onChange={(event) => handleChange(event, 'content')}
                                />
                                <button onClick={onSubmit}>Send Message</button>
                            </>
                    : null
                }
                {postBoard.messages 
                    ?
                        <>
                            {postBoard.messages.map((message, index) => {
                                return (
                                    <div key={index} className="message">
                                        <p>{message.content}</p>
                                        <h5>From User: {message.fromUser.username}</h5>
                                    </div>
                                )
                            })}
                        </>
                    :
                        ''
                }
            </div>
        </div>
    )
}

const UserPost = ({post, title, description, price, username, location, setPostBoard, isAuthor, postId, deleteListing}) => {

    return (
        <div id="user-post">
            <h2>{title}</h2>
            <p>{description}</p>
            <h4>Price: {price}</h4>
            <h3>Seller: {username}</h3>
            <h4>Location: {location}</h4>
            <button
                onClick={(event) => {
                    event.preventDefault();
                    setPostBoard(post);
                }}>View More
            </button>            
            {isAuthor 
                ?
                    <>
                        <button
                            onClick={(event) => {
                                deleteListing(event, postId);
                            }}>Delete Listing
                        </button> 
                    </>
                :
                    ''
            }
        </div>
    )
}

const SearchPosts = ({search, setSearch}) => {
    return (
        <input 
            variant="filled"
            placeholder="Search Market..."
            type='text'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
        />
    )
}

const Market = ({loggedIn, userPosts, setUserPosts, postBoard, setPostBoard}) => {
    const [newUserPost, setNewUserPost] = useState(false);
    const [search, setSearch] = useState('')

    const filteredPosts = search.length === 0 
        ? userPosts 
        : userPosts.filter(post => post.description.toLowerCase().includes(search.toLowerCase()) || 
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.author.username.toLowerCase().includes(search.toLowerCase()) || 
          post.location.toLowerCase().includes(search.toLowerCase()) ||
          post.price.includes(search)
        );

  
    useEffect(() => {
        handlePosts(setUserPosts)
    },[postBoard, newUserPost, deleteListing])
    
    async function deleteListing(event, id) {
        event.preventDefault();
        await handleDelete(id);
        handlePosts(setUserPosts);
    }

    return (
        <div id="posts-page">
            <div className="posts-header">
                <h1>Market</h1>
                <SearchPosts 
                    userPosts={userPosts}
                    setUserPosts={setUserPosts}
                    search={search}
                    setSearch={setSearch}
                />
                {loggedIn && <button onClick={(event) => {
                                     event.preventDefault();
                                     setNewUserPost(true)}}>
                                     Make Listing
                             </button>
                }
            </div>
            {newUserPost && <NewPost setNewUserPost={setNewUserPost}/>}
            <div className="post-list">
                {filteredPosts.map((post, index) => 
                    <UserPost 
                        post={post}
                        title={post.title}
                        description={post.description}
                        price={post.price}
                        username={post.author.username}
                        locaion={post.location}
                        setPostBoard={setPostBoard}
                        key={index}
                        isAuthor={post.isAuthor}
                        postId={post._id}
                        deleteListing={deleteListing}
                    />)}   
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
    )
}

export default Market;