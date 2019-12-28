const express = require('express');
const router = express.Router();
const firebase = require('firebase/app');
require("firebase/firestore");

const db = firebase.firestore();

const sampleData = {
    title: 'test',
    text: 'Test Text',
    author: 'James Ayres'
}

router.post("/test", (req, res) => {
    db.collection("posts")
    .doc("test-doc")
    .set(sampleData)
    .then(function(){res.send(`Test Data submitted`)})
    .catch(function(error){res.send('Error', error)})
})
//Submit Data
router.post("/", (req, res) => {
    const newScreech = {
        title: req.body.title ? req.body.title : '',
        text: req.body.text ? req.body.text : '',
        author: req.body.author ? req.body.author : '',
        userId: req.body.userId ? req.body.userId : ''
    };
    // res.json(newScreech);
    db
        .collection("posts")
        .add(newScreech)
        .then(ref => res.send(`${ref.id} successfully submitted`))
        .catch(e => {
            res.status(500).json(e);
            console.error(e);
        });
})
module.exports = router;