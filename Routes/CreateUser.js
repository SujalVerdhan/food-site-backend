const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()
 
const jwtSecret=process.env.JWTSECRET

router.post("/createuser", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const secPassword = await bcrypt.hash(req.body.password, salt);
  try {
    let email= req.body.email;
    const user = await User.findOne({ email });
    if(user){
      res.json({success:"already"})
      return;
    }
  else{
    await User.create({
      name: req.body.name,
      password: secPassword,
      email: req.body.email,
      location: req.body.location,
    });
    res.json({ success: true });
  }
  } catch (err) {
    console.log(err);
    res.json({ success: false, err });
  }
});
router.post("/loginuser", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const pwdCompare =await bcrypt.compare(password, user.password);
      console.log(pwdCompare)
      if (pwdCompare) {
        const data={
            user:
            {
                id:user._id
            }
        }
        const authToken=jwt.sign(data,jwtSecret)
        return res.json({ success: true,authtoken:authToken });
      } else {
        return res.status(400).json({ error: "Enter Valid credentials" });
      }
    } else {
      return res.status(400).json({ error: "Enter valid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
