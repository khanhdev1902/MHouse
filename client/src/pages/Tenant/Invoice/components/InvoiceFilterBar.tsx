/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Filter } from 'lucide-react'
import { useRoom } from '@/hooks/useRoom'
import { cn } from '@/lib/utils'
import type { InvoiceFilter } from '@/hooks/useFilterInvoice'
// import { useState } from 'react'

const STATUS_INVOICES = [
  { key: 'all', title: 'Tất cả' },
  { key: 'unpaid', title: 'Chưa thanh toán', color: 'bg-amber-500' },
  { key: 'paid', title: 'Đã thanh toán', color: 'bg-emerald-500' },
  { key: 'late', title: 'Quá hạn', color: 'bg-rose-500' },
] as const

type Props = {
  filter: any
  updateFilter: (key: keyof InvoiceFilter, value: string | number) => void
}

export default function InvoiceFilterBar({ filter, updateFilter }: Props) {
  const { rooms } = useRoom()
  // const [open, setOpen] = useState(false)

  return (
    <div className='flex flex-col gap-6 py-8 animate-in fade-in duration-500'>
      {/* ===== TOP BAR: SEARCH & PRIMARY ACTIONS ===== */}
      <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-4'>
        {/* Search Group */}
        <div className='relative flex-1 max-w-2xl group'>
          <Search
            className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-main transition-colors'
            size={18}
          />
          <Input
            value={filter.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            placeholder='Tìm mã hóa đơn, khách hàng, số phòng...'
            className='pl-11 pr-32 h-12 bg-white border-slate-200 rounded-2xl shadow-sm focus-visible:ring-main/20 focus-visible:border-main transition-all'
          />
          <Button className='absolute right-1.5 top-1.5 h-9 rounded-xl bg-main hover:bg-[#122b85] shadow-md shadow-blue-100'>
            Tìm kiếm
          </Button>
        </div>

        {/* Action Buttons */}
        {/* <div className='flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0'>
          <Button
            variant='outline'
            className='rounded-xl border-slate-200 hover:bg-slate-50 gap-2 h-11 px-5 font-bold text-slate-600 active:scale-95 transition-all'
          >
            <FilePlus size={18} className='text-[#00b09b]' />
            <span className='hidden sm:inline' onClick={() => setOpen(true)}>
              Tạo hóa đơn
            </span>
            <InvoiceDialog open={open} setOpen={setOpen} />
          </Button>

          <Button
            variant='outline'
            className='rounded-xl border-slate-200 hover:bg-slate-50 gap-2 h-11 px-5 font-bold text-slate-600 active:scale-95 transition-all'
          >
            <Download size={18} className='text-blue-500' />
            <span className='hidden sm:inline'>Xuất file</span>
          </Button>

          <Button
            variant='outline'
            className='rounded-xl border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 gap-2 h-11 px-5 font-bold text-slate-600 active:scale-95 transition-all'
          >
            <BellRing size={18} className='text-rose-500' />
            <span className='hidden sm:inline'>Nhắc nợ</span>
          </Button>
        </div> */}
        <div></div>
      </div>

      {/* ===== BOTTOM BAR: FILTERS ===== */}
      <div className='bg-white p-5 rounded-4xl border border-slate-100 shadow-sm flex flex-col xl:flex-row gap-6 items-center'>
        {/* Status Chips */}
        <div className='flex items-center gap-4 w-full xl:w-auto'>
          <div className='flex items-center gap-2 text-slate-400 shrink-0'>
            <Filter size={14} className='font-bold' />
            <span className='text-[10px] font-black uppercase tracking-widest'>Trạng thái</span>
          </div>
          <div className='flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl w-full overflow-x-auto scrollbar-hide'>
            {STATUS_INVOICES.map((item) => {
              const isActive = filter.status === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => updateFilter('status', item.key)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap flex items-center gap-2',
                    isActive
                      ? 'bg-white text-main shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  )}
                >
                  {item.key !== 'all' && (
                    <span className={cn('h-1.5 w-1.5 rounded-full', item.color)} />
                  )}
                  {item.title}
                </button>
              )
            })}
          </div>
        </div>

        <div className='hidden xl:block w-px h-8 bg-slate-100' />

        {/* Shadcn Selects Group */}
        <div className='flex flex-wrap items-center gap-2 w-full xl:flex-1 justify-end'>
          {/* Select Phòng */}
          <div className='flex items-center gap-3'>
            <span className='text-xs font-bold text-slate-400 uppercase tracking-tight'>
              Phòng:
            </span>
            <Select value={filter.room} onValueChange={(v) => updateFilter('room', v)}>
              <SelectTrigger className='w-fit bg-slate-50/50 border-none rounded-xl h-10 font-bold text-slate-700 focus:ring-[#00b09b]/20'>
                <SelectValue placeholder='Chọn phòng' />
              </SelectTrigger>
              <SelectContent className='rounded-xl border-slate-100'>
                <SelectItem value='all'>Tất cả phòng</SelectItem>
                {rooms?.map((room: any) => (
                  <SelectItem key={room.roomCode} value={room.roomCode}>
                    Phòng {room.roomCode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Select Thời gian */}
          <div className='flex items-center gap-3 min-w-60'>
            <span className='text-xs font-bold text-slate-400 uppercase tracking-tight min-w-fit'>
              Thời gian:
            </span>
            <div className='flex items-center gap-2 w-full'>
              <Select value={filter.month} onValueChange={(v) => updateFilter('month', v)}>
                <SelectTrigger className='w-full bg-slate-50/50 border-none rounded-xl h-10 font-bold text-slate-700'>
                  <SelectValue placeholder='Tháng' />
                </SelectTrigger>
                <SelectContent className='rounded-xl'>
                  <SelectItem value='all'>Tất cả tháng</SelectItem>
                  {Array.from({ length: 12 }, (_, i) => {
                    const m = String(i + 1).padStart(2, '0')
                    return (
                      <SelectItem key={m} value={m}>
                        Tháng {m}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>

              <Select value={filter.year} onValueChange={(v) => updateFilter('year', v)}>
                <SelectTrigger className='w-full bg-slate-50/50 border-none rounded-xl h-10 font-bold text-slate-700'>
                  <SelectValue placeholder='Năm' />
                </SelectTrigger>
                <SelectContent className='rounded-xl'>
                  <SelectItem value='all'>Tất cả năm</SelectItem>
                  {[2025, 2026, 2027, 2028].map((y) => (
                    <SelectItem key={y} value={String(y)}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
