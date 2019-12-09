const express = require('express');
const router = express.Router();
const firebase = require('firebase/app');
require("firebase/firestore");

//firebase configeration key
let firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "final-project-decad.firebaseapp.com",
    databaseURL: "https://final-project-decad.firebaseio.com",
    projectId: "final-project-decad",
    storageBucket: "final-project-decad.appspot.com",
};
// Initialize Firebase
const firebaseDatabase = firebase.initializeApp(firebaseConfig);
const db = firebaseDatabase.firestore();

let allPosts = [];
db.collection('posts')
    .get()
    .then((Posts) => {
        Posts.forEach((post) => {
            allPosts.push(post.data())
            console.log("All posts:", post.data())
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    })

router.get('/', (req, res) => {
    res.send(allPosts)
})

module.exports = router;