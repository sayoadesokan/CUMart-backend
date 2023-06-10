const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (value) {
          return value.endsWith('@stu.cu.edu.ng');
        },
        message: 'Email must be a valid covenant university email address',
      },
    },
    password: {
      type: String,
      required: true,
    },
    telegramUserName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    hall: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    salt: {
      type: String,
      required: true,
    },
    wishlist: {
      type: Array,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const Student = mongoose.model('Student', studentSchema);

module.exports = {
  Student,
};
