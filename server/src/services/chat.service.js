const { Chat, User } = require('../models')

class ChatService {
  static async create(data) {
    return await Chat.create(data)
  }

  static async getAll() {
    return await Chat.findAll({
      include: [{ model: User, attributes: ['userId', 'name'] }],
      order: [['createdAt', 'ASC']],
    })
  }

  static async getById(id) {
    return await Chat.findByPk(id, {
      include: [{ model: User, attributes: ['userId', 'name'] }],
    })
  }

  static async delete(id) {
    const chat = await Chat.findByPk(id)
    if (!chat) return null

    await chat.destroy()
    return true
  }
}

module.exports = ChatService
