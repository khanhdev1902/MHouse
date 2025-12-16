module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Payment',
    {
      paymentId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      amount: DataTypes.FLOAT,
      paymentMethod: {
        type: DataTypes.ENUM('cash', 'banking', 'momo'),
      },
      paymentDate: DataTypes.DATE,
      note: DataTypes.STRING,
    },
    { tableName: 'payment', timestamps: false }
  )
}
