import Container from '@/components/Container'
import SearchInput from '@/components/Input/SearchInput'
import RoomCard from './components/RoomCard'
import { useRoom } from '@/hooks/useRoom'
import { type Room } from '@/types/Room'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import RoomFormDialog from './components/RoomDialog'

const statusList = [
  { key: '', label: 'Tất cả' },
  { key: 'available', label: 'Đang trống' },
  { key: 'occupied', label: 'Đang thuê' },
  { key: 'maintenance', label: 'Đang sửa chữa' },
]

export default function Room() {
  const { rooms, loading, createRoom, updateRoom, deleteRoom, error } = useRoom()
  const [lstRoom, setLstRoom] = useState<Room[]>([])
  const [status, setStatus] = useState<string>('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const lst = rooms
      .filter((r) => (status ? r.status === status : true))
      .filter((r) =>
        search ? r.roomCode.toLowerCase().includes(search.toLowerCase().trim()) : true
      )
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLstRoom(lst)
  }, [status, search, rooms])

  if (loading)
    return <div className='flex justify-center py-20 text-muted-foreground'>Loading...</div>

  if (error) return <div className='text-red-500 text-center py-10'>{error}</div>

  return (
    <Container className='space-y-6'>
      {/* ===== Header ===== */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>

        <SearchInput
          placeholder='Tìm theo số phòng...'
          search={search}
          setSearch={setSearch}
        />

        <RoomFormDialog mode='create' onCreate={createRoom} />
      </div>

      {/* ===== Status Filter ===== */}
      <div
        className='
          flex w-fit items-center gap-1 rounded-full
          border bg-white p-1 shadow-sm
        '
      >
        {statusList.map((item) => {
          const active = status === item.key

          return (
            <button
              key={item.key}
              onClick={() => setStatus(item.key)}
              className={clsx(
                'px-4 py-2 text-sm font-medium rounded-full transition-all',
                active
                  ? 'bg-primary text-white shadow'
                  : 'text-muted-foreground hover:bg-muted'
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      {/* ===== Room Grid ===== */}
      <div
        className='
          grid gap-5
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        '
      >
        {lstRoom.map((item) => (
          <RoomCard key={item.roomId} room={item} onUpdate={updateRoom} onDelete={deleteRoom}/>
        ))}
      </div>

      {/* ===== Empty ===== */}
      {lstRoom.length === 0 && (
        <div className='text-center py-10 text-muted-foreground'>
          Không tìm thấy phòng phù hợp
        </div>
      )}
    </Container>
  )
}
