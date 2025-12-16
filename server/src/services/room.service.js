const { Room, Service, Amenity } = require('../models')

const createRoom = async (data) => {
  return await Room.create(data)
}

const getAllRooms = async () => {
  return await Room.findAll({
    include: [
      { model: Service, as: 'services' },
      { model: Amenity, as: 'amenities' },
    ],
  })
}

const getRoomById = async (id) => {
  return await Room.findByPk(id, {
    include: [
      { model: Service, as: 'services' },
      { model: Amenity, as: 'amenities' },
    ],
  })
}

const updateRoom = async (id, data) => {
  const room = await Room.findByPk(id)
  if (!room) return null

  await room.update(data)
  return room
}

const deleteRoom = async (id) => {
  const room = await Room.findByPk(id)
  if (!room) return false

  await room.destroy()
  return true
}

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
}
