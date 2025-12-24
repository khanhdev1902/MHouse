import type { Invoice, InvoiceStatus } from '@/types/Invoice'
import { useMemo, useState } from 'react'
export interface InvoiceFilter {
  search: string
  status: InvoiceStatus | 'all'
  room: string | 'all'
  month: string | 'all'
  year: string | 'all'
}
export const useInvoiceFilter = (data: Invoice[]) => {
  const [filter, setFilter] = useState<InvoiceFilter>({
    search: '',
    status: 'all',
    room: 'all',
    month: 'all',
    year: 'all',
  })
  const filtered = useMemo(() => {
    return data.filter((item) => {
      const s = filter.search.toLowerCase()
      if (
        s &&
        !(
          // item.id.toLowerCase().includes(s) ||
          item.tenant.toLowerCase().includes(s) ||
          item.room.toLowerCase().includes(s)
        )
      )
        return false

      // Status
      if (filter.status !== 'all' && item.status !== filter.status) return false

      // Room
      if (filter.room !== 'all' && item.room !== filter.room) return false

      // Month
      if (filter.month !== 'all' && !item.month.startsWith(filter.month)) return false

      // Year
      if (filter.year !== 'all' && !item.month.endsWith(filter.year)) return false

      return true
    })
  }, [data, filter])

  const updateFilter = (key: keyof InvoiceFilter, value: string | number) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }))
  }
  return { filter, updateFilter, filtered }
}
