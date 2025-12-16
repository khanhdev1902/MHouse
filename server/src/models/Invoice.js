module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Invoice',
    {
      invoiceId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      month: DataTypes.STRING,
      totalAmount: DataTypes.FLOAT,
      status: {
        type: DataTypes.ENUM('unpaid', 'paid', 'overdue'),
        defaultValue: 'unpaid',
      },
    },
    { tableName: 'invoice', timestamps: true }
  )
}
