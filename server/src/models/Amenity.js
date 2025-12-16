module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Amenity',
    {
      amenityId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
    },
    { tableName: 'amenities', timestamps: false }
  )
}
