module.exports = (err, req, res, next) => {
  console.log('Error Message: ', err.message);
  console.log('Error StackTrace: ', err.stack);
  return res.status(500).send({ msg: 'Something went wrong.' });
};
