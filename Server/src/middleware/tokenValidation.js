require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require('../modules/models/userModel')

module.exports = async (req, res) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      res.status(403).json({
        message: "you are not logged in",
      });
    }

    jwt.verify(authorization, process.env.JWT_PRIVATE_KEY, async(err, payload)=>{
        if(err){
            res.status(401).json({
                message: 'you must be logged in'
            });
        }

        const {email} = payload;
        const _id = await User.findOne({email}, {_id: 1});
        req.user = _id;
        console.log("userid is: "+ req.user)
        next();
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "server error try again",
    });
  }
};
