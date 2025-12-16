module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Chat',
    {
      chatId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      message: DataTypes.TEXT,
    },
    { tableName: 'chat', timestamps: true }
  )
}
