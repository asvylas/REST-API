const User = require('../models/users.js')

module.exports = {
  // Add a new user
  async addUser (req, res) {
    const user = new User(req.body)
    try {
      let newUser = await user.save()
      res.status(201).send({
        response: `User ${req.body.firstName} created.`,
        user: newUser
      })
    } catch (error) {
      res.status(400).send({
        error: `Error creating  user ${req.body.firstName}.`
      })
    }
  },
  //Fetching user list
  async listUsers (req, res) {
    try {
      let userList = await User.find({})
      res.send({
        response: 'User list.',
        userList: userList
      })
    } catch (error) {
      res.status(400).send({
        error: `Error fetching user list.`
      })
    }
  },
  // Update user
  async updateUser (req, res) {
    try {
      let user = await User.findById(req.params._id)
      if(user) {
        user.firstName = req.body.firstName
        user.lastName = req.body.firstName
        user.money = req.body.money
        await user.save();
        res.send({
          response: `User ${user.firstName} update.`
        })
      } else {
        res.status(404).send({
          error: `No user found with id:${req.params._id}.`
        })
      }
    } catch (error) {
      res.status(500).send({
        error: `Error updating the user ${req.params._id}.`
      })
    }
  },
  // Delete user
  async deleteUser (req, res) {
    try {
      let user = await User.findById(req.params._id)
      if(user) {
        await User.remove({
          _id: req.params._id
        })
        res.send({
          response: `User ${req.params._id} deleted.`
        })
      } else {
        res.status(404).send({
          error: `No user with id: ${req.params._id} found.`
        })
      } 
    } catch (error) {
      res.status(400).send({
        error: `Error deleting the user ${req.body._id}.`
      })
    }
  }

}