import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'

import MainLayout from '@/layouts/MainLayout'
import DashBoard from '@/pages/DashBoard'
import Statistic from '@/pages/Statistic'
import Service from '@/pages/Service'
import Room from '@/pages/Room'
import GroupChat from '@/pages/Chat/Chat'
import Contract from '@/pages/Contract'
import User from '@/pages/User'
import Invoice from '@/pages/Invoice'
import LoginPage from '@/pages/Login'

export default function AppRouter() {
  const [user, setUser] = useState(null)

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
          <Route path='user' element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
