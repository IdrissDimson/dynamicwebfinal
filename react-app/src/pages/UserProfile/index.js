import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserInformation } from "../../components/UserProfileComponent";
import PostSection from '../../components/PostSection';
import AddPost from "../../components/AddPost";

export default function UserProfile({ user }) {
    const collection = '4358592';
    const URL = `https://api.unsplash.com/collections/${collection}/photos/?client_id=cb1f777bccf37e7cff6f910a65e8d166d841da85f108db436cd0695ae01be144`;
    const [postUser, setPostUser] = useState({});
    const [monkeyPic, setMonkeyPic] = useState(null);
    const [post, setPost] = useState({});

    function postAPI(username){
        axios.get(`https://final-dynamic-web.herokuapp.com/post/${username}`)
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
    useEffect(() => {
        const source = axios.CancelToken.source();
        getUser()
        const loadData = async () => {
            try {
              const response = await axios.get(URL, {
                cancelToken: source.token
              });
              setMonkeyPic(response.data);
            } catch (error) {
              if (axios.isCancel(error)) {
                // request cancelled
              } else {
                throw error;
              }
            }
          };
         
        loadData()
        postAPI((postUser[0] && postUser[0].nameVal))
        return () => {
            source.cancel();
        };
    }, [postUser, user.uid, URL])
    
    return (
        <section className="profile-pic">
            <h1>User Profile for {postUser[0] && postUser[0].nameVal}</h1>
            <UserInformation email={user.email ? user.email : "Error!"}/>
            <AddPost postFunction={postFunction} />
            <h2>Your Posts</h2>
            <div className="screech-feed">
                {post[0] && post.map((post, i) => <PostSection key={i} monkey={monkeyPic[i] && monkeyPic[i]} author={post.author} title={post.title} text={post.text}  />)}
            </div>
        </section>
    );
}