module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'mongodb://localhost:27017/K-Bros',
  }
}