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

const roomData = [
  { name: 'Trống', value: 12 },
  { name: 'Đã thuê', value: 30 },
  { name: 'Bảo trì', value: 3 },
]

const COLORS = ['#00b09b', '#193cb8', '#fc4a1a'] // xanh, xanh dương, đỏ

// --- Component ---
export default function DashboardCharts() {
  return (
    <div className='w-full flex flex-row gap-5 mt-5'>
      <div className='flex-2 h-72 p-4 shadow-sm  rounded-lg'>
        <h3 className=' font-bold mb-5'>Doanh thu theo ngày</h3>
        <ResponsiveContainer width='100%' height='90%'>
          <AreaChart data={revenueData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip formatter={(value) => new Intl.NumberFormat('vi-VN').format(Number(value))} />
            <Area
              type='monotone'
              dataKey='revenue'
              stroke='#193cb8'
              fill='#193cb8'
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className='flex-1 h-72 p-5 shadow-sm rounded-lg'>
        <h3 className='font-bold'>Tỷ lệ phòng</h3>
        <ResponsiveContainer width='100%' height='95%'>
          <PieChart>
            <Pie
              data={roomData}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              innerRadius={65}
              outerRadius={100}
              paddingAngle={5}
              label
            >
              {roomData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend verticalAlign='bottom' height={20} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
