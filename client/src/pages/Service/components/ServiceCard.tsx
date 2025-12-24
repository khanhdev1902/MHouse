import { SquarePen, Zap, Info } from 'lucide-react'
import ServiceDialog from './ServiceDialog'
import type { Service } from '@/types/Service'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ServiceCardProps = {
  data: Service
  onUpdate: (id: number, data: Partial<Service>) => void
  onDelete: (id: number) => void
}

export default function ServiceCard({ data, onUpdate, onDelete }: ServiceCardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-5',
        'transition-all duration-500 ease-out',
        'shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)]',
        'hover:-translate-y-1.5'
      )}
    >
      {/* Background Decor: Tạo một vệt màu nhẹ phía sau để làm card bớt đơn điệu */}
      <div className='absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-50/50 transition-transform duration-700 group-hover:scale-150' />

      {/* Action: Edit button (Glassmorphism style) */}
      <div className='absolute right-3 top-3 z-10 opacity-0 transition-all duration-300 group-hover:opacity-100'>
        <ServiceDialog
          mode='update'
          service={data}
          onUpdate={onUpdate}
          onDelete={onDelete}
          trigger={
            <Button
              size='icon'
              variant='secondary'
              className='h-9 w-9 rounded-xl bg-white/80 shadow-sm backdrop-blur-md hover:bg-white'
            >
              <SquarePen className='h-4 w-4 text-blue-600' />
            </Button>
          }
        />
      </div>

      {/* Header: Label & Icon */}
      <div className='relative z-10 mb-4 flex items-center gap-2'>
        <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300'>
          <Zap size={16} />
        </div>
        <span className='text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400'>
          Dịch vụ tiện ích
        </span>
      </div>

      {/* Body: Name & Price */}
      <div className='relative z-10'>
        <h3 className='line-clamp-1 text-lg font-black tracking-tight text-slate-800'>
          {data.name}
        </h3>

        <div className='mt-4 flex items-baseline gap-1'>
          <span className='text-2xl font-black text-blue-600'>
            {data.price?.toLocaleString('vi-VN')}
          </span>
          <span className='text-sm font-bold text-slate-400'>
            đ{data.unit ? ` / ${data.unit}` : ''}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className='my-4 border-t border-slate-50' />

      {/* Footer: Note/Description */}
      <div className='relative z-10 flex items-center gap-2 rounded-xl bg-slate-50 p-2 transition-colors group-hover:bg-blue-50/50'>
        <Info size={14} className='shrink-0 text-slate-300 group-hover:text-blue-300' />
        <p className='line-clamp-1 text-xs font-medium italic text-slate-500 group-hover:text-blue-600/70'>
          {data.note || 'Không có ghi chú thêm'}
        </p>
      </div>

      {/* Hover Decor: Đường line nhỏ chạy dưới đáy khi hover */}
      <div className='absolute bottom-0 left-0 h-1 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full' />
    </div>
  )
}
