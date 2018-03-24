const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    productID: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order