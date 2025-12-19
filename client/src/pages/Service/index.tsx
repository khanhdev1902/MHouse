import Container from '@/components/Container'
import ServiceCard from '@/pages/Service/components/ServiceCard'
import ServiceDialog from './components/ServiceDialog'
import { useServices } from '@/hooks/useService'
import { Input } from '@/components/ui/input'
import { useMemo, useState } from 'react'
import { Loader2, Search } from 'lucide-react'

export default function Service() {
  const { services, loading, error, createService, updateService, deleteService } = useServices()

  const [search, setSearch] = useState('')

  const filteredServices = useMemo(() => {
    if (!search.trim()) return services
    return services.filter((s) => s.name?.toLowerCase().includes(search.toLowerCase().trim()))
  }, [services, search])

  if (loading)
    return (
      <div className='flex justify-center items-center h-64'>
        <Loader2 className='animate-spin text-red-500' />
      </div>
    )
  if (error) return <Container className='text-red-500'>{error}</Container>

  return (
    <Container className='flex flex-col gap-6'>
      {/* ===== Header ===== */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Dịch vụ</h1>
          <p className='text-sm text-muted-foreground'>Quản lý các dịch vụ áp dụng cho phòng</p>
        </div>

        <div className='flex items-center gap-3'>
          {/* Search */}
          <div className='relative w-64'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Tìm dịch vụ...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='pl-9'
            />
          </div>

          {/* Create */}
          <ServiceDialog mode='create' onCreate={createService} />
        </div>
      </div>

      {/* ===== List ===== */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
        {filteredServices.map((item) => (
          <ServiceCard
            key={item.serviceId}
            data={item}
            onUpdate={updateService}
            onDelete={deleteService}
          />
        ))}
      </div>

      {/* Empty */}
      {filteredServices.length === 0 && (
        <div className='rounded-xl border border-dashed py-10 text-center text-muted-foreground'>
          Không tìm thấy dịch vụ phù hợp
        </div>
      )}
    </Container>
  )
}
