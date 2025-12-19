import { Button } from '@/components/ui/button'
import type { InvoiceFilter } from '@/hooks/useInvoice'
import { useRoom } from '@/hooks/useRoom'
import { Search } from 'lucide-react'

const STATUS_INVOICES = [
  { key: 'all', title: 'Tất cả' },
  { key: 'unpaid', title: 'Chưa thanh toán' },
  { key: 'paid', title: 'Đã thanh toán' },
  { key: 'late', title: 'Quá hạn' },
] as const

type Props = {
  filter: InvoiceFilter
  updateFilter: (key: keyof InvoiceFilter, value: string | number) => void
}

export default function InvoiceFilterBar({ filter, updateFilter }: Props) {
  const {rooms} =useRoom()
  return (
    <div className='flex flex-col gap-8 pt-10'>
      {/* ===== TOP BAR ===== */}
      <div className='flex items-center justify-between gap-6'>
        {/* Search */}
        <div className='flex items-center gap-3 border rounded-2xl px-4 py-2 shadow-sm w-[480px]'>
          <Search size={18} className='text-muted-foreground' />
          <input
            type='text'
            value={filter.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            placeholder='Mã hóa đơn, tên khách, số phòng...'
            className='flex-1 outline-none bg-transparent text-sm'
          />
          <Button size='sm' className='rounded-xl'>
            Tìm kiếm
          </Button>
        </div>

        {/* Actions */}
        <div className='flex items-center gap-3'>
          <Button variant='outline' className='rounded-xl'>
            + Tạo hóa đơn
          </Button>
          <Button variant='outline' className='rounded-xl'>
            Xuất Excel / PDF
          </Button>
          <Button variant='outline' className='rounded-xl'>
            Gửi nhắc nhở
          </Button>
        </div>
      </div>

      {/* ===== FILTER BAR ===== */}
      <div className='flex items-center justify-between'>
        {/* Status */}
        <div className='flex items-center gap-4'>
          <span className='font-semibold text-base'>Trạng thái:</span>
          <div className='flex items-center gap-1 border rounded-full p-1 bg-muted/40'>
            {STATUS_INVOICES.map((item) => (
              <button
                key={item.key}
                onClick={() => updateFilter('status', item.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all
                  ${
                    filter.status === item.key
                      ? 'bg-primary text-white shadow'
                      : 'text-muted-foreground hover:bg-muted'
                  }
                `}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* Other filters */}
        <div className='flex items-center gap-6'>
          {/* Room */}
          <div className='flex items-center gap-2'>
            <span className='font-semibold'>Phòng:</span>
            <select
              value={filter.room}
              onChange={(e) => updateFilter('room', e.target.value)}
              className='rounded-lg border px-2 py-1 text-sm outline-none'
            >
              <option value='all'>Tất cả</option>
              {rooms?.map((room)=>(
                <option value={room.roomCode}>{room.roomCode}</option>

              ))}
            </select>
          </div>

          {/* Time */}
          <div className='flex items-center gap-4'>
            <span className='font-semibold'>Thời gian:</span>

            <div className='flex items-center gap-2'>
              <span className='text-sm'>Tháng</span>
              <select
                value={filter.month}
                onChange={(e) => updateFilter('month', e.target.value)}
                className='rounded-lg border px-2 py-1 text-sm outline-none'
              >
                <option value='all'>Tất cả</option>
                {Array.from({ length: 12 }, (_, i) => {
                  const m = String(i + 1).padStart(2, '0')
                  return (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  )
                })}
              </select>
            </div>

            <div className='flex items-center gap-2'>
              <span className='text-sm'>Năm</span>
              <select
                value={filter.year}
                onChange={(e) => updateFilter('year', e.target.value)}
                className='rounded-lg border px-2 py-1 text-sm outline-none'
              >
                <option value='all'>Tất cả</option>
                {[2025, 2026, 2027, 2028, 2029].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
