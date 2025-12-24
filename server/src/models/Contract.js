module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Contract',
    {
      contractId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      deposit: DataTypes.FLOAT,
      rentPrice: DataTypes.FLOAT,
      status: {
        type: DataTypes.ENUM('active', 'expired', 'cancelled'),
        defaultValue: 'active',
      },
      address: DataTypes.STRING,
      description: DataTypes.TEXT,
      ownId: DataTypes.INTEGER,
    },
    { tableName: 'contract', timestamps: true }
  )
}
