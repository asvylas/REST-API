// Dependencies
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
// Setting up express
const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())
//Config
const config = require('./config/config')
//Routes
require('./routes/routes.js')(app)
//MongoDB Connection
mongoose.connect(config.db.database)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'Error connecting to MongoDB...'))
db.once('open', function(callback){
  console.log('Connected successfully')
})
// Listening on port
app.listen(process.env.PORT || config.port)