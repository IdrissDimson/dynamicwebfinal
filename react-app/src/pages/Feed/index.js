import React, { useEffect, useState } from "react";
import axios from 'axios';
import PostSection from '../../components/PostSection';
import AddPost from "../../components/AddPost";

export default function Feed({ user }) {
    const collection = '4358592';
    // const URL = `https://api.unsplash.com/collections/${collection}/photos/?client_id=cb1f777bccf37e7cff6f910a65e8d166d841da85f108db436cd0695ae01be144`;
    const [post, setPost] = useState({});
    const [monkeyPic, setMonkeyPic] = useState(null);
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

    function queryPicAPI(queryPic) {
        axios.get(`https://api.unsplash.com/collections/${queryPic}/photos/?client_id=cb1f777bccf37e7cff6f910a65e8d166d841da85f108db436cd0695ae01be144`)
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
        // const source = axios.CancelToken.source();
        postAPI()
        // const loadData = async () => {
        //     try {
        //       const response = await axios.get(URL, {
        //         cancelToken: source.token
        //       });
        //       setMonkeyPic(response.data);
        //     } catch (error) {
        //       if (axios.isCancel(error)) {
        //         // request cancelled
        //       } else {
        //         throw error;
        //       }
        //     }
        //   };
         
        // loadData()
        queryPicAPI(collection)
        getUser(user.uid)
        // return () => {
        //     source.cancel();
        // };
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
    // console.log(monkeyPic[0] && monkeyPic[0].urls.full);
    if (user.uid !== undefined) {
        return (
            <section>
                <h1>Welcome Back to Screech, {postUser[0] && postUser[0].nameVal} </h1>
                <AddPost postFunction={postFunction} />
                <div className="screech-feed">
                    {}
                    {post[0] && post.map((post, i) => <PostSection monkey={monkeyPic[i] && monkeyPic[i]} key={i} author={post.author} title={post.title} text={post.text}  />)}
                </div>
            </section>
        );
    } else {
        return(
            <section>
                <h1>Welcome to Screech</h1>
                <div className="screech-feed">
                    {post[0] && post.map((post, i) => <PostSection key={i} monkey={monkeyPic[i] && monkeyPic[i]} title={post.title} text={post.text} author={post.author}/>)}
                </div>
            </section>
        );
    }
}