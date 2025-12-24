const { User, Room } = require('../models')

const getDashboardData = async () => {
  const totalUsers = await User.count()
  const totalRooms = await Room.count()
  const availableRooms = await Room.count({ where: { status: 'available' } })
  const maintenanceRooms = await Room.count({ where: { status: 'maintenance' } })
  const occupiedRooms = await Room.count({ where: { status: 'occupied' } })
  const top5UserRenters = await User.findAll({
    where: { role: 'tenant' },
    order: [['createdAt', 'DESC']],
    limit: 5,
  })
  return {
    totalUsers,
    totalRooms,
    availableRooms,
    maintenanceRooms,
    occupiedRooms,
    top5UserRenters,
  }
}

module.exports = {
  getDashboardData,
}
