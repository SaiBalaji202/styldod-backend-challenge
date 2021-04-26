const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');

const getAuthUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  return res.json(user);
});

const authUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Check if not user
  if (!user) {
    return res.status(401).json({
      errors: [{ msg: 'Invalid Credentials' }],
    });
  }

  // Validate Password
  const isMatch = await bcrypt.compare(password, user.password);

  // If not valid Password
  if (!isMatch) {
    return res.status(401).json({
      errors: [{ msg: 'Invalid Credentials' }],
    });
  }

  // Generate JWT
  const token = user.generateAuthToken();
  return res.json({ token });
});

module.exports = { getAuthUser, authUser };
