const express = require('express')
const app = express()
const helmet = require('helmet');
const postRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRoute');
const commentRoute = require('./routes/commentRoute')
require('dotenv').config


//MIDDLEWARE
app.use(express.json())
app.use(express.static('./public'));
app.use(helmet())
//security middleware helmet.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})
const port = process.env.PORT || 3000

//ROUTES
app.use('/groupomania/posts', postRoute)
app.use('/groupomania/users', userRoute)
app.use('/groupomania/comments', commentRoute)

app.listen(port, () => {
    console.log(' server Listening... ');
})