import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell, Newspaper } from 'lucide-react'
import { CalendarInput } from '../CaledarInput'
import { cn } from '@/lib/utils'
export default function Header({ className }: { className?: string }) {
  return (
    <header className={cn('flex flex-row justify-between items-center px-10 py-4 shadow-sm', className)}>
      <div className='flex flex-row gap-3 items-center'>
        <Newspaper size={36} className=' text-main' />
        <span className='text-3xl font-bold text-primary'>Nhà trọ Thái Hà</span>
      </div>
      <div className='flex flex-row gap-4 items-center'>
        <CalendarInput />
        <Bell size={36} className=' rounded-full p-2 border text-main' />
        <Avatar>
          <AvatarImage src='https://i.pinimg.com/736x/a2/7b/b4/a27bb41fd235113a0c5503123a25d227.jpg' />
          <AvatarFallback>KD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
