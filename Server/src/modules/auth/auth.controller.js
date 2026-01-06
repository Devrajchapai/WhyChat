const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')
const User = require("../models/user.model");

class AuthController {
  signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
      if (!username || !email || !password) {
        res.status(400).json({
          message: "provide all the information",
        });
      }

      const hashPasword = await bcryptjs.hash(password, 10);

      const user = new User({
        username,
        email,
        password: hashPasword,
      });

      await user.save();
      const token = jwt.sign({email}, process.env.JWT_PRIVATE_KEY)

      res.status(200).json({
        message: "signup successful",
        token: token
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "server error try again",
      });
    }
  };



  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        res.status(400).json({
          message: "either email or password is missing",
        });
      } else {
        const user = await User.findOne({ email }, { password: 1 });
        if (!user) {
          res.status(401).json({
            message: "email, password or both are wrong",
          });
        } else {
          const checkPassword = await bcryptjs.compare(password, user.password);
          if (!checkPassword) {
            res.status(401).json({
              message: "email, password or both are wrong",
            });
          }else{
            const token = jwt.sign({email}, process.env.JWT_PRIVATE_KEY)
              res.status(200).json({
                message: "login successful",
                token: token
              });
          }
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "server side error",
      });
    }
  };
}

const authController = new AuthController();
module.exports = authController;
