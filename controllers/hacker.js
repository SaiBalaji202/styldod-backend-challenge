const normalize = require('normalize-url');
const Hacker = require('../models/Hacker');
const catchAsync = require('../utils/catchAsync');

const DEFAULT_IMG_NAME = 'default-user.png';

const getHackers = catchAsync(async (req, res) => {
  let hackers;
  if (req.query.filter === 'recentUpdate') {
    hackers = await Hacker.find().sort({ timestamp: -1 }).limit(10);
  } else if (req.query.filter === 'topHackers') {
    hackers = await Hacker.find()
      .sort({
        challengesSolved: -1,
        solutionsSubmitted: -1,
        solutionsAccepted: -1,
        noOfVotes: -1,
        overallRank: -1,
      })
      .limit(0);
  } else {
    hackers = await Hacker.find().sort({ name: 1 });
  }
  return res.json(hackers);
});

const getHackerById = catchAsync(async (req, res) => {
  const hacker = await Hacker.findById(req.params.id);
  if (!hacker) {
    return res
      .status(404)
      .send({ msg: 'Hacker with the given ID was not found.' });
  }
  return res.json(hacker);
});

const addHackerData = catchAsync(async (req, res) => {
  const hackerPayload = generateHackerPayload(req);

  const hacker = new Hacker(hackerPayload);
  await hacker.save();
  return res.status(201).json(hacker);
});

const updateHackerData = catchAsync(async (req, res) => {
  let hacker = await Hacker.findById(req.params.id);
  if (!hacker) {
    return res
      .status(404)
      .send({ msg: 'Hacker with the given ID was not found.' });
  }

  const hackerPayload = generateHackerPayload(req);
  console.log(hackerPayload);
  await hacker.deleteUserPhoto();

  hacker = await Hacker.findByIdAndUpdate(
    req.params.id,
    {
      $set: hackerPayload,
    },
    { new: true }
  );

  return res.json(hacker);
});

const deleteHackerData = catchAsync(async (req, res) => {
  const hacker = await Hacker.findById(req.params.id);
  if (!hacker) {
    return res
      .status(404)
      .send({ errors: [{ msg: 'Hacker with the given ID was not found.' }] });
  }

  await hacker.deleteUserPhoto();
  await Hacker.findByIdAndDelete(req.params.id);

  return res.json({ msg: 'Hacker Profile Deleted' });
});

const generateHackerPayload = (req) => {
  const competitivePercentile = {
    dataStructure: req.body.dataStructure,
    algorithms: req.body.algorithms,
    cpp: req.body.cpp,
    java: req.body.java,
    python: req.body.python,
    html: req.body.html,
    javascript: req.body.javascript,
  };

  const hackerPayload = {
    name: req.body.name,
    profileLink: req.body.profileLink
      ? normalize(req.body.profileLink, { forceHttps: true })
      : null,
    location: req.body.location,
    education: req.body.education,
    challengesSolved: req.body.challengesSolved,
    solutionsSubmitted: req.body.solutionsSubmitted,
    solutionsAccepted: req.body.solutionsAccepted,
    overallRank: req.body.overallRank,
    followers: req.body.followers,
    following: req.body.following,
    noOfVotes: req.body.noOfVotes,
    deviceType: req.body.deviceType,
    competitivePercentile,
  };

  if (req?.file?.filename) {
    hackerPayload.image = `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`;
  } else {
    hackerPayload.image = `${req.protocol}://${req.get(
      'host'
    )}/images/${DEFAULT_IMG_NAME}`;
  }

  return hackerPayload;
};

module.exports = {
  getHackers,
  getHackerById,
  addHackerData,
  updateHackerData,
  deleteHackerData,
};
