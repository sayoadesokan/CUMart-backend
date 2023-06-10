const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../config');

exports.generateSalt = async () => {
  return await bcrypt.genSalt();
};

exports.generatePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

exports.ValidatePasswords = async (enteredPassword, savedPassword, salt) => {
  return (await this.generatePassword(enteredPassword, salt)) === savedPassword;
};

exports.generateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: '30d' });
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.validateSignature = async (req) => {
  try {
    const signature = req.get('Authorization');
    // console.log(signature);
    const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

exports.telegramLink = (telegramUserName) => {
  try {
    return `t.me/${telegramUserName}`;
  } catch (error) {
    console.log(error);
    return false;
  }
};

exports.convertToSlug = (productName) => {
  return productName
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
    .replace(/^-+|-+$/g, '') // Remove leading and trailing dashes
    .trim(); // Remove any whitespace
};
