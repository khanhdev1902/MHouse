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

import { Users, Search, FilterX, UserPlus, RefreshCcw } from 'lucide-react'

import UserDialog from './components/UserDialog'
import UserTable from './components/UserTable'
import Container from '@/components/Container'
import Loading from '@/components/Loading'

export type UserFilterState = {
  keyword: string
  status: 'active' | 'inactive' | 'blocked' | 'all'
  role: 'admin' | 'tenant' | 'all'
}

export default function UserPage() {
  const { users, loading, error, updateUser, createUser, deleteUser } = useUser()
  const { filter, setFilter, filteredUsers } = useFilterUser(users)

  const resetFilters = () => {
    setFilter({ keyword: '', status: 'all', role: 'all' })
  }

  if (loading) return <Loading />

  if (error)
    return (
      <Container className='py-20 text-center text-red-500'>
        <p className='font-bold text-xl'>Đã có lỗi xảy ra!</p>
        <p>{error}</p>
      </Container>
    )

  return (
    <Container className='space-y-8 py-8 animate-in fade-in duration-500'>
      {/* --- HEADER SECTION --- */}
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-6'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2 text-blue-600 mb-1'>
            <Users size={20} />
            <span className='text-[10px] font-black uppercase tracking-widest'>
              Hệ thống thành viên
            </span>
          </div>
          <h1 className='text-3xl font-black tracking-tight text-slate-900'>Người dùng</h1>
          <p className='text-slate-500 text-sm'>
            Quản lý tài khoản, phân quyền và theo dõi trạng thái hoạt động của các thành viên.
          </p>
        </div>

        <UserDialog
          onCreate={createUser}
          trigger={
            <Button className='rounded-xl bg-slate-900 hover:bg-black px-6 font-bold shadow-lg shadow-slate-200 gap-2 transition-all active:scale-95'>
              <UserPlus size={18} />
              Thêm người dùng
            </Button>
          }
        />
      </div>

      {/* --- TOOLBAR SECTION (SEARCH & FILTERS) --- */}
      <div className='bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col xl:flex-row gap-4 items-center'>
        {/* Search Input */}
        <div className='relative w-full xl:flex-1'>
          <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' size={18} />
          <Input
            className='pl-11 h-12 bg-slate-50/50 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-blue-500 transition-all font-medium'
            placeholder='Tìm theo tên, email, hoặc số điện thoại...'
            value={filter.keyword}
            onChange={(e) => setFilter((f) => ({ ...f, keyword: e.target.value }))}
          />
        </div>

        <div className='hidden xl:block w-px h-8 bg-slate-200 mx-2' />

        {/* Filter Controls */}
        <div className='flex flex-wrap items-center gap-3 w-full xl:w-auto'>
          {/* Status Select */}
          <Select
            value={filter.status}
            onValueChange={(v) =>
              setFilter((f) => ({ ...f, status: v as UserFilterState['status'] }))
            }
          >
            <SelectTrigger className='h-12 w-full sm:w-[180px] rounded-2xl bg-slate-50/50 border-none font-semibold text-slate-600'>
              <SelectValue placeholder='Trạng thái' />
            </SelectTrigger>
            <SelectContent className='rounded-xl border-slate-100 shadow-xl'>
              <SelectItem value='all' className='font-medium'>
                Tất cả trạng thái
              </SelectItem>
              <SelectItem value='active' className='text-emerald-600 font-bold'>
                Hoạt động
              </SelectItem>
              <SelectItem value='inactive' className='text-slate-500 font-bold'>
                Ngưng
              </SelectItem>
              <SelectItem value='blocked' className='text-rose-600 font-bold'>
                Bị khóa
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Role Select */}
          <Select
            value={filter.role}
            onValueChange={(v) => setFilter((f) => ({ ...f, role: v as UserFilterState['role'] }))}
          >
            <SelectTrigger className='h-12 w-full sm:w-40 rounded-2xl bg-slate-50/50 border-none font-semibold text-slate-600'>
              <SelectValue placeholder='Vai trò' />
            </SelectTrigger>
            <SelectContent className='rounded-xl border-slate-100 shadow-xl'>
              <SelectItem value='all' className='font-medium'>
                Tất cả vai trò
              </SelectItem>
              <SelectItem value='admin' className='font-bold'>
                Quản trị (Admin)
              </SelectItem>
              <SelectItem value='tenant' className='font-bold'>
                Khách thuê (Tenant)
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Reset Filter Button */}
          {(filter.keyword || filter.status !== 'all' || filter.role !== 'all') && (
            <Button
              variant='ghost'
              onClick={resetFilters}
              className='h-12 w-12 rounded-2xl hover:bg-slate-100 text-slate-400'
              title='Đặt lại bộ lọc'
            >
              <RefreshCcw size={18} />
            </Button>
          )}
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className='animate-in slide-in-from-bottom-4 duration-700'>
        {filteredUsers.length > 0 ? (
          <UserTable users={filteredUsers} onUpdate={updateUser} onDelete={deleteUser} />
        ) : (
          <div className='flex flex-col items-center justify-center py-24 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200'>
            <div className='p-4 bg-white rounded-2xl shadow-sm mb-4'>
              <FilterX size={40} className='text-slate-300' />
            </div>
            <h3 className='text-xl font-bold text-slate-800'>Không có kết quả</h3>
            <p className='text-slate-400 text-sm max-w-[280px] text-center mt-1'>
              Dữ liệu tìm kiếm của bạn không khớp với bất kỳ người dùng nào trong hệ thống.
            </p>
            <Button variant='link' onClick={resetFilters} className='mt-4 font-bold text-blue-600'>
              Xóa tất cả bộ lọc
            </Button>
          </div>
        )}
      </div>
    </Container>
  )
}
