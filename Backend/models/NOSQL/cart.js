const mongoose = require("mongoose");
const CartScheme = new mongoose.Schema(
  {
    id: {
      type: mongoose.Types.ObjectId,
    },
    id_user: String,
    id_product: String,
    name: String,
    price: {
      type: Number,
      default: 0.0,
    },
    quantity: Number,
    category: String,
    image: String,
  },
  {
    timesTamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("cart", CartScheme);
