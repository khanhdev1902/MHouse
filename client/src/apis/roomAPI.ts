import type { Room } from '@/types/Room'
import http from './httpClient'

const roomAPI = {
  getRooms: () => http.get('/rooms'),
  getRoomById: (id: number) => http.get<Room>(`/rooms/${id}`),
  createRoom: (data: Omit<Room, 'id'>) => http.post('/rooms', data),
  updateRoom: (id: number, data: Partial<Room>) => http.put(`/rooms/${id}`, data),
  deleteRoom: (id: number) => http.delete(`/rooms/${id}`),
}

export default roomAPI
