import { useContract } from '@/hooks/useContract'
import ContractCard from './components/ContractCard'
import Container from '@/components/Container'
import { useState } from 'react'

export default function ContractPage() {
  const { contracts, loading, error, updateContract, deleteContract } =
    useContract()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Filter contracts by search (roomCode or tenant name) and status
  const filteredContracts = contracts.filter(
    (c) =>
      (statusFilter === 'all' || c.status === statusFilter) &&
      (search === '' ||
        c.room?.roomCode.toLowerCase().includes(search.toLowerCase()) ||
        c.user?.fullName?.toLowerCase().includes(search.toLowerCase()))
  )

  if (loading) return <Container>Đang tải...</Container>
  if (error) return <Container className='text-red-500'>{error}</Container>

  return (
    <Container className='flex flex-col gap-6'>
      {/* Search & Create */}
      <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4'>
        <div className='flex gap-2 flex-1'>
          <input
            placeholder='Tìm kiếm theo phòng hoặc người thuê...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='flex-1 border rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary'
          />
          {/* <ContractDialog mode='create' onCreate={createContract} /> */}
          <button className='px-4 py-2 rounded-xl bg-primary text-white shadow hover:bg-primary/80 transition'>
            Tạo hợp đồng mới
          </button>
        </div>

        {/* Status Filter */}
        <div className='flex gap-2 flex-wrap mt-2 md:mt-0'>
          {['all', 'active', 'expired', 'cancelled'].map((s) => (
            <button
              key={s}
              className={`px-4 py-2 rounded-full font-medium transition ${
                statusFilter === s
                  ? 'bg-primary text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setStatusFilter(s)}
            >
              {s === 'all'
                ? 'Tất cả'
                : s === 'active'
                ? 'Đang hoạt động'
                : s === 'expired'
                ? 'Hết hạn'
                : 'Hủy'}
            </button>
          ))}
        </div>
      </div>

      {/* Contract Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
        {filteredContracts.map((c) => (
          <ContractCard
            key={c.contractId}
            contract={c}
            onUpdate={updateContract}
            onDelete={deleteContract}
          />
        ))}
      </div>

      {filteredContracts.length === 0 && (
        <div className='text-center text-gray-500 mt-8'>Không tìm thấy hợp đồng</div>
      )}
    </Container>
  )
}
