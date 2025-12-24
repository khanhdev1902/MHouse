export type InvoiceStatus = 'paid' | 'unpaid' | 'late'
export type Invoice = {
  id: number
  room: string
  roomId: number
  tenant: string
  month: string
  total: number
  status: InvoiceStatus
  dueDate: string
  details: object[]
}