const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema({
  productid: {
    type: String,
    required: true,
  },
  imagelink: {
    type: String,
    required: true,
  },
  caption1: {
    type: String,
    required: true,
  },
  caption2: {
    type: String,
    required: false,
  },
  datecreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("carousel", carouselSchema);
