import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Invoice } from '@/types/Invoice'

const STATUS_COLOR = {
  paid: 'bg-green-100 text-green-700',
  unpaid: 'bg-yellow-100 text-yellow-700',
  late: 'bg-red-100 text-red-700',
} as const

type InvoiceTableUserProps = {
  invoices?: Invoice[]
}

export default function InvoiceTableUser({
  invoices = [],
}: InvoiceTableUserProps) {
  return (
    <Table>
      <TableCaption>Hóa đơn của bạn</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Mã HĐ</TableHead>
          <TableHead>Phòng</TableHead>
          <TableHead>Thời gian</TableHead>
          <TableHead className="text-right">Tổng tiền</TableHead>
          <TableHead className="text-center">Trạng thái</TableHead>
          <TableHead>Hạn trả</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {invoices.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
              Không có hóa đơn
            </TableCell>
          </TableRow>
        )}

        {invoices.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-semibold">{item.id}</TableCell>
            <TableCell>{item.room}</TableCell>
            <TableCell>{item.month}</TableCell>

            <TableCell className="text-right font-semibold">
              {item.total.toLocaleString('vi-VN')}₫
            </TableCell>

            <TableCell className="text-center">
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium inline-block min-w-[110px] ${
                  STATUS_COLOR[item.status]
                }`}
              >
                {item.status === 'paid'
                  ? 'Đã thanh toán'
                  : item.status === 'unpaid'
                  ? 'Chưa thanh toán'
                  : 'Quá hạn'}
              </span>
            </TableCell>

            <TableCell>{item.dueDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
