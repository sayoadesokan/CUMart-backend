const express = require('express');
const {
  adminLogin,
  adminAccessAllGoods,
  adminDeleteGood,
} = require('../controller/adminController');
const router = express.Router();

router
  .post('/login', adminLogin)
  .get('/allgoods', adminAccessAllGoods)
  .delete('/deletegoods', adminDeleteGood);

module.exports = router;
