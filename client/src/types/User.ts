export interface User {
  userId: number
  userName: string
  passwordHash: string
  fullName: string
  cccd: string
  phone: string
  email: string
  role: 'admin' | 'tenant'
  status: 'active' | 'inactive' | 'blocked'
  createdAt:string
}
