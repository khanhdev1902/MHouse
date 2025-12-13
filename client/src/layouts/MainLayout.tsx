import { Outlet } from 'react-router-dom'
import SideBar from '@/components/SideBar'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function MainLayout() {
  return (
    <div className=' relative flex flex-col w-full min-h-screen overflow-hidden'>
      <Header className=' absolute top-0 left-0 w-full h-20' />
      <main className='pt-20 flex flex-row grow overflow-y-auto'>
        <SideBar />
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
