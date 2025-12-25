import Container from '@/components/Container'
import StackedBarChart from './components/StackedBarChart'
import StatisticCard from './components/StatisticCard'
import StatisticCharts from './components/Chart'
import {
  Banknote,
  CalendarCheck,
  CreditCard,
  DoorOpen,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { useRoom } from '@/hooks/useRoom'
import { useInvoice } from '@/hooks/useInvoice'
import { stackedbarchartData } from '@/constants/chart'
import { cn } from '@/lib/utils'
import Loading from '@/components/Loading'

export default function Statistic() {
  const { rooms = [] } = useRoom()
  const { invoices = [], loading } = useInvoice()

  // Logic tính toán giữ nguyên
  const totalPaidAmount = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + (inv.totalAmount || 0), 0)

  const nowMonth = new Date().toISOString().slice(0, 7)
  const totalPaidAmountThisMonth = invoices
    .filter((inv) => inv.status === 'paid' && inv.month === nowMonth)
    .reduce((sum, inv) => sum + (inv.totalAmount || 0), 0)

  const totalUnPaidAmount = invoices
    .filter((inv) => inv.status === 'unpaid')
    .reduce((sum, inv) => sum + (inv.totalAmount || 0), 0)

  const roomStatusCount = {
    available: rooms.filter((r) => r.status === 'available').length,
    occupied: rooms.filter((r) => r.status === 'occupied').length,
    maintenance: rooms.filter((r) => r.status === 'maintenance').length,
  }
  if(loading) return <Loading/>
  return (
    <Container className='flex flex-col gap-10 py-6 animate-in fade-in slide-in-from-bottom-4 duration-1000'>
      {/* ===== KPI CARDS ===== */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        <StatisticCard
          title='Tổng doanh thu'
          value={totalPaidAmount}
          icon={<Banknote />}
          className='border-b-4 border-b-emerald-500'
        />
        <StatisticCard
          title='Doanh thu tháng này'
          value={totalPaidAmountThisMonth}
          icon={<CalendarCheck/>}
          className='border-b-4 border-b-blue-500'
        />
        <StatisticCard
          title='Hóa đơn chưa thu'
          value={totalUnPaidAmount}
          icon={<CreditCard/>}
          className='border-b-4 border-b-rose-500'
        />
        <StatisticCard
          title='Phòng trống hiện có'
          value={roomStatusCount.available}
          icon={<DoorOpen />}
          className='border-b-4 border-b-indigo-500'
        />
      </div>

      {/* ===== MAIN CHARTS SECTION ===== */}
      <div className='space-y-8'>
        <StatisticCharts
          availableRooms={roomStatusCount.available}
          occupiedRooms={roomStatusCount.occupied}
          maintenanceRooms={roomStatusCount.maintenance}
        />

        <div className='flex flex-col xl:flex-row gap-8'>
          {/* Biểu đồ cột chồng */}
          <div className='flex-1 min-w-0'>
            <StackedBarChart
              labels={stackedbarchartData.labels}
              electricity={stackedbarchartData.electricity}
              water={stackedbarchartData.water}
              internet={stackedbarchartData.internet}
              className='h-full border-none shadow-[0_20px_50px_rgba(0,0,0,0.04)] bg-white rounded-3xl'
            />
          </div>

          {/* Sidebar Info */}
          <div className='xl:w-[400px] space-y-6'>
            <div className='rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-sm space-y-8'>
              {/* Performance Section */}
              <div className='space-y-5'>
                <div className='flex justify-between items-center'>
                  <p className='text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]'>
                    Hiệu suất tháng
                  </p>
                  <ArrowUpRight className='w-4 h-4 text-emerald-500' />
                </div>

                <div className='flex items-baseline gap-2'>
                  <span className='text-5xl font-black text-slate-900 tracking-tighter'>85%</span>
                  <span className='text-sm font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg'>
                    +12%
                  </span>
                </div>

                <div className='relative h-3 w-full bg-slate-100 rounded-full overflow-hidden'>
                  <div
                    className='absolute top-0 left-0 h-full bg-linear-to-r from-emerald-400 to-blue-500 rounded-full'
                    style={{ width: '85%' }}
                  />
                </div>
              </div>

              {/* Action Notes Section */}
              <div className='pt-8 border-t border-slate-100 space-y-6'>
                <p className='text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]'>
                  Việc cần làm ngay
                </p>
                <div className='grid gap-4'>
                  {[
                    { text: 'Kiểm tra công tơ tầng 2', priority: 'high' },
                    { text: 'Gửi thông báo tiền phòng', priority: 'medium' },
                    { text: 'Bảo trì hệ thống Wifi', priority: 'low' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className='group flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer'
                    >
                      <div
                        className={cn(
                          'p-2 rounded-xl bg-white shadow-sm border border-slate-100 group-hover:scale-110 transition-transform',
                          item.priority === 'high' ? 'text-rose-500' : 'text-emerald-500'
                        )}
                      >
                        {item.priority === 'high' ? (
                          <AlertCircle size={18} />
                        ) : (
                          <CheckCircle2 size={18} />
                        )}
                      </div>
                      <span className='text-sm font-semibold text-slate-700'>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
