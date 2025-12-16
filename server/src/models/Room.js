module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Room',
    {
      roomId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      roomCode: DataTypes.STRING,
      size: DataTypes.FLOAT,
      floor: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      status: DataTypes.STRING,
      category: DataTypes.STRING,
      note: DataTypes.STRING,
    },
    { tableName: 'room', timestamps: true }
  )
}
