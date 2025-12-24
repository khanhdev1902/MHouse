import http from './httpClient'

const InvoiceAPI = {
  getInvoices: () => http.get('/invoices'),
  getInvoiceById: (id: number) => http.get(`/invoices/${id}`),
  createInvoice: (data: object) => http.post('/invoices', data),
  updateInvoice: (id: number, data: object) => http.put(`/invoices/${id}`, data),
  deleteInvoice: (id: number) => http.delete(`/invoices/${id}`),
  updateInvoiceStatus: (id: number, status: 'paid' | 'unpaid' | 'overdue') =>
    http.patch(`/invoices/${id}/status`, { status }),
}

export default InvoiceAPI
