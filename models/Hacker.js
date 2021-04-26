const mongoose = require('mongoose');
const { unlink } = require('fs/promises');
const fs = require('fs');
const path = require('path');
const DEFAULT_IMG_NAME = 'default-user.png';

const HackerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profileLink: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  challengesSolved: {
    type: Number,
    default: 0,
  },
  solutionsSubmitted: {
    type: Number,
    default: 0,
  },
  solutionsAccepted: {
    type: Number,
    default: 0,
  },
  overallRank: {
    type: Number,
    default: 0,
  },
  followers: {
    type: Number,
    default: 0,
  },
  following: {
    type: Number,
    default: 0,
  },
  noOfVotes: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Number,
    default: new Date().getTime(),
  },
  deviceType: {
    type: String,
  },
  image: {
    type: String,
  },
  competitivePercentile: {
    dataStructure: {
      type: Number,
    },
    algorithms: {
      type: Number,
    },
    cpp: {
      type: Number,
    },
    java: {
      type: Number,
    },
    python: {
      type: Number,
    },
    html: {
      type: Number,
    },
    javascript: {
      type: Number,
    },
  },
});

HackerSchema.methods.deleteUserPhoto = async function () {
  const fileName = path.basename(this.image);
  const filePath = path.join('images', 'hackers', fileName);

  if (!fileName.endsWith(DEFAULT_IMG_NAME) && fs.existsSync(filePath))
    await unlink(filePath);
};

const Hacker = mongoose.model('hacker', HackerSchema);
module.exports = Hacker;
