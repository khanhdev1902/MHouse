/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Trash2, User as UserIcon, Shield, Mail, Phone, CreditCard, Lock, UserPlus, Save } from 'lucide-react'

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
  onCreate?: (data: any) => void
  onUpdate?: (id: number, data: Partial<any>) => void
  onDelete?: (id: number) => void
}

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

  useEffect(() => {
    if (user && open) {
      setForm({
        userName: user.userName,
        fullName: user.fullName,
        cccd: user.cccd,
        phone: user.phone,
        email: user.email,
        role: user.role,
        status: user.status,
      })
    } else if (!user) {
      setForm({
        userName: '',
        passwordHash: '',
        fullName: '',
        cccd: '',
        phone: '',
        email: '',
        role: 'tenant',
        status: 'active',
      })
    }
  }, [user, open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (user && onUpdate) {
      const { passwordHash, ...rest } = form
      onUpdate(user.userId, passwordHash ? form : rest)
    }
    if (!user && onCreate) onCreate(form)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant={user ? "outline" : "default"} className="gap-2">
            {user ? <UserIcon size={16} /> : <UserPlus size={16} />}
            {user ? 'Cập nhật' : 'Thêm thành viên'}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-2xl border-none shadow-2xl">
        <DialogHeader className="bg-slate-900 px-8 py-6 text-white">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            {user ? <UserIcon className="text-blue-400" /> : <UserPlus className="text-green-400" />}
            {user ? 'Chỉnh sửa thành viên' : 'Tạo tài khoản mới'}
          </DialogTitle>
          <p className="text-slate-400 text-xs mt-1">
            {user ? `Mã định danh: #${user.userId}` : 'Vui lòng điền đầy đủ thông tin để tạo tài khoản hệ thống.'}
          </p>
        </DialogHeader>

        <div className="p-8 space-y-8 bg-white max-h-[70vh] overflow-y-auto scrollbar-hide">
          
          {/* Section 1: Tài khoản */}
          <section className="space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Lock size={14} /> Thông tin đăng nhập
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-600">Tên đăng nhập</Label>
                <Input
                  name="userName"
                  placeholder="ví dụ: nva123"
                  value={form.userName}
                  onChange={handleChange}
                  disabled={!!user}
                  className="bg-slate-50 border-slate-200 focus:ring-blue-500 rounded-xl"
                />
              </div>
              {!user && (
                <div className="space-y-2">
                  <Label className="text-slate-600">Mật khẩu</Label>
                  <Input
                    name="passwordHash"
                    type="password"
                    placeholder="••••••••"
                    value={form.passwordHash}
                    onChange={handleChange}
                    className="bg-slate-50 border-slate-200 focus:ring-blue-500 rounded-xl"
                  />
                </div>
              )}
            </div>
          </section>

          {/* Section 2: Thông tin cá nhân */}
          <section className="space-y-4 text-sm font-medium">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <UserIcon size={14} /> Thông tin cá nhân
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2 md:col-span-1">
                <Label className="text-slate-600">Họ và tên</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 text-slate-400" size={16} />
                  <Input name="fullName" value={form.fullName} onChange={handleChange} className="pl-10 bg-slate-50 rounded-xl" />
                </div>
              </div>
              <div className="space-y-2 col-span-2 md:col-span-1">
                <Label className="text-slate-600">Số CCCD</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 text-slate-400" size={16} />
                  <Input name="cccd" value={form.cccd} onChange={handleChange} className="pl-10 bg-slate-50 rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-600">Số điện thoại</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-slate-400" size={16} />
                  <Input name="phone" value={form.phone} onChange={handleChange} className="pl-10 bg-slate-50 rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-600">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-slate-400" size={16} />
                  <Input name="email" value={form.email} onChange={handleChange} className="pl-10 bg-slate-50 rounded-xl" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Phân quyền & Trạng thái */}
          <section className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-100">
            <div className="space-y-3">
              <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Shield size={14} /> Vai trò hệ thống
              </Label>
              <Select
                value={form.role}
                disabled={user?.role === 'admin'}
                onValueChange={(v) => setForm((f) => ({ ...f, role: v as any }))}
              >
                <SelectTrigger className="bg-slate-50 border-slate-200 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Quản trị viên (Admin)</SelectItem>
                  <SelectItem value="tenant">Khách thuê (Tenant)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 text-sm font-medium">
              <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Trạng thái tài khoản</Label>
              <RadioGroup
                className="flex flex-wrap gap-4"
                value={form.status}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v as any }))}
              >
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-slate-50">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active" className="text-emerald-600 cursor-pointer">Hoạt động</Label>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-slate-50">
                  <RadioGroupItem value="inactive" id="inactive" />
                  <Label htmlFor="inactive" className="text-slate-500 cursor-pointer">Ngưng</Label>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-slate-50">
                  <RadioGroupItem value="blocked" id="blocked" />
                  <Label htmlFor="blocked" className="text-rose-600 cursor-pointer">Khóa</Label>
                </div>
              </RadioGroup>
            </div>
          </section>
        </div>

        <DialogFooter className="bg-slate-50 px-8 py-5 border-t border-slate-100 flex items-center justify-between">
          <div className="flex-1">
            {user && onDelete && user.role !== 'admin' && (
              <Button
                variant="ghost"
                onClick={() => {
                  if(confirm("Xác nhận xóa người dùng?")) onDelete(user.userId);
                  setOpen(false);
                }}
                className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 gap-2 font-bold px-0"
              >
                <Trash2 size={16} /> Xóa tài khoản
              </Button>
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setOpen(false)} className="rounded-xl px-6 border-slate-200">
              Hủy
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="rounded-xl px-8 bg-slate-900 hover:bg-black font-bold gap-2 shadow-lg shadow-slate-200 transition-all active:scale-95"
            >
              <Save size={16} />
              {user ? 'Cập nhật ngay' : 'Tạo tài khoản'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}