
const express = require("express");
const {UserModel} = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRoute = express.Router();

//1.Route to create an account
userRoute.post("/signup", async (req, res) => {
  const { username,email,password} = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).json({ msg: "Email already exists" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        const newUser = new UserModel({username,email,password:hash});
        await newUser.save();
        res.status(200).json({ msg: "New user has been registered" });
      });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// 2.Route for Login
userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userId: user._id, username: user.username },
            "masai"
          );
          res.status(200).json({ msg: "Login successful !!", token: token });
        } else {
          res.status(400).json({ msg: "Password Mismatch !!" });
        }
      });
    } else {
      res.status(400).json({ msg: "Please create an account first !!" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports ={userRoute};

