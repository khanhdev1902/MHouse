import InvoiceCard from '@/pages/Invoice/components/InvoiceCard'
// import { invoices } from '@/constants/invoice'
import InvoiceTable from './components/InvoiceTable'
import { type Invoice } from '@/types/Invoice'
import { useInvoiceFilter } from '@/hooks/useFilterInvoice'
import InvoiceFilterBar from './components/InvoiceFilterBar'
import Container from '@/components/Container'
import { CheckCircle, Clock, DollarSign, FileText } from 'lucide-react'
import { useInvoice } from '@/hooks/useInvoice'
import Loading from '@/components/Loading'

export default function Invoice() {
  const { invoices, loading } = useInvoice()
  const { filter, updateFilter, filtered } = useInvoiceFilter(invoices)
  if (loading) return <Loading />
  return (
    <Container className='flex flex-col gap-5'>
      <div className='grid grid-cols-4 gap-6'>
        <InvoiceCard
          title='Tổng doanh thu'
          value={12500000}
          icon={<DollarSign className='h-5 w-5' />}
        />
        <InvoiceCard title='Hóa đơn tháng này' value={filtered.length} icon={<FileText className='h-5 w-5' />} />
        <InvoiceCard title='Chưa thanh toán' value={filtered.filter(i=>i.status==='unpaid').length} icon={<Clock className='h-5 w-5' />} />
        <InvoiceCard title='Đã hoàn tất' value={filtered.filter(i=>i.status==='paid').length} icon={<CheckCircle className='h-5 w-5' />} />
      </div>

      <InvoiceFilterBar filter={filter} updateFilter={updateFilter} />
      <InvoiceTable INVOICE_DATA={filtered} />
    </Container>
  )
}
