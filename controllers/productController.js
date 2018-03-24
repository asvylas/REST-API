const Product = require('../models/products.js')

module.exports = {
  // Add a new product
  async addProduct (req, res) {
    const product = new Product(req.body)
    try {
      let newProduct = await product.save()
      res.status(201).send({
        response: `product ${req.body.title} created.`,
        product: newProduct
      })
    } catch (error) {
      res.status(400).send({
        error: `Error creating product ${req.body.title}.`
      })
    }
  },
  //Fetching product list
  async listProducts (req, res) {
    try {
      let productList = await Product.find({})
      res.send({
        response: 'Product list.',
        productList: productList
      })
    } catch (error) {
      res.status(400).send({
        error: `Error fetching product list.`
      })
    }
  },
  // Update product
  async updateProduct (req, res) {
    try {
      let product = await Product.findById(req.params._id)
      if (product) {
        product.title = req.body.title
        product.type = req.body.type
        product.url = req.body.url
        product.quantity = req.body.quantity
        product.price = req.body.price
        await product.save();
        res.send({
          response: `Product ${product.title} update.`
        })
      } else {
        res.status(400).send({
          error: `No product with id: ${req.params._id} found.`
        })
      }
    } catch (error) {
      res.status(400).send({
        error: `Error updating the product ${req.params._id}.`
      })
    }
  },
  // Delete product
  async deleteProduct (req, res) {
    try {
      let product = await Product.findById(req.params._id)
      if(product) {
        await Product.remove({
          _id: req.params._id
        })
        res.send({
          response: `Product ${req.params._id} deleted.`
        })
      } else {
        res.status(404).send({
          error: `No product with id: ${req.params._id} found.`
        })
      } 
    } catch (error) {
      res.status(500).send({
        error: `Error deleting the product ${req.body._id}.`
      })
    }
  }

}