const express = require('express');
// define app and port variables
const app = express();
const port = process.env.PORT || 4000;
const path = require("path");
const cors = require("cors");
const bodyParser = require('body-parser');

// routes
let indexRoute = require('./routes/index.js');
let postRoute = require('./routes/post.js');
let submitRoute = require('./routes/submit.js');
let userRoute = require('./routes/createUser.js');
let getUserRoute = require('./routes/getUser.js');

//Bane of my existance
app.use(cors());
//explicitly define the public folder with express.static and path
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//define routes
app.use('/api/', indexRoute);
app.use('/api/get-post', postRoute);
app.use('/api/submit', submitRoute);
app.use('/api/create-user', userRoute);
app.use('/api/get-user', getUserRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));