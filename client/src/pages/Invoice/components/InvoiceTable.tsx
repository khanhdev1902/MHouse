import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Invoice } from '@/types/Invoice'
import { Edit3, FileText, User, Home, Calendar, Clock, CreditCard } from 'lucide-react'
import InvoiceDialog from './InvoiceDialog'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('vi-VN')
}

/* ================= CONFIG: Tinh chỉnh màu sắc hiện đại hơn ================= */
const STATUS_MAP = {
  paid: {
    label: 'Đã thanh toán',
    className: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    dot: 'bg-emerald-500',
  },
  unpaid: {
    label: 'Chưa thanh toán',
    className: 'bg-amber-50 text-amber-600 border-amber-100',
    dot: 'bg-amber-500',
  },
  late: {
    label: 'Quá hạn',
    className: 'bg-rose-50 text-rose-600 border-rose-100',
    dot: 'bg-rose-500',
  },
} as const

type InvoiceTableProps = {
  INVOICE_DATA?: Invoice[]
}

export default function InvoiceTable({ INVOICE_DATA = [] }: InvoiceTableProps) {
  const [open, setOpen] = useState(false)
  const [cellData, setCellData] = useState<Invoice | undefined>()

  return (
    <div className='rounded-3xl border border-slate-100 bg-white shadow-sm overflow-hidden animate-in fade-in duration-500'>
      <Table>
        <TableHeader className='bg-slate-50/50'>
          <TableRow className='hover:bg-transparent border-slate-100'>
            <TableHead className='w-[120px] font-bold text-slate-500 uppercase text-[10px] tracking-widest pl-6'>
              Mã hóa đơn
            </TableHead>
            <TableHead className='font-bold text-slate-500 uppercase text-[10px] tracking-widest'>
              Thông tin thuê
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
            <TableHead className='text-right font-bold text-slate-500 uppercase text-[10px] tracking-widest pr-6'>
              Thao tác
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {INVOICE_DATA.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className='py-24 text-center'>
                <div className='flex flex-col items-center justify-center gap-3'>
                  <div className='p-4 bg-slate-50 rounded-2xl text-slate-300'>
                    <FileText size={40} />
                  </div>
                  <p className='text-sm font-medium text-slate-400'>Chưa có dữ liệu hóa đơn</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            INVOICE_DATA.map((item) => {
              const status = STATUS_MAP[item.status]

              return (
                <TableRow
                  key={item.id}
                  className='group transition-colors hover:bg-slate-50/50 border-slate-50'
                >
                  {/* Mã HĐ */}
                  <TableCell className='pl-6 font-mono text-xs font-bold text-slate-400 group-hover:text-main transition-colors'>
                    #{item.id}
                  </TableCell>

                  {/* Thông tin thuê: Kết hợp Phòng & Người thuê */}
                  <TableCell>
                    <div className='flex flex-col gap-1'>
                      <div className='flex items-center gap-2'>
                        <Home size={14} className='text-slate-400' />
                        <span className='font-bold text-slate-700 text-sm'>Phòng {item.room}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <User size={14} className='text-slate-300' />
                        <span className='text-xs text-slate-500'>{item.tenant}</span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Kỳ thanh toán */}
                  <TableCell>
                    <div className='flex items-center gap-2 text-slate-600'>
                      <Calendar size={14} className='text-slate-300' />
                      <span className='text-sm font-medium'>{item.month}</span>
                    </div>
                  </TableCell>

                  {/* Tổng tiền */}
                  <TableCell className='text-right pr-10'>
                    <div className='flex flex-col items-end'>
                      <span className='text-sm font-black text-main'>
                        {item.total.toLocaleString('vi-VN')}₫
                      </span>
                      <div className='flex items-center gap-1 text-[10px] text-slate-400 uppercase font-bold'>
                        <CreditCard size={10} /> Chuyển khoản
                      </div>
                    </div>
                  </TableCell>

                  {/* Trạng thái: Badge bo tròn đẹp mắt */}
                  <TableCell className='text-center'>
                    <div
                      className={cn(
                        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold border shrink-0',
                        status.className
                      )}
                    >
                      <span className={cn('h-1.5 w-1.5 rounded-full animate-pulse', status.dot)} />
                      {status.label}
                    </div>
                  </TableCell>

                  {/* Hạn trả */}
                  <TableCell>
                    <div className='flex items-center gap-2 text-slate-500'>
                      <Clock
                        size={14}
                        className={cn(item.status === 'late' ? 'text-rose-400' : 'text-slate-300')}
                      />
                      <span className='text-xs font-medium'>{formatDate(item.dueDate)}</span>
                    </div>
                  </TableCell>

                  {/* Thao tác */}
                  <TableCell className='text-right pr-6'>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-9 w-9 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-main/10 hover:text-main text-slate-400'
                      onClick={() => {
                        setCellData(item)
                        setOpen(true)
                      }}
                    >
                      <Edit3 size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>

      <InvoiceDialog open={open} setOpen={setOpen} data={cellData} />
    </div>
  )
}
