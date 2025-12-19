import type { Service } from '@/types/Service'
import http from './httpClient'

const ServiceAPI = {
  getServices: () => http.get('/services'),
  getServiceById: (id: number) => http.get<Service>(`/services/${id}`),
  createService: (data: Omit<Service, 'id'>) => http.post('/services', data),
  updateService: (id: number, data: Partial<Service>) => http.put(`/services/${id}`, data),
  deleteService: (id: number) => http.delete(`/services/${id}`),
}

export default ServiceAPI
