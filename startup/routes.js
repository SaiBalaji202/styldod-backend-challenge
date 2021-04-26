const express = require('express');
const error = require('../middlewares/error');

module.exports = (app) => {
  app.use(express.json({ extended: false }));
  app.use('/api/user', require('../routes/api/user'));
  app.use('/api/auth', require('../routes/api/auth'));
  app.use('/api/hacker', require('../routes/api/hacker'));
  app.use(error);
};
