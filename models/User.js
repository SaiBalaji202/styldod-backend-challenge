const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { user: { id: this._id, isAdmin: this.isAdmin } },
    config.get('jwtSecret'),
    { expiresIn: '5 days' }
  );
  return token;
};

const User = mongoose.model('user', UserSchema);
module.exports = User;
