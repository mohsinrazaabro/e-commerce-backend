const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  address: {
    type: String,
  },
  isconfirmed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("user", userSchema);
