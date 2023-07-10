const express = require('express')
const connectDB=require('../db/dbconfig')
const Registration = require('../models/registration')
const config  = require('../middleware/config.js')
connectDB();
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const auth= require('../middleware/auth')

const router = new express.Router()

router.post('/updateprofile', auth, async (req, res) => {
    // console.log(req.body) 
    // console.log(req.header('x-access-token'))
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Address = req.body.Address;
    const Username = req.body.Username;
    const NewUserName = req.body.NewUserName;
    const password = req.body.Password;
       
    try {        
        const updateDetails = await Registration.findOneAndUpdate({ Username: Username },
            { "$set": { "FirstName": FirstName, "LastName": LastName, "Address": Address, "Username": NewUserName } })
        if (updateDetails) {
            res.status(201).send({message:"Details updated Successfully"})
        } else {
             res.status(500).send("Unable to update "+{data:updateDetails})
        }
    } catch (e) {
         res.status(500).send(e)
     }
    
})
module.exports=router