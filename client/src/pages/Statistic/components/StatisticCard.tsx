import React from 'react'
import { cn } from '@/lib/utils'

interface StatisticCardProps {
  title: string
  value: number | string
  icon: React.ReactNode
  className?: string
  /** * 'teal' cho các chỉ số tích cực (trống phòng, tăng trưởng)
   * 'blue' cho các chỉ số quản trị (tổng thu, khách thuê)
   */
  variant?: 'teal' | 'blue' | 'gradient'
}

export default function StatisticCard({
  title,
  value,
  icon,
  className,
  variant = 'gradient',
}: StatisticCardProps) {
  const variants = {
    teal: 'from-[#00b09b] to-[#008a7a] shadow-[#00b09b]/20',
    blue: 'from-[#193cb8] to-[#122b85] shadow-[#193cb8]/20',
    gradient: 'from-[#00b09b] to-[#193cb8] shadow-[#193cb8]/20',
  }

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-4xl p-6 text-white border-none',
        'bg-linear-to-br transition-all duration-500 ease-out',
        'shadow-xl hover:shadow-2xl hover:-translate-y-2',
        variants[variant],
        className
      )}
    >
      {/* Decorative background elements */}
      <div className='absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl transition-transform duration-700 group-hover:scale-150' />
      <div className='absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-black/10 blur-3xl' />

      <div className='relative z-10 flex flex-col justify-between h-full'>
        {/* Header: Title & Icon Container */}
        <div className='flex items-start justify-between'>
          <span className='text-xs font-black uppercase tracking-[0.15em] text-white/80 transition-colors group-hover:text-white'>
            {title}
          </span>

          <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 shadow-inner backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-white/30 group-hover:rotate-6'>
            <div className='text-white drop-shadow-md'>
              {React.cloneElement(icon as React.ReactElement,
                //  { size: 24, strokeWidth: 2.5 }
                 )}
            </div>
          </div>
        </div>

        {/* Value: Main Indicator */}
        <div className='mt-8 flex items-baseline gap-1'>
          <span className='text-3xl font-black tracking-tighter drop-shadow-lg'>
            {typeof value === 'number' && value >= 1000 ? value.toLocaleString('vi-VN') : value}
          </span>
          {typeof value === 'number' && value >= 1000 && (
            <span className='text-sm font-bold opacity-70'>₫</span>
          )}
        </div>

        {/* Subtle Footer: Line decoration */}
        <div className='mt-4 h-1 w-full overflow-hidden rounded-full bg-white/20'>
          <div className='h-full w-1/3 rounded-full bg-white/60 transition-all duration-1000 group-hover:w-full' />
        </div>
      </div>

      {/* Glass border overlay */}
      <div className='absolute inset-0 rounded-4xl border border-white/10 pointer-events-none' />
    </div>
  )
}
