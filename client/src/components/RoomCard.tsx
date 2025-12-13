import { cn } from '@/lib/utils'
import type { Room } from '@/types/Room'
import { EyeOff } from 'lucide-react'

export default function RoomCard({ room }: { room?: Room }) {
  return (
    <div className=' relative rounded-2xl border shadow-xs py-2 px-4'>
      <div className=' absolute top-3 right-5 text-2xl font-bold'>{room?.roomNumb}</div>
      <div className=' absolute bottom-3 right-5 text-main cursor-pointer'>
        <EyeOff />
      </div>
      <p className=' font-bold text-xl'>Phòng</p>
      <div className=' space-x-1.5'>
        <span className=' font-semibold'>Tầng:</span>
        <span className='font-bold text-main'>{room?.floor}</span>
      </div>
      <div className=' space-x-1.5'>
        <span className=' font-semibold'>Trạng thái:</span>
        <span
          className={cn(
            'font-bold',
            room?.status === 'Đang trống'
              ? 'text-green-700'
              : room?.status === 'Đang thuê'
              ? 'text-orange-700'
              : 'text-yellow-600'
          )}
        >
          {room?.status}
        </span>
      </div>
    </div>
  )
}
