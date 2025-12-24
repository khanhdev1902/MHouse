const { Invoice, Room, Contract, InvoiceDetail, Payment, User } = require('../models')

/* ================= INCLUDE ================= */
const invoiceInclude = [
  {
    model: Room,
    as: 'room',
    attributes: ['roomId', 'roomCode'],
  },
  {
    model: Contract,
    as: 'contract',
    attributes: ['contractId'],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['userId', 'fullName', 'phone', 'email'],
      },
    ],
  },
  {
    model: InvoiceDetail,
    as: 'details',
  },
  {
    model: Payment,
    as: 'payments',
  },
]

/* ================= FORMAT ================= */
const formatInvoice = (invoice) => {
  if (!invoice) return null

  return {
    id: invoice.invoiceId,
    room: invoice.room?.roomCode || '',
    tenant: invoice.contract?.user?.fullName || '',
    month: invoice.month,
    total: invoice.totalAmount || 0,
    status: invoice.status,
    dueDate: invoice.dueDate || '',
    details: invoice.details || [],
  }
}

const formatInvoices = (invoices = []) => {
  return invoices.map(formatInvoice)
}

/* ================= CREATE ================= */
const createInvoice = async (data) => {
  if (data.roomId) {
    const room = await Room.findByPk(data.roomId)
    if (!room) throw new Error('Room not found')
  }

  if (data.contractId) {
    const contract = await Contract.findByPk(data.contractId)
    if (!contract) throw new Error('Contract not found')
  }

  const invoice = await Invoice.create(data)

  const fullInvoice = await Invoice.findByPk(invoice.invoiceId, {
    include: invoiceInclude,
  })

  return formatInvoice(fullInvoice)
}

/* ================= GET ALL ================= */
const getAllInvoices = async () => {
  const invoices = await Invoice.findAll({
    include: invoiceInclude,
    order: [['createdAt', 'DESC']],
  })

  return formatInvoices(invoices)
}

/* ================= GET BY ID ================= */
const getInvoiceById = async (id) => {
  const invoice = await Invoice.findByPk(id, {
    include: invoiceInclude,
  })

  return formatInvoice(invoice)
}

/* ================= UPDATE ================= */
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

  const fullInvoice = await Invoice.findByPk(id, {
    include: invoiceInclude,
  })

  return formatInvoice(fullInvoice)
}

/* ================= DELETE ================= */
const deleteInvoice = async (id) => {
  const invoice = await Invoice.findByPk(id, {
    include: invoiceInclude,
  })
  if (!invoice) return null

  await invoice.destroy()
  return formatInvoice(invoice)
}

module.exports = {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
}
