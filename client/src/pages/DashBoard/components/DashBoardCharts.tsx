import { useRoom } from '@/hooks/useRoom'
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

const revenueData = [
  { date: '01/12', revenue: 1200000 },
  { date: '02/12', revenue: 1500000 },
  { date: '03/12', revenue: 900000 },
  { date: '04/12', revenue: 2000000 },
  { date: '05/12', revenue: 1800000 },
]

const COLORS = ['#00b09b', '#193cb8', '#fc4a1a'] // xanh, xanh dương, đỏ

// --- Component ---
export default function DashboardCharts() {
  const { rooms, loading } = useRoom()
  const roomTable = {
    available: rooms.filter((r) => r.status === 'available').length,
    occupied: rooms.filter((r) => r.status === 'occupied').length,
    maintenance: rooms.filter((r) => r.status === 'maintenance').length,
  }
  const roomData = [
    { name: 'Trống', value: roomTable.available },
    { name: 'Đã thuê', value: roomTable.occupied },
    { name: 'Bảo trì', value: roomTable.maintenance },
  ]
  if(loading) return <div>Loading...</div>
  return (
    <div className='w-full flex flex-col lg:flex-row gap-5 mt-5'>
      {/* AreaChart */}
      <div className='flex-2 bg-white shadow-lg rounded-lg p-5 transition hover:shadow-2xl hover:-translate-y-1 duration-300'>
        <h3 className='text-lg font-bold mb-4 text-gray-700'>Doanh thu theo ngày</h3>
        <ResponsiveContainer width='100%' height={200}>
          <AreaChart data={revenueData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#e0e0e0' />
            <XAxis dataKey='date' tick={{ fill: '#4b5563', fontSize: 12 }} />
            <YAxis tick={{ fill: '#4b5563', fontSize: 12 }} />
            <Tooltip
              formatter={(value) => new Intl.NumberFormat('vi-VN').format(Number(value)) + '₫'}
              contentStyle={{
                borderRadius: '10px',
                border: 'none',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              }}
            />
            <Area
              type='monotone'
              dataKey='revenue'
              stroke='#2563EB'
              fill='#2563EB'
              fillOpacity={0.2}
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* PieChart */}
      <div className='flex-1 bg-white shadow-lg rounded-2xl p-5 transition hover:shadow-2xl hover:-translate-y-1 duration-300'>
        <h3 className='text-lg font-bold mb-4 text-gray-700'>Tỷ lệ phòng</h3>
        <ResponsiveContainer width='100%' height={200}>
          <PieChart>
            <Pie
              data={roomData}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              innerRadius={50}
              outerRadius={80}
              paddingAngle={5}
              label={{
                fill: '#374151',
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {roomData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend verticalAlign='bottom' height={30} wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
