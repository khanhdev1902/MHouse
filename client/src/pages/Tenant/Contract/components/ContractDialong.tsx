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
import { useEffect, useMemo, useState } from 'react'
import type { Contract, ContractPayload } from '@/types/Contract'
import type { Room } from '@/types/Room'
import type { User } from '@/types/User'
import { CalendarDays, Home, Info, User as UserIcon, Wallet } from 'lucide-react'
import { useRoom } from '@/hooks/useRoom'

const EMPTY_FORM: ContractPayload = {
  roomId: 0,
  userId: 0,
  startDate: '',
  endDate: '',
  deposit: 0,
  rentPrice: 0,
  status: 'active',
  note: '',
}

type ContractDialogProps = {
  mode: 'create' | 'update' | 'delete'
  contract?: Contract
  rooms?: Room[]
  users?: User[]
  owner?: User
  onCreate?: (data: ContractPayload) => void
  onUpdate?: (id: number, data: ContractPayload) => void
  onDelete?: (id: number) => void
  trigger?: React.ReactNode
}

export default function ContractDialog({
  mode,
  contract,
  users = [],
  owner,
  onCreate,
  onUpdate,
  onDelete,
  trigger,
}: ContractDialogProps) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<ContractPayload>(EMPTY_FORM)
  const {updateRoom} = useRoom();

  useEffect(() => {
    if (contract && mode === 'update') {
      setForm({
        roomId: contract.roomId,
        userId: contract.userId,
        startDate: contract.startDate.slice(0, 10),
        endDate: contract.endDate.slice(0, 10),
        deposit: contract.deposit,
        rentPrice: contract.rentPrice,
        status: contract.status,
        note: contract.note ?? '',
      })
    } else {
      setForm(EMPTY_FORM)
    }
  }, [contract, mode, open])

  const selectedTenant = useMemo(() => {
    return users.find((u) => u.userId === form.userId) ?? contract?.tenant
  }, [users, form.userId, contract])

  const selectedOwner = owner ?? contract?.owner

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((f) => ({
      ...f,
      [name]: ['deposit', 'rentPrice'].includes(name) ? Number(value) : value,
    }))
  }

  const handleSubmit = (isDelete = false) => {
    if (mode === 'create'){
      onCreate?.(form)
      updateRoom(form.roomId, { status: 'occupied' });

    }
    if (mode === 'update' && contract && !isDelete) onUpdate?.(contract.contractId, form)
    if (isDelete && contract) {
      updateRoom(contract.roomId, { status: 'available' });
      onDelete?.(contract.contractId)
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant={mode === 'create' ? 'default' : 'outline'} className="gap-2">
            {mode === 'create' ? '+ Tạo hợp đồng' : 'Chỉnh sửa'}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="min-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <span className={`w-2 h-6 rounded-full ${mode === 'create' ? 'bg-green-500' : 'bg-blue-500'}`} />
            {mode === 'create' ? 'Thiết lập hợp đồng mới' : 'Cập nhật thông tin hợp đồng'}
          </DialogTitle>
        </DialogHeader>

        {mode !== 'delete' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            
            {/* CỘT TRÁI: THÔNG TIN ĐỐI TÁC */}
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
                <div className="flex items-center gap-2 font-semibold text-slate-700 mb-2">
                  <UserIcon size={18} className="text-blue-600" />
                  Thông tin các bên
                </div>

                <div className="space-y-2 hidden">
                  <Label className="text-xs uppercase tracking-wider text-slate-500">Người thuê</Label>
                  <Select
                    value={String(form.userId)}
                    onValueChange={(v) => setForm((f) => ({ ...f, userId: Number(v) }))}
                    disabled
                    
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Chọn người thuê" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((u) => (
                        <SelectItem key={u.userId} value={String(u.userId)}>
                          {u.fullName} – {u.phone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Card hiển thị nhanh thông tin */}
                <div className="grid gap-3 pt-2">
                  {selectedTenant && (
                    <div className="p-3 rounded-lg border bg-white shadow-sm text-sm border-l-4 border-l-blue-500">
                      <p className="font-bold text-blue-900 mb-1">Bên thuê (Bên B)</p>
                      <div className="text-slate-600 space-y-0.5">
                         <p><b>Họ tên:</b> {selectedTenant.fullName}</p>
                         <p><b>CCCD:</b> {selectedTenant.cccd}</p>
                         <p><b>SĐT:</b> {selectedTenant.phone}</p>
                      </div>
                    </div>
                  )}

                  {selectedOwner && (
                    <div className="p-3 rounded-lg border bg-white shadow-sm text-sm border-l-4 border-l-slate-400">
                      <p className="font-bold text-slate-900 mb-1">Bên cho thuê (Bên A)</p>
                      <div className="text-slate-600 space-y-0.5">
                        <p><b>Chủ trọ:</b> {selectedOwner.fullName}</p>
                        <p><b>SĐT:</b> {selectedOwner.phone}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CỘT PHẢI: CHI TIẾT HỢP ĐỒNG */}
            <div className="space-y-5">
              {/* PHÒNG */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-semibold text-slate-700">
                  <Home size={18} className="text-blue-600" />
                  Đối tượng thuê
                </div>
                <div>Phòng số {contract?.room?.roomCode}</div>
                {/* <Select
                  value={String(form.roomId)}
                  onValueChange={(v) => setForm((f) => ({ ...f, roomId: Number(v) }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phòng" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((r) => (
                      <SelectItem key={r.roomId} value={String(r.roomId)}>
                        Phòng {r.roomCode} – Tầng {r.floor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}
              </div>

              {/* THỜI HẠN */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-semibold text-slate-700">
                  <CalendarDays size={18} className="text-blue-600" />
                  Thời hạn hợp đồng
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-[10px] text-slate-400">Từ ngày</Label>
                    <Input type="date" disabled name="startDate" value={form.startDate} onChange={handleChange} className="bg-slate-50/50" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] text-slate-400">Đến ngày</Label>
                    <Input type="date" name="endDate" disabled value={form.endDate} onChange={handleChange} className="bg-slate-50/50" />
                  </div>
                </div>
              </div>

              {/* TÀI CHÍNH */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-semibold text-slate-700">
                  <Wallet size={18} className="text-blue-600" />
                  Chi phí & Đặt cọc
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-[10px] text-slate-400">Tiền cọc (VNĐ)</Label>
                    <Input 
                      name="deposit" 
                      disabled
                      type="number"
                      value={form.deposit} 
                      onChange={handleChange} 
                      className="font-mono font-semibold text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] text-slate-400">Giá thuê/tháng</Label>
                    <Input 
                      name="rentPrice"
                      disabled 
                      type="number"
                      value={form.rentPrice} 
                      onChange={handleChange} 
                      className="font-mono font-semibold text-green-600 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* GHI CHÚ */}
              <div className="space-y-2">
                 <div className="flex items-center gap-2 font-semibold text-slate-700">
                  <Info size={18} className="text-blue-600" />
                  Ghi chú thêm
                </div>
                <Input name="note" disabled value={form.note} onChange={handleChange} placeholder="Điều kiện bổ sung..." />
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="mt-8 pt-4 border-t flex flex-row items-center justify-between">
          <div className="flex gap-2">
             {mode !== 'create' && (
              <Button variant="destructive" onClick={() => handleSubmit(true)} className="px-6 hidden">
                Xóa hợp đồng
              </Button>
            )}
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Đóng
            </Button>
          </div>
          
          {mode !== 'delete' && (
            <Button onClick={() => handleSubmit()} className="min-w-[140px] bg-blue-600 hidden hover:bg-blue-700 shadow-md shadow-blue-200">
              {mode === 'create' ? 'Ký hợp đồng' : 'Cập nhật'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}