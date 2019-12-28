const express = require('express');
const router = express.Router();
const firebase = require('firebase/app');
require("firebase/firestore");
const db = firebase.firestore();

let posts = [];
router.get('/:userId', (req, res) => {
    db
    .collection('users')
    .doc(`${req.params.userId}`)
    .get()
    .then((doc) => {
        if (!doc.exists) {
            return console.log('No such document!');
        } else {
            posts = [];
            posts.push(doc.data());
            console.log('Document data:', doc.data());
        }
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    })
    res.send(posts)
})

module.exports = router;