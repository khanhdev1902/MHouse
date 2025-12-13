import InvoiceCard from '@/pages/Invoice/components/InvoiceCard'
import { invoices } from '@/constants/invoice'
import InvoiceTable from './components/InvoiceTable'
import { type Invoice } from '@/types/Invoice'
import { useInvoiceFilter } from '@/hooks/useInvoice'
import InvoiceFilterBar from './components/InvoiceFilterBar'

const InvoiceCards = [
  {
    title: 'Hóa đơn tháng này',
    value: 20,
  },
  {
    title: 'Đã thanh toán',
    value: 12,
  },
  {
    title: 'Chưa thanh toán',
    value: 8,
  },
  {
    title: 'Quá hạn',
    value: 0,
  },
  {
    title: 'Tổng doanh thu tháng',
    value: 19000000,
  },
  {
    title: 'Tổng nợ chưa thu',
    value: 19000000,
  },
]

export default function Invoice() {
  const { filter, updateFilter, filtered } = useInvoiceFilter(invoices)
  return (
    <div className='w-full h-full p-5 flex flex-col gap-5'>
      <div className='flex flex-row justify-between items-center gap-3'>
        {InvoiceCards.map((item, key) => (
          <InvoiceCard key={key} title={item.title} value={item.value} />
        ))}
      </div>

      <InvoiceFilterBar filter={filter} updateFilter={updateFilter} />
      <InvoiceTable INVOICE_DATA={filtered} />
    </div>
  )
}
