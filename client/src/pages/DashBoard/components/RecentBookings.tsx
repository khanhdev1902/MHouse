import { cn } from "@/lib/utils"

type Booking = {
  room: string
  type: string
  status: "Available" | "Occupied" | "Maintenance"
  price: number
}

const bookings: Booking[] = [
  { room: "101", type: "Single", status: "Occupied", price: 500000 },
  { room: "102", type: "Double", status: "Available", price: 800000 },
  { room: "103", type: "Suite", status: "Maintenance", price: 2000000 },
  { room: "104", type: "Single", status: "Occupied", price: 500000 },
]

const statusColor = {
  Available: "bg-green-100 text-green-800",
  Occupied: "bg-blue-100 text-blue-800",
  Maintenance: "bg-red-100 text-red-800",
}

export default function RecentBookings() {
  return (
    <div className="w-full p-4 rounded-xl">
      <h3 className="text-sm font-medium mb-2">Phòng thuê gần đây</h3>
      <table className="w-full text-left text-sm">
        <thead className="border-b">
          <tr>
            <th className="p-2">Room</th>
            <th className="p-2">Type</th>
            <th className="p-2">Status</th>
            <th className="p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="p-2">{b.room}</td>
              <td className="p-2">{b.type}</td>
              <td className="p-2">
                <span className={cn("px-2 py-1 rounded-full text-xs font-semibold", statusColor[b.status])}>
                  {b.status}
                </span>
              </td>
              <td className="p-2">{b.price.toLocaleString("vi-VN")} ₫</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
