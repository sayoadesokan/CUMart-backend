const express = require('express');
const multer = require('multer');
const {
  createProduct,
  getProduct,
  byCategory,
  byHall,
  getSingleProduct,
} = require('../controller/productController');
const { Authenticate } = require('../middleware/Authentification');
const router = express.Router();

const upload = require('../utils/multer');

router
  .get('/getproduct', getProduct)
  .get('/getsingleproduct/:productSlug', getSingleProduct)
  .get('/category/:category', byCategory)
  .get('/location/:hall', byHall)
  .use(Authenticate)
  .post('/createproduct', upload.single('image'), createProduct);

module.exports = {
  router,
};
