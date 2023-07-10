const express = require("express");
const dotenv = require('dotenv').config;
const config  = require('./src/db/dbconfig')
const jwt = require("jsonwebtoken");
const RegisterRouter = require("./src/routers/registration")
const Login = require("./src/routers/login")
const updateprofile = require("./src/routers/updateprofile")
const userlist=require("./src/routers/userlist")

const app = express();
const port = process.env.PORT || 3000;
app.use((req, res,next) => {
    if (req.method === 'GET') {
        console.log("GET requests are disabled")
    }
    else  {
        next()
    }
})

app.use(express.json())
app.use(RegisterRouter)
app.use(Login)
app.use(updateprofile)
app.use(userlist)
app.listen(port, () => {
    console.log('Server is up on port '+port)
})