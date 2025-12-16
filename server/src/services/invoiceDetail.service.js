const { InvoiceDetail } = require('../models')

class InvoiceDetailService {
  static async create(data) {
    return await InvoiceDetail.create(data)
  }

  static async getAll() {
    return await InvoiceDetail.findAll()
  }

  static async getById(id) {
    return await InvoiceDetail.findByPk(id)
  }

  static async getByInvoice(invoiceId) {
    return await InvoiceDetail.findAll({
      where: { invoiceId },
    })
  }

  static async update(id, data) {
    const detail = await InvoiceDetail.findByPk(id)
    if (!detail) return null

    return await detail.update(data)
  }

  static async delete(id) {
    const detail = await InvoiceDetail.findByPk(id)
    if (!detail) return null

    await detail.destroy()
    return true
  }
}

module.exports = InvoiceDetailService
