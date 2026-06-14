const jwt = require("jsonwebtoken")

const protect = async (req, res, next)=>{
    try {
        const token = req.headers.authorization
        if (!token) {
            return res.status(401).json({
                message: "No token provided",
            })
        }
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.user = decode
        next()
    } catch (error) {
        res.status(401).json({
            message: "Invalid Token"
        })
    }
}

module.exports = protect;