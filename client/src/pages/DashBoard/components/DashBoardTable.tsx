import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Invoice } from '@/types/Invoice'
import { formatCurrency } from '@/utils/format'
import dayjs from 'dayjs'
import { cn } from '@/lib/utils'

export default function DashBoardTable({ invoices = [] }: { invoices?: Invoice[] }) {
  return (
    <div className='w-full overflow-hidden'>
      <Table className='w-full border-collapse'>
        <TableHeader className='bg-slate-50/80'>
          <TableRow className='hover:bg-transparent border-slate-100'>
            <TableHead className='w-[140px] font-bold text-slate-500 uppercase text-[10px] tracking-[0.15em] pl-6'>
              Phòng
            </TableHead>
            <TableHead className='font-bold text-slate-500 uppercase text-[10px] tracking-[0.15em]'>
              Kỳ thanh toán
            </TableHead>
            <TableHead className='text-right font-bold text-slate-500 uppercase text-[10px] tracking-[0.15em] pr-8'>
              Tổng tiền
            </TableHead>
            <TableHead className='text-center font-bold text-slate-500 uppercase text-[10px] tracking-[0.15em]'>
              Trạng thái
            </TableHead>
            <TableHead className='font-bold text-slate-500 uppercase text-[10px] tracking-[0.15em] pr-6'>
              Hạn chót
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {invoices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className='text-center py-16 text-slate-400'>
                <div className='flex flex-col items-center gap-2'>
                  <div className='w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300'>
                    ∅
                  </div>
                  <p className='text-sm font-medium'>Không có dữ liệu hóa đơn</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            invoices.map((inv) => (
              <TableRow
                key={inv.id}
                className='group border-slate-100 hover:bg-slate-50/80 transition-all duration-200'
              >
                {/* Mã hóa đơn: Font chữ monospaced hoặc đậm hơn */}
                <TableCell className='pl-6 font-semibold text-slate-900 text-sm'>
                  {inv.room}
                </TableCell>

                {/* Kỳ thanh toán: Thêm icon hoặc format đẹp hơn */}
                <TableCell>
                  <div className='flex flex-col'>
                    <span className='text-sm font-medium text-slate-700'>
                      Tháng {dayjs(inv.month).format('MM')}
                    </span>
                    <span className='text-[11px] text-slate-400'>
                      Năm {dayjs(inv.month).format('YYYY')}
                    </span>
                  </div>
                </TableCell>

                {/* Tổng tiền: Font số đậm và rõ ràng */}
                <TableCell className='text-right pr-8 font-bold text-slate-900'>
                  {formatCurrency(inv.totalAmount || 0)}
                </TableCell>

                {/* Trạng thái: Style Badge Soft hiện đại */}
                <TableCell className='text-center'>
                  <span
                    className={cn(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-sm',
                      inv.status === 'paid'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : 'bg-rose-50 text-rose-600 border border-rose-100'
                    )}
                  >
                    <span
                      className={cn(
                        'w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse',
                        inv.status === 'paid' ? 'bg-emerald-500' : 'bg-rose-500'
                      )}
                    />
                    {inv.status === 'paid' ? 'Đã thu' : 'Chưa thu'}
                  </span>
                </TableCell>

                {/* Hạn chót: Tự động đổi màu nếu quá hạn */}
                <TableCell className='pr-6'>
                  <span
                    className={cn(
                      'text-sm font-medium',
                      inv.status !== 'paid' && dayjs().isAfter(dayjs(inv.dueDate))
                        ? 'text-rose-500 underline underline-offset-4 decoration-rose-200'
                        : 'text-slate-500'
                    )}
                  >
                    {inv.dueDate ? dayjs(inv.dueDate).format('DD/MM/YYYY') : '--'}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
