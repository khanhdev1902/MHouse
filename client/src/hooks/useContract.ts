import { useState, useEffect } from 'react'
import ContractAPI from '@/apis/contractAPI'
import type { Contract } from '@/types/Contract'

export function useContract() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const fetchContracts = async () => {
    try {
      setLoading(true)
      const res = await ContractAPI.getContracts()
      setContracts(res.data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createContract = async (data: Omit<Contract, 'contractId'>) => {
    const res = await ContractAPI.createContract(data)
    setContracts((prev) => [...prev, res.data])
  }

  const updateContract = async (contractId: number, data: Partial<Contract>) => {
    const res = await ContractAPI.updateContract(contractId, data)
    setContracts((prev) => prev.map((c) => (c.contractId === contractId ? res.data : c)))
  }

  const deleteContract = async (contractId: number) => {
    await ContractAPI.deleteContract(contractId)
    setContracts((prev) => prev.filter((c) => c.contractId !== contractId))
  }

  useEffect(() => {
    fetchContracts()
  }, [])

  return {
    contracts,
    loading,
    error,
    createContract,
    updateContract,
    deleteContract,
  }
}
