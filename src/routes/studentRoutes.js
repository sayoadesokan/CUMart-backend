const express = require('express');
const { Authenticate } = require('../middleware/Authentification');
const {
  studentRegister,
  studentLogin,
  studentEditAccount,
  studentInfo,
  addToWishlist,
  studentWishlist,
} = require('../controller/studentController');
const router = express.Router();

router
  .post('/signup', studentRegister)
  .post('/login', studentLogin)
  .use(Authenticate)
  .get('/studentinfo', studentInfo)
  .put('/editaccount', studentEditAccount)
  .post('/addtowishlist', addToWishlist)
  .get('/studentwishlist', studentWishlist);

module.exports = {
  router,
};
