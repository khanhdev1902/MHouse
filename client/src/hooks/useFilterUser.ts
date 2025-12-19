import { useMemo, useState } from 'react'
import type { User } from '@/types/User'

export type UserFilterState = {
  keyword: string
  role: 'all' | User['role']
  status: 'all' | User['status']
}

export function useFilterUser(users: User[]) {
  const [filter, setFilter] = useState<UserFilterState>({
    keyword: '',
    role: 'all',
    status: 'all',
  })

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const keywordMatch =
        filter.keyword.trim() === '' ||
        [user.userName, user.fullName, user.email, user.phone, user.cccd]
          .join(' ')
          .toLowerCase()
          .includes(filter.keyword.toLowerCase())

      const roleMatch = filter.role === 'all' || user.role === filter.role
      const statusMatch = filter.status === 'all' || user.status === filter.status
      return keywordMatch && roleMatch && statusMatch
    })
  }, [users, filter])

  return {
    filter,
    setFilter,
    filteredUsers,
  }
}
