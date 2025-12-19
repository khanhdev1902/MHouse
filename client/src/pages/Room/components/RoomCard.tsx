import { cn } from '@/lib/utils'
import type { Room } from '@/types/Room'
import { Pencil } from 'lucide-react'
import RoomUpdateDialog from './RoomUpdateDialog'
import { Button } from '@/components/ui/button'

type RoomCardProps = {
  room: Room
  onUpdate: (roomId: number, data: Partial<Room>) => void
}

export default function RoomCard({ room, onUpdate }: RoomCardProps) {
  return (
    <div className='relative rounded-2xl border shadow-xs py-2 px-4'>
      <div className='absolute top-3 right-5 text-2xl font-bold'>{room.roomCode}</div>

      <div className='absolute bottom-1 right-2 text-main cursor-pointer'>
        <RoomUpdateDialog
          room={room}
          onSubmit={onUpdate}
          trigger={
            <Button size='icon' variant='ghost'>
              <Pencil className='w-4 h-4' />
            </Button>
          }
        />
      </div>

      <p className='font-bold text-xl'>Phòng</p>

      <div className='space-x-1.5'>
        <span className='font-semibold'>Tầng:</span>
        <span className='font-bold text-main'>{room.floor}</span>
      </div>

      <div className='space-x-1.5'>
        <span className='font-semibold'>Trạng thái:</span>
        <span
          className={cn(
            'font-bold',
            room.status === 'available'
              ? 'text-green-700'
              : room.status === 'occupied'
              ? 'text-orange-700'
              : 'text-yellow-600'
          )}
        >
          {room.status}
        </span>
      </div>
    </div>
  )
}
