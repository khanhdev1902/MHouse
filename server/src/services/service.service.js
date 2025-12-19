const { Service, Room } = require('../models')

const createService = async (data) => {
  return await Service.create(data)
}

const getAllServices = async () => {
  return await Service.findAll({
    include: [{ model: Room, as: 'room' }],
  })
}

const getServiceById = async (id) => {
  return await Service.findByPk(id, {
    include: [{ model: Room, as: 'room' }],
  })
}

const updateService = async (id, data) => {
  const service = await Service.findByPk(id)
  if (!service) return null

  // Optional: validate roomId khi update
  // if (data.roomId) {
  //   const room = await Room.findByPk(data.roomId)
  //   if (!room) throw new Error('Room not found')
  // }

  await service.update(data)
  return service
}

const deleteService = async (id) => {
  const service = await Service.findByPk(id)
  if (!service) return false

  await service.destroy()
  return true
}

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
}
