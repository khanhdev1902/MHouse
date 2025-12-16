const invoiceService = require('../services/invoice.service')

const createInvoice = async (req, res) => {
  try {
    const invoice = await invoiceService.createInvoice(req.body)
    res.status(201).json(invoice)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAllInvoices = async (req, res) => {
  try {
    const invoices = await invoiceService.getAllInvoices()
    res.json(invoices)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getInvoiceById = async (req, res) => {
  try {
    const invoice = await invoiceService.getInvoiceById(req.params.id)
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' })
    }
    res.json(invoice)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateInvoice = async (req, res) => {
  try {
    const invoice = await invoiceService.updateInvoice(req.params.id, req.body)
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' })
    }
    res.json(invoice)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteInvoice = async (req, res) => {
  try {
    const success = await invoiceService.deleteInvoice(req.params.id)
    if (!success) {
      return res.status(404).json({ message: 'Invoice not found' })
    }
    res.json({ message: 'Invoice deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
}
