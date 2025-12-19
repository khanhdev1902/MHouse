import type { Room } from "./Room"

export type User = {
  userId?: number
  cccd?: string
  fullName?: string
  phone?: string
  email?: string
}
export type Contract = {
  contractId: number
  room: Room
  user: User
  startDate: string
  endDate: string
  deposit: number
  rentPrice: number
  status: 'active' | 'expired' | 'cancelled'
  note?: string
}
