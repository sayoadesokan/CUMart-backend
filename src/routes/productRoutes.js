const express = require('express');
const {
  createProduct,
  getProduct,
  deleteProduct,
} = require('../controller/productController');
const { Authenticate } = require('../middleware/Authentification');
const router = express.Router();

router
  .use(Authenticate)
  .post('/createProduct', createProduct)
  .get('/getProduct', getProduct)
  .delete('/deleteProduct', deleteProduct);

module.exports = {
  router,
};
