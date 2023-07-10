const yup = require("yup")
const userSchema = yup.object({
    "FirstName":yup.string().required(),
    "LastName":yup.string().required(),
    "Username":yup.string().email().required(),
    "Password":yup.string().min(4).max(8).required(),
    "Address":yup.string().required()
})

module.exports = userSchema;
