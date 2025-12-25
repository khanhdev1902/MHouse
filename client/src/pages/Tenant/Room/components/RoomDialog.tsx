/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Textarea } from '@/components/ui/textarea' // Sử dụng Textarea cho ghi chú
import { useEffect, useState } from 'react'
import type { Room } from '@/types/Room'
import { Home, Maximize, Layers, DollarSign, Activity, FileText, Trash2 } from 'lucide-react'

type RoomFormDialogProps = {
  mode: 'create' | 'update'
  room?: Room
  onCreate?: (data: any) => void
  onUpdate?: (roomId: number, data: Partial<Room>) => void
  onDelete?: (roomId: number) => void
  trigger?: React.ReactNode
}

const EMPTY_FORM: Partial<Room> = {
  roomCode: '',
  size: 0,
  floor: 1,
  price: 0,
  status: 'available',
  category: '',
  note: '',
}

export default function RoomFormDialog({
  mode,
  room,
  onCreate,
  onUpdate,
  onDelete,
  trigger,
}: RoomFormDialogProps) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Partial<Room>>(EMPTY_FORM)

  useEffect(() => {
    if (mode === 'update' && room) {
      setForm({
        roomCode: room.roomCode,
        size: room.size,
        floor: room.floor,
        price: room.price,
        status: room.status,
        category: room.category,
        note: room.note ?? '',
      })
    }
    if (mode === 'create') setForm(EMPTY_FORM)
  }, [mode, room, open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((f) => ({
      ...f,
      [name]: ['size', 'floor', 'price'].includes(name) ? Number(value) : value,
    }))
  }

  const handleSubmit = () => {
    if (mode === 'create') onCreate?.(form)
    if (mode === 'update' && room) onUpdate?.(room.roomId, form)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className='bg-blue-600 hover:bg-blue-700 shadow-md transition-all active:scale-95'>
            {mode === 'create' ? '+ Thêm phòng' : 'Chỉnh sửa'}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className='max-w-xl rounded-3xl p-0 overflow-hidden border-none shadow-2xl'>
        {/* Header với Background gradient nhẹ */}
        <DialogHeader className='bg-slate-50 px-8 py-6 border-b border-slate-100'>
          <DialogTitle className='text-xl font-black text-slate-800 flex items-center gap-2'>
            <div className='p-2 bg-blue-100 text-blue-600 rounded-lg'>
              <Home size={20} />
            </div>
            {mode === 'create' ? 'Tạo phòng mới' : `Chỉnh sửa phòng ${room?.roomCode}`}
          </DialogTitle>
        </DialogHeader>

        <div className='p-8 space-y-6 bg-white'>
          <div className='grid grid-cols-2 gap-x-6 gap-y-5'>
            {/* Mã phòng */}
            <div className='space-y-2'>
              <Label className='text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2'>
                <FileText size={14} /> Mã phòng
              </Label>
              <Input
                name='roomCode'
                placeholder='VD: P.101'
                value={form.roomCode ?? ''}
                onChange={handleChange}
                disabled={mode === 'update'}
                className='bg-slate-50 border-slate-200 focus:ring-2 focus:ring-blue-500 rounded-xl font-bold'
              />
            </div>

            {/* Diện tích */}
            <div className='space-y-2'>
              <Label className='text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2'>
                <Maximize size={14} /> Diện tích (m²)
              </Label>
              <Input
                type='number'
                name='size'
                disabled
                value={form.size ?? 0}
                onChange={handleChange}
                className='bg-slate-50 border-slate-200 focus:ring-2 focus:ring-blue-500 rounded-xl'
              />
            </div>

            {/* Tầng */}
            <div className='space-y-2'>
              <Label className='text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2'>
                <Layers size={14} /> Tầng
              </Label>
              <Input
                type='number'
                name='floor'
                disabled
                value={form.floor ?? 1}
                onChange={handleChange}
                className='bg-slate-50 border-slate-200 focus:ring-2 focus:ring-blue-500 rounded-xl'
              />
            </div>

            {/* Giá thuê */}
            <div className='space-y-2'>
              <Label className='text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2'>
                <DollarSign size={14} /> Giá thuê (VNĐ)
              </Label>
              <Input
                type='number'
                name='price'
                disabled
                value={form.price ?? 0}
                onChange={handleChange}
                className='bg-slate-50 border-slate-200 focus:ring-2 focus:ring-blue-500 rounded-xl font-semibold text-blue-600'
              />
            </div>

            {/* Trạng thái */}
            <div className='space-y-2 col-span-2'>
              <Label className='text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2'>
                <Activity size={14} /> Trạng thái phòng
              </Label>
              <Select
                value={form.status}
                disabled
                onValueChange={(v) => setForm((f) => ({ ...f, status: v as Room['status'] }))}
              >
                <SelectTrigger className='bg-slate-50 border-slate-200 h-11 rounded-xl'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className='rounded-xl'>
                  <SelectItem value='available' className='text-emerald-600 font-medium'>
                    Đang trống
                  </SelectItem>
                  <SelectItem value='occupied' className='text-blue-600 font-medium'>
                    Đang thuê
                  </SelectItem>
                  <SelectItem value='maintenance' className='text-amber-600 font-medium'>
                    Bảo trì
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Ghi chú */}
            <div className='space-y-2 col-span-2'>
              <Label className='text-[11px] font-bold uppercase tracking-wider text-slate-400'>
                Ghi chú bổ sung
              </Label>
              <Textarea
                name='note'
                placeholder='Thông tin thêm về hiện trạng phòng...'
                value={form.note ?? ''}
                disabled
                onChange={handleChange}
                className='bg-slate-50 border-slate-200 focus:ring-2 focus:ring-blue-500 rounded-xl min-h-[100px] resize-none'
              />
            </div>
          </div>
        </div>

        <DialogFooter className='bg-slate-50 px-8 py-5 border-t border-slate-100 flex items-center justify-between sm:justify-between'>
          <div className='flex-1'>
            {mode === 'update' && (
              <Button
                variant='ghost'
                onClick={() => onDelete?.(room!.roomId)}
                className='text-rose-500 hidden hover:text-rose-600 hover:bg-rose-50 gap-2 font-bold px-0'
              >
                <Trash2 size={16} /> Xóa phòng
              </Button>
            )}
          </div>

          <div className='flex gap-3'>
            <Button
              variant='outline'
              onClick={() => setOpen(false)}
              className='rounded-xl border-slate-200 font-semibold px-6'
            >
              Đóng
            </Button>
            <Button
              onClick={handleSubmit}
              className=' hidden rounded-xl bg-slate-900 hover:bg-black text-white px-8 font-bold shadow-lg shadow-slate-200 transition-all active:scale-95'
            >
              {mode === 'create' ? 'Tạo phòng' : 'Cập nhật'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
