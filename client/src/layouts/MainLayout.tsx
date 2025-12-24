import { Outlet } from 'react-router-dom'
import Breadcrumb from '@/components/Breadcrumb'
import Header from './Header'
import SideBar from './SideBar'
import Footer from './Footer'

export default function MainLayout() {
  return (
    <div className='flex h-screen w-full overflow-hidden bg-slate-50/50'>
      <aside className='hidden md:flex h-full shrink-0 shadow-xl z-50'>
        <SideBar />
      </aside>
      <div className='flex flex-col grow min-w-0 h-full overflow-hidden'>
        <Header className='shrink-0' />
        <div className='flex flex-col grow overflow-y-auto overflow-x-hidden scrollbar-hide'>
          <div className='grow px-4 py-2 lg:px-8 space-y-2'>
            <Breadcrumb />
            <main className='animate-in fade-in slide-in-from-bottom-3 duration-500'>
              <Outlet />
            </main>
          </div>
          <Footer className='shrink-0 border-t border-slate-100 bg-white/80' />
        </div>
      </div>
    </div>
  )
}
