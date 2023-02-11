const mongoose = require("mongoose");

const ProductScheme = new mongoose.Schema(
  {
    id: {
      type: mongoose.Types.ObjectId,
    },
    name: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      default: 0.0,
    },
    city: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      validator: (req) => {
        return true;
      },
      message: "ERROR_URL",
    },
  },
  {
    timesTamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("products", ProductScheme);
