import { TrendingUp, Building2, DoorOpen, Users, FileMinus } from 'lucide-react'
import { KpiCard } from './KpiCard'
import type { HomeData } from '../HomePage'

export default function KpiSection({
  unCostedInvoiceThisMonth = 0,
  CostedInvoiceThisMonth = 0,
  totalInvoices = 0,
  unpaidInvoices = 0,
  paidInvoices = 0,
}: HomeData) {
  const kpis = [
    {
      title: 'Tổng tiền đã thanh toán',
      value: CostedInvoiceThisMonth,
      icon: TrendingUp,
    },
    {
      title: 'Nợ tiền phòng tháng này',
      value: unCostedInvoiceThisMonth,
      icon: FileMinus,
    },
    {
      title: 'Số hóa đơn của bạn',
      value: totalInvoices,
      icon: Building2,
    },
    {
      title: 'Số hóa đơn đã thanh toán',
      value: paidInvoices,
      icon: DoorOpen,
    },
    {
      title: 'Số hóa đơn chưa thanh toán',
      value: unpaidInvoices,
      icon: Users,
    },
  ]

  return (
    <div className='w-full flex flex-row gap-3'>
      {kpis.map((item, index) => (
        <KpiCard key={index} title={item.title} value={item.value} icon={item.icon} />
      ))}
    </div>
  )
}
