const validation = (Schema) => async (req, res, next) => {
    const body = req.body
    try {
        await Schema.validate(body)
        next()
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports=validation