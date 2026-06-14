const jwt = require("jsonwebtoken")
const User = require("../models/User")

const protect = async (req, res, next)=>{
    try {
        const token = req.headers.authorization
        if (!token) {
            return res.status(401).json({
                message: "No token provided",
            })
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.user = await User.findById(decoded.id).select("-password")
        next()
    } catch (error) {
        res.status(401).json({
            message: "Invalid Token"
        })
    }
}

module.exports = protect;