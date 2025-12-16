const amenityService = require('../services/amenity.service')

const createAmenity = async (req, res) => {
  try {
    const amenity = await amenityService.createAmenity(req.body)
    res.status(201).json(amenity)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAllAmenities = async (req, res) => {
  try {
    const amenities = await amenityService.getAllAmenities()
    res.json(amenities)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAmenityById = async (req, res) => {
  try {
    const amenity = await amenityService.getAmenityById(req.params.id)
    if (!amenity) {
      return res.status(404).json({ message: 'Amenity not found' })
    }
    res.json(amenity)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateAmenity = async (req, res) => {
  try {
    const amenity = await amenityService.updateAmenity(req.params.id, req.body)
    if (!amenity) {
      return res.status(404).json({ message: 'Amenity not found' })
    }
    res.json(amenity)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteAmenity = async (req, res) => {
  try {
    const success = await amenityService.deleteAmenity(req.params.id)
    if (!success) {
      return res.status(404).json({ message: 'Amenity not found' })
    }
    res.json({ message: 'Amenity deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createAmenity,
  getAllAmenities,
  getAmenityById,
  updateAmenity,
  deleteAmenity,
}
