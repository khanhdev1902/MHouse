import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useRef, useState } from 'react'
import { DialogClose } from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type RoomDialogProps = {
  label?: string
  buttonName?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: (data: any) => void
}

export default function RoomDialog({
  label,
  buttonName = 'Tạo phòng',
  onSubmit,
}: RoomDialogProps) {
  const [open, setOpen] = useState(false)

  const [form, setForm] = useState({
    roomCode: '',
    size: 0,
    floor: 1,
    price: 0,
    status: 'available',
    category: 'standard',
    note: '',
  })

  const sizeRef = useRef<HTMLInputElement>(null)
  const floorRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)

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
    onSubmit?.(form)
    setOpen(false)
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextRef?: React.RefObject<HTMLInputElement | null>
  ) => {
    if (e.key === 'Enter' && nextRef?.current) {
      nextRef.current.focus()
    }
  }

  return (
    <div className='flex items-end gap-4'>
      {label && <label className='text-lg'>{label}</label>}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline' className='rounded-3xl shadow-sm'>
            {buttonName}
          </Button>
        </DialogTrigger>

        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle>Thông tin phòng</DialogTitle>
          </DialogHeader>

          <div className='space-y-4 mt-4'>
            {/* Mã phòng */}
            <div className='space-y-2'>
              <Label>Mã phòng</Label>
              <Input
                name='roomCode'
                placeholder='Ví dụ: P101'
                value={form.roomCode}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, sizeRef)}
              />
            </div>

            {/* Diện tích */}
            <div className='space-y-2'>
              <Label>Diện tích (m²)</Label>
              <Input
                ref={sizeRef}
                type='number'
                name='size'
                placeholder='Ví dụ: 25'
                value={form.size}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, floorRef)}
              />
            </div>

            {/* Tầng */}
            <div className='space-y-2'>
              <Label>Tầng</Label>
              <Input
                ref={floorRef}
                type='number'
                name='floor'
                placeholder='Ví dụ: 1'
                value={form.floor}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, priceRef)}
              />
            </div>

            {/* Giá */}
            <div className='space-y-2'>
              <Label>Giá thuê (VNĐ)</Label>
              <Input
                ref={priceRef}
                type='number'
                name='price'
                placeholder='Ví dụ: 3500000'
                value={form.price}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmit()
                }}
              />
            </div>

            {/* Ghi chú */}
            <div className='space-y-2'>
              <Label>Ghi chú</Label>
              <Input
                name='note'
                placeholder='Ví dụ: Có cửa sổ, WC riêng'
                value={form.note}
                onChange={handleChange}
              />
            </div>
          </div>

          <DialogFooter className='flex justify-end gap-2'>
            <DialogClose asChild>
              <Button variant='outline'>Hủy</Button>
            </DialogClose>
            <Button onClick={handleSubmit}>Lưu phòng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
