const Product = require('../database/models/Product');
const { convertToSlug } = require('../utils');
const cloudinary = require('../utils/cloudinary');

const createProduct = async (req, res, next) => {
  try {
    const { telegramUserName, firstName, lastName } = req.user;
    const { name, description, price, category, location } = req.body;

    const productSlug = convertToSlug(name);

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
      firstName: firstName,
      lastName: lastName,
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

const editProduct = async (req, res, next) => {
  try {
    const { productSlug } = req.params;
    const { name, description, price, category, location } = req.body;
    const { telegramUserName, firstName, lastName } = req.user;

    if (!req.file) {
      return res.status(500).json({ message: 'Product image is required' });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    // Find the existing product by its ID
    const existingProduct = await Product.findOne({ productSlug: productSlug });

    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product properties with the new values
    existingProduct.name = name;
    existingProduct.description = description;
    existingProduct.price = price;
    existingProduct.category = category;
    existingProduct.location = location;
    existingProduct.image = result.secure_url;
    existingProduct.contact = telegramUserName;
    existingProduct.firstName = firstName;
    existingProduct.lastName = lastName;

    // Save the updated product
    const updatedProduct = await existingProduct.save();

    return res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error updating product' });
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const productSlug = req.params.productslug;

    const deletedProduct = await Product.findOneAndDelete(productSlug);

    return res.status(200).json({
      message: 'Successfully deleted the product!',
      deletedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting product' });
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

const searchProduct = async (req, res) => {
  try {
    const name = req.params.name;

    const regex = new RegExp(name, 'i'); // 'i' flag makes it case-insensitive

    const productName = await Product.find({ name: { $regex: regex } }).sort({
      name: 1,
    });

    return res.status(200).json({
      name: productName,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Product does not exist' });
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

    const filteredProduct = await Product.find({ category: category }).sort({
      category: 1,
    });

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
    const location = req.params.hall;

    const filteredHall = await Product.find({ location: location }).sort({
      location: 1,
    });

    return res.status(200).json({
      hall: filteredHall,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error loading cateogry by hall' });
  }
};

module.exports = {
  createProduct,
  editProduct,
  deleteProduct,
  getProduct,
  searchProduct,
  getSingleProduct,
  byCategory,
  byHall,
};
