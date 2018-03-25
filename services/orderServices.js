const Order = require('../models/orders.js')
const Product = require('../models/products.js')
const User = require('../models/users')

module.exports = {
  async checkOrderValidity(order) {
    if (typeof order.quantity !== "number") {
      throw error = "Order quantity has to be a number."
    }
    let product = await Product.findById(order.productID)
    let user = await User.findById(order.userID)
    if (product && user) {
      if (product.price * order.quantity < user.money) {
        if (product.quantity > order.quantity) {
          let processFlag = await this.processOrder(order, product, user)
          if(processFlag) {
            return true
          }
        } else {
          throw error = "There is not enough product in stock for this order."
        }
      } else {
        throw error = "User has insufficient funds for this order."
      }
    } else {
      throw error = "Either no user or product was found with specified ID."
    }
  },
  async processOrder (order, product, user) {
    // Updated user funds
    user.money = user.money - order.quantity * product.price
    let updatedUser = await user.save()
    // Update product quantity in stock
    product.quantity = product.quantity - order.quantity
    let updatedProduct = await product.save()
    if (updatedUser && updatedProduct) {
      return true
    } else {
      throw error = "Error updating the user and/or product information."
    }
  }
}