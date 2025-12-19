import { useUser } from '@/hooks/useUser'
import { useFilterUser } from '@/hooks/useFilterUser'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

import { Loader2 } from 'lucide-react'

import UserDialog from './components/UserDialog'
import UserTable from './components/UserTable'
import Container from '@/components/Container'

export type UserFilterState = {
  keyword: string
  status: 'active' | 'inactive' | 'blocked' | 'all'
  role: 'admin' | 'tenant' | 'all'
}

export default function UserPage() {
  const { users, loading, error, updateUser, createUser, deleteUser } = useUser()
  const { filter, setFilter, filteredUsers } = useFilterUser(users)

  if (loading)
    return (
      <div className='flex justify-center items-center h-64'>
        <Loader2 className='animate-spin text-muted-foreground' />
      </div>
    )

  if (error) return <div className='text-red-500 text-center py-10'>{error}</div>

  return (
    <Container className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Quản lý người dùng</h1>
      </div>

      {/* Filters */}
      <div className='flex flex-wrap items-center gap-3 mb-5'>
        {/* Search */}
        <Input
          className='max-w-xs'
          placeholder='Tìm tên, email, SĐT...'
          value={filter.keyword}
          onChange={(e) => setFilter((f) => ({ ...f, keyword: e.target.value }))}
        />

        {/* Status */}
        <Select
          value={filter.status}
          onValueChange={(v) =>
            setFilter((f) => ({
              ...f,
              status: v as UserFilterState['status'],
            }))
          }
        >
          <SelectTrigger className='w-40'>
            <SelectValue placeholder='Trạng thái' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả trạng thái</SelectItem>
            <SelectItem value='active'>Hoạt động</SelectItem>
            <SelectItem value='inactive'>Ngưng</SelectItem>
          </SelectContent>
        </Select>

        {/* Role */}
        <Select
          value={filter.role}
          onValueChange={(v) =>
            setFilter((f) => ({
              ...f,
              role: v as UserFilterState['role'],
            }))
          }
        >
          <SelectTrigger className='w-40'>
            <SelectValue placeholder='Vai trò' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả vai trò</SelectItem>
            <SelectItem value='admin'>Admin</SelectItem>
            <SelectItem value='tenant'>Tenant</SelectItem>
          </SelectContent>
        </Select>
        <UserDialog
          onCreate={createUser}
          trigger={<Button className='rounded-full'>+ Thêm user</Button>}
        />
      </div>

      {/* Table */}
      <UserTable users={filteredUsers} onUpdate={updateUser} onDelete={deleteUser} />
    </Container>
  )
}
