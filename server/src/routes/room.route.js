const express = require('express')
const roomController = require('../controllers/room.controller')

const router = express.Router()

router.post('/', roomController.createRoom)
router.get('/', roomController.getAllRooms)
router.get('/:id', roomController.getRoomById)
router.put('/:id', roomController.updateRoom)
router.delete('/:id', roomController.deleteRoom)

module.exports = router
