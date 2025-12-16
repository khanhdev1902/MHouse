const express = require('express')
const ChatController = require('../controllers/chat.controller')

const router = express.Router()

router.post('/', ChatController.create)
router.get('/', ChatController.getAll)
router.get('/:id', ChatController.getById)
router.delete('/:id', ChatController.delete)

module.exports = router
