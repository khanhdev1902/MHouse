const { Contract, User, Room } = require('../models')

class ContractService {
  static async create(data) {
    return await Contract.create(data)
  }

  static async getAll() {
    return await Contract.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['userId', 'userName', 'phone'],
        },
        {
          model: Room,
          as: 'room',
          attributes: ['roomId', 'roomCode'],
        },
      ],
      order: [['createdAt', 'DESC']],
    })
  }

  static async getById(id) {
    return await Contract.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['userId', 'name', 'phone'],
        },
        {
          model: Room,
          as: 'room',
          attributes: ['roomId', 'roomName'],
        },
      ],
    })
  }

  static async update(id, data) {
    const contract = await Contract.findByPk(id)
    if (!contract) return null

    return await contract.update(data)
  }

  static async delete(id) {
    const contract = await Contract.findByPk(id)
    if (!contract) return null

    await contract.destroy()
    return true
  }

  static async updateStatus(id, status) {
    const contract = await Contract.findByPk(id)
    if (!contract) return null

    return await contract.update({ status })
  }
}

module.exports = ContractService
