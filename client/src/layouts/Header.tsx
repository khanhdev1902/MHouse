import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell, Newspaper, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CalendarInput } from '@/components/CaledarInput'

export default function Header({ className }: { className?: string }) {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  console.log(user)
  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex h-20 w-full flex-row items-center justify-between px-10',
        'bg-white/80 backdrop-blur-xl border-b border-slate-100',
        className
      )}
    >
      <div className='flex sm:hidden flex-row gap-3 items-center group cursor-pointer'>
        <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-[#00b09b] to-main shadow-lg shadow-blue-100 transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300'>
          <Newspaper size={24} className='text-white' />
        </div>
        <div className='flex flex-col'>
          <span className='text-xl font-black tracking-tight text-main leading-none'>
            Nhà trọ Thái Hà
          </span>
          <span className='text-[10px] font-bold uppercase tracking-widest text-[#00b09b] mt-1'>
            Hệ thống quản lý
          </span>
        </div>
      </div>

      <div className='hidden lg:flex relative w-1/3'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' size={18} />
        <input
          type='text'
          placeholder='Tìm kiếm nhanh...'
          className='w-full bg-slate-50 border-none rounded-2xl py-2 pl-10 text-sm focus:ring-2 focus:ring-[#00b09b]/20 transition-all outline-none'
        />
      </div>

      <div className='flex flex-row gap-5 items-center'>
        <div className='hidden md:block'>
          <CalendarInput />
        </div>

        <div className='relative cursor-pointer group'>
          <div className='absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-rose-500 border-2 border-white animate-pulse z-10' />
          <div className='p-2.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-500 group-hover:bg-main/5 group-hover:text-main transition-all duration-300'>
            <Bell size={20} />
          </div>
        </div>

        <div className='h-8 w-px bg-slate-100' />

        <div className='flex items-center gap-3 pl-2 group cursor-pointer'>
          <div className='flex-col items-end hidden sm:flex'>
            <span className='text-sm font-bold text-slate-800 leading-none'>{user?.fullName}</span>
            <span className='text-[10px] font-medium text-slate-400 mt-1'>
              {user?.role === 'admin' ? 'Quản trị viên' : 'Khách thuê'}
            </span>
          </div>
          <div className='p-0.5 rounded-full border-2 border-[#00b09b]/20 group-hover:border-[#00b09b] transition-all duration-300'>
            <Avatar className='h-10 w-10 shadow-sm'>
              {user?.role === 'admin' ? (
                <AvatarImage src='https://i.pinimg.com/736x/a2/7b/b4/a27bb41fd235113a0c5503123a25d227.jpg' />
              ) : (
                <AvatarImage src='https://i.pinimg.com/736x/68/85/4a/68854a914801432ec3f17c38ce67f429.jpg' />
              )}
              <AvatarFallback className='bg-slate-100 text-main font-bold'>KD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}
