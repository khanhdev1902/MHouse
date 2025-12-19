import { cn } from '@/lib/utils'
import type { Room } from '@/types/Room'
import { Pencil } from 'lucide-react'
import RoomDialog from './RoomDialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const ROOM_STATUS = {
  available: {
    label: 'Đang trống',
    className: 'bg-green-100 text-green-700',
    border: 'group-hover:border-green-300',
    dot: 'bg-green-500',
  },
  occupied: {
    label: 'Đang thuê',
    className: 'bg-orange-100 text-orange-700',
    border: 'group-hover:border-orange-300',
    dot: 'bg-orange-500',
  },
  maintenance: {
    label: 'Bảo trì',
    className: 'bg-yellow-100 text-yellow-700',
    border: 'group-hover:border-yellow-300',
    dot: 'bg-yellow-500',
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
        'group relative rounded-2xl border bg-white p-5',
        'transition-all duration-300',
        'shadow-[0_4px_12px_rgba(0,0,0,0.04)]',
        'hover:-translate-y-1 hover:shadow-lg',
        status.border
      )}
    >
      {/* Room code */}
      <div className='absolute top-3 right-4 text-lg font-bold text-gray-400'>{room.roomCode}</div>

      {/* Edit button */}
      <div className='absolute bottom-3 right-3 opacity-0 transition-all duration-200 group-hover:opacity-100'>
        <RoomDialog
          mode='update'
          room={room}
          onUpdate={onUpdate}
          onDelete={onDelete}
          trigger={
            <Button
              size='icon'
              variant='ghost'
              className='bg-white/80 backdrop-blur hover:bg-white shadow-sm'
            >
              <Pencil className='h-4 w-4' />
            </Button>
          }
        />
      </div>

      {/* Title */}
      <p className='text-xl font-bold tracking-tight'>Phòng</p>

      {/* Floor */}
      <div className='mt-3 flex items-center gap-2 text-sm'>
        <span className='text-muted-foreground'>Tầng</span>
        <span className='font-semibold text-main'>{room.floor}</span>
      </div>

      {/* Status */}
      <div className='mt-3 flex items-center gap-2'>
        <span className={cn('h-2 w-2 rounded-full', status.dot)} />
        <Badge className={cn('rounded-full px-3 py-1 text-xs', status.className)}>
          {status.label}
        </Badge>
      </div>

      {/* Note */}
      {room.note && (
        <div className='mt-3 text-sm text-muted-foreground italic line-clamp-2'>“{room.note}”</div>
      )}
    </div>
  )
}
