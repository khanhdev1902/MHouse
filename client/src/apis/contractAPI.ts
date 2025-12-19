import type { Contract } from '@/types/Contract'
import http from './httpClient'

const ContractAPI = {
  getContracts: () => http.get('/contracts'),
  getContractById: (id: number) => http.get<Contract>(`/contracts/${id}`),
  createContract: (data: Omit<Contract, 'contractId'>) => http.post('/contracts', data),
  updateContract: (id: number, data: Partial<Contract>) => http.put(`/contracts/${id}`, data),
  deleteContract: (id: number) => http.delete(`/contracts/${id}`),
}

export default ContractAPI
