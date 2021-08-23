const BASE_URL = 'https://strangers-things.herokuapp.com/api'
const COHORT = '2105-OKU-RM-WEB-PT'

const token = localStorage.getItem('token');

export async function handleRegister(newUser) {
    try { 
        const response = await fetch(`${BASE_URL}/${COHORT}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: `${newUser.username}`,
                    password: `${newUser.password}`
                }
            })
        })
        const result = await response.json()
        if (result.data){
            localStorage.setItem('token', result.data.token);
        }
        localStorage.setItem('message', result.error.message);
    } catch(error) {
        console.error(error)
    }
}


export async function handleLogIn(user){
    try {
        localStorage.setItem('username', user.username);
        const response = await fetch(`${BASE_URL}/${COHORT}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: `${user.username}`,
                    password: `${user.password}`
                }
            })
        })
        .then(response => response.json())
        .then(result => {
            if(result.data){
                localStorage.setItem('token', result.data.token);
                
            }
            localStorage.setItem('message', result.error.message);
        })
    } catch (error) {
        console.error(error);
    }
}

export function handlePosts(setUserPosts) {
    fetch(`${BASE_URL}/${COHORT}/posts`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => response.json())
    .then(result => {
        setUserPosts(result.data.posts)
    })
    .catch(error => {
        console.error(error);
    })
}


export async function handleNewPost(post){
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/${COHORT}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title: `${post.title}`,
                    description: `${post.description}`,
                    price: `${post.price}`,
                    location: `${post.location}`,
                    willDeliver: `${post.willDeliver}`
                }
            })
        })
        .then(response => response.json())
    } catch (error) {
        console.error(error);
    }
}

export function handleDelete(postId) {
    fetch(`${BASE_URL}/${COHORT}/posts/${postId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .catch(error => {
        console.error(error);
    })
}


export function handleMessageSend(id, message) {
    fetch(`${BASE_URL}/${COHORT}/posts/${id}/messages`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            message: {
                content: `${message.content}`
            }
        })
    })
    .then(response => response.json())
    .catch(console.error);
}

export async function handleMessageInbox(setMessages) {
    try {
        const response = await fetch(`${BASE_URL}/${COHORT}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        const result = await response.json()
        setMessages(result.data.messages)
    } catch (error) {
        console.error(error);
    }
}