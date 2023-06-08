const mongoose = require('mongoose');

const dbConnection = async (url) => {
  try {
    await mongoose.connect(url);
    console.log('Connected to Database');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  dbConnection,
};
