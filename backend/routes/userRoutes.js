const express = require("express")
const bcrypt = require("bcryptjs")
const User = require("../models/User")

const router = express.Router()

const jwt = require("jsonwebtoken")
const protect = require("../middleware/authMiddleware")

router.post("/register",async (req,res)=>{
    try{
        const { name, email, password } = req.body
        const exitUser = await User.findOne({ email })

        if (exitUser) {
            return res.status(400).json({
                message : "User already exist"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password : hashPassword,
        })
        res.status(201).json(user)
    }catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
})

router.post("/login", async (req,res)=>{
    try {
        const { email, password } = req.body
        const existUser = await User.findOne({ email })
        if (!existUser) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(
            password,
            existUser.password
        )
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }
        const token = jwt.sign(
            {
                id: existUser._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn : "7d",
            }
        )

        res.json({
            token,
            user: {
                id : existUser._id,
                name: existUser.name,
                email: existUser.email
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
})

router.get("/profile",protect,async(req,res)=>{
    res.json({
        message: "protected Route Accesed",
        user: req.user,
    })
})

module.exports = router;