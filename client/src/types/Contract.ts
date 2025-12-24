import type { Room } from './Room'
import type { User } from './User'

// export type User = {
//   userId?: number
//   cccd?: string
//   fullName?: string
//   phone?: string
//   email?: string
//   address?: string
// }
export type Contract = {
  contractId: number
  roomId: number
  userId: number
  room?: Partial<Room>
  tenant?: Partial<User>
  owner?: Partial<User>
  startDate: string
  endDate: string
  deposit: number
  rentPrice: number
  status: 'active' | 'expired' | 'cancelled'
  note: string
}
export type ContractPayload = {
  roomId: number
  userId: number
  startDate: string
  endDate: string
  deposit: number
  rentPrice: number
  status: 'active' | 'expired' | 'cancelled'
  note?: string
}
