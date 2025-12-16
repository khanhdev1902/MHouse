module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'InvoiceDetail',
    {
      invoiceDetailId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      serviceName: DataTypes.STRING,
      quantity: DataTypes.FLOAT,
      unitPrice: DataTypes.FLOAT,
      amount: DataTypes.FLOAT,
    },
    { tableName: 'invoice_detail', timestamps: false }
  )
}
