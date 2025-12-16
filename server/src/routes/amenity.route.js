const express = require('express')
const amenityController = require('../controllers/amenity.controller')

const router = express.Router()

router.post('/', amenityController.createAmenity)
router.get('/', amenityController.getAllAmenities)
router.get('/:id', amenityController.getAmenityById)
router.put('/:id', amenityController.updateAmenity)
router.delete('/:id', amenityController.deleteAmenity)

module.exports = router
