module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Service',
    {
      serviceId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      quantity: DataTypes.FLOAT,
      unit: DataTypes.STRING,
      note: DataTypes.STRING,
    },
    { tableName: 'service', timestamps: false }
  )
}
