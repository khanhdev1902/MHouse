import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { User } from '@/types/User'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import UserDialog from './UserDialog'
import { Button } from '@/components/ui/button'
import {
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  User as UserIcon,
  Edit3,
} from 'lucide-react'

type UserTableProps = {
  users?: User[]
  onUpdate: (id: number, data: Partial<User>) => void
  onDelete: (id: number) => void
}

export default function UserTable({ users = [], onUpdate, onDelete }: UserTableProps) {
  return (
    <div className='rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden'>
      <Table>
        <TableHeader className='bg-slate-50/50'>
          <TableRow className='hover:bg-transparent border-slate-100'>
            <TableHead className='w-20 font-bold text-slate-500 uppercase text-[11px] tracking-wider'>
              ID
            </TableHead>
            <TableHead className='font-bold text-slate-500 uppercase text-[11px] tracking-wider'>
              Thông tin người dùng
            </TableHead>
            <TableHead className='font-bold text-slate-500 uppercase text-[11px] tracking-wider'>
              Liên hệ
            </TableHead>
            <TableHead className='font-bold text-slate-500 uppercase text-[11px] tracking-wider'>
              Vai trò
            </TableHead>
            <TableHead className='font-bold text-slate-500 uppercase text-[11px] tracking-wider'>
              Trạng thái
            </TableHead>
            <TableHead className='font-bold text-slate-500 uppercase text-[11px] tracking-wider'>
              Ngày tham gia
            </TableHead>
            <TableHead className='text-right font-bold text-slate-500 uppercase text-[11px] tracking-wider'>
              Thao tác
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className='text-center py-20'>
                <div className='flex flex-col items-center gap-2 text-slate-400'>
                  <UserIcon size={40} className='opacity-20' />
                  <p className='font-medium'>Chưa có dữ liệu người dùng</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow
                key={user.userId}
                className='group hover:bg-slate-50/50 transition-colors border-slate-50'
              >
                {/* ID */}
                <TableCell className='font-mono text-xs text-slate-400'>#{user.userId}</TableCell>

                {/* User Profile Info */}
                <TableCell>
                  <div className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 font-bold text-sm border border-blue-100'>
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div className='flex flex-col'>
                      <span className='font-bold text-slate-800 leading-none mb-1'>
                        {user.fullName}
                      </span>
                      <span className='text-xs text-slate-400 font-medium'>@{user.userName}</span>
                    </div>
                  </div>
                </TableCell>

                {/* Contact */}
                <TableCell>
                  <div className='flex flex-col gap-1'>
                    <div className='flex items-center gap-1.5 text-slate-600'>
                      <Mail size={13} className='text-slate-300' />
                      <span className='text-xs'>{user.email}</span>
                    </div>
                    <div className='flex items-center gap-1.5 text-slate-600'>
                      <Phone size={13} className='text-slate-300' />
                      <span className='text-xs font-medium'>{user.phone}</span>
                    </div>
                  </div>
                </TableCell>

                {/* Role */}
                <TableCell>
                  <div className='flex items-center gap-2'>
                    {user.role === 'admin' ? (
                      <Badge className='bg-amber-50 text-amber-600 border-amber-100 shadow-none hover:bg-amber-50 gap-1 rounded-lg py-0.5 font-bold text-[10px] uppercase tracking-tight'>
                        <ShieldCheck size={12} /> {user.role}
                      </Badge>
                    ) : (
                      <Badge className='bg-slate-50 text-slate-600 border-slate-200 shadow-none hover:bg-slate-50 gap-1 rounded-lg py-0.5 font-bold text-[10px] uppercase tracking-tight'>
                        <UserIcon size={12} /> {user.role}
                      </Badge>
                    )}
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <div
                    className={cn(
                      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold',
                      user.status === 'active'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    )}
                  >
                    <span
                      className={cn(
                        'h-1.5 w-1.5 rounded-full',
                        user.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                      )}
                    />
                    {user.status === 'active' ? 'Hoạt động' : 'Bị khóa'}
                  </div>
                </TableCell>

                {/* Date */}
                <TableCell>
                  <div className='flex items-center gap-2 text-slate-500'>
                    <Calendar size={13} className='text-slate-300' />
                    <span className='text-xs font-medium'>
                      {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell className='text-right'>
                  <UserDialog
                    user={user}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    trigger={
                      <Button
                        size='icon'
                        variant='ghost'
                        className='h-8 w-8 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-50 hover:text-blue-600'
                      >
                        <Edit3 size={15} />
                      </Button>
                    }
                  />
                  <Button
                    size='icon'
                    variant='ghost'
                    className='h-8 w-8 rounded-xl text-slate-300 hover:text-slate-600'
                  >
                    <MoreHorizontal size={15} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
