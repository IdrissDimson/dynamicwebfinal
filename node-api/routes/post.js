const express = require('express');
const router = express.Router();
const firebase = require('firebase/app');
require("firebase/firestore");
const db = firebase.firestore();

let posts = [];
router.get('/:postId', (req, res) => {
    db.collection('blog-posts')
    .doc(`${req.params.postId}`)
    .get()
    .then((doc) => {
        if (!doc.exists) {
            console.log('No such document!');
        } else {
            console.log('Document data:', doc.data());
            posts.push(doc.data());
        }
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    })
    res.send(posts)
})

module.exports = router;