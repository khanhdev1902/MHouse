const { sequelize } = require('../config/database')
const { DataTypes } = require('sequelize')

const User = require('./User')(sequelize, DataTypes)
const Room = require('./Room')(sequelize, DataTypes)
const Contract = require('./Contract')(sequelize, DataTypes)
const Invoice = require('./Invoice')(sequelize, DataTypes)
const InvoiceDetail = require('./InvoiceDetail')(sequelize, DataTypes)
const Payment = require('./Payment')(sequelize, DataTypes)
const Service = require('./Service')(sequelize, DataTypes)
const Amenity = require('./Amenity')(sequelize, DataTypes)
const Chat = require('./Chat')(sequelize, DataTypes)
/* ===== ASSOCIATIONS ===== */

// User – Contract
User.hasMany(Contract, { foreignKey: 'userId', as: 'contract' })
Contract.belongsTo(User, { foreignKey: 'userId', as: 'user' })

// Room – Contract
Room.hasMany(Contract, { foreignKey: 'roomId', as: 'contract' })
Contract.belongsTo(Room, { foreignKey: 'roomId', as: 'room' })

// Room – Invoice (hoá đơn theo phòng)
Room.hasMany(Invoice, { foreignKey: 'roomId', as: 'invoices' })
Invoice.belongsTo(Room, { foreignKey: 'roomId', as: 'room' })

// Contract – Invoice (hoá đơn theo hợp đồng)
Contract.hasMany(Invoice, { foreignKey: 'contractId', as: 'invoices' })
Invoice.belongsTo(Contract, { foreignKey: 'contractId', as: 'contract' })

// Invoice – InvoiceDetail
Invoice.hasMany(InvoiceDetail, { foreignKey: 'invoiceId', as: 'details' })
InvoiceDetail.belongsTo(Invoice, { foreignKey: 'invoiceId', as: 'invoice' })

// Invoice – Payment
Invoice.hasMany(Payment, { foreignKey: 'invoiceId', as: 'payments' })
Payment.belongsTo(Invoice, { foreignKey: 'invoiceId', as: 'invoice' })

// User – Chat
User.hasMany(Chat, { foreignKey: 'userId', as: 'chats' })
Chat.belongsTo(User, { foreignKey: 'userId', as: 'user' })

// Room – Service (1 phòng có nhiều dịch vụ RIÊNG)
Room.hasMany(Service, { foreignKey: 'roomId', as: 'services' })
Service.belongsTo(Room, { foreignKey: 'roomId', as: 'room' })

// Room – Amenity (tiện ích gắn cố định với phòng)
Room.hasMany(Amenity, { foreignKey: 'roomId', as: 'amenities' })
Amenity.belongsTo(Room, { foreignKey: 'roomId', as: 'room' })

/* ===== EXPORT ===== */
module.exports = {
  sequelize,
  User,
  Room,
  Contract,
  Invoice,
  InvoiceDetail,
  Payment,
  Service,
  Amenity,
  Chat,
}
