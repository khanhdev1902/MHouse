const InvoiceDetailService = require('../services/invoiceDetail.service')

class InvoiceDetailController {
  async create(req, res) {
    try {
      const detail = await InvoiceDetailService.create(req.body)
      res.status(201).json(detail)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async getAll(req, res) {
    try {
      const details = await InvoiceDetailService.getAll()
      res.json(details)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async getById(req, res) {
    try {
      const detail = await InvoiceDetailService.getById(req.params.id)
      if (!detail) {
        return res.status(404).json({ message: 'Invoice detail not found' })
      }
      res.json(detail)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async getByInvoice(req, res) {
    try {
      const details = await InvoiceDetailService.getByInvoice(
        req.params.invoiceId
      )
      res.json(details)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async update(req, res) {
    try {
      const detail = await InvoiceDetailService.update(
        req.params.id,
        req.body
      )
      if (!detail) {
        return res.status(404).json({ message: 'Invoice detail not found' })
      }
      res.json(detail)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async delete(req, res) {
    try {
      const success = await InvoiceDetailService.delete(req.params.id)
      if (!success) {
        return res.status(404).json({ message: 'Invoice detail not found' })
      }
      res.json({ message: 'Invoice detail deleted successfully' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

module.exports = new InvoiceDetailController()
