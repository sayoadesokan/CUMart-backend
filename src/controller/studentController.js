const { Student } = require('../database/models/Student');
const {
  generateSalt,
  ValidatePasswords,
  generateSignature,
  generatePassword,
  telegramLink,
} = require('../utils');

const studentRegister = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, telegramUserName, hall } =
      req.body;

    const existingStudent = await Student.findOne({ email: email });

    if (existingStudent) {
      return res.status(400).send('User already exist!');
    }

    const salt = await generateSalt();

    const newPassword = await generatePassword(password, salt);

    const telegram = telegramLink(telegramUserName);

    const newStudent = await new Student({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: newPassword,
      telegramUserName: telegram,
      hall: hall,
      salt: salt,
    });

    const student = await newStudent.save();

    const signature = await generateSignature({
      _id: newStudent.id,
      email: newStudent.email,
      password: newStudent.password,
    });

    return res.status(200).json({
      message: `Welcome ${firstName} successfully, Login!`,
      signature: signature,
      student: student,
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
    console.log(existingStudent);

    if (existingStudent) {
      const validate = await ValidatePasswords(
        password,
        existingStudent.password,
        existingStudent.salt
      );

      console.log(validate);

      if (validate) {
        const signature = await generateSignature({
          _id: existingStudent.id,
          email: existingStudent.email,
          password: existingStudent.password,
        });

        return res.status(200).json({
          message: 'Successfully Logged in!',
          signature: signature,
          student: existingStudent,
        });
      }
    }

    return res.status(401).json({ message: 'Login Error' });
  } catch (error) {
    console.log(error);
    next();
  }
};

const studentInfo = async (req, res, next) => {
  try {
    const student = req.user;
    console.log(student);

    if (student) {
      const studentId = student._id;
      const existingStudent = await Student.find({ _id: studentId });

      if (existingStudent) {
        return res.status(200).json({
          message: 'Your profile loaded successfully',
          student: existingStudent,
        });
      }
    }
  } catch (error) {
    console.log(error);
    next();
  }
};

const studentEditAccount = async (req, res, next) => {
  try {
    const student = req.user;
    const { firstName, lastName, telegramUserName, hall } = req.body;

    if (student) {
      const studentId = student._id;

      const updatedInfo = {
        firstName: firstName,
        lastName: lastName,
        telegramUserName: telegramUserName,
        hall: hall,
      };

      const updateStudent = await Student.findByIdAndUpdate(
        studentId,
        updatedInfo,
        { new: true }
      );

      return res.status(200).json({
        message: 'Account updated successfully!',
        student: updateStudent,
      });
    }

    return res.status(400).json({ message: 'Error updating account' });
  } catch (error) {
    console.log(error);
    next();
  }
};

const addToWishlist = async (req, res, next) => {
  try {
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
      const studentId = student._id;
      const existingStudent = await Student.deleteOne({ _id: studentId._id });

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
  studentInfo,
  studentEditAccount,
  addToWishlist,
  studentWishlist,
  studentDeleteAccount,
};
