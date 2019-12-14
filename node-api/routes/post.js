const express = require('express');
const router = express.Router();
const firebase = require('firebase/app');
require("firebase/firestore");
const db = firebase.firestore();

let posts = [];
router.get('/:postId', (req, res) => {
    let postsArray = [];

    let citiesRef = db.collection('posts');
    let query = citiesRef.where('author', '==', `${req.params.postId}`).get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }  
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                postsArray.push(doc.data());
            });
            res.send(postsArray);
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
})

module.exports = router;