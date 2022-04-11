const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = "fgjkhjgkbgbfdjg";
//Route 01: Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password should be 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
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
          .json({ errors: "Sorry a user with email already exists" });
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
      const api_key = jwt.sign(data, JWT_SECRET_KEY);
      //New user json in response
      res.json({ api_key });
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
          .json({ error: "Please try to login with correct details" });
      }
      //password compare
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct details" });
      }
      //Get user id
      const data = {
        user: {
          id: user.id,
        },
      };
      //api token
      const api_key = jwt.sign(data, JWT_SECRET_KEY);
      //New user json in response
      res.json({ api_key });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
