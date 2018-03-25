const Order = require('../models/orders.js')
const Product = require('../models/products.js')
const User = require('../models/users')
const orderServices = require('../services/orderServices.js')

module.exports = {
  async createOrder (req, res) {
    let order = new Order(req.body)
    try {
      let flag = await orderServices.checkOrderValidity(order)
      if (flag) {
        await order.save()
        res.send({
          response: `Order ${order._id} created.`,
          order: order
        })
      }
    } catch (error) {
      res.status(400).send({
        error: error.error || error
      })
    }
  },
  async listOrders (req, res) {
    try {
      let ordersList = await Order.find({})
      res.send({
        response: 'Order list.',
        ordersList: ordersList
      })
    } catch (error) {
      res.status(400).send({
        error: `Error fetching order list.`
      })
    }
  }
}