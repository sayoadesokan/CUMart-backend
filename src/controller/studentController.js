const { Student } = require('../database/models/Student');
const {
  generateSalt,
  ValidatePasswords,
  generateSignature,
} = require('../utils');

const studentRegister = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    const existingStudent = await Student.findOne({ email: email });

    if (!existingStudent) {
      return res.status(400).send('User already exist!');
    }

    const salt = await generateSalt();

    const newPassword = await generatePassword(password, salt);

    const newStudent = await new Student({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: newPassword,
      phoneNumber: phoneNumber,
      salt: salt,
    });

    await newStudent.save();

    const signature = await generateSignature({
      _id: newStudent.id,
      email: newStudent.email,
      password: newStudent.password,
    });

    return res.status(200).json({
      message: `Welcome ${firstName} successfully, Login!`,
      signature: signature,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

const studentLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingStudent = await Student.findOne({ email: email });

    if (existingStudent) {
      const validate = await ValidatePasswords(
        password,
        existingStudent.password,
        existingStudent.salt
      );

      if (validate) {
        const signature = await generateSignature({
          _id: existingStudent.id,
          email: existingStudent.email,
          password: existingStudent.password,
        });

        return res.status(200).json({
          message: 'Successfully Logged in!',
          signature: signature,
        });
      }
    }

    return res.status(404).json({ message: 'Login Error' });
  } catch (error) {
    console.log(error);
    next();
  }
};

const studentEditAccount = async (req, res, next) => {
  try {
    const student = req.user;

    if (student) {
      const existingStudent = await Student.findOneAndUpdate(student._id);

      if (existingStudent) {
        return;
      }
    }
  } catch (error) {
    console.log(error);
    next();
  }
};

const studentWishlist = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next();
  }
};
const studentDeleteAccount = async (req, res, next) => {
  try {
    const student = req.user;

    if (student) {
      const existingStudent = await Student.findOneAndDelete(student._id);

      if (existingStudent) {
        return res.status(200).json({
          message: 'Account Deleted',
          existingStudent,
        });
      }
    }
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = {
  studentRegister,
  studentLogin,
  studentEditAccount,
  studentWishlist,
  studentDeleteAccount,
};
