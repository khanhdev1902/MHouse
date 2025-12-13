import { cn } from "@/lib/utils"

type Invoice = {
  id: string
  customer: string
  total: number
  status: "Paid" | "Pending" | "Overdue"
  date: string
}

const invoices: Invoice[] = [
  { id: "HD001", customer: "Nguyễn Văn A", total: 1200000, status: "Paid", date: "12/12/2025" },
  { id: "HD002", customer: "Trần Thị B", total: 800000, status: "Pending", date: "12/12/2025" },
  { id: "HD003", customer: "Lê Văn C", total: 1500000, status: "Overdue", date: "11/12/2025" },
  { id: "HD004", customer: "Phạm Thị D", total: 500000, status: "Paid", date: "10/12/2025" },
]

const statusColor = {
  Paid: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Overdue: "bg-red-100 text-red-800",
}

export default function RecentInvoices() {
  return (
    <div className="w-full p-4 rounded-xl">
      <h3 className="text-sm font-medium mb-2">Hóa đơn gần đây</h3>
      <table className="w-full text-left text-sm">
        <thead className="border-b">
          <tr>
            <th className="p-2">Invoice ID</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Total</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{inv.id}</td>
              <td className="p-2">{inv.customer}</td>
              <td className="p-2">{inv.total.toLocaleString("vi-VN")} ₫</td>
              <td className="p-2">
                <span className={cn("px-2 py-1 rounded-full text-xs font-semibold", statusColor[inv.status])}>
                  {inv.status}
                </span>
              </td>
              <td className="p-2">{inv.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
