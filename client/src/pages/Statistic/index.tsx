import Container from '@/components/Container'
import StackedBarChart from './components/StackedBarChart'
import { stackedbarchartData } from '@/constants/chart'
import StatisticCard from './components/StatisticCard'
import { FileText, Home, TrendingUp } from 'lucide-react'
import { Label } from '@/components/ui/label'

export default function Statistic() {
  return (
    <Container className='flex flex-col gap-5'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        <StatisticCard title='Tổng doanh thu' value={34700000} icon={<TrendingUp size={20} />} />

        <StatisticCard title='Doanh thu tháng nay' value={18000000} icon={<Home size={20} />} />

        <StatisticCard title='Hóa đơn chưa thanh toán' value={6} icon={<FileText size={20} />} />
        <StatisticCard title='Số lượng phòng còn trống' value={6} icon={<Home size={20} />} />
      </div>
      <div className='grid grid-cols-2'>
        <div className='h-fit w-full space-y-3'>
          <Label className=' text-xl'>Chi phí điện, nước, wifi theo tháng</Label>
          <StackedBarChart
            labels={stackedbarchartData.labels}
            electricity={stackedbarchartData.electricity}
            water={stackedbarchartData.water}
            internet={stackedbarchartData.internet}
            className='min-h-96 shadow-xs p-2 rounded-2xl'
          />
        </div>
      </div>
    </Container>
  )
}
