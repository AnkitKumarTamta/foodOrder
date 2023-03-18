const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSecretKey = "mynameisankitkumartamta&$iambca"

router.post(
  "/createuser",
  // username must be an email
  body("email").isEmail(),
  // password must be at least 5 chars long
  body("name", "Type Correct Name").isLength({ min: 5 }),
  body("password", "Incorrect Password Length").isLength({ min: 5 }),
  async (req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
   
    const salt = await bcrypt.genSalt(10);
    let secpassword = await bcrypt.hash(req.body.password,salt)

    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpassword,
        location: req.body.location,
      }).then(resp.json({ success: true }));
    } catch (error) {
      console.log(error);
      resp.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  body("email").isEmail(),
  body("password", "Incorrect Password Length").isLength({ min: 5 }),
  async (req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return resp
          .status(400)
          .json({ errors: "try login with correct credentials" });
      }

      // if (req.body.password !== userData.password)
      const compPassword = await bcrypt.compare(req.body.password,userData.password)
      if(!compPassword)
      {
        return resp
          .status(400)
          .json({ errors: "try login with correct credentials" });
      }

      const data = {
        user:{
          id:userData.id
        }
      }

      const authToken = jwt.sign(data,jwtSecretKey)

      resp.json({ success: true ,authToken:authToken});
    } catch (error) {
      console.log(error);
      resp.json({ success: false });
    }
  }
);

module.exports = router;
