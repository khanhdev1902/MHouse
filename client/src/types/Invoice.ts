export type InvoiceStatus = 'paid' | 'unpaid' | 'late'
export type InvoiceDetail = {
  serviceName: string // Tên dịch vụ, ví dụ: "Tiền điện"
  quantity: number // Số lượng, ví dụ: 120
  unitPrice: number // Đơn giá, ví dụ: 3500
  amount: number // Thành tiền = quantity * unitPrice
  serviceId?: number
  name?: string
  price?: number
  unit?: string
  romId?: number
  note?: string
}

export type Invoice = {
  monthSelect: undefined | string | number
  yearSelect: undefined | string | number
  contractId: number
  userId?: number | null
  id: number
  room: string
  roomId: number
  tenant: string
  month: string
  total: number
  totalAmount: number
  status: InvoiceStatus
  dueDate: string
  details: InvoiceDetail[]
  costRoom?: number
  paymentMethod?: 'cash' | 'zalopay'
  transId?: string
}
