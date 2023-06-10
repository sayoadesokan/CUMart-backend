const Product = require('../database/models/Product');

const createProduct = async (req, res, next) => {
  try {
    const student = req.user;
    const { name, description, price, image } = req.body;

    const newProduct = await new Product({
      name: name,
      description: description,
      price: price,
      image: image,
    }).save();

    return res.status(200).json({
      message: 'Product uploaded successfully',
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

const getProduct = async (req, res, next) => {
  try {
  } catch (error) {}
};

const deleteProduct = async (req, res, next) => {};

module.exports = {
  createProduct,
  getProduct,
  deleteProduct,
};
