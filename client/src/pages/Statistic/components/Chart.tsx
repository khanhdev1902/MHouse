/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { cn } from '@/lib/utils' // Đảm bảo bạn có file này nếu dùng Shadcn
import dayjs from 'dayjs'
import { useInvoice } from '@/hooks/useInvoice'

interface DashboardChartsProps {
  availableRooms?: number
  occupiedRooms?: number
  maintenanceRooms?: number
  className?: string
}

const COLORS = {
  available: '#10b981', // Emerald 500
  occupied: '#3b82f6', // Blue 500
  maintenance: '#f59e0b', // Amber 500
}

const PIE_COLORS = [COLORS.available, COLORS.occupied, COLORS.maintenance]
/* ================= CUSTOM TOOLTIP ================= */
const CustomTooltip = ({ active, payload, label, isPie }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white/80 backdrop-blur-md border border-slate-200 p-4 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-300'>
        <p className='text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2'>
          {label || payload[0].name}
        </p>
        <div className='flex items-center gap-2'>
          {!isPie && <div className='w-1 h-4 bg-blue-500 rounded-full' />}
          <p className='text-sm font-bold text-slate-800'>
            {isPie
              ? `${payload[0].value} phòng (${(payload[0].payload.percent * 100).toFixed(1)}%)`
              : `${payload[0].value.toLocaleString('vi-VN')} ₫`}
          </p>
        </div>
      </div>
    )
  }
  return null
}

export default function StatisticCharts({
  availableRooms = 10,
  occupiedRooms = 5,
  maintenanceRooms = 3,
  className,
}: DashboardChartsProps) {
  const totalRooms = availableRooms + occupiedRooms + maintenanceRooms

  const { invoices } = useInvoice()
  const monthlyRevenue = Array(12).fill(0)
  invoices
    .filter((inv) => inv.status === 'paid')
    .forEach((inv) => {
      const monthIndex = dayjs(inv.month).month() // 0 - 11
      monthlyRevenue[monthIndex] += inv.totalAmount || 0
    })

  const roomData = useMemo(
    () => [
      { name: 'Phòng trống', value: availableRooms },
      { name: 'Đang ở', value: occupiedRooms },
      { name: 'Sửa chữa', value: maintenanceRooms },
    ],
    [availableRooms, occupiedRooms, maintenanceRooms]
  )

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const revenueData = monthlyRevenue.map((value, index) => ({
    date: `T${index + 1}`,
    revenue: value,
  }))

  const [animatedRoomData, setAnimatedRoomData] = useState(
    roomData.map((d) => ({ ...d, value: 0 }))
  )
  const [animatedRevenueData, setAnimatedRevenueData] = useState(
  Array(12).fill(0).map((_v, i) => ({ date: `T${i + 1}`, revenue: 0 }))
)


  useEffect(() => {
    const roomTimer = setTimeout(() => setAnimatedRoomData(roomData), 1500)
    const revenueTimer = setTimeout(() => setAnimatedRevenueData(revenueData), 1500)

    return () => {
      clearTimeout(roomTimer)
      clearTimeout(revenueTimer)
    }
  }, [roomData, revenueData])

  return (
    <div className={cn('w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6', className)}>
      {/* ================= AREA CHART (REVENUE) ================= */}
      <div className='lg:col-span-2 bg-white border border-slate-100 rounded-4xl p-8 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500'>
        <div className='flex items-start justify-between mb-10'>
          <div>
            <h3 className='text-xl font-bold text-slate-900 tracking-tight'>Doanh thu lưu trú</h3>
            <p className='text-sm text-slate-500 mt-1 font-medium'>
              Phân tích dòng tiền hàng tháng
            </p>
          </div>
          <div className='flex flex-col items-end'>
            <span className='px-3 py-1 bg-emerald-50 text-emerald-600 text-[11px] font-bold rounded-lg uppercase tracking-wider'>
              +12.5% Yearly
            </span>
          </div>
        </div>

        <div className='w-full h-80'>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart
              data={animatedRevenueData}
              margin={{ top: 0, right: 0, left: -15, bottom: 0 }}
            >
              <defs>
                <linearGradient id='colorRev' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.15} />
                  <stop offset='95%' stopColor='#3b82f6' stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray='6 6' vertical={false} stroke='#f1f5f9' />
              <XAxis
                dataKey='date'
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                dy={15}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                tickFormatter={(value) => `${value / 1000000}M`}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '4 4' }}
              />
              <Area
                type='monotone' // Đường cong mượt
                dataKey='revenue'
                stroke='#3b82f6'
                strokeWidth={4}
                fillOpacity={1}
                fill='url(#colorRev)'
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= PIE CHART (ROOM STATUS) ================= */}
      <div className='bg-white border border-slate-100 rounded-4xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden'>
        <div className='mb-6'>
          <h3 className='text-xl font-bold text-slate-900 tracking-tight'>Trạng thái phòng</h3>
          <p className='text-sm text-slate-500 mt-1 font-medium'>Phân bổ tài nguyên thực tế</p>
        </div>

        <div className='h-80 w-full relative'>
          {/* Label trung tâm của Donut Chart */}
          <div className='absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none'>
            <p className='text-3xl font-black text-slate-800'>{totalRooms}</p>
            <p className='text-[10px] uppercase font-bold text-slate-400 tracking-widest'>Phòng</p>
          </div>

          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={animatedRoomData}
                cx='50%'
                cy='45%'
                innerRadius={80}
                outerRadius={105}
                paddingAngle={8}
                dataKey='value'
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                stroke='none'
              >
                {roomData.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                    className='outline-none'
                    style={{
                      filter:
                        activeIndex === index
                          ? `drop-shadow(0px 0px 12px ${PIE_COLORS[index]}66)`
                          : 'none',
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      opacity: activeIndex === null || activeIndex === index ? 1 : 0.6,
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip isPie />} />
              <Legend
                verticalAlign='bottom'
                iconType='circle'
                iconSize={10}
                wrapperStyle={{
                  paddingTop: '20px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#64748b',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
