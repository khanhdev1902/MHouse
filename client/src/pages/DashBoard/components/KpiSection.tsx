import { TrendingUp, Building2, DoorOpen, Users, FileMinus } from 'lucide-react'
import { KpiCard } from './KpiCard'

const kpis = [
  {
    title: 'Doanh thu tháng này',
    value: 1902000000,
    icon: TrendingUp,
  },
  {
    title: 'Hóa đơn chưa thanh toán',
    value: 2400000,
    icon: FileMinus,
  },
  {
    title: 'Tổng số phòng',
    value: 30,
    icon: Building2,
  },
  {
    title: 'Số phòng còn trống',
    value: 12,
    icon: DoorOpen,
  },
  {
    title: 'Người dùng hoạt động',
    value: 12,
    icon: Users,
  },
]

export default function KpiSection() {
  return (
    <div className='w-full flex flex-row justify-between item-center gap-3'>
      {kpis.map((item, key) => (
        <KpiCard key={key} title={item.title} value={item.value} icon={item.icon} />
      ))}
    </div>
  )
}
