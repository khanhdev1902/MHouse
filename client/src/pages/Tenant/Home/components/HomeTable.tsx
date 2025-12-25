import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import type { Invoice } from '@/types/Invoice'
import { formatCurrency } from '@/utils/format'
import dayjs from 'dayjs'

export default function HomeTable({ invoices = [] }: { invoices?: Invoice[] }) {
  return (
    <Table className='w-full'>
      <TableHeader className='bg-slate-50/50'>
        <TableRow className='hover:bg-transparent border-slate-100'>
          <TableHead className='w-[120px] font-bold text-slate-500 uppercase text-[10px] tracking-widest pl-6'>
            Mã hóa đơn
          </TableHead>
          <TableHead className='font-bold text-slate-500 uppercase text-[10px] tracking-widest'>
            Kỳ thanh toán
          </TableHead>
          <TableHead className='text-right font-bold text-slate-500 uppercase text-[10px] tracking-widest pr-10'>
            Tổng tiền
          </TableHead>
          <TableHead className='text-center font-bold text-slate-500 uppercase text-[10px] tracking-widest'>
            Trạng thái
          </TableHead>
          <TableHead className='font-bold text-slate-500 uppercase text-[10px] tracking-widest'>
            Hạn chót
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {invoices.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className='text-center py-10 text-slate-400'>
              Không có hóa đơn nào
            </TableCell>
          </TableRow>
        )}

        {invoices.map((inv) => (
          <TableRow key={inv.id} className='border-slate-100 hover:bg-slate-50/50 transition'>
            {/* Mã hóa đơn */}
            <TableCell className='pl-6 font-medium text-slate-700'>#{inv.id}</TableCell>

            {/* Kỳ thanh toán */}
            <TableCell className='text-slate-600'>{inv.month}</TableCell>

            {/* Tổng tiền */}
            <TableCell className='text-right pr-10 font-semibold text-slate-800'>
              {formatCurrency(inv.totalAmount || 0)}
            </TableCell>

            {/* Trạng thái */}
            <TableCell className='text-center'>
              <Badge
                variant={inv.status === 'paid' ? 'default' : 'destructive'}
                className='capitalize'
              >
                {inv.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
              </Badge>
            </TableCell>

            {/* Hạn chót */}
            <TableCell className='text-slate-600'>
              {inv.dueDate ? dayjs(inv.dueDate).format('DD/MM/YYYY') : '--'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
