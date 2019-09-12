const express = require('express')
const User = require('../Models/user')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const router = express.Router()
const allUsers = []

router.use(express.json())

router.post('/register',async (req,res)=>{
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try {
        const saved = await newUser.save()
        res.send(saved)
    } catch (error) {
        throw error
    }
})

router.post('/login',(req,res)=>{
    passport.authenticate('local',{session:false},(err,user,info)=>{
        if(err || !user) return res.send('Something went wrong')
        req.login(user,{session:false},(err)=>{
            if(err) return res.send(err)
            const token = jwt.sign({user},'SecretData')
            return res.json({user,token})
        })
    })(req,res)
})


module.exports = router;

