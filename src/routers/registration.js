const express = require('express')
const connectDB=require('../db/dbconfig')
const Registration = require('../models/registration')
const config  = require('../middleware/config.js')
connectDB();
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth')

const validation = require('../middleware/validatemiddleware')
const userSchema=require('../validation/validation')


const router = new express.Router()
router.post('/registration', validation(userSchema),async (req, res) => {

    const salt = await bcrypt.genSalt(8);
    req.body.Password = await bcrypt.hashSync(req.body.Password, salt)
    const registration = new Registration(req.body);

    try {
        await registration.save()
        const token = await registration.generateAuthToken()
        
       res.status(200).send({registration,token})
    } catch (e) {
        res.status(400).send(e)
    }
   
})

module.exports = router