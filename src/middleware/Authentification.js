const validateSignature = require('../utils/index');

module.exports.Authenticate = async (req, res, next) => {
  const validate = await validateSignature(req);
  if (validate) {
    next();
  } else {
    return res.json({ message: 'User not authorized' });
  }
};
