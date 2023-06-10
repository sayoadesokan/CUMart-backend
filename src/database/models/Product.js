const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    productSlug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
    },
    location: {
      type: String,
      required: true,
      lowercase: true,
    },
    image: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
