import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type KpiCardProps = {
  title: string
  value: number
  icon: LucideIcon
  color?: 'main' | 'blue' | 'emerald' | 'rose' | 'amber' // Thêm tùy chọn màu sắc
}

const colorConfigs = {
  main: 'from-[#193cb8] to-[#00b09b] shadow-blue-200',
  blue: 'from-blue-600 to-indigo-700 shadow-blue-200',
  emerald: 'from-emerald-500 to-teal-700 shadow-emerald-200',
  rose: 'from-rose-500 to-red-700 shadow-rose-200',
  amber: 'from-amber-400 to-orange-600 shadow-amber-200',
}

export function KpiCard({ title, value, icon: Icon, color = 'main' }: KpiCardProps) {
  // Format giá trị (triệu hoặc số thường)
  const formattedValue =
    value >= 1_000_000
      ? `${(value / 1_000_000).toLocaleString('vi-VN', { maximumFractionDigits: 1 })} Tr`
      : value.toLocaleString('vi-VN')

  return (
    <div
      className={cn(
        'relative overflow-hidden p-6 rounded-4xl text-white w-full',
        'bg-linear-to-br transition-all duration-500 ease-out',
        'shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)]',
        'hover:-translate-y-2 group',
        colorConfigs[color]
      )}
    >
      {/* Decorative Background Circles - Tạo chiều sâu nghệ thuật */}
      <div className='absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl transition-transform duration-700 group-hover:scale-150' />
      <div className='absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-black/10 blur-3xl' />

      {/* Content Layout */}
      <div className='relative z-10 flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-xs font-black uppercase tracking-[0.2em] text-white/70'>{title}</p>
            <h2 className='text-3xl font-black tracking-tight drop-shadow-md'>{formattedValue}</h2>
          </div>

          {/* Icon Container with Glassmorphism */}
          <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 shadow-inner backdrop-blur-md transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-white/30'>
            <Icon size={28} className='text-white drop-shadow-sm' strokeWidth={2.5} />
          </div>
        </div>

        {/* Footer info (Ví dụ: Tăng trưởng hoặc nhãn phụ) */}
        <div className='mt-2 flex items-center gap-2'>
          <div className='h-1 flex-1 rounded-full bg-white/20'>
            <div className='h-full w-2/3 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' />
          </div>
          <span className='text-[10px] font-bold text-white/60'>Live Updates</span>
        </div>
      </div>

      {/* Subtle border overlay for premium look */}
      <div className='absolute inset-0 rounded-4xl border border-white/10' />
    </div>
  )
}
