const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ["furniture", "food", "clothes"]
    },
    url: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product