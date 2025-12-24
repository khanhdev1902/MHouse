import Container from '@/components/Container'
import StackedBarChart from './components/StackedBarChart'
import { stackedbarchartData } from '@/constants/chart'
import StatisticCard from './components/StatisticCard'
import { FileText, Home, TrendingUp, PieChart as PieIcon } from 'lucide-react'

export default function Statistic() {
  return (
    <Container className='flex flex-col gap-8 py-8 animate-in fade-in duration-700'>
      {/* ===== HEADER SECTION ===== */}
      {/* <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2 text-main'>
          <BarChart3 size={20} />
          <span className='text-[10px] font-black uppercase tracking-[0.2em]'>
            Báo cáo chi tiết
          </span>
        </div>
        <h1 className='text-3xl font-black tracking-tight text-slate-900 md:text-4xl'>
          Phân tích thống kê
        </h1>
        <p className='text-sm font-medium text-slate-500'>
          Dữ liệu được cập nhật mới nhất tính đến hôm nay.
        </p>
      </div> */}

      {/* ===== KPI CARDS GRID ===== */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        <StatisticCard
          title='Tổng doanh thu'
          value={34700000}
          icon={<TrendingUp />}
          // variant='gradient'
        />

        <StatisticCard
          title='Doanh thu tháng này'
          value={18000000}
          icon={<PieIcon />}
          // variant='blue'
        />

        <StatisticCard
          title='Hóa đơn chưa thu'
          value={6}
          icon={<FileText />}
          // variant='teal'
          // className='bg-gradient-to-br from-[#f43f5e] to-[#9f1239] shadow-rose-200' // Custom cho hóa đơn chưa trả
        />

        <StatisticCard title='Phòng trống' value={6} icon={<Home />} />
      </div>

      {/* ===== CHARTS SECTION ===== */}
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>
        {/* Biểu đồ chính - Chiếm 2/3 không gian */}
        <div className='xl:col-span-2 space-y-4'>
          <div className='flex items-center justify-between px-2'>
            <h3 className='text-xl font-black text-slate-800 tracking-tight'>Chi phí tiện ích</h3>
            <div className='flex gap-2'>
              <span className='flex items-center gap-1 text-[10px] font-bold text-slate-400'>
                <span className='h-2 w-2 rounded-full bg-main' /> ĐIỆN
              </span>
              <span className='flex items-center gap-1 text-[10px] font-bold text-slate-400'>
                <span className='h-2 w-2 rounded-full bg-[#00b09b]' /> NƯỚC
              </span>
            </div>
          </div>

          <StackedBarChart
            labels={stackedbarchartData.labels}
            electricity={stackedbarchartData.electricity}
            water={stackedbarchartData.water}
            internet={stackedbarchartData.internet}
            className='max-h-[450px] border-none shadow-2xl shadow-slate-200/50'
          />
        </div>

        {/* Sidebar Info hoặc Small Widgets - Chiếm 1/3 không gian */}
        <div className='space-y-6'>
          <h3 className='text-xl font-black text-slate-800 tracking-tight px-2'>Thông tin nhanh</h3>

          <div className='rounded-4xl bg-white border border-slate-100 p-6 shadow-xl shadow-slate-200/40 space-y-6'>
            <div className='space-y-4'>
              <p className='text-xs font-bold text-slate-400 uppercase tracking-widest'>
                Hiệu suất tháng
              </p>
              <div className='flex items-end gap-2'>
                <span className='text-4xl font-black text-main'>85%</span>
                <span className='text-sm font-bold text-emerald-500 mb-1'>+12%</span>
              </div>
              <div className='h-2 w-full bg-slate-100 rounded-full overflow-hidden'>
                <div className='h-full w-[85%] bg-linear-to-r from-[#00b09b] to-main rounded-full' />
              </div>
            </div>

            <div className='pt-4 border-t border-dashed border-slate-100 space-y-4'>
              <p className='text-xs font-bold text-slate-400 uppercase tracking-widest'>
                Lưu ý trong tháng
              </p>
              <ul className='space-y-3'>
                {[
                  'Kiểm tra lại công tơ điện tầng 2',
                  'Gửi thông báo tiền phòng sớm 2 ngày',
                  'Bảo trì hệ thống Wifi tòa nhà',
                ].map((text, i) => (
                  <li key={i} className='flex items-start gap-3 text-sm font-medium text-slate-600'>
                    <span className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00b09b]' />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
