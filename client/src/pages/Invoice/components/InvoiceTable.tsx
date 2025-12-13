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
import { SquarePen } from 'lucide-react'
import InvoiceDialog from './InvoiceDialog'
import { useState } from 'react'
const STATUS_COLOR = {
  paid: 'bg-green-100 text-green-600',
  unpaid: 'bg-yellow-100 text-yellow-600',
  late: 'bg-red-100 text-red-600',
}
type InvoiceTableProps = {
  INVOICE_DATA?: Invoice[]
}
export default function InvoiceTable({ INVOICE_DATA = [] }: InvoiceTableProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [cellData, setCellData] = useState<Invoice>()

  return (
    <>
      <Table>
        <TableCaption>Danh sách hóa đơn</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[130px]'>Mã hóa đơn</TableHead>
            <TableHead>Phòng</TableHead>
            <TableHead>Người thuê</TableHead>
            <TableHead>Thời gian</TableHead>
            <TableHead>Tổng tiền</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hạn trả</TableHead>
            <TableHead className='text-right'>Thao tác</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {INVOICE_DATA.map((item, index) => (
            <TableRow key={index}>
              <TableCell className=' font-semibold'>{item.id}</TableCell>
              <TableCell>{item.room}</TableCell>
              <TableCell>{item.tenant}</TableCell>
              <TableCell>{item.month}</TableCell>
              <TableCell>{item.total.toLocaleString('vi-VN')}₫</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 text-xs rounded-lg inline-block min-w-28 text-center ${
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
              <TableCell className='flex justify-end items-center select-none pr-5'>
                <SquarePen
                  onClick={() => {
                    setOpen(true)
                    setCellData(item)
                  }}
                  size={22}
                  className=' cursor-pointer hover:scale-110 active:scale-95 text-main duration-300'
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <InvoiceDialog open={open} setOpen={setOpen} data={cellData}/>
    </>
  )
}
