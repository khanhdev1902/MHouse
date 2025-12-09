import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
import SideBar from '@/components/SideBar'
import Footer from '@/components/Footer'

export default function MainLayout() {
  return (
    <div className=' flex flex-col w-full min-h-screen overflow-x-hidden'>
      <Header />
      <main className='flex flex-row grow'>
        <SideBar />
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
