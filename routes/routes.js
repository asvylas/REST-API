const userController = require('../controllers/userController.js')
const productController = require('../controllers/productController.js')
module.exports = (app) => {
  // User controllers
  app.post('/users', 
    userController.addUser
  )
  app.get('/users',
    userController.listUsers
  )
  app.put('/users/:_id',
    userController.updateUser
  )
  app.delete('/users/:_id',
    userController.deleteUser
  )
  // Product controllers
  app.post('/products', 
    productController.addProduct
  )
  app.get('/products',
    productController.listProducts
  )
  app.put('/products/:_id',
    productController.updateProduct
  )
  app.delete('/products/:_id',
    productController.deleteProduct
  )
}