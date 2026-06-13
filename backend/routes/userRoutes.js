const express = require("express")
const bcrypt = require("bcryptjs")
const User = require("../models/User")

const router = express.Router()

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
module.exports = router;