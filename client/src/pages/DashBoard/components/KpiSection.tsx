import { TrendingUp, Building2, DoorOpen, Users, FileMinus } from 'lucide-react'
import { KpiCard } from './KpiCard'
import type { DashBoardData } from '..'

export default function KpiSection({
  totalRooms = 0,
  totalUsers = 0,
  availableRooms = 0,
  totalAmount = 0,
  totalUnpaid = 0,
}:
DashBoardData) {
  const kpis = [
    {
      title: 'Tổng doanh thu',
      value: totalAmount,
      icon: TrendingUp,
    },
    {
      title: 'Hóa đơn chưa thanh toán',
      value: totalUnpaid,
      icon: FileMinus,
    },
    {
      title: 'Tổng số phòng',
      value: totalRooms,
      icon: Building2,
    },
    {
      title: 'Số phòng còn trống',
      value: availableRooms,
      icon: DoorOpen,
    },
    {
      title: 'Người dùng hoạt động',
      value: totalUsers,
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
