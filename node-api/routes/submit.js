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

router.get("/test", (req, res) => {
    db.collection("posts")
    .doc("test-doc")
    .set(sampleData)
    .then(function(){res.send(`Test Data submitted`)})
    .catch(function(error){res.send('Error', error)})
})
//Submit Data
router.get("/", (req, res) => {
    let titleVal = req.query.title ? req.query.title : '';
    let textVal =  req.query.text ? req.query.text : '';
    let authorVal = req.query.author ? req.query.author : '';
    
    db.collection("posts")
    .add({
        title: titleVal,
        text: textVal,
        author: authorVal
    })
    .then(ref => res.send(ref))
    .catch(e => res.send(e));
})
module.exports = router;