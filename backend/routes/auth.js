const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
//Route 01: Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password should be 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    //if there are error return bad request and error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //Check weather the user with email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, errors: "Sorry a user with email already exists" });
      }
      //Hashing password
      var salt = bcrypt.genSaltSync(10);
      var secPass = bcrypt.hashSync(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      //Get user id
      const data = {
        user: { id: user.id },
      };
      //api token
      const token = jwt.sign(data, JWT_SECRET_KEY);
      success = true;
      //New user json in response
      res.json({ success, token });
    } catch (error) {
      //catch error
      console.error(error.message);
      res.status(500).send({ error: "Internal server error" });
    }
  }
);

//ROUTE 02: Authentication a user using : POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password should be be empty").exists(),
  ],
  async (req, res) => {
    let success = false;
    //if there are error return bad request and error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //distructured email and password in req.body
    const { email, password } = req.body;
    try {
      //find user by email
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct details" });
      }
      //password compare
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct details" });
      }
      //Get user id
      const data = {
        user: {
          id: user.id,
        },
      };
      //api token
      const token = jwt.sign(data, JWT_SECRET_KEY);
      //New user json in response
      res.json({ success, token });
      success = true;
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE 03: Get logged User details using: POST "/api/auth/getuser".login required
router.post("/getuser", fetchuser, async (req, res) => {
  //if there are error return bad request and error message
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    //catch error
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
