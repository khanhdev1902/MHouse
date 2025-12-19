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
import { useEffect, useState } from 'react'
import type { Room } from '@/types/Room'

type RoomUpdateDialogProps = {
  room: Room
  onSubmit: (roomId: number, data: Partial<Room>) => void
  trigger?: React.ReactNode
}

export default function RoomUpdateDialog({
  room,
  onSubmit,
  trigger,
}: RoomUpdateDialogProps) {
  const [open, setOpen] = useState(false)

  const [form, setForm] = useState({
    roomCode: room.roomCode,
    size: room.size,
    floor: room.floor,
    price: room.price,
    status: room.status,
    category: room.category,
    note: room.note ?? '',
  })

  useEffect(() => {
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
  }, [room])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]:
        name === 'size' || name === 'floor' || name === 'price'
          ? Number(value)
          : value,
    })
  }

  const handleSubmit = () => {
    onSubmit(room.roomId, form)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button variant="outline">Chỉnh sửa</Button>}
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Cập nhật phòng {room.roomCode}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Mã phòng</Label>
            <Input name="roomCode" value={form.roomCode} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label>Diện tích (m²)</Label>
            <Input type="number" name="size" value={form.size} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label>Tầng</Label>
            <Input type="number" name="floor" value={form.floor} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label>Giá thuê</Label>
            <Input type="number" name="price" value={form.price} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label>Trạng thái</Label>
            <Input name="status" value={form.status} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label>Ghi chú</Label>
            <Input name="note" value={form.note} onChange={handleChange} />
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button onClick={handleSubmit}>Lưu thay đổi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
