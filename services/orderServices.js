const Order = require('../models/orders.js')
const Product = require('../models/products.js')
const User = require('../models/users')

module.exports = {
  async checkOrderValidity(order) {
    let product = await Product.findById(order.productID, (error) => {
      if (error) {
        throw error = `No product with ID: ${order.productID} found.`
      }
    })
    let user = await User.findById(order.userID, (error) => {
      if (error) {
        throw error = `No user with ID: ${order.userID} found.`
      }
    })
    if (typeof order.quantity !== "number") {
      throw error = "Order quantity has to be a number."
    }
    if(product.price * order.quantity > user.money) {
      throw error = "User has insufficient funds for this order."
    }
    if (product.quantity < order.quantity) {
      throw error = "There is not enough product in stock for this order."
    }
    let processFlag = await this.processOrder(order, product, user)
    if(processFlag) {
      return true
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