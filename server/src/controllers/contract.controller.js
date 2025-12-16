const ContractService = require('../services/contract.service')

class ContractController {
  static async create(req, res) {
    try {
      const contract = await ContractService.create(req.body)
      res.status(201).json(contract)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }

  static async getAll(req, res) {
    try {
      const contracts = await ContractService.getAll()
      res.json(contracts)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  static async getById(req, res) {
    try {
      const contract = await ContractService.getById(req.params.id)
      if (!contract)
        return res.status(404).json({ message: 'Contract not found' })

      res.json(contract)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  static async update(req, res) {
    try {
      const contract = await ContractService.update(req.params.id, req.body)
      if (!contract)
        return res.status(404).json({ message: 'Contract not found' })

      res.json(contract)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }

  static async delete(req, res) {
    try {
      const success = await ContractService.delete(req.params.id)
      if (!success)
        return res.status(404).json({ message: 'Contract not found' })

      res.json({ message: 'Contract deleted successfully' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  static async updateStatus(req, res) {
    try {
      const contract = await ContractService.updateStatus(
        req.params.id,
        req.body.status
      )
      if (!contract)
        return res.status(404).json({ message: 'Contract not found' })

      res.json(contract)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
}

module.exports = ContractController
