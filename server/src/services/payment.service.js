const { Payment } = require('../models')

class PaymentService {
  static async create(data) {
    return await Payment.create(data)
  }

  static async getAll() {
    return await Payment.findAll({
      order: [['paymentDate', 'DESC']],
    })
  }

  static async getById(id) {
    return await Payment.findByPk(id)
  }

  static async update(id, data) {
    const payment = await Payment.findByPk(id)
    if (!payment) return null

    return await payment.update(data)
  }

  static async delete(id) {
    const payment = await Payment.findByPk(id)
    if (!payment) return null

    await payment.destroy()
    return true
  }
}

module.exports = PaymentService
