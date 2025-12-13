import Container from '@/components/Container'
import KpiSection from './components/KpiSection'
import DashboardCharts from './components/DashBoardCharts'
import DashBoardTable from './components/DashBoardTable'

export default function DashBoard() {
  return (
    <Container className='flex flex-col gap-5'>
      {/* <DashBoardHeader /> */}
      <KpiSection />
      <DashboardCharts />
      <DashBoardTable />
    </Container>
  )
}
