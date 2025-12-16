const express = require('express')
const ContractController = require('../controllers/contract.controller')

const router = express.Router()

router.post('/', ContractController.create)
router.get('/', ContractController.getAll)
router.get('/:id', ContractController.getById)
router.put('/:id', ContractController.update)
router.delete('/:id', ContractController.delete)

// update status (active / expired / cancelled)
router.patch('/:id/status', ContractController.updateStatus)

module.exports = router
