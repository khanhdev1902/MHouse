module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Invoice',
    {
      invoiceId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      month: DataTypes.STRING,
      totalAmount: DataTypes.FLOAT,
      dueDate: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM('unpaid', 'paid', 'overdue'),
        defaultValue: 'unpaid',
      },
      paymentMethod: DataTypes.STRING,
      transId: DataTypes.STRING,
    },
    { tableName: 'invoice', timestamps: true }
  )
}
