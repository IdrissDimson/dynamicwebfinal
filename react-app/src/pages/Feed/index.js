import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import PostSection from '../../components/PostSection';
import AddPost from "../../components/AddPost";

export default function Feed({ user }) {
    const collection = '4358592';
    const [post, setPost] = useState({});
    const [monkeyPic, setMonkeyPic] = useState(null);
    const [postUser, setPostUser] = useState({});

    let history = useHistory(); 
    
    function postAPI(){
        axios.get('/api')
            .then((response) => {
                console.log('response', response.data);
                setPost(response.data);
            })
            .catch((error) => console.log("error", error))
    }
    function getUser() {
        axios.get(`/api/get-user/${user.uid}`)
            .then((response) => {
                console.log('response', response.data);
                setPostUser(response.data);
            })
            .catch((error) => console.log("error", error))
    }

    function queryPicAPI(queryPic) {
        axios.get(`https://api.unsplash.com/collections/${queryPic}/photos/?client_id=cb1f777bccf37e7cff6f910a65e8d166d841da85f108db436cd0695ae01be144`,{
            headers: {"Access-Control-Allow-Origin": "*"}
        })
        .then(function(response){
            console.log('response', response.data);
            setMonkeyPic(response.data);
            return response;
        })
        .catch(function(error){
            console.log('error', error);
            return error;
        })
    }
    // console.log(post[0]);
    useEffect(() => {
        getUser()
        postAPI()
        queryPicAPI(collection)
    }, [])

    function postFunction(e){
        e.preventDefault();

        let titleVal = e.currentTarget.postTitle.value;
        let textVal = e.currentTarget.postText.value;
        axios.post(`/api/submit`, {
                title: titleVal,
                text: textVal,
                author: (postUser[0] && postUser[0].nameVal),
                userId: user.uid
            })
            .then((response) => {
                console.log("it's working my g", response);
                history.push("/");
            })
            .catch((error) => console.log("error", error))
    }
    
    if (user.uid !== undefined) {
        return (
            <section>
                <h1>Welcome Back to Screech, {postUser[0] && postUser[0].nameVal} </h1>
                <AddPost postFunction={postFunction} />
                <div className="screech-feed">
                    {post[0] && post.map((post, i) => <PostSection key={i} monkey={monkeyPic[i] && monkeyPic[i]} author={post.author} title={post.title} text={post.text}  />)}
                </div>
            </section>
        );
    } else {
        return(
            <section>
                <h1>Welcome to Screech</h1>
                <div className="screech-feed">
                    {post[0] && post.map((post, i) => <PostSection key={i} monkey={monkeyPic[i] && monkeyPic[i]} author={post.author} title={post.title} text={post.text}  />)}
                </div>
            </section>
        );
    }
}