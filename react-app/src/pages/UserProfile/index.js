import React, { useEffect, useState } from "react";
import axios from "axios";
// import { UserInformation } from "../../components/UserProfileComponent";
import PostSection from '../../components/PostSection';
import AddPost from "../../components/AddPost";

export default function UserProfile({ user }) {
    const collection = '4358592';
    const [postUser, setPostUser] = useState({});
    const [post, setPost] = useState({});
    const [monkeyPic, setMonkeyPic] = useState(null);

    function queryPicAPI(queryPic) {
        axios.get(`https://api.unsplash.com/collections/${queryPic}/photos/?client_id=cb1f777bccf37e7cff6f910a65e8d166d841da85f108db436cd0695ae01be144`)
        .then((response) => {
            console.log('response', response.data);
            setMonkeyPic(response.data);
        })
        .catch((error) => console.log('error', error))
    }
    function getUserPosts() {
        axios.get(`https://final-dynamic-web.herokuapp.com/api/get-post/${user.uid}`)
            .then((response) => {
                console.log('response', response.data);
                setPost(response.data);
            })
            .catch((error) => console.log("error", error))
    }
    function getUser() {
        axios.get(`https://final-dynamic-web.herokuapp.com/api/get-user/${user.uid}`)
            .then((response) => {
                console.log('response', response.data);
                setPostUser(response.data);
            })
            .catch((error) => console.log("error", error))
    }
    function userPostFunction(e){
        e.preventDefault();

        let titleVal = e.currentTarget.postTitle.value;
        let textVal = e.currentTarget.postText.value;
        axios.post(`https://final-dynamic-web.herokuapp.com/api/submit`, {
                title: titleVal,
                text: textVal,
                author: (postUser[0] && postUser[0].nameVal),
                userId: user.uid
            })
            .then((response) => {
                console.log("it's working my g", response);
            })
            .catch((error) => console.log("error", error))
    }
    useEffect(() => {
        getUserPosts()
        getUser()
        queryPicAPI(collection)
    }, [])
    return (
        <section className="profile-pic">
            <h1>User Profile for {postUser[0] && postUser[0].nameVal}</h1>
            {/* <UserInformation email={user.email ? user.email : "Error!"}/> */}
            <AddPost postFunction={userPostFunction} />
            <h2>Your Posts</h2>
            <div className="screech-feed">
                {post[0] && post.map((post, i) => <PostSection key={i} monkey={monkeyPic[i] && monkeyPic[i]} author={post.author} title={post.title} text={post.text}  />)}
            </div>
        </section>
    );
}