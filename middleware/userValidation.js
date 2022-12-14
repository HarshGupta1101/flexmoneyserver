const isEmail = require('validator/lib/isEmail');

// Schemas
const { UserModel } = require('../models/user');
const { PaymentModel } = require('../models/payment');

// To check if string contains number
const containsNumbers = (str) => {
  return /\d/.test(str);
};

// Function to validate phone number
const validatePhone = (phone) => {
  const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return regex.test(phone);
};

// Function to validate age limit
const validateAge = (age) => {
  if (typeof age === 'string') {
    if (age.length > age.trim().length) return false;
    if (!(!isNaN(parseInt(age)) && isFinite(age))) return false;
    age = parseInt(age);
  }
  if (age < 18 || age > 65) return false;
  return true;
};

// Function to validate batch
const validateBatch = (batch) => {
  if (!batch || !batch.trim() || batch.length > batch.trim().length)
    return false;

  batch = batch.trim();
  const arr = ['6-7AM', '7-8AM', '8-9AM', '5-6PM'];
  if (!arr.includes(batch)) return false;

  return true;
};

// Function to validate name field
const validateName = (name) => {
  if (!name || !name.trim() || name.length > name.trim().length) return false;

  name = name.trim();
  if (containsNumbers(name)) return false;

  return true;
};

// validating input data from register page
const validateData = (req, res, next) => {
  const { email, name, age, phone, batch } = req.body;

  // Checking for each inputs
  if (
    !isEmail(email) ||
    !validateAge(age) ||
    !validatePhone(phone) ||
    !validateBatch(batch) ||
    !validateName(name)
  ) {
    return res.status(422).json({
      error: 'Something went wrong',
    });
  }

  next();
};

// Checking if user exist if exist then perform respective update
const doesUserExist = async (req, res, next) => {
  try {
    const { email, name, age, phone, batch } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      const payment = await PaymentModel.findOne({ user: user._id });

      if (payment) {
        let startTime = payment.updatedAt;
        console.log(startTime);
        let today = new Date();
        if (Math.ceil((today - startTime) / (1000 * 60 * 60 * 24)) <= 30) {
          return res.status(422).json({
            error: 'Already Enrolled',
          });
        }
      }
      await UserModel.updateOne(
        { email },
        {
          $set: {
            name,
            age,
            phone,
            batch,
          },
        }
      );
      return res.status(201).json({
        message: user._id,
      });
    }
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { validateData, doesUserExist };
