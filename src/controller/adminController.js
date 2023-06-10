const { ADMIN_USERNAME, ADMIN_PASSWORD } = require('../config');
const Admin = require('../database/models/Admin');
const Product = require('../database/models/Product');
const {
  generateSalt,
  generatePassword,
  generateSignature,
  ValidatePasswords,
} = require('../utils');

const saveAdminLogin = async (req, res, next) => {
  try {
    const salt = await generateSalt();
    const newPassword = await generatePassword(ADMIN_PASSWORD, salt);

    const newAdmin = await new Admin({
      userName: ADMIN_USERNAME,
      password: newPassword,
      salt: salt,
    }).save();

    if (newAdmin) {
      const signature = await generateSignature({
        _id: newAdmin.id,
        email: newAdmin.email,
        userName: newAdmin.userName,
      });
      return res.status(200).json({
        message: 'Login saved!',
        signature: signature,
        email: newAdmin.email,
      });
    }

    return res.status(400).json({ message: 'Error with signature' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const adminLogin = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const existingAdmin = await Admin.findOne({ userName });

    if (existingAdmin !== null) {
      const validate = await ValidatePasswords(
        password,
        existingAdmin.password,
        existingAdmin.salt
      );

      if (validate) {
        const signature = generateSignature({
          _id: existingAdmin.id,
          email: existingAdmin.email,
          userName: existingAdmin.userName,
        });

        return res.status(200).json({
          message: 'Logged in successfully!',
          signature: signature,
          email: existingAdmin.email,
        });
      }
    }

    res.status(400).json({ message: 'Username or password incorrect!' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const adminAccessAllGoods = async (req, res, next) => {
  try {
    const admin = req.user;

    if (admin) {
      const products = await Product.find();

      return res.status(200).json({ products });
    }

    return res.status(400).json({ message: 'Error loading all goods!' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const adminDeleteGood = async (req, res, next) => {
  try {
    const admin = req.user;
    const id = req.params.id;

    if (admin) {
      const deletedProduct = await Product.findByIdAndDelete(id);

      return res.status(200).json({
        message: 'Successfully deleted the product!',
        deletedProduct,
      });
    }

    return res.status(400).json({ message: 'Error deleting product' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  saveAdminLogin,
  adminLogin,
  adminAccessAllGoods,
  adminDeleteGood,
};
