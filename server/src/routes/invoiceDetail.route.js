const express = require('express')
const router = express.Router()
const invoiceDetailController = require('../controllers/invoiceDetail.controller')

router.post('/', invoiceDetailController.create)
router.get('/', invoiceDetailController.getAll)
router.get('/:id', invoiceDetailController.getById)
router.get('/invoice/:invoiceId', invoiceDetailController.getByInvoice)
router.put('/:id', invoiceDetailController.update)
router.delete('/:id', invoiceDetailController.delete)

module.exports = router
