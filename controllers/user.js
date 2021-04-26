const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');

const registerUser = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  // Return 400, if user exists
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      errors: [{ msg: 'User already Exists' }],
    });
  }

  // Generate User Obj
  user = new User({
    name,
    email,
    password,
  });

  // Hash Password
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(password, salt);

  // Save User
  await user.save();

  // Generate JWT
  const token = user.generateAuthToken();
  return res.json({ token });
});

const updateRole = catchAsync(async (req, res) => {
  // Return 400, if user exists
  const user = await User.findById(req.params.id);
  if (!user)
    return res
      .status(404)
      .send({ msg: 'User with the given ID was not found.' });

  user.isAdmin = req.body.isAdmin;
  await user.save();

  return res.json({
    id: user._id,
    isAdmin: user.isAdmin,
  });
});

module.exports = {
  registerUser,
  updateRole,
};
