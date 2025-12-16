const { Invoice, Room, Contract, InvoiceDetail, Payment } = require('../models')

const createInvoice = async (data) => {
  // validate room
  if (data.roomId) {
    const room = await Room.findByPk(data.roomId)
    if (!room) throw new Error('Room not found')
  }

  // validate contract
  if (data.contractId) {
    const contract = await Contract.findByPk(data.contractId)
    if (!contract) throw new Error('Contract not found')
  }

  return await Invoice.create(data)
}

const getAllInvoices = async () => {
  return await Invoice.findAll({
    include: [
      { model: Room, as: 'room' },
      { model: Contract, as: 'contract' },
      { model: InvoiceDetail, as: 'details' },
      { model: Payment, as: 'payments' },
    ],
  })
}

const getInvoiceById = async (id) => {
  return await Invoice.findByPk(id, {
    include: [
      { model: Room, as: 'room' },
      { model: Contract, as: 'contract' },
      { model: InvoiceDetail, as: 'details' },
      { model: Payment, as: 'payments' },
    ],
  })
}

const updateInvoice = async (id, data) => {
  const invoice = await Invoice.findByPk(id)
  if (!invoice) return null

  if (data.roomId) {
    const room = await Room.findByPk(data.roomId)
    if (!room) throw new Error('Room not found')
  }

  if (data.contractId) {
    const contract = await Contract.findByPk(data.contractId)
    if (!contract) throw new Error('Contract not found')
  }

  await invoice.update(data)
  return invoice
}

const deleteInvoice = async (id) => {
  const invoice = await Invoice.findByPk(id)
  if (!invoice) return false

  await invoice.destroy()
  return true
}

module.exports = {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
}
