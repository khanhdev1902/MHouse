require('dotenv').config()
const { Sequelize } = require('sequelize')

const options = {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'mysql',
  logging: process.env.DB_LOGGING === 'true',
}

if (process.env.DB_SSL === 'true') {
  options.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  }
}

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, options)

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ Database connected successfully!')

    await sequelize.sync({ alter: process.env.DB_SYNC === 'alter' })
    console.log('✅ All models were synchronized successfully!')
  } catch (err) {
    console.error('❌ Unable to connect or sync DB:', err)
    process.exit(1)
  }
}

module.exports = { sequelize, connectDB }
