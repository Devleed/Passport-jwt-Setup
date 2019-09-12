const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.json({
        description:'You will see this only if you are logged in'
    })
})

module.exports = router