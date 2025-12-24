import { useEffect, useState } from 'react'
import Container from '@/components/Container'
import Loading from '@/components/Loading'
import KpiSection from './components/KpiSection'
import DashboardCharts from './components/DashBoardCharts'
import DashBoardTable from './components/DashBoardTable'
import DashBoardAPI from '@/apis/dashboardAPI'

export interface DashBoardData {
  totalRooms?: number
  totalUsers?: number
  availableRooms?: number
  maintenanceRooms?: number
  occupiedRooms?: number
}

export default function DashBoard() {
  const [dashBoardData, setDashBoardData] = useState<DashBoardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await DashBoardAPI.getDashBoard()
        setDashBoardData(res.data)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <Loading />

  return (
    <Container className='flex flex-col gap-5'>
      <KpiSection
        totalRooms={dashBoardData?.totalRooms ?? 0}
        totalUsers={dashBoardData?.totalUsers ?? 0}
        availableRooms={dashBoardData?.availableRooms ?? 0}
      />

      <DashboardCharts
        availableRooms={dashBoardData?.availableRooms ?? 0}
        occupiedRooms={dashBoardData?.occupiedRooms ?? 0}
        maintenanceRooms={dashBoardData?.maintenanceRooms ?? 0}
      />

      <DashBoardTable />
    </Container>
  )
}
