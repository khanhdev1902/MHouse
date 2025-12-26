import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'

import MainLayout from '@/layouts/MainLayout'
import DashBoard from '@/pages/DashBoard'
import Statistic from '@/pages/Statistic'
import Service from '@/pages/Service'
import Room from '@/pages/Room'
import GroupChat from '@/pages/Chat/Chat'
import Contract from '@/pages/Contract'
import UserPage from '@/pages/User'
import Invoice from '@/pages/Invoice'
import LoginPage from '@/pages/Login'
import type { User } from '@/types/User'
import HomePage from '@/pages/Tenant/Home/HomePage'
import InvoicePage from '@/pages/Tenant/Invoice'
import RoomPage from '@/pages/Tenant/Room'
import ContractPageTenant from '@/pages/Tenant/Contract'
import ChatPage from '@/pages/Tenant/Chat'

export default function AppRouter() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<LoginPage setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
    )
  }
  if (user && user.role !== 'admin') {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/tenant' element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path='room' element={<RoomPage />} />
            <Route path='invoice' element={<InvoicePage />} />
            <Route path='groupchat' element={<ChatPage />} />
            <Route path='contract' element={<ContractPageTenant />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<DashBoard />} />
          <Route path='statistic' element={<Statistic />} />
          <Route path='service' element={<Service />} />
          <Route path='room' element={<Room />} />
          <Route path='invoice' element={<Invoice />} />
          <Route path='groupchat' element={<GroupChat />} />
          <Route path='contract' element={<Contract />} />
          <Route path='user' element={<UserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
