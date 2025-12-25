import InvoiceCard from '@/pages/Invoice/components/InvoiceCard'
import InvoiceTable from './components/InvoiceTable'
import { useInvoiceFilter } from '@/hooks/useFilterInvoice'
import InvoiceFilterBar from './components/InvoiceFilterBar'
import Container from '@/components/Container'
import { CheckCircle, Clock, DollarSign, FileText } from 'lucide-react'
import { useInvoice } from '@/hooks/useInvoice'
import Loading from '@/components/Loading'

export default function InvoicePage() {
  const { invoices, loading } = useInvoice()
  const { filter, updateFilter, filtered } = useInvoiceFilter(
    invoices.filter(
      (inv) => inv.userId === JSON.parse(localStorage.getItem('user') || 'null')?.userId
    )
  )
  const totalPaidAmount = filtered
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + (inv.totalAmount || 0), 0)

  if (loading) return <Loading />
  return (
    <Container className='flex flex-col gap-5'>
      <div className='grid grid-cols-4 gap-6'>
        <InvoiceCard
          title='Tổng tiền đã thanh toán'
          value={totalPaidAmount}
          icon={<DollarSign className='h-5 w-5' />}
        />
        <InvoiceCard
          title='Hóa đơn tháng này'
          value={filtered.length}
          icon={<FileText className='h-5 w-5' />}
        />
        <InvoiceCard
          title='Chưa thanh toán'
          value={filtered.filter((i) => i.status === 'unpaid').length}
          icon={<Clock className='h-5 w-5' />}
        />
        <InvoiceCard
          title='Đã hoàn tất'
          value={filtered.filter((i) => i.status === 'paid').length}
          icon={<CheckCircle className='h-5 w-5' />}
        />
      </div>

      <InvoiceFilterBar filter={filter} updateFilter={updateFilter} />
      <InvoiceTable INVOICE_DATA={filtered} />
    </Container>
  )
}
