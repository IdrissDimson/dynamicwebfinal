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
    messagingSenderId: "199449178140",
    appId: "1:199449178140:web:b3b29f0a51408e45f6efd9"
};
// Initialize Firebase
const firebaseDatabase = firebase.initializeApp(firebaseConfig);
const db = firebaseDatabase.firestore();

let postsArray = [];

let postsRef = db.collection('posts');
let allPosts = postsRef.onSnapshot(snapshot => {
    snapshot.forEach(doc => {
        postsArray.push(doc.data());
        console.log(doc.data());
    });
  }, err => {
    console.log('Error getting documents', err);
  });


router.get('/', (req, res) => {
    res.send(postsArray)
})

module.exports = router;