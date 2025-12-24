import { cn } from '@/lib/utils'
import type { Room } from '@/types/Room'
import { Pencil, User, Layers, Info } from 'lucide-react'
import RoomDialog from './RoomDialog'
import { Button } from '@/components/ui/button'

const ROOM_STATUS = {
  available: {
    label: 'Đang trống',
    colorClass: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    dot: 'bg-emerald-500',
    gradient: 'from-emerald-500/10 to-transparent',
  },
  occupied: {
    label: 'Đang thuê',
    colorClass: 'text-blue-600 bg-blue-50 border-blue-100',
    dot: 'bg-blue-500',
    gradient: 'from-blue-500/10 to-transparent',
  },
  maintenance: {
    label: 'Bảo trì',
    colorClass: 'text-amber-600 bg-amber-50 border-amber-100',
    dot: 'bg-amber-500',
    gradient: 'from-amber-500/10 to-transparent',
  },
} as const

type RoomCardProps = {
  room: Room
  onUpdate: (roomId: number, data: Partial<Room>) => void
  onDelete: (roomId: number) => void
}

export default function RoomCard({ room, onUpdate, onDelete }: RoomCardProps) {
  const status = ROOM_STATUS[room.status]

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6',
        'transition-all duration-500 ease-out',
        'shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)]',
        'hover:-translate-y-2 hover:border-slate-200'
      )}
    >
      {/* Background Decor (Hiệu ứng màu lan tỏa ở góc) */}
      <div
        className={cn(
          'absolute -right-12 -top-12 h-32 w-32 rounded-full bg-linear-to-br opacity-20 transition-transform duration-700 group-hover:scale-150',
          status.gradient
        )}
      />

      {/* Header: Room Code & Status Badge */}
      <div className='relative z-10 flex items-start justify-between'>
        <div>
          <span className='text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400'>
            Mã phòng
          </span>
          <h3 className='text-2xl font-black tracking-tight text-slate-800'>{room.roomCode}</h3>
        </div>

        <div
          className={cn(
            'flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wide shadow-sm',
            status.colorClass
          )}
        >
          <span className={cn('h-1.5 w-1.5 animate-pulse rounded-full', status.dot)} />
          {status.label}
        </div>
      </div>

      {/* Info Sections */}
      <div className='relative z-10 mt-6 space-y-4'>
        {/* Floor Info */}
        <div className='flex items-center gap-3'>
          <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-colors group-hover:bg-white group-hover:shadow-sm'>
            <Layers size={16} />
          </div>
          <div className='text-sm'>
            <p className='text-[10px] font-medium text-slate-400 uppercase'>Vị trí</p>
            <p className='font-bold text-slate-700 font-mono'>Tầng {room.floor}</p>
          </div>
        </div>

        {/* Tenant Info */}
        <div className='flex items-center gap-3'>
          <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-colors group-hover:bg-white group-hover:shadow-sm'>
            <User size={16} />
          </div>
          <div className='text-sm'>
            <p className='text-[10px] font-medium text-slate-400 uppercase'>Khách thuê</p>
            {room.tenant ? (
              <p className='font-bold text-blue-600 transition-colors group-hover:text-blue-700'>
                {room.tenant.fullName}
              </p>
            ) : (
              <p className='font-medium italic text-slate-300'>Đang trống</p>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className='my-5 border-t border-slate-50' />

      {/* Footer: Note & Action */}
      <div className='relative z-10 flex items-center justify-between gap-4'>
        <div className='flex flex-1 items-center gap-2 overflow-hidden rounded-xl bg-slate-50/50 p-2 group-hover:bg-slate-50 transition-colors'>
          <Info size={14} className='shrink-0 text-slate-300' />
          <p className='truncate text-xs italic text-slate-500'>
            {room.note || 'Không có ghi chú'}
          </p>
        </div>

        <RoomDialog
          mode='update'
          room={room}
          onUpdate={onUpdate}
          onDelete={onDelete}
          trigger={
            <Button
              size='icon'
              className='h-9 w-9 shrink-0 rounded-xl bg-slate-900 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-600 active:scale-95'
            >
              <Pencil className='h-4 w-4' />
            </Button>
          }
        />
      </div>
    </div>
  )
}
