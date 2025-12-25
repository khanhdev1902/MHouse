import Container from '@/components/Container'
import KpiSection from './components/KpiSection'
import { useInvoice } from '@/hooks/useInvoice'
import Loading from '@/components/Loading'
import dayjs from 'dayjs'
import HomeTable from './components/HomeTable'
import { Label } from '@/components/ui/label'
import HomeChart from './components/HomeChart'

export default function HomePage() {
  const user = JSON.parse(localStorage.getItem('user') ?? 'null')
  const { invoices = [], loading } = useInvoice()

  if (loading) return <Loading />
  if (!user) return null

  // ======================
  // FILTER THEO USER
  // ======================
  const userInvoices = invoices.filter((inv) => inv.userId === user.userId)

  // ======================
  // KPI
  // ======================
  const totalInvoices = userInvoices.length

  const paidInvoices = userInvoices.filter((inv) => inv.status === 'paid')
  const unpaidInvoices = userInvoices.filter((inv) => inv.status === 'unpaid')

  const totalPaidAmount = paidInvoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0)

  // ======================
  // INVOICE THÁNG HIỆN TẠI
  // ======================
  const currentMonth = dayjs().format('YYYY-MM')

  const unpaidThisMonthAmount = userInvoices
    .filter((inv) => inv.month === currentMonth && inv.status !== 'paid')
    .reduce((sum, inv) => sum + (inv.totalAmount || 0), 0)

  // ======================
  // INVOICE DETAILS
  // ======================
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

    userInvoices.forEach((inv) => {
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
  // ======================
  // RENDER
  // ======================
  return (
    <Container className='flex flex-col gap-5'>
      <KpiSection
        totalInvoices={totalInvoices}
        unpaidInvoices={unpaidInvoices.length}
        paidInvoices={paidInvoices.length}
        unCostedInvoiceThisMonth={unpaidThisMonthAmount}
        CostedInvoiceThisMonth={totalPaidAmount}
      />

      <div className='flex mt-10 gap-3'>
        <div className='space-y-2.5 py-6 px-4 rounded-2xl border border-slate-100 bg-white shadow-sm min-h-72 overflow-hidden animate-in fade-in duration-500 w-full'>
          <Label className='font-bold text-lg text-primary'>Hóa đơn gần đây</Label>
          <HomeTable invoices={userInvoices} />
        </div>

        <div className='w-full'>
          <HomeChart
            labels={labels}
            electricity={monthlyElectric}
            water={monthlyWater}
            internet={monthlyInternet}
          />
        </div>
      </div>
    </Container>
  )
}
