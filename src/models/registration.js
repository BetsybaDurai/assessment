const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken')
const config=require('../middleware/config')

const registrationSchema=new mongoose.Schema({
    FirstName: {
        type: String, // Booleans, dates ,array, binary data, object IDs and more
        required: true,
        trim:true
    },
    LastName: {
        type: String, // Booleans, dates ,array, binary data, object IDs and more
        required: true,
        trim:true
    },
    Username: {
        type: String,
        required: true,
        trim: true,
        lowercase:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    Password: {
        type: String,
        required: true,
        minLength: 7, //not working for validation in postman
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password should not be a string of password')
            }
        }
    },
   
    tokens: [{
        token: {
            type: String,
            required:true
        }
    }],
     Address: {
        type: String,
        required: true,
        trim: true        
    }
})

registrationSchema.pre('save', async function (next) {
    const register = this
    console.log('just before saving')
    next()
})

registrationSchema.methods.generateAuthToken = async function () {
    const user = this
    var token = jwt.sign({ Username: user.Username }, config.jwtsecret, { expiresIn: '24h' })
    
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
    
}
const Registration = mongoose.model('Registration', registrationSchema)

module.exports = Registration;

// const registrationSchema = yup.object({
//     FirstName: yup.string().required().trim(),
//     LastName: yup.string().required().trim(),
//     Email: yup.string().required().trim().lowercase().email(),
//     Password: yup.string().required().min(7).trim().lowercase().includes(),
//     AddressLine1: yup.string().required(),
//     City: yup.string().required().trim(),
//     State: yup.string().required().trim(),
//     Zip: yup.number().required().trim()
// });