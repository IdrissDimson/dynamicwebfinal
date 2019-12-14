import React, { useEffect, useState } from "react";
import axios from 'axios';
import PostSection from '../../components/PostSection';
import AddPost from "../../components/AddPost";

export default function Feed({ user }) {
    const [post, setPost] = useState({});
    const [postUser, setPostUser] = useState({});
    function postAPI(){
        axios.get('https://final-dynamic-web.herokuapp.com/')
            .then(function(response) {
                console.log('response', response.data);
                setPost(response.data);
                return response;
            })
            .catch(function(error){
                console.log("error", error);
                return error;
            })
    }
    function getUser(userId) {
        axios.get(`https://final-dynamic-web.herokuapp.com/get-user/${userId}`)
            .then(function(response) {
                console.log('response', response.data);
                setPostUser(response.data);
                return response;
            })
            .catch(function(error){
                console.log("error", error);
                return error;
            })
    }
    // console.log(post[0]);
    useEffect(() => {
        postAPI()
        getUser(user.uid)
    }, [user.uid])

    function postFunction(e){
        let title = e.currentTarget.postTitle.value;
        let text = e.currentTarget.postText.value;
        axios.get(`https://final-dynamic-web.herokuapp.com/submit?title=${title}&text=${text}&author=${postUser[0].nameVal}`)
            .then(function(response){
                console.log("it's working my g", response);
                return response;
            })
            .catch(function(error) {
                console.log("error", error);
                return error;
            })
    }
    console.log(post[0] && post[0].author);
    if (user.uid !== undefined) {
        return (
            <section>
                <h1>Welcome Back to Screech, {postUser[0] && postUser[0].nameVal} </h1>
                <AddPost postFunction={postFunction} />
                <div className="screech-feed">
                    {post[0] && post.map((post, i) => <PostSection key={i} author={post.author} title={post.title} text={post.text}  />)}
                </div>
            </section>
        );
    } else {
        return(
            <section>
                <h1>Welcome to Screech</h1>
                <div className="screech-feed">
                    {post[0] && post.map((post, i) => <PostSection key={i} title={post.title} text={post.text} author={post.author}/>)}
                </div>
            </section>
        );
    }
}