const express = require('express');
const path = require("path");

// define app and port variables
const app = express();
const port = process.env.PORT || 4000;

// routes
const indexRoute = require('./routes/index.js');
const postRoute = require('./routes/post.js');
const submitRoute = require('./routes/submit.js');

//explicitly define the public folder with express.static and path
app.use(express.static(path.join(__dirname, "public")))
//define routes
app.use('/', indexRoute)
app.use('/post', postRoute)
app.use('/submit', submitRoute)

//create form
app.use('/submit-form', (req, res) =>
    res.sendFile("/public/form.html", {root: __dirname})
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))