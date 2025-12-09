import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell, Newspaper } from 'lucide-react'
import { CalendarInput } from './CaledarInput'
export default function Header() {
  return (
    <header className=' flex flex-row justify-between items-center px-10 py-4 shadow-sm'>
      <div className='flex flex-row gap-3 items-center'>
        <Newspaper size={36} className='' />
        <span className='text-3xl font-bold'>Nhà trọ Thái Hà</span>
      </div>
      <div className='flex flex-row gap-3 items-center'>
        <CalendarInput />
        <Bell size={36} className=' rounded-full p-2 border' />
        <Avatar>
          <AvatarImage src='https://i.pinimg.com/736x/a2/7b/b4/a27bb41fd235113a0c5503123a25d227.jpg' />
          <AvatarFallback>KD</AvatarFallback>
        </Avatar>
        {/* <div className=' text-main'>hhaha</div> */}
      </div>
    </header>
  )
}
