const express = require('express')
const connectDB=require('../db/dbconfig')
const Registration = require('../models/registration')
const config  = require('../middleware/config.js')
connectDB();
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const auth= require('../middleware/auth')

const router = new express.Router()

router.post('/userlist', auth, async (req, res) => {
    // console.log(req.body) 
    // console.log(req.header('x-access-token'))
    const Username = req.body.email;
   
    try {        
        const user = await Registration.findOne({ Username: Username })

        if (user) {
            res.status(201).send({user})
        } else {
            res.status(400).send({ message: "Details not found" })
        }
       
    } catch (e) {
         res.status(500).send(e)
     }
    
})
module.exports=router