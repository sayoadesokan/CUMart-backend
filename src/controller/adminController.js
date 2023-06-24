const { ADMIN_USERNAME, ADMIN_PASSWORD } = require('../config');
const Admin = require('../database/models/Admin');
const Product = require('../database/models/Product');
const { Student } = require('../database/models/Student');
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
    console.log(newPassword);

    const newAdmin = await new Admin({
      userName: ADMIN_USERNAME,
      password: newPassword,
      salt: salt,
    }).save();

    if (newAdmin) {
      const signature = await generateSignature({
        _id: newAdmin.id,
        userName: newAdmin.userName,
        password: newAdmin.password,
      });
      return res.status(200).json({
        message: 'Login saved!',
        signature: signature,
        email: newAdmin.email,
      });
    }

    return res.status(400).json({ message: 'invalid username or password' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const adminLogin = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const existingAdmin = await Admin.findOne({ userName: userName });

    if (existingAdmin !== null) {
      const validate = await ValidatePasswords(
        password,
        existingAdmin.password,
        existingAdmin.salt
      );
      console.log(validate);

      if (validate) {
        const signature = await generateSignature({
          _id: existingAdmin.id,
          userName: existingAdmin.userName,
        });

        return res.status(200).json({
          message: 'Logged in successfully!',
          signature: signature,
        });
      }
    }

    res.status(400).json({ message: 'invalid username or password!' });
  } catch (error) {
    console.error(error);
  }
};

const getAccessAllStudents = async (req, res, next) => {
  try {
    const admin = req.user;

    if (admin) {
      const students = await Student.find();

      return res
        .status(200)
        .json({ message: 'All students loaded successfully', students });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Erroring loading all students' });
  }
};

const adminAccessAllGoods = async (req, res, next) => {
  try {
    const admin = req.user;

    if (admin) {
      const products = await Product.find();

      return res
        .status(200)
        .json({ message: 'all product loaded successfully', products });
    }

    return res.status(400).json({ message: 'Error loading all goods!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const adminDeleteGood = async (req, res, next) => {
  try {
    const admin = req.user;
    const productSlug = req.params.productslug;

    if (admin) {
      const deletedProduct = await Product.findOneAndDelete(productSlug);

      return res.status(200).json({
        message: 'Successfully deleted the product!',
        deletedProduct,
      });
    }

    return res.status(400).json({ message: 'Error deleting product' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  saveAdminLogin,
  adminLogin,
  getAccessAllStudents,
  adminAccessAllGoods,
  adminDeleteGood,
};
