const express = require('express')
const connectDB=require('../db/dbconfig')
const Registration = require('../models/registration')
const config  = require('../middleware/config.js')
connectDB();
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const auth= require('../middleware/auth')

const router = new express.Router()

router.post('/login', auth ,async (req, res) => {
    const Username = req.body.Username; //didn't change to object or string
    const password = req.body.Password;
    try {
        const login = await Registration.findOne({ Username: Username })
       
        if (login) {
            const isMatch = bcrypt.compareSync(password, login.Password)                    
            if (isMatch) {
             
               res.status(201).send({login})
                
            } else {
                res.status(400).send({ message: "Password is mismatch. Try again" })
            }
        } else {
            res.status(400).send({ message: "Email is mismatch. Try again" })
        }
    } catch (e) {
        res.status(500).send({ message: "Unable to login. Username or Password is mismatch" } +e)
    }

})

module.exports = router