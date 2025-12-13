export type InvoiceStatus = 'paid' | 'unpaid' | 'late'
export type Invoice = {
  id: string
  room: string
  tenant: string
  month: string
  total: number
  status: InvoiceStatus
  dueDate: string
}
