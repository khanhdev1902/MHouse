import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  BarChart3,
  Settings2,
  DoorOpen,
  Receipt,
  MessageSquare,
  FileText,
  Users,
  LogOut,
  ChevronRight,
} from 'lucide-react'

export default function SideBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const currentPath =
    user?.role === 'admin'
      ? location.pathname.split('/')[1] || ''
      : window.location.pathname.slice(1) || ''
  console.log('haha', { currentPath })
  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  const MENU_ITEMS =
    user.role === 'admin'
      ? [
          { title: 'Bảng điều khiển', path: '', icon: LayoutDashboard },
          { title: 'Thống kê chi tiết', path: 'statistic', icon: BarChart3 },
          { title: 'Quản lý phòng', path: 'room', icon: DoorOpen },
          { title: 'Hợp đồng thuê', path: 'contract', icon: FileText },
          { title: 'Hóa đơn & Thu phí', path: 'invoice', icon: Receipt },
          { title: 'Dịch vụ tiện ích', path: 'service', icon: Settings2 },
          { title: 'Tin nhắn nhóm', path: 'groupchat', icon: MessageSquare },
          { title: 'Người dùng', path: 'user', icon: Users },
        ]
      : [
          { title: 'Trang chủ', path: 'tenant', icon: LayoutDashboard },
          { title: 'Phòng của bạn', path: 'tenant/room', icon: DoorOpen },
          { title: 'Hợp đồng của bạn', path: 'tenant/contract', icon: FileText },
          { title: 'Hóa đơn', path: 'tenant/invoice', icon: Receipt },
          { title: 'Tin nhắn nhóm', path: 'tenant/groupchat', icon: MessageSquare },
        ]
  return (
    <nav className='flex h-screen w-64 flex-col border-r border-slate-100 bg-white p-4 transition-all duration-300'>
      {/* ===== BRAND LOGO ===== */}
      <div className='mb-8 px-4 py-4 flex items-center gap-3 group cursor-pointer'>
        <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-[#00b09b] to-main shadow-lg shadow-main/20 text-white transition-transform group-hover:scale-105 duration-300'>
          <LayoutDashboard size={26} strokeWidth={2.5} />
        </div>
        <div className='flex flex-col'>
          <h2 className='text-xl font-black tracking-tighter text-primary leading-none'>
            MHOUSE
          </h2>
          <p className='text-[10px] font-bold uppercase tracking-widest text-[#00b09b] mt-1'>
            {user?.role === 'admin' ? 'Hệ thống quản lý' : 'welcome tenant'}
          </p>
        </div>
      </div>

      {/* ===== MENU LIST ===== */}
      <div className='flex flex-1 flex-col gap-1.5 overflow-y-auto scrollbar-hide'>
        <p className='px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 mt-4'>
          Danh mục chính
        </p>

        {MENU_ITEMS.map((item, key) => {
          const isActive = currentPath === item.path
          const Icon = item.icon

          return (
            <div
              key={key}
              onClick={() => navigate(`/${item.path}`)}
              className={cn(
                'group relative flex items-center justify-between px-4 py-3.5 rounded-2xl cursor-pointer select-none transition-all duration-300',
                isActive
                  ? 'bg-linear-to-r from-main/10 to-main/0 text-main'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              {/* Active Bar */}
              {isActive && (
                <div className='absolute left-0 h-7 w-1 rounded-r-full bg-main shadow-[2px_0_10px_rgba(25,60,184,0.5)]' />
              )}

              <div className='flex items-center gap-3.5'>
                <Icon
                  size={20}
                  className={cn(
                    'transition-all duration-300',
                    isActive ? 'text-main scale-110' : 'text-slate-400 group-hover:text-slate-900'
                  )}
                />
                <span
                  className={cn(
                    'text-[14px] font-bold tracking-tight',
                    isActive ? 'translate-x-0.5' : 'group-hover:translate-x-0.5'
                  )}
                >
                  {item.title}
                </span>
              </div>

              {isActive && (
                <ChevronRight size={14} className='text-main animate-in slide-in-from-left-2' />
              )}
            </div>
          )
        })}
      </div>

      {/* ===== USER / LOGOUT ===== */}
      <div className='mt-auto border-t border-slate-50 pt-6 px-2'>
        <div className='mb-4 flex items-center gap-3 px-2'>
          <div className='h-9 w-9 rounded-full bg-slate-100 border border-slate-200' />
          <div className='flex flex-col'>
            <span className='text-xs font-bold text-slate-800'>Admin MHouse</span>
            <span className='text-[10px] text-slate-400 font-medium'>Bản cập nhật 2.0</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className='flex w-full items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-400 font-bold text-sm hover:bg-rose-50 hover:text-rose-500 transition-all duration-300 group'
        >
          <LogOut size={18} className='transition-transform group-hover:-translate-x-1' />
          <span>Đăng xuất hệ thống</span>
        </button>
      </div>
    </nav>
  )
}
