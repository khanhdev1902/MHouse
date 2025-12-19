import {
  Table,
  TableBody,
  TableCaption,
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

type UserTableProps = {
  users?: User[]
  onUpdate: (id: number, data: Partial<User>) => void
  onDelete: (id: number) => void
}

export default function UserTable({ users = [], onUpdate, onDelete }: UserTableProps) {
  return (
    <Table>
      <TableCaption>Danh sách người dùng</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className='w-20'>ID</TableHead>
          <TableHead>Tên đăng nhập</TableHead>
          <TableHead>Họ tên</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>SĐT</TableHead>
          <TableHead>Vai trò</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead>Ngày tạo</TableHead>
          <TableHead className='text-right'>Thao tác</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.length === 0 && (
          <TableRow>
            <TableCell colSpan={9} className='text-center text-muted-foreground py-8'>
              Chưa có người dùng
            </TableCell>
          </TableRow>
        )}

        {users.map((user) => (
          <TableRow key={user.userId}>
            <TableCell className='font-semibold'>{user.userId}</TableCell>
            <TableCell>{user.userName}</TableCell>
            <TableCell className='font-medium'>{user.fullName}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>

            {/* Role */}
            <TableCell>
              <Badge
                variant='outline'
                className={cn(
                  user.role === 'admin'
                    ? 'border-red-400 text-red-500'
                    : 'border-blue-400 text-blue-500'
                )}
              >
                {user.role}
              </Badge>
            </TableCell>

            {/* Status */}
            <TableCell>
              <Badge
                className={cn(
                  user.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200 text-gray-600'
                )}
              >
                {user.status}
              </Badge>
            </TableCell>

            <TableCell >{new Date(user.createdAt).toLocaleDateString('vi-VN')}</TableCell>

            {/* Actions */}
            <TableCell className='text-right w-fit'>
              <UserDialog
                user={user}
                onUpdate={onUpdate}
                onDelete={onDelete}
                trigger={
                  <Button size='icon' variant='ghost' className='hover:bg-muted'>
                    ✏️
                  </Button>
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
