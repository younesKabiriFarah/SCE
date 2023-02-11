const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
    },
    password: {
      type: String,
      require: true,
      //select: false,
    },
    role: {
      type: ["user", "admin"],
      default: "user",
    },
  },
  {
    timesTamps: true,
    versionKey: false,
  }
);
//
module.exports = mongoose.model("users", UserScheme);
