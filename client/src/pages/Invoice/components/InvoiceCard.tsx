import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type InvoiceCardProps = {
  title: string
  value: string | number
  icon?: ReactNode
  description?: string
  trend?: {
    value: number
    isUp: boolean
  }
}

export default function InvoiceCard({ title, value, icon, description, trend }: InvoiceCardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-4xl border border-slate-100 bg-white p-6',
        'transition-all duration-500 ease-out',
        'shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)]',
        'hover:-translate-y-2'
      )}
    >
      {/* Background Decor: linear mờ ảo ở góc */}
      <div className='absolute -right-10 -top-10 h-32 w-32 rounded-full bg-linear-to-br from-[#00b09b]/10 to-main/10 blur-2xl transition-transform duration-700 group-hover:scale-150' />

      <div className='relative z-10 flex flex-col h-full justify-between'>
        <div className='flex items-start justify-between'>
          <div className='space-y-1'>
            <p className='text-[11px] font-black uppercase tracking-[0.2em] text-slate-400'>
              {title}
            </p>
            <div className='flex items-baseline gap-1'>
              <h2 className='text-3xl font-black tracking-tight text-slate-900'>
                {typeof value === 'number' ? value.toLocaleString('vi-VN') : value}
              </h2>
              {typeof value === 'number' && value > 10000 && (
                <span className='text-xs font-bold text-slate-400'>₫</span>
              )}
            </div>
          </div>

          {/* Icon Container: Phong cách Glassmorphism */}
          {icon && (
            <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#00b09b] to-main text-white shadow-lg shadow-main/20 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110'>
              <div className='drop-shadow-md'>{icon}</div>
            </div>
          )}
        </div>

        {/* Footer info: Trend hoặc mô tả */}
        <div className='mt-6 flex items-center justify-between'>
          <p className='text-xs font-medium text-slate-400'>{description || 'Cập nhật hôm nay'}</p>

          {trend && (
            <div
              className={cn(
                'flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black uppercase',
                trend.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              )}
            >
              {trend.isUp ? '↑' : '↓'} {trend.value}%
            </div>
          )}
        </div>
      </div>

      {/* Decorative Line: Chạy từ trái sang phải bằng linear khi hover */}
      <div className='absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-[#00b09b] to-main transition-all duration-700 group-hover:w-full' />
    </div>
  )
}
