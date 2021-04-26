const router = require('express').Router();
const { check } = require('express-validator');
const validationCheck = require('../../middlewares/validationCheck');
const validateObjectId = require('../../middlewares/validateObjectId');
const isAuthenticated = require('../../middlewares/auth');
const isAdmin = require('../../middlewares/admin');
const {
  uploadUserImage,
  resizeUserPhoto,
} = require('../../middlewares/imageUpload');
const hackerController = require('../../controllers/hacker');

// @route   GET api/hacker, GET api/hacker?filter=<<filterParams>>
// @desc    Get all hackers data or filtered hackers data
// @access  Private
router.get('/', isAuthenticated, hackerController.getHackers);

// @route   GET api/hacker/:id
// @desc    Get hacker data by id
// @access  Private
router.get(
  '/:id',
  [isAuthenticated, validateObjectId()],
  hackerController.getHackerById
);

// @route   POST api/hacker
// @desc    Add new hacker data
// @access  Private
router.post(
  '/',
  [
    isAuthenticated,
    isAdmin,
    uploadUserImage,
    resizeUserPhoto,
    [
      check('name', 'Name is Required').trim().not().isEmpty(),
      check('profileLink', 'Enter a valid Profile Link').trim().isURL(),
      check('location', 'Location is Required').trim().not().isEmpty(),
      check('education', 'Education is Required').trim().not().isEmpty(),
    ],
    validationCheck,
  ],
  hackerController.addHackerData
);

// @route   PUT api/hacker/:id
// @desc    Updates Hacker Data
// @access  Private
router.put(
  '/:id',
  [
    isAuthenticated,
    isAdmin,
    validateObjectId(),
    uploadUserImage,
    resizeUserPhoto,
  ],
  hackerController.updateHackerData
);

// @route   DELETE api/hacker/:id
// @desc    Delete Hacker Data by Id
// @access  Private
router.delete(
  '/:id',
  [isAuthenticated, isAdmin, validationCheck],
  hackerController.deleteHackerData
);

module.exports = router;
