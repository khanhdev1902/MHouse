const { Chat, User } = require('../models')

class ChatService {
  static async create(data) {
    const chat = await Chat.create(data)
    return await Chat.findByPk(chat.chatId, {
      include: [
        { model: User, as: 'user', attributes: ['userId', 'userName', 'fullName', 'role'] },
      ],
    })
  }

  static async getAll() {
    return await Chat.findAll({
      include: [
        { model: User, as: 'user', attributes: ['userId', 'userName', 'fullName', 'role'] },
      ],
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
