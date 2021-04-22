const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    items: [
        {
          productId: {
            type: String,
            ref: "Product",
          },
          qty: {
            type: Number,
            default: 0,
          },
          price: {
            type: Number,
            default: 0,
          },
          title: {
            type: String,
          },
          productCode: {
            type: String,
          },
        }],
    totalQty: {
        type: Number,
        default: 0,
        required: true
    },
    totalPrice: {
        type: Number,
        default: 0,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("cart", cartSchema)