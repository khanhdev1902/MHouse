import Container from '@/components/Container'
import CreateNewInput from '@/components/Input/CreateNewInput'
import SearchInput from '@/components/Input/SearchInput'
import RoomCard from '@/components/RoomCard'
import { roomItems } from '@/constants/room'
import clsx from 'clsx'
import { useState } from 'react'
const statusList = [
  { key: 'all', label: 'Tất cả' },
  { key: 'available', label: 'Đang trống' },
  { key: 'occupied', label: 'Đang thuê' },
  { key: 'maintenance', label: 'Đang sửa chữa' },
]

export default function Room() {
  const [active, setActive] = useState<string>('all')
  return (
    <Container className='flex flex-col gap-5'>
      <div className=' flex flex-row justify-between items-center'>
        <SearchInput placeholder='Số phòng...' />
        <CreateNewInput label='Thêm Phòng mới:' buttonName='Tạo phòng' />
      </div>
      <div className=' flex flex-row items-center rounded-3xl w-fit shadow-sm'>
        <span className='px-5 py-3'>Trạng thái:</span>
        {statusList.map((item, key) => (
          <span
            key={key}
            onClick={() => setActive(item.key)}
            className={clsx(
              active === item.key && 'bg-slate-100',
              'hover:bg-slate-100 font-semibold px-5 py-3 rounded-3xl select-none cursor-pointer '
            )}
          >
            {item.label}
          </span>
        ))}
      </div>
      <div className=' grid grid-cols-4 gap-5'>
        {roomItems.map((item, key) => (
          <RoomCard key={key} room={item} />
        ))}
      </div>
    </Container>
  )
}
