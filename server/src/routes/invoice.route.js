const express = require('express')
const invoiceController = require('../controllers/invoice.controller')

const router = express.Router()

router.post('/', invoiceController.createInvoice)
router.get('/', invoiceController.getAllInvoices)
router.get('/:id', invoiceController.getInvoiceById)
router.put('/:id', invoiceController.updateInvoice)
router.delete('/:id', invoiceController.deleteInvoice)

module.exports = router
