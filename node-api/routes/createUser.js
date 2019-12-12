const express = require('express');
const router = express.Router();
const firebase = require('firebase/app');
require("firebase/firestore");

const db = firebase.firestore();

const sampleData = {
    name: 'Idriss Dimson',
    userId: 'I1owJM5F4zOF47APlPbkUr9KQeq2'
};

//Submit Data
router.get("/", (req, res) => {
    let nameVal = req.query.name ? req.query.name : '';
    let userIdVal = req.query.userId ? req.query.userId : '';
    
    db.collection("users").doc(userIdVal)
    .set({
        nameVal: nameVal,
    })
    .then(ref => res.send(ref))
    .catch(e => res.send(e));
})

module.exports = router;