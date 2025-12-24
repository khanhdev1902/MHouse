const { Contract, User, Room } = require('../models')

/* ===== HELPERS ===== */
const getOwner = async () => {
  return await User.findOne({
    where: { role: 'admin' },
    attributes: ['userId', 'fullName', 'phone', 'email'],
  })
}

const formatContract = (contract, owner) => {
  if (!contract) return null
  const c = contract.toJSON()

  return {
    contractId: c.contractId,
    startDate: c.startDate,
    endDate: c.endDate,
    deposit: c.deposit,
    rentPrice: c.rentPrice,
    status: c.status,
    note: c.note,

    room: c.room ?? null,
    tenant: c.user ?? null,
    owner,
  }
}

/* ===== SERVICE ===== */
class ContractService {
  static async create(data) {
    const contract = await Contract.create(data)

    const fullContract = await Contract.findByPk(contract.contractId, {
      include: [
        { model: User, as: 'user', attributes: ['userId', 'fullName', 'phone', 'email'] },
        { model: Room, as: 'room' },
      ],
    })

    const owner = await getOwner()
    return formatContract(fullContract, owner)
  }

  static async getAll() {
    const owner = await getOwner()

    const contracts = await Contract.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['userId', 'cccd', 'phone', 'fullName', 'email', 'address'],
        },
        { model: Room, as: 'room' },
      ],
      order: [['createdAt', 'DESC']],
    })

    return contracts.map((c) => formatContract(c, owner))
  }

  static async getById(id) {
    const contract = await Contract.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['userId', 'cccd', 'phone', 'fullName', 'email', 'address'],
        },
        { model: Room, as: 'room' },
      ],
    })

    const owner = await getOwner()
    return formatContract(contract, owner)
  }

  static async update(id, data) {
    const contract = await Contract.findByPk(id)
    if (!contract) return null

    await contract.update(data)

    return await this.getById(id)
  }

  static async updateStatus(id, status) {
    const contract = await Contract.findByPk(id)
    if (!contract) return null

    await contract.update({ status })

    return await this.getById(id)
  }

  static async delete(id) {
    const contract = await Contract.findByPk(id)
    if (!contract) return null

    await contract.destroy()
    return true
  }
}

module.exports = ContractService
