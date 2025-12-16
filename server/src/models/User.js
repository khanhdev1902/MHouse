module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'User',
    {
      userId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userName: { type: DataTypes.STRING, allowNull: false },
      passwordHash: { type: DataTypes.STRING, allowNull: false },
      fullName: DataTypes.STRING,
      cccd: { type: DataTypes.STRING, unique: true },
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      role: { type: DataTypes.ENUM('admin', 'tenant'), defaultValue: 'tenant' },
      status: DataTypes.STRING,
    },
    { tableName: 'user', timestamps: true }
  )
}
