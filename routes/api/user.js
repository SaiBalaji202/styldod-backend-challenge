const router = require('express').Router();
const { check } = require('express-validator');
const validateObjectId = require('../../middlewares/validateObjectId');
const validationCheck = require('../../middlewares/validationCheck');
const isAuthenticated = require('../../middlewares/auth');
const isAdmin = require('../../middlewares/admin');
const userController = require('../../controllers/user');

// @route   POST api/user
// @desc    Register User
// @access  Public
router.post(
  '/',
  [
    [
      check('name', 'Name is Required').trim().not().isEmpty(),
      check('email', 'Enter a valid Email').trim().isEmail(),
      check('password', 'Enter a Password with 3 or more characters')
        .trim()
        .isLength({
          min: 3,
        }),
    ],
    validationCheck,
  ],
  userController.registerUser
);

// @route   PATCH api/user
// @desc    Updates User Rold
// @access  Private
router.patch(
  '/:id',
  [
    isAuthenticated,
    isAdmin,
    validateObjectId(),
    [
      check(
        'isAdmin',
        'isAdmin is empty.  You can only update User Role'
      ).isBoolean(),
    ],
    validationCheck,
  ],
  userController.updateRole
);

module.exports = router;
