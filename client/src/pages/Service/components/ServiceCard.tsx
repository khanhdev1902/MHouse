import { SquarePen } from 'lucide-react'
import ServiceDialog from './ServiceDialog'
import type { Service } from '@/types/Service'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ServiceCardProps = {
  data: Service
  onUpdate: (id: number, data: Partial<Service>) => void
  onDelete: (id: number) => void
}

export default function ServiceCard({
  data,
  onUpdate,
  onDelete,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        'group relative rounded-2xl border bg-white px-5 py-4',
        'shadow-sm transition-all',
        'hover:-translate-y-0.5 hover:shadow-md'
      )}
    >
      {/* Edit button */}
      <div className='absolute top-3 right-3 opacity-0 transition group-hover:opacity-100'>
        <ServiceDialog
          mode='update'
          service={data}
          onUpdate={onUpdate}
          onDelete={onDelete}
          trigger={
            <Button size='icon' variant='ghost'>
              <SquarePen className='h-4 w-4 text-yellow-600' />
            </Button>
          }
        />
      </div>

      <span className='text-xs uppercase tracking-wide text-muted-foreground'>
        Dịch vụ
      </span>

      <p className='mt-1 text-lg font-semibold'>{data.name}</p>

      <div className='mt-2 flex items-center gap-1 text-sm'>
        <span className='text-muted-foreground'>Đơn giá:</span>
        <span className='font-semibold text-red-600'>
          {data.price?.toLocaleString('vi-VN')}đ
        </span>
        {data.unit && (
          <span className='text-muted-foreground'>/{data.unit}</span>
        )}
      </div>

      {/* {data.quantity !== undefined && (
        <div className='mt-1 text-sm text-muted-foreground'>
          Số lượng: {data.quantity}
        </div>
      )} */}

      {data.note && (
        <div className='mt-1 text-xs text-muted-foreground italic'>
          {data.note}
        </div>
      )}
    </div>
  )
}
