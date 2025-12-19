import type { User } from '@/types/User'
import http from './httpClient'

const userAPI = {
  getUsers: () => http.get('/users'),
  getUserById: (id: number) => http.get<User>(`/users/${id}`),
  createUser: (data: Omit<User, 'id'>) => http.post('/users', data),
  updateUser: (id: number, data: Partial<User>) => http.put(`/users/${id}`, data),
  deleteUser: (id: number) => http.delete(`/users/${id}`),
}

export default userAPI
