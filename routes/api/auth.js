const router = require('express').Router();
const { check } = require('express-validator');
const validationCheck = require('../../middlewares/validationCheck');
const isAuthenticated = require('../../middlewares/auth');
const authController = require('../../controllers/auth');

// @route   POST api/auth
// @desc    POST Auth User
// @access  Public
router.post(
  '/',
  [
    [
      check('email', 'Enter a valid Email').isEmail(),
      check('password', 'Enter a valid Password').exists(),
    ],
    validationCheck,
  ],
  authController.authUser
);

// @route   GET api/users/me
// @desc    GET Auth User
// @access  Private
router.get('/me', isAuthenticated, authController.getAuthUser);

module.exports = router;
