import RecentInvoices from './RecentInvoices'
import RecentBookings from './RecentBookings'

export default function DashBoardTable() {
  return (
    <div className="grid grid-cols-2 gap-5">
    <RecentInvoices />
    <RecentBookings />
  </div>
  )
}
