/* eslint-disable react-hooks/set-state-in-effect */
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useEffect, useState } from 'react'
import type { User } from '@/types/User'
import { Trash2 } from 'lucide-react'

/* ================= TYPES ================= */

type UserFormData = {
  userName: string
  passwordHash?: string
  fullName: string
  cccd: string
  phone: string
  email: string
  role: 'admin' | 'tenant'
  status: 'active' | 'inactive' | 'blocked'
}

type UserDialogProps = {
  user?: User
  trigger?: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCreate?: (data: any) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate?: (id: number, data: Partial<any>) => void
  onDelete?: (id: number) => void
}

/* ================= COMPONENT ================= */

export default function UserDialog({
  user,
  trigger,
  onCreate,
  onUpdate,
  onDelete,
}: UserDialogProps) {
  const [open, setOpen] = useState(false)

  const [form, setForm] = useState<UserFormData>({
    userName: '',
    passwordHash: '',
    fullName: '',
    cccd: '',
    phone: '',
    email: '',
    role: 'tenant',
    status: 'active',
  })

  /* ===== Prefill when update ===== */
  useEffect(() => {
    if (user) {
      setForm({
        userName: user.userName,
        fullName: user.fullName,
        cccd: user.cccd,
        phone: user.phone,
        email: user.email,
        role: user.role,
        status: user.status,
      })
    }
  }, [user])

  /* ===== Handlers ===== */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (user && onUpdate) {
      const { passwordHash, ...rest } = form
      onUpdate(user.userId, passwordHash ? form : rest)
    }

    if (!user && onCreate) {
      onCreate(form)
    }

    setOpen(false)
  }

  const handleDelete = () => {
    if (!user || !onDelete) return

    const ok = window.confirm('Bạn có chắc muốn xóa người dùng này không?')
    if (!ok) return

    onDelete(user.userId)
    setOpen(false)
  }

  /* ================= RENDER ================= */

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button variant='outline'>{user ? 'Cập nhật user' : 'Thêm user'}</Button>}
      </DialogTrigger>

      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>{user ? 'Cập nhật người dùng' : 'Tạo người dùng'}</DialogTitle>
        </DialogHeader>

        <div className='space-y-4 mt-4'>
          {/* Username */}
          <div className=' space-y-2'>
            <Label>Tên đăng nhập</Label>
            <Input
              name='userName'
              value={form.userName}
              onChange={handleChange}
              disabled={!!user}
            />
          </div>

          {/* Password (create only) */}
          {!user && (
            <div>
              <Label>Mật khẩu</Label>
              <Input
                name='passwordHash'
                type='password'
                value={form.passwordHash}
                onChange={handleChange}
              />
            </div>
          )}

          <div className=' space-y-2'>
            <Label>Họ tên</Label>
            <Input name='fullName' value={form.fullName} onChange={handleChange} />
          </div>

          <div className=' space-y-2'>
            <Label>CCCD</Label>
            <Input name='cccd' value={form.cccd} onChange={handleChange} />
          </div>

          <div className=' space-y-2'>
            <Label>Số điện thoại</Label>
            <Input name='phone' value={form.phone} onChange={handleChange} />
          </div>

          <div className=' space-y-2'>
            <Label>Email</Label>
            <Input name='email' value={form.email} onChange={handleChange} />
          </div>

          {/* Role */}
          <div className=' space-y-2'>
            <Label>Vai trò</Label>
            <Select
              value={form.role}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, role: v as 'admin' | 'tenant' }))
              }
            >
              <SelectTrigger className='mt-1'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='admin'>Admin</SelectItem>
                <SelectItem value='tenant'>Tenant</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div>
            <Label>Trạng thái</Label>
            <RadioGroup
              className='mt-2 flex gap-6'
              value={form.status}
              onValueChange={(v) =>
                setForm((f) => ({
                  ...f,
                  status: v as 'active' | 'inactive' | 'blocked',
                }))
              }
            >
              <div className='flex items-center gap-2'>
                <RadioGroupItem value='active' id='active' />
                <Label htmlFor='active'>Hoạt động</Label>
              </div>

              <div className='flex items-center gap-2'>
                <RadioGroupItem value='inactive' id='inactive' />
                <Label htmlFor='inactive'>Ngưng</Label>
              </div>

              <div className='flex items-center gap-2'>
                <RadioGroupItem value='blocked' id='blocked' />
                <Label htmlFor='blocked'>Bị khóa</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* ===== Footer ===== */}
        <DialogFooter className='mt-6 flex justify-between'>
          {/* Delete (only update) */}
          {user && onDelete && (
            <Button
              variant='destructive'
              onClick={handleDelete}
              className='mr-auto flex gap-2 bg-red-500/50 text-white'
            >
              <Trash2 size={16} />
              Xóa user
            </Button>
          )}

          <div className='flex gap-2'>
            <Button variant='outline' onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSubmit}>
              {user ? 'Lưu thay đổi' : 'Tạo user'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
