// import type { Service } from "./Service"

// type Tenant = {
//   name: string
//   checkIn: string
//   checkOut: string
// }
// export type Room = {
//   id: number
//   roomNumb: string
//   floor: number
//   images: string[]
//   size: number
//   price: number
//   status: string
//   category: string
//   note: string
//   currentTenant: Tenant | null
//   amenities: string[]
//   service: Service[]
// }

export interface Service {
  serviceId: number
  name: string
  price: number
  unit?: string
}

export interface Amenity {
  amenityId: number
  name: string
  description?: string
}
export interface Room {
  roomId: number
  roomCode: string
  size: number            // m²
  floor: number
  price: number
  status: "available" | "occupied" | "maintenance"
  category: "standard" | "vip"
  note?: string
  createdAt: string
  updatedAt: string
  services: Service[]
  amenities: Amenity[]
}
