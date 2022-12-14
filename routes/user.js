const express = require('express');
const Router = express.Router();

// Schemas
const { UserModel } = require('../models/user');

// middleware
const { validateData, doesUserExist } = require('../middleware');

// Route: /register
// Description : Registering a new user
// params: none
// Access: Public
// Method : POST
Router.post('/', validateData, doesUserExist, async (req, res) => {
  try {
    const { email, name, age, phone, batch } = req.body;

    const newUser = new UserModel({
      email,
      name,
      age: parseInt(age),
      phone: parseInt(phone),
      batch,
    });

    await newUser.save();

    const id = newUser.getId();

    return res.status(201).json({
      message: id,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = Router;
