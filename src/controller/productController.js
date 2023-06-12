const Product = require('../database/models/Product');
const { convertToSlug } = require('../utils');
const cloudinary = require('../utils/cloudinary');

const createProduct = async (req, res, next) => {
  try {
    const { telegramUserName } = req.user;
    const { name, description, price, category, location } = req.body;

    const productSlug = convertToSlug(name);

    console.log(telegramUserName);
    console.log(req.file);

    if (!req.file) {
      return res.status(500).json({ message: 'Product image is required' });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const newProduct = await new Product({
      name: name,
      productSlug: productSlug,
      description: description,
      price: price,
      category: category,
      location: location,
      image: result.secure_url,
      contact: telegramUserName,
    }).save();

    return res.status(200).json({
      message: 'Product uploaded successfully',
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error creating product' });
  }
};

const getProduct = async (req, res, next) => {
  try {
    const getProducts = await Product.find();

    res.status(200).json({
      message: 'Products drawn successfully',
      product: getProducts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error getting product' });
  }
};

const getSingleProduct = async (req, res, next) => {
  try {
    const productSlug = req.params.productSlug;

    const getProduct = await Product.findOne({ productSlug: productSlug });

    res.status(200).json({
      message: 'Products drawn successfully',
      product: getProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error loading your product' });
  }
};

const byCategory = async (req, res, next) => {
  try {
    const category = req.params.category;

    const filteredProduct = await Product.find().sort({ category: 1 });

    return res.status(200).json({
      category: filteredProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error loading by category' });
  }
};

const byHall = async (req, res, next) => {
  try {
    const hall = req.params.hall;

    const filteredHall = await Product.find().sort({ hall: 1 });

    return res.status(200).json({
      category: filteredHall,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error loading cateogry by hall' });
  }
};

module.exports = {
  createProduct,
  getProduct,
  getSingleProduct,
  byCategory,
  byHall,
};
