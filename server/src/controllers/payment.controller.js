const PaymentService = require('../services/payment.service')

class PaymentController {
  static async create(req, res) {
    try {
      const payment = await PaymentService.create(req.body)
      res.status(201).json(payment)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }

  static async getAll(req, res) {
    try {
      const payments = await PaymentService.getAll()
      res.json(payments)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  static async getById(req, res) {
    try {
      const payment = await PaymentService.getById(req.params.id)
      if (!payment)
        return res.status(404).json({ message: 'Payment not found' })

      res.json(payment)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  static async update(req, res) {
    try {
      const payment = await PaymentService.update(req.params.id, req.body)
      if (!payment)
        return res.status(404).json({ message: 'Payment not found' })

      res.json(payment)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }

  static async delete(req, res) {
    try {
      const success = await PaymentService.delete(req.params.id)
      if (!success)
        return res.status(404).json({ message: 'Payment not found' })

      res.json({ message: 'Payment deleted successfully' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

module.exports = PaymentController
