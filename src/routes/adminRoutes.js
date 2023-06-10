const express = require('express');
const {
  adminLogin,
  adminAccessAllGoods,
  adminDeleteGood,
  saveAdminLogin,
} = require('../controller/adminController');
const { Authenticate } = require('../middleware/Authentification');
const router = express.Router();

router
  .post('/savedadmin', saveAdminLogin)
  .post('/login', adminLogin)
  .use(Authenticate)
  .get('/allgoods', adminAccessAllGoods)
  .delete('/deletegoods/:id', adminDeleteGood);

module.exports = { router };
