const express = require('express');
const multer = require('multer');
const {
  createProduct,
  getProduct,
  byCategory,
  byHall,
  getSingleProduct,
  searchProduct,
  editProduct,
  deleteProduct,
} = require('../controller/productController');
const { Authenticate } = require('../middleware/Authentification');
const router = express.Router();

const upload = require('../utils/multer');

router
  .get('/getproduct', getProduct)
  .get('/search/:name', searchProduct)
  .get('/getsingleproduct/:productSlug', getSingleProduct)
  .get('/category/:category', byCategory)
  .get('/location/:hall', byHall)
  .use(Authenticate)
  .put('/edit/:productSlug', upload.single('image'), editProduct)
  .delete('/delete/:productSlug', deleteProduct)
  .post('/createproduct', upload.single('image'), createProduct);

module.exports = {
  router,
};
