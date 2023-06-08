const { ADMIN_USERNAME, ADMIN_PASSWORD } = require('../config');
const Admin = require('../database/models/Admin');

const adminLogin = async (req, res, next) => {
  try {
    // const { userName, Password } = req.body;

    const newAdmin = await new Admin({
      userName: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
    });

    const savedAdmin = await newAdmin.save();
    res.status(200).json({ message: 'Login Successful!' });
  } catch (error) {
    console.log(error);
  }
};

const adminAccessAllGoods = async (req, res, next) => {};

const adminDeleteGood = async (req, res, next) => {
  const id = req.param.id;
};

module.exports = {
  adminLogin,
  adminAccessAllGoods,
  adminDeleteGood,
};
