import { useContract } from '@/hooks/useContract'
import ContractCard from './components/ContractCard'
import Container from '@/components/Container'
import { useState } from 'react'
import ContractDialog from './components/ContractDialong'
import { useRoom } from '@/hooks/useRoom'
import { useUser } from '@/hooks/useUser'
import { Search, Filter, FileText } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Loading from '@/components/Loading'

export default function ContractPage() {
  const { contracts, loading, error, updateContract, createContract, deleteContract } =
    useContract()
  const { rooms } = useRoom()
  const { users } = useUser()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredContracts = contracts.filter(
    (c) =>
      (statusFilter === 'all' || c.status === statusFilter) &&
      (search === '' ||
        c.room?.roomCode?.toLowerCase().includes(search.toLowerCase()) ||
        c.tenant?.fullName?.toLowerCase().includes(search.toLowerCase()))
  )

  if (loading) return <Loading />
  if (error)
    return <Container className='py-20 text-center text-red-500 font-medium'>{error}</Container>

  return (
    <Container className='flex flex-col gap-8 py-8 animate-in fade-in duration-700'>
      {/* HEADER SECTION */}
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-black text-slate-800 tracking-tight'>Hợp đồng</h1>
            <p className='text-slate-500 text-sm mt-1'>
              Quản lý và theo dõi các thỏa thuận thuê phòng của bạn.
            </p>
          </div>
          <ContractDialog mode='create' rooms={rooms} users={users} onCreate={createContract} />
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className='bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-4 items-center'>
          {/* Search Input */}
          <div className='relative w-full lg:flex-1'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4' />
            <Input
              placeholder='Tìm theo số phòng, tên khách thuê...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='pl-10 h-11 bg-slate-50/50 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500'
            />
          </div>

          {/* Vertical Divider (Desktop) */}
          <div className='hidden lg:block w-px h-8 bg-slate-200 mx-2' />

          {/* Status Filter Chips */}
          <div className='flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide'>
            <div className='flex items-center gap-2 mr-2 text-slate-400'>
              <Filter size={16} />
              <span className='text-xs font-bold uppercase tracking-wider'>Trạng thái</span>
            </div>
            <div className='flex p-1 bg-slate-100 rounded-xl'>
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'active', label: 'Hoạt động' },
                { id: 'expired', label: 'Hết hạn' },
                { id: 'cancelled', label: 'Đã hủy' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStatusFilter(s.id)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    statusFilter === s.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* STATS SUMMARY (Optional - tăng độ "ngon") */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <div className='bg-blue-50/50 border border-blue-100 p-4 rounded-2xl'>
          <p className='text-xs font-bold text-blue-500 uppercase'>Tổng số</p>
          <p className='text-2xl font-black text-blue-900'>{contracts.length}</p>
        </div>
        <div className='bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl'>
          <p className='text-xs font-bold text-emerald-500 uppercase'>Đang ở</p>
          <p className='text-2xl font-black text-emerald-900'>
            {contracts.filter((c) => c.status === 'active').length}
          </p>
        </div>
      </div>

      {/* CONTRACT GRID */}
      {filteredContracts.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredContracts.map((c) => (
            <ContractCard
              key={c.contractId}
              contract={c}
              rooms={rooms}
              users={users}
              onUpdate={updateContract}
              onDelete={deleteContract}
            />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-24 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200'>
          <div className='p-4 bg-white rounded-2xl shadow-sm mb-4'>
            <FileText size={40} className='text-slate-300' />
          </div>
          <h3 className='text-lg font-bold text-slate-700'>Không tìm thấy hợp đồng</h3>
          <p className='text-slate-400 text-sm'>Hãy thử thay đổi từ khóa hoặc bộ lọc của bạn.</p>
        </div>
      )}
    </Container>
  )
}
