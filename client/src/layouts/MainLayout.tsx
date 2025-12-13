import { Outlet } from 'react-router-dom'
import Breadcrumb from '@/components/Breadcrumb'
import Header from './Header'
import SideBar from './SideBar'
import Footer from './Footer'

export default function MainLayout() {
  return (
    <div className=' relative flex flex-col w-full h-screen overflow-hidden'>
      <Header className='absolute top-0 left-0 w-full h-20 bg-white shadow-sm' />
      <div className='pt-20 flex flex-row grow overflow-hidden'>
        <SideBar />
        <div className='w-full h-full overflow-y-auto flex flex-col'>
          <Breadcrumb />
          <main className=' grow'>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
