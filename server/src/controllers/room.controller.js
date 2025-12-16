const roomService = require('../services/room.service')

const createRoom = async (req, res) => {
  try {
    const room = await roomService.createRoom(req.body)
    res.status(201).json(room)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAllRooms = async (req, res) => {
  try {
    const rooms = await roomService.getAllRooms()
    res.json(rooms)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getRoomById = async (req, res) => {
  try {
    const room = await roomService.getRoomById(req.params.id)
    if (!room) {
      return res.status(404).json({ message: 'Room not found' })
    }
    res.json(room)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateRoom = async (req, res) => {
  try {
    const room = await roomService.updateRoom(req.params.id, req.body)
    if (!room) {
      return res.status(404).json({ message: 'Room not found' })
    }
    res.json(room)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteRoom = async (req, res) => {
  try {
    const success = await roomService.deleteRoom(req.params.id)
    if (!success) {
      return res.status(404).json({ message: 'Room not found' })
    }
    res.json({ message: 'Room deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
}
