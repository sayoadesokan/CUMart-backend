const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../config');

module.exports.generateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.generatePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePasswords = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.generatePassword(enteredPassword, salt)) === savedPassword;
};

module.exports.generateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: '30d' });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.validateSignature = async (req) => {
  try {
    const signature = req.get('Authorization');
    console.log(signature);
    const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
