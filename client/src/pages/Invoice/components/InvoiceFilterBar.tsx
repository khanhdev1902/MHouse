import { Button } from '@/components/ui/button'
import type { InvoiceFilter } from '@/hooks/useInvoice'
import { useState } from 'react'

const StatusInvoices = [
  { key: 'all', title: 'Tất cả' },
  { key: 'unpaid', title: 'Chưa thanh toán' },
  { key: 'paid', title: 'Đã thanh toán' },
  { key: 'late', title: 'Quá hạn' },
]

export default function InvoiceFilterBar({
  filter,
  updateFilter,
}: {
  filter: InvoiceFilter
  updateFilter: (key: keyof InvoiceFilter, value: string | number) => void
}) {
  const [active, setActive] = useState('')
  return (
    <div className='flex flex-col gap-y-12 pt-14'>
      <div className='flex flex-row justify-between items-center'>
        <div className='border rounded-4xl px-3 py-2 shadow-sm'>
          <input
            type='text'
            value={filter.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            placeholder='Mã hóa đơn, tên khách, số phòng...'
            className=' min-w-96 outline-none px-3'
          />
          <Button
            variant={'outline'}
            className=' border rounded-3xl px-5 py-3 shadow-sm cursor-pointer 
              hover:scale-105 active:scale-95 duration-300'
          >
            Tìm kiếm
          </Button>
        </div>
        <div className='flex flex-row gap-3'>
          <Button
            variant={'outline'}
            className=' rounded-xl px-5 py-5 cursor-pointer hover:scale-105 active:scale-95 duration-300 '
          >
            Tạo hóa đơn mới
          </Button>
          <Button
            variant={'outline'}
            className=' rounded-xl px-5 py-5 cursor-pointer hover:scale-105 active:scale-95 duration-300 '
          >
            Xuất Excel / PDF
          </Button>
          <Button
            variant={'outline'}
            className=' rounded-xl px-5 py-5 cursor-pointer hover:scale-105 active:scale-95 duration-300 '
          >
            Gửi nhắc nhở hàng loạt
          </Button>
        </div>
      </div>
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-row gap-2 items-center'>
          <div className=' text-lg font-semibold'> Trạng thái:</div>
          <div className='flex flex-row border rounded-xl'>
            {StatusInvoices.map((item, key) => (
              <div
                onClick={() => {
                  updateFilter('status', item.key)
                  setActive(item.key)
                }}
                key={key}
                className={`px-5 py-0.5 rounded-full cursor-pointer duration-300 font-bold ${
                  active === item.key && 'bg-primary text-white'
                }`}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-row gap-5 items-center'>
          <div className='flex flex-row gap-3'>
            <span className='font-semibold text-lg'>Phòng:</span>
            <select
              id='room'
              value={filter.room}
              onChange={(e) => updateFilter('room', e.target.value)}
              className='border-none outline-none px-1 py-0.5'
            >
              <option value='all'>Tất cả</option>
              <option value='A101'>A101</option>
              <option value='A102'>A102</option>
              <option value='A103'>A103</option>
              <option value='A104'>A104</option>
              <option value='A105'>A105</option>
            </select>
          </div>
          <div className='flex flex-row gap-3 items-center'>
            <div className=' text-lg font-semibold'>Thời gian:</div>
            <div className='flex flex-row gap-2'>
              <span>Tháng</span>
              <select
                id='month'
                value={filter.month}
                onChange={(e) => updateFilter('month', e.target.value)}
                className='border-none outline-none px-1 py-0.5'
              >
                <option value='all'>Tất cả</option>
                <option value='01'>01</option>
                <option value='02'>02</option>
                <option value='03'>03</option>
                <option value='04'>04</option>
                <option value='05'>05</option>
              </select>
            </div>
            <div className='flex flex-row gap-2'>
              <span>Năm</span>
              <select
                id='year'
                value={filter.year}
                onChange={(e) => updateFilter('year', e.target.value)}
                className='border-none outline-none px-1 py-0.5'
              >
                <option value='all'>Tất cả</option>
                <option value='2025'>2025</option>
                <option value='2026'>2026</option>
                <option value='2027'>2027</option>
                <option value='2028'>2028</option>
                <option value='2029'>2029</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
