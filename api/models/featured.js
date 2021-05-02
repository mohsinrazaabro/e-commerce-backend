const mongoose = require("mongoose");

const featuredSchema = new mongoose.Schema({
  productid: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalprice: {
    type: Number,
    required: true,
  },
  imagelink: {
    type: String,
  },
  supplier: {
    type: String,
    required: true,
  },
  stars: {
    type: mongoose.Schema.Types.Decimal128,
  },
  datecreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("featured", featuredSchema);
