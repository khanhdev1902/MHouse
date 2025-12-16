const { sequelize } = require('./config/database')
require('./models') // load toàn bộ model + association

module.exports = sequelize
//  npx sequelize-erd ./src/erd.js --output ./erd.svg