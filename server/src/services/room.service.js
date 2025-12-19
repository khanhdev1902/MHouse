const { Room, Service, Amenity, Contract, User } = require('../models')

const createRoom = async (data) => {
  return await Room.create(data)
}

const getAllRooms = async () => {
  const rooms = await Room.findAll({
    include: [
      { model: Service, as: 'services' },
      { model: Amenity, as: 'amenities' },
      {
        model: Contract,
        as: 'contract', // lấy hợp đồng mới nhất hoặc active
        where: { status: 'active' },
        required: false,
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['userId', 'fullName', 'phone', 'email'],
          },
        ],
      },
    ],
  })

  // map ra tenant trực tiếp
  return rooms.map((room) => {
    const tenant = room.contract?.[0]?.user ?? null
    return {
      ...room.toJSON(),
      tenant, // thêm tenant trực tiếp
    }
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
  // Lấy room kèm services, amenities và hợp đồng active
  const room = await Room.findByPk(id, {
    include: [
      { model: Service, as: 'services' },
      { model: Amenity, as: 'amenities' },
      {
        model: Contract,
        as: 'contract',
        where: { status: 'active' },
        required: false,
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['userId', 'fullName', 'phone', 'email'],
          },
        ],
      },
    ],
  })

  if (!room) return null

  // Cập nhật dữ liệu
  await room.update(data)

  // Lấy tenant từ hợp đồng active (nếu có)
  const tenant = room.contract?.[0]?.user ?? null

  return {
    ...room.toJSON(),
    tenant, // trả kèm tenant trực tiếp
  }
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
