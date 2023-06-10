const express = require('express');
const { Authenticate } = require('../middleware/Authentification');
const {
  studentRegister,
  studentLogin,
  studentEditAccount,
  studentDeleteAccount,
} = require('../controller/studentController');
const router = express.Router();

router
  .post('/signup', studentRegister)
  .post('/login', studentLogin)
  .use(Authenticate)
  .patch('/editaccount', studentEditAccount)
  .delete('/deleteaccount', studentDeleteAccount);

module.exports = {
  router,
};
