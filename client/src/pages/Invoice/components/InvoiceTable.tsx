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
import { cn } from '@/lib/utils'

/* ================= CONFIG ================= */

const STATUS_MAP = {
  paid: {
    label: 'Đã thanh toán',
    className: 'bg-green-100 text-green-700',
  },
  unpaid: {
    label: 'Chưa thanh toán',
    className: 'bg-yellow-100 text-yellow-700',
  },
  late: {
    label: 'Quá hạn',
    className: 'bg-red-100 text-red-700',
  },
} as const

/* ================= TYPES ================= */

type InvoiceTableProps = {
  INVOICE_DATA?: Invoice[]
}

/* ================= COMPONENT ================= */

export default function InvoiceTable({ INVOICE_DATA = [] }: InvoiceTableProps) {
  const [open, setOpen] = useState(false)
  const [cellData, setCellData] = useState<Invoice | undefined>()

  return (
    <>
      <Table>
        <TableCaption className='text-sm text-muted-foreground'>
          Danh sách hóa đơn
        </TableCaption>

        <TableHeader>
          <TableRow className='bg-muted/40'>
            <TableHead className='w-[120px]'>Mã HĐ</TableHead>
            <TableHead>Phòng</TableHead>
            <TableHead>Người thuê</TableHead>
            <TableHead>Thời gian</TableHead>
            <TableHead className='text-right'>Tổng tiền</TableHead>
            <TableHead className='text-center'>Trạng thái</TableHead>
            <TableHead>Hạn trả</TableHead>
            <TableHead className='text-right'>Thao tác</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* Empty state */}
          {INVOICE_DATA.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={8}
                className='py-10 text-center text-muted-foreground'
              >
                Chưa có hóa đơn nào
              </TableCell>
            </TableRow>
          )}

          {INVOICE_DATA.map((item) => {
            const status = STATUS_MAP[item.status]

            return (
              <TableRow
                key={item.id}
                className={cn(
                  'group transition-colors',
                  'hover:bg-muted/50'
                )}
              >
                <TableCell className='font-semibold'>
                  #{item.id}
                </TableCell>

                <TableCell>{item.room}</TableCell>

                <TableCell>{item.tenant}</TableCell>

                <TableCell>{item.month}</TableCell>

                <TableCell className='text-right font-semibold text-main'>
                  {item.total.toLocaleString('vi-VN')}₫
                </TableCell>

                <TableCell className='text-center'>
                  <span
                    className={cn(
                      'inline-block min-w-[120px]',
                      'rounded-full px-3 py-1 text-xs font-medium text-center',
                      status.className
                    )}
                  >
                    {status.label}
                  </span>
                </TableCell>

                <TableCell>{item.dueDate}</TableCell>

                <TableCell className='flex justify-end pr-5'>
                  <SquarePen
                    size={20}
                    onClick={() => {
                      setCellData(item)
                      setOpen(true)
                    }}
                    className={cn(
                      'cursor-pointer text-main',
                      'opacity-100 transition-all',
                      'group-hover:opacity-100',
                      'hover:scale-110 active:scale-95'
                    )}
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      {/* Dialog */}
      <InvoiceDialog open={open} setOpen={setOpen} data={cellData} />
    </>
  )
}
