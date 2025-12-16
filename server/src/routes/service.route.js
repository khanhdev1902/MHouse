const express = require('express')
const serviceController = require('../controllers/service.controller')

const router = express.Router()

router.post('/', serviceController.createService)
router.get('/', serviceController.getAllServices)
router.get('/:id', serviceController.getServiceById)
router.put('/:id', serviceController.updateService)
router.delete('/:id', serviceController.deleteService)

module.exports = router
