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
      firstName: newStudent.firstName,
      lastName: newStudent.lastName,
      email: newStudent.email,
      telegramUserName: newStudent.telegramUserName,
    });

    return res.status(200).json({
      message: `Welcome ${firstName}, successfully, Login!`,
      signature: signature,
      student: student,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error Registering User' });
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
          firstName: existingStudent.firstName,
          lastName: existingStudent.lastName,
          email: existingStudent.email,
          telegramUserName: existingStudent.telegramUserName,
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
    return res.status(500).json({ message: 'Internal server error' });
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
    return res.status(500).json({ message: 'Cannot log student Information' });
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
    return res.status(500).json({ message: 'Error Updating account' });
  }
};

const addToWishlist = async (req, res, next) => {
  try {
    const { product } = req.body;
    const { _id } = req.user;
    const student = await Student.findById(_id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    let oldWishlist = student.wishlist;
    let newWishlist = [...oldWishlist, product];

    student.wishlist = newWishlist;
    await student.save();

    return res.status(200).json({
      message: 'Product added to wishlist',
      wishlist: newWishlist,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error adding to wishlist' });
  }
};

const studentWishlist = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const studentWishlist = await Student.findById(_id).select('wishlist');
    return res.status(200).send(studentWishlist);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error Loading student wishlist' });
  }
};

module.exports = {
  studentRegister,
  studentLogin,
  studentInfo,
  studentEditAccount,
  addToWishlist,
  studentWishlist,
};
