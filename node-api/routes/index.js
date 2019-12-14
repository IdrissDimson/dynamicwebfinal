const express = require('express');
const router = express.Router();
const firebase = require('firebase/app');
require("firebase/firestore");

//firebase configeration key
let firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "dynamic-final.firebaseapp.com",
    databaseURL: "https://dynamic-final.firebaseio.com",
    projectId: "dynamic-final",
    storageBucket: "dynamic-final.appspot.com",
    messagingSenderId: "380304267255",
    appId: "1:380304267255:web:4d40ff39c670071d5b80f2"
};
// Initialize Firebase
const firebaseDatabase = firebase.initializeApp(firebaseConfig);
const db = firebaseDatabase.firestore();

let allPosts = [];
db.collection('posts')
    // .get()
    // .then((blogPosts) => {
    //     blogPosts.forEach((post) => {
    //         allPosts.push(post.data())
    //         console.log("All posts:", post.data())
    //     });
    // })
    // .catch((err) => {
    //     console.log('Error getting documents', err);
    // })

    .get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        allPosts.push(doc.data())
        console.log("All posts:", doc.data())
      });
  });

router.get('/', (req, res) => {
    res.send(allPosts)
})

module.exports = router;