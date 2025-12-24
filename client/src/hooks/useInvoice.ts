import { useEffect, useState } from 'react'
import type { Invoice } from '@/types/Invoice'
import { toast } from 'sonner'
import InvoiceAPI from '@/apis/invoiceAPI'

export function useInvoice() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /* ================= GET ALL ================= */
  const fetchInvoices = async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await InvoiceAPI.getInvoices()
      setInvoices(res.data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err)
      setError('Không thể tải danh sách hóa đơn')
      toast.error('Lỗi tải danh sách hóa đơn')
    } finally {
      setLoading(false)
    }
  }

  /* ================= GET BY ID ================= */
  const getInvoiceById = async (id: number) => {
    try {
      const res = await InvoiceAPI.getInvoiceById(id)
      return res.data as Invoice
    } catch (err) {
      console.error(err)
      toast.error('Không tìm thấy hóa đơn')
      return null
    }
  }

  /* ================= CREATE ================= */
  const createInvoice = async (payload: Partial<Invoice>) => {
    try {
      const res = await InvoiceAPI.createInvoice(payload)
      setInvoices((prev) => [res.data, ...prev])
      toast.success('Tạo hóa đơn thành công')
      return res.data as Invoice
    } catch (err) {
      toast.error('Tạo hóa đơn thất bại')
      throw err
    }
  }

  /* ================= UPDATE ================= */
  const updateInvoice = async (id: number, payload: Partial<Invoice>) => {
    try {
      const res = await InvoiceAPI.updateInvoice(id, payload)

      setInvoices((prev) => prev.map((item) => (item.id === id ? res.data : item)))

      toast.success('Cập nhật hóa đơn thành công')
      return res.data as Invoice
    } catch (err) {
      toast.error('Cập nhật hóa đơn thất bại')
      throw err
    }
  }

  /* ================= DELETE ================= */
  const deleteInvoice = async (id: number) => {
    try {
      await InvoiceAPI.deleteInvoice(id)

      setInvoices((prev) => prev.filter((item) => item.id !== id))

      toast.success('Xóa hóa đơn thành công')
    } catch (err) {
      toast.error('Xóa hóa đơn thất bại')
      throw err
    }
  }

  /* ================= AUTO LOAD ================= */
  useEffect(() => {
    fetchInvoices()
  }, [])

  return {
    invoices,
    loading,
    error,

    fetchInvoices,
    getInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice,
  }
}
