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

interface DashboardChartsProps {
  availableRooms?: number
  occupiedRooms?: number
  maintenanceRooms?: number
}

/* ================= MÀU SẮC MỚI (MODERN PALETTE) ================= */
const COLORS = ['#10b981', '#3b82f6', '#f59e0b'] // Green, Blue, Amber

const revenueData = [
  { date: '01/12', revenue: 1200000 },
  { date: '02/12', revenue: 1500000 },
  { date: '03/12', revenue: 900000 },
  { date: '04/12', revenue: 2000000 },
  { date: '05/12', revenue: 1800000 },
]

/* ================= CUSTOM TOOLTIP (AREA) ================= */
const CustomAreaTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md border border-gray-100 p-3 rounded-xl shadow-xl transition-all duration-300">
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">{label}</p>
        <p className="text-sm font-bold text-blue-600">
          {new Intl.NumberFormat('vi-VN').format(payload[0].value)} ₫
        </p>
      </div>
    )
  }
  return null
}

/* ================= CUSTOM TOOLTIP (PIE) ================= */
const PieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, value, percent, fill } = payload[0]
    return (
      <div className="bg-white/90 backdrop-blur-md border border-gray-100 p-3 rounded-xl shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: fill }} />
          <p className="text-xs font-bold text-gray-700">{name}</p>
        </div>
        <p className="text-xs text-gray-500">
          <span className="font-semibold text-gray-800">{value}</span> phòng ({(percent * 100).toFixed(2)}%)
        </p>
      </div>
    )
  }
  return null
}

export default function DashboardCharts({
  availableRooms = 10,
  occupiedRooms = 5,
  maintenanceRooms = 3,
}: DashboardChartsProps) {
  const roomData = useMemo(
    () => [
      { name: 'Phòng trống', value: availableRooms },
      { name: 'Đang ở', value: occupiedRooms },
      { name: 'Sửa chữa', value: maintenanceRooms },
    ],
    [availableRooms, occupiedRooms, maintenanceRooms]
  )

  const [animatedRoomData, setAnimatedRoomData] = useState(roomData.map(d => ({ ...d, value: 0 })))
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedRoomData(roomData), 1500)
    return () => clearTimeout(timer)
  }, [roomData])

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 antialiased">
      
      {/* ================= AREA CHART (REVENUE) ================= */}
      <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Doanh thu</h3>
            <p className="text-xs text-gray-400">Thống kê 5 ngày gần nhất</p>
          </div>
          <div className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
            +12.5% so với tuần trước
          </div>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 11 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 11 }} 
            />
            <Tooltip content={<CustomAreaTooltip />} cursor={{ stroke: '#3b82f6', strokeWidth: 1 }} />
            <Area
              // type="smooth" /* Tạo đường cong mượt mà */
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRev)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ================= PIE CHART (ROOM STATUS) ================= */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <h3 className="text-lg font-bold text-gray-800 mb-1">Tình trạng phòng</h3>
        <p className="text-xs text-gray-400 mb-6">Tổng số: {availableRooms + occupiedRooms + maintenanceRooms} phòng</p>

        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={animatedRoomData}
              cx="50%"
              cy="45%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={8}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              stroke="none"
            >
              {animatedRoomData.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  style={{
                    filter: activeIndex === index ? `drop-shadow(0px 0px 8px ${COLORS[index]})` : 'none',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<PieTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 500 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}