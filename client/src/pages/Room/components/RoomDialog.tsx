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
import { useEffect, useState } from 'react'
import type { Room } from '@/types/Room'

type RoomFormDialogProps = {
  mode: 'create' | 'update'
  room?: Room
  // onCreate?: (data: Partial<Room>) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  /* ===== Prefill ===== */
  useEffect(() => {
    if (mode === 'update' && room) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

    if (mode === 'create') {
      setForm(EMPTY_FORM)
    }
  }, [mode, room])

  /* ===== Handlers ===== */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((f) => ({
      ...f,
      [name]: ['size', 'floor', 'price'].includes(name) ? Number(value) : value,
    }))
  }

  const handleSubmit = () => {
    if (mode === 'create') {
      onCreate?.(form)
      setForm(EMPTY_FORM)
    }

    if (mode === 'update' && room) {
      onUpdate?.(room.roomId, form)
    }

    setOpen(false)
  }

  const handleDelete = () => {
    if (!room) return
    const ok = confirm(`Xóa phòng ${room.roomCode}?`)
    if (!ok) return

    onDelete?.(room.roomId)
    setOpen(false)
  }

  /* ===== Render ===== */
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button>{mode === 'create' ? '+ Thêm phòng' : 'Chỉnh sửa'}</Button>
        )}
      </DialogTrigger>

      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>
            {mode === 'create'
              ? 'Thêm phòng mới'
              : `Cập nhật phòng ${room?.roomCode}`}
          </DialogTitle>
        </DialogHeader>

        <div className='grid grid-cols-2 gap-4 mt-4'>
          <div className='space-y-2'>
            <Label>Mã phòng</Label>
            <Input
              name='roomCode'
              value={form.roomCode ?? ''}
              onChange={handleChange}
              disabled={mode === 'update'}
            />
          </div>

          <div className='space-y-2'>
            <Label>Diện tích (m²)</Label>
            <Input
              type='number'
              name='size'
              value={form.size ?? 0}
              onChange={handleChange}
            />
          </div>

          <div className='space-y-2'>
            <Label>Tầng</Label>
            <Input
              type='number'
              name='floor'
              value={form.floor ?? 1}
              onChange={handleChange}
            />
          </div>

          <div className='space-y-2'>
            <Label>Giá thuê</Label>
            <Input
              type='number'
              name='price'
              value={form.price ?? 0}
              onChange={handleChange}
            />
          </div>

          <div className='space-y-2 col-span-2'>
            <Label>Trạng thái</Label>
            <Select
              value={form.status}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, status: v as Room['status'] }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='available'>Đang trống</SelectItem>
                <SelectItem value='occupied'>Đang thuê</SelectItem>
                <SelectItem value='maintenance'>Bảo trì</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2 col-span-2'>
            <Label>Ghi chú</Label>
            <Input
              name='note'
              value={form.note ?? ''}
              onChange={handleChange}
            />
          </div>
        </div>

        <DialogFooter className='mt-6 flex justify-between'>
          {mode === 'update' && (
            <Button variant='destructive' onClick={handleDelete}>
              Xóa phòng
            </Button>
          )}

          <div className='flex gap-2'>
            <Button variant='outline' onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSubmit}>
              {mode === 'create' ? 'Tạo phòng' : 'Lưu thay đổi'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
