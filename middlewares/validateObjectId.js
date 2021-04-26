const mongoose = require('mongoose');

module.exports = (paramName = 'id') => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[paramName]))
    return res.status(404).send({ errors: [{ msg: 'Invalid ID.' }] });

  next();
};
