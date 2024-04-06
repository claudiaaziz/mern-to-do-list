const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const validateRegisterInput = require('../validation/registerValidation');

// @route   GET /api/auth/test
// @desc    Test the Auth route
// @accesss Public
router.get('/test', (req, res) => {
  res.send('Auth route working');
});

// @route   POST /api/auth/register
// @desc    Create a new user
// @accesss Public
router.post('/register', async (req, res) => {
  try {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    // check for existing user
    const existingEmail = await User.findOne({
      email: new RegExp('^' + req.body.email + '$', 'i'),
    });
    if (existingEmail) {
      return res
        .status(400)
        .json({ error: 'There is already a user with this email.' });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // create a new user
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
    });

    // save user to db
    const savedUser = await newUser.save();

    // return the new user
    return res.json(savedUser);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

module.exports = router;