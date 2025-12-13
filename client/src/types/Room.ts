import type { Service } from "./Service"

type Tenant = {
  name: string
  checkIn: string
  checkOut: string
}
export type Room = {
  id: number
  roomNumb: string
  floor: number
  images: string[]
  size: number
  price: number
  status: string
  category: string
  note: string
  currentTenant: Tenant | null
  amenities: string[]
  service: Service[]
}