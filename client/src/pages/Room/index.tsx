import Container from '@/components/Container'
import RoomDialog from './components/RoomDialog'
import SearchInput from '@/components/Input/SearchInput'
import RoomCard from './components/RoomCard'
import { useRoom } from '@/hooks/useRoom'
import { type Room } from '@/types/Room'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
const statusList = [
  { key: '', label: 'Tất cả' },
  { key: 'available', label: 'Đang trống' },
  { key: 'occupied', label: 'Đang thuê' },
  { key: 'maintenance', label: 'Đang sửa chữa' },
]

export default function Room() {
  const { rooms, loading, createRoom, updateRoom, error } = useRoom()
  const [lstRoom, setLstRoom] = useState<Room[]>(rooms)
  const [status, setStatus] = useState<string>('Tất cả')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const handleChangeData = () => {
      console.log(status)
      const lst = rooms
        .filter((r) => (status && status !== 'Tất cả' ? status === r.status : true))
        .filter((r) =>
          search ? r.roomCode.toLowerCase().includes(search.toLowerCase().trim()) : true
        )
      setLstRoom(lst)
    }
    handleChangeData()
  }, [status, search, rooms])
  if (loading) return <div>Loading...</div>
  // if (!loading) setLstRoom(rooms)
  console.log(rooms)
  if (error) return <div className='text-red-500'>{error}</div>
  return (
    <Container className='flex flex-col gap-5'>
      <div className=' flex flex-row justify-between items-center'>
        <SearchInput placeholder='Số phòng...' search={search} setSearch={setSearch} />
        <RoomDialog
          label='Thêm Phòng mới:'
          buttonName='Thêm phòng'
          onSubmit={(data) => createRoom(data)}
        />
      </div>
      <div className=' flex flex-row items-center rounded-3xl w-fit shadow-sm gap-1.5'>
        <span className='px-5 py-3'>Trạng thái:</span>
        {statusList.map((item, key) => (
          <span
            key={key}
            onClick={() => setStatus(item.label)}
            className={clsx(
              'font-semibold px-5 py-3 rounded-3xl select-none cursor-pointer ',
              status === item.label ? 'bg-primary text-white' : 'bg-primary-hover hover:text-white'
            )}
          >
            {item.label}
          </span>
        ))}
      </div>
      <div className=' grid grid-cols-4 gap-5'>
        {lstRoom.map((item, key) => (
          <RoomCard key={key} room={item} onUpdate={updateRoom} />
        ))}
      </div>
      {lstRoom.length === 0 && <div className='text-center pt-5'>Không tìm thấy phòng</div>}
    </Container>
  )
}
