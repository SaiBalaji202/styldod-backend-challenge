const jwt = require('jsonwebtoken');
const config = require('config');

// Protect routes
module.exports = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: 'No token, Authorization Denied!' }] });
  }

  try {
    // Verify token
    const jsonPayload = jwt.verify(token, config.get('jwtSecret'));
    req.user = jsonPayload.user;

    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ errors: [{ msg: 'No token, Authorization Denied!' }] });
  }
};
