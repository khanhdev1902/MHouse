import { useEffect, useState } from 'react'
import Container from '@/components/Container'
import Loading from '@/components/Loading'
import KpiSection from './components/KpiSection'
import DashBoardAPI from '@/apis/dashboardAPI'
import DashBoardTable from './components/DashBoardTable'
import { Label } from '@/components/ui/label'
import { useInvoice } from '@/hooks/useInvoice'
import dayjs from 'dayjs'
import DashboardChart from './components/DashBoardChart'
import { cn } from '@/lib/utils'

export interface DashBoardData {
  totalRooms?: number
  totalUsers?: number
  totalAmount?: number
  totalUnpaid?: number
  availableRooms?: number
  maintenanceRooms?: number
  occupiedRooms?: number
}

export default function DashBoard() {
  const [dashBoardData, setDashBoardData] = useState<DashBoardData | null>(null)
  const { invoices = [] } = useInvoice()
  const [loading, setLoading] = useState(true)

  const totalPaidAmount = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + (inv.totalAmount || 0), 0)
  const totalUnPaidAmount = invoices
    .filter((inv) => inv.status === 'unpaid')
    .reduce((sum, inv) => sum + (inv.totalAmount || 0), 0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await DashBoardAPI.getDashBoard()
        setDashBoardData(res.data)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const labels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const buildMonthlyService = (serviceName: string) => {
    const result = Array(12).fill(0)
    invoices.forEach((inv) => {
      const monthIndex = dayjs(inv.month).month()
      inv.details?.forEach((detail) => {
        if (detail.serviceName === serviceName) {
          result[monthIndex] += detail.amount || 0
        }
      })
    })
    return result
  }

  const monthlyElectric = buildMonthlyService('Điện')
  const monthlyWater = buildMonthlyService('Nước')
  const monthlyInternet = buildMonthlyService('Wifi')

  if (loading) return <Loading />

  return (
    <Container className='flex flex-col gap-8 py-6 bg-slate-50/50 min-h-screen'>
      {/* 1. Header Section */}
      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl font-black text-slate-900 tracking-tight'>Tổng quan hệ thống</h1>
        <p className='text-sm text-slate-500 font-medium'>
          Chào mừng bạn quay trở lại, đây là báo cáo hôm nay.
        </p>
      </div>

      {/* 2. KPI Section */}
      <KpiSection
        totalRooms={dashBoardData?.totalRooms ?? 0}
        totalUsers={dashBoardData?.totalUsers ?? 0}
        availableRooms={dashBoardData?.availableRooms ?? 0}
        totalAmount={totalPaidAmount}
        totalUnpaid={totalUnPaidAmount}
      />

      {/* 3. Main Content Grid */}
      <div className='grid grid-cols-1 xl:grid-cols-5 gap-3'>
        {/* Biểu đồ (Chiếm 3/5 chiều rộng trên màn hình lớn) */}
        <div className='xl:col-span-3 order-2 xl:order-1'>
          <DashboardChart
            labels={labels}
            electricity={monthlyElectric}
            water={monthlyWater}
            internet={monthlyInternet}
          />
        </div>

        {/* Bảng hóa đơn (Chiếm 2/5 chiều rộng trên màn hình lớn) */}
        <div
          className={cn(
            'xl:col-span-2 order-1 xl:order-2',
            'flex flex-col gap-4 p-6 rounded-4xl border border-slate-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)]',
            'animate-in fade-in slide-in-from-right-4 duration-700'
          )}
        >
          <div className='flex items-center justify-between px-2'>
            <div className='space-y-1'>
              <Label className='font-bold text-lg text-slate-800'>Hóa đơn gần đây</Label>
              <p className='text-xs text-slate-400 font-medium'>Các giao dịch phát sinh mới nhất</p>
            </div>
            <button className='text-xs font-bold text-main hover:underline'>Xem tất cả</button>
          </div>

          <div className='overflow-hidden rounded-xl border border-slate-50'>
            <DashBoardTable invoices={invoices.slice(0, 6)} />
          </div>
        </div>
      </div>
    </Container>
  )
}
