const multer = require('multer');
const sharp = require('sharp');
const uuid = require('uuid');
const catchAsync = require('../utils/catchAsync');

// MULTER
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserImage = upload.single('image');

// Sharp - For Image Resize
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  req.file.filename = `${uuid.v4()}.png`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .png({ quality: 90 })
    .toFile(`images/hackers/${req.file.filename}`);

  next();
});
