const ChatService = require('../services/chat.service')

class ChatController {
  static async create(req, res) {
    try {
      const chat = await ChatService.create(req.body)
      res.status(201).json(chat)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }

  static async getAll(req, res) {
    try {
      const chats = await ChatService.getAll()
      res.json(chats)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  static async getById(req, res) {
    try {
      const chat = await ChatService.getById(req.params.id)
      if (!chat)
        return res.status(404).json({ message: 'Chat not found' })

      res.json(chat)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  static async delete(req, res) {
    try {
      const success = await ChatService.delete(req.params.id)
      if (!success)
        return res.status(404).json({ message: 'Chat not found' })

      res.json({ message: 'Chat deleted successfully' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

module.exports = ChatController
