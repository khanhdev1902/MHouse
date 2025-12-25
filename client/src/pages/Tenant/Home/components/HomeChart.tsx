import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from 'chart.js'
import { cn } from '@/lib/utils'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

interface StackedBarProps {
  className?: string
  labels?: string[]
  electricity?: number[]
  water?: number[]
  internet?: number[]
  title?: string
}

// Bảng màu hiện đại (Modern Soft Palette)
const COLORS = {
  electricity: { start: '#4F46E5', end: '#818CF8' }, // Indigo
  water: { start: '#0EA5E9', end: '#7DD3FC' },      // Sky
  internet: { start: '#F43F5E', end: '#FDA4AF' },   // Rose
}

const createSoftGradient = (ctx: CanvasRenderingContext2D, colorStart: string, colorEnd: string) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400)
  gradient.addColorStop(0, colorStart)
  gradient.addColorStop(1, colorEnd)
  return gradient
}

export default function HomeChart({
  className,
  labels = [],
  electricity = [],
  water = [],
  internet = [],
  title = 'Thống kê chi phí dịch vụ',
}: StackedBarProps) {
  const data: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Điện',
        data: electricity,
        backgroundColor: (ctx) => createSoftGradient(ctx.chart.ctx, COLORS.electricity.start, COLORS.electricity.end),
        hoverBackgroundColor: COLORS.electricity.start,
        borderRadius: 4, // Giảm một chút để nhìn chuyên nghiệp hơn
        borderSkipped: false,
        barThickness: 20,
      },
      {
        label: 'Nước',
        data: water,
        backgroundColor: (ctx) => createSoftGradient(ctx.chart.ctx, COLORS.water.start, COLORS.water.end),
        hoverBackgroundColor: COLORS.water.start,
        borderRadius: 4,
        borderSkipped: false,
        barThickness: 20,
      },
      {
        label: 'Internet',
        data: internet,
        backgroundColor: (ctx) => createSoftGradient(ctx.chart.ctx, COLORS.internet.start, COLORS.internet.end),
        hoverBackgroundColor: COLORS.internet.start,
        borderRadius: 4,
        borderSkipped: false,
        barThickness: 20,
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end', // Đẩy sang phải cho thoáng phần tiêu đề
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: { size: 12, weight: 'bold', family: 'Inter' },
          color: '#64748b',
        },
      },
      tooltip: {
        padding: 16,
        backgroundColor: '#1e293b',
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        footerFont: { size: 13, weight: 'bold' },
        footerMarginTop: 10,
        cornerRadius: 8,
        boxPadding: 6,
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y?.toLocaleString()}₫`,
          footer: (items) => {
            const total = items.reduce((sum, item) => sum + (item.parsed.y ?? 0), 0)
            return `Tổng cộng: ${total.toLocaleString()}₫`
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { font: { size: 12 }, color: '#94a3b8' },
        border: { display: false }
      },
      y: {
        stacked: true,
        border: { dash: [4, 4], display: false }, // Đường kẻ đứt quãng nhẹ nhàng
        grid: { color: '#f1f5f9' },
        ticks: {
          callback: (val) => `${Number(val) / 1000}k`, // Rút gọn số cho gọn biểu đồ
          font: { size: 11 },
          color: '#94a3b8',
          stepSize: 100000,
        },
      },
    },
  }

  return (
    <div className={cn(
      "group relative flex flex-col w-full rounded-3xl bg-white p-8",
      "border border-slate-200/60 shadow-sm transition-all duration-300",
      "hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-1",
      className
    )}>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 tracking-tight">{title}</h3>
          <p className="text-sm text-slate-bold mt-1">Phân tích chi phí vận hành hàng tháng</p>
        </div>
        
        {/* Badge trang trí - Tăng độ chuyên nghiệp */}
        <div className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full uppercase tracking-wider">
          Real-time
        </div>
      </div>

      <div className="relative h-[350px] w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}