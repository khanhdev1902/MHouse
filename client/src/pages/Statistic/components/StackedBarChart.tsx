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
  title?: string // Thêm tiêu đề cho biểu đồ
}

// Hàm tạo Gradient mượt mà hơn
const createSoftGradient = (
  ctx: CanvasRenderingContext2D,
  colorStart: string,
  colorEnd: string
) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400)
  gradient.addColorStop(0, colorStart)
  gradient.addColorStop(1, colorEnd)
  return gradient
}

export default function StackedBarChart({
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
        // Sử dụng mã màu hiện đại hơn
        backgroundColor: (ctx) => createSoftGradient(ctx.chart.ctx, '#6366f1', '#a5b4fc'),
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 24,
      },
      {
        label: 'Nước',
        data: water,
        backgroundColor: (ctx) => createSoftGradient(ctx.chart.ctx, '#0ea5e9', '#7dd3fc'),
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 24,
      },
      {
        label: 'Internet',
        data: internet,
        backgroundColor: (ctx) => createSoftGradient(ctx.chart.ctx, '#f43f5e', '#fda4af'),
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 24,
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 10 },
    },
    animation: {
      duration: 1200,
      easing: 'easeOutExpo',
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'bottom',
        align: 'start', // Căn lề trái cho legend nhìn hiện đại hơn
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 6,
          padding: 25,
          font: {
            size: 13,
            weight: 'bold',
            family: "'Inter', sans-serif",
          },
          color: '#4b5563',
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(15, 23, 42, 0.9)', // Dark mode cho tooltip
        // backdropBlur: 4,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        padding: 12,
        cornerRadius: 12,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: (ctx) => {
            const value = ctx.parsed?.y ?? 0
            return ` ${ctx.dataset.label}: ${value.toLocaleString('vi-VN')}₫`
          },
          footer: (items) => {
            const total = items.reduce((sum, item) => sum + (item.parsed?.y ?? 0), 0)
            return `Tổng cộng: ${total.toLocaleString('vi-VN')}₫`
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        border: { display: false },
        ticks: {
          font: { size: 12, weight: 'bold' },
          color: '#9ca3af',
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        border: { display: false },
        grid: {
          color: '#f3f4f6',
        },
        ticks: {
          callback: (value) => value.toLocaleString('vi-VN') + '₫',
          font: { size: 11 },
          color: '#9ca3af',
          padding: 10,
        },
      },
    },
  }

  return (
    <div
      className={cn(
        'flex flex-col h-full w-full rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-all hover:shadow-lg',
        className
      )}
    >
      <div className='mb-6'>
        <h3 className='text-lg font-bold text-slate-800 tracking-tight'>{title}</h3>
        <p className='text-sm text-slate-400 font-medium'>Chi tiết chi phí tiêu thụ theo tháng</p>
      </div>

      <div className='flex-1 min-h-[300px]'>
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}
