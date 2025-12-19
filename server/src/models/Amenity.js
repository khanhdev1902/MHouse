module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Amenity',
    {
      amenityId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      // quantity: DataTypes.INTEGER,
    },
    { tableName: 'amenities', timestamps: false }
  )
}
