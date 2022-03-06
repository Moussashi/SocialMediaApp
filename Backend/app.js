const express = require('express')
const app = express()
const helmet = require('helmet');
const postRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRoute');
const commentRoute = require('./routes/commentRoute')
const path = require('path')
const cors = require('cors')
require('dotenv').config


//MIDDLEWARE
app.use(express.json())

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(helmet())
//security middleware helmet.

const port = process.env.PORT || 3000

//ROUTES
app.use('/groupomania/posts', postRoute)
app.use('/groupomania/users', userRoute)
app.use('/groupomania/comments', commentRoute)

app.listen(port, () => {
    console.log(' server Listening... ');
})