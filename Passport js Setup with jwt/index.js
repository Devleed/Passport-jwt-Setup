const express = require('express')
const app = express()
const auth = require('./Routes/auth')
const userProfile = require('./Routes/userProfile')
const mongoose = require('mongoose')
// const passport = require('./passport/passport')
const passport = require('passport')
require('./passport/passport')
app.use('/auth',auth)
app.use('/user',passport.authenticate('jwt',{session: false}),userProfile)

mongoose.connect('mongodb://localhost:27017/pjwtusers',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>console.log('Connected'))
    .catch((err)=>console.log(err))

app.get('/',(req,res)=>{
    res.send('Working')
})

app.listen('1000',()=>console.log('Listening'))