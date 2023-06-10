const express = require('express');
const {
  adminLogin,
  adminAccessAllGoods,
  adminDeleteGood,
  saveAdminLogin,
  getAccessAllStudents,
} = require('../controller/adminController');
const { Authenticate } = require('../middleware/Authentification');
const router = express.Router();

router
  .post('/saveadmin', saveAdminLogin)
  .post('/login', adminLogin)
  .use(Authenticate)
  .get('/loadallstudents', getAccessAllStudents)
  .get('/allgoods', adminAccessAllGoods)
  .delete('/deletegoods/:id', adminDeleteGood);

module.exports = { router };
