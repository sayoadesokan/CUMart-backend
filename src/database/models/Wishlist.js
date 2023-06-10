const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishListSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
});

const wishList = mongoose.model('WishList', wishListSchema);

module.exports = { wishList };
