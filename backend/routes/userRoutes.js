const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    const existUser =
      await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const hashPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        name,
        email,
        password:
          hashPassword,
        role:
          role ||
          "customer",
      });

    res.status(201).json({
      message:
        "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const existUser =
      await User.findOne({
        email,
      });

    if (!existUser) {
      return res.status(400).json({
        message:
          "User not found",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        existUser.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: existUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      user: {
        id:
          existUser._id,
        name:
          existUser.name,
        email:
          existUser.email,
        role:
          existUser.role,
        isAdmin:
          existUser.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
});

router.get(
  "/profile",
  protect,
  async (req, res) => {
    res.json({
      message:
        "Protected Route Accessed",
      user: req.user,
    });
  }
);

router.get(
  "/",
  protect,
  isAdmin,
  async (req, res) => {
    try {
      const users =
        await User.find().select(
          "-password"
        );

      res.json(users);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

module.exports = router;