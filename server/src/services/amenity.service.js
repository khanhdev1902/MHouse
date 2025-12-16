const { Amenity, Room } = require('../models')

const createAmenity = async (data) => {
  // validate room tồn tại
  if (data.roomId) {
    const room = await Room.findByPk(data.roomId)
    if (!room) throw new Error('Room not found')
  }

  return await Amenity.create(data)
}

const getAllAmenities = async () => {
  return await Amenity.findAll({
    include: [{ model: Room, as: 'room' }],
  })
}

const getAmenityById = async (id) => {
  return await Amenity.findByPk(id, {
    include: [{ model: Room, as: 'room' }],
  })
}

const updateAmenity = async (id, data) => {
  const amenity = await Amenity.findByPk(id)
  if (!amenity) return null

  if (data.roomId) {
    const room = await Room.findByPk(data.roomId)
    if (!room) throw new Error('Room not found')
  }

  await amenity.update(data)
  return amenity
}

const deleteAmenity = async (id) => {
  const amenity = await Amenity.findByPk(id)
  if (!amenity) return false

  await amenity.destroy()
  return true
}

module.exports = {
  createAmenity,
  getAllAmenities,
  getAmenityById,
  updateAmenity,
  deleteAmenity,
}
