import { cn } from '@/lib/utils'
import type { Room } from '@/types/Room'
import { Pencil } from 'lucide-react'
import RoomDialog from './RoomDialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const ROOM_STATUS = {
  available: {
    label: 'Đang trống',
    className: 'bg-green-100 text-green-800',
    border: 'group-hover:border-green-300',
    dot: 'bg-green-500',
  },
  occupied: {
    label: 'Đang thuê',
    className: 'bg-orange-100 text-orange-800',
    border: 'group-hover:border-orange-300',
    dot: 'bg-orange-500',
  },
  maintenance: {
    label: 'Bảo trì',
    className: 'bg-yellow-100 text-yellow-800',
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
        'transition-all duration-300 ease-in-out',
        'shadow-md hover:-translate-y-1 hover:shadow-xl',
        status.border
      )}
    >
      {/* Room Code */}
      <div className='absolute top-3 right-4 text-lg font-bold text-gray-400'>{room.roomCode}</div>

      {/* Edit Button */}
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

      {/* Room Title */}
      <p className='text-xl font-bold tracking-tight text-gray-800'>Phòng</p>

      {/* Floor */}
      <div className='mt-3 flex items-center gap-2 text-sm text-gray-600'>
        <span>Tầng:</span>
        <span className='font-semibold text-main'>{room.floor}</span>
      </div>

      {/* Status */}
      <div className='mt-3 flex items-center gap-2'>
        <span className={cn('h-2 w-2 rounded-full', status.dot)} />
        <Badge className={cn('rounded-full px-3 py-1 text-xs font-medium', status.className)}>
          {status.label}
        </Badge>
      </div>

      {/* Tenant */}
      <div className='mt-3 flex items-center gap-2 text-sm'>
        <span className='text-gray-500'>Người thuê:</span>
        {room.tenant ? (
          <span className='font-semibold text-primary'>{room.tenant.fullName}</span>
        ) : (
          <span className='italic text-gray-400'>Chưa có</span>
        )}
      </div>

      {/* Note */}
      {room.note && (
        <div className='mt-3 text-sm text-gray-500 italic line-clamp-2 bg-gray-50 p-2 rounded-lg'>
          “{room.note}”
        </div>
      )}
    </div>
  )
}
