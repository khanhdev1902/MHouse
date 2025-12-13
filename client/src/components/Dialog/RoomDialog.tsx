import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '../ui/input'
import { useRef, useState } from 'react'
import { DialogClose } from '@radix-ui/react-dialog'
type CreateNewInputProps = {
  label?: string
  buttonName?: string
}

export default function RoomDialog({ label, buttonName = 'Tạo' }: CreateNewInputProps) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    unit: '',
  })

  const priceRef = useRef<HTMLInputElement>(null)
  const unitRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    console.log('New service:', form)
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
  const [open, setOpen] = useState(false)
  return (
    <div className='flex flex-row items-end gap-4 shadow-sm px-5 py-3 rounded-full'>
      <label htmlFor='' className=' text-lg'>
        {label}
      </label>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline' className=' rounded-3xl shadow-sm cursor-pointer'>
            {buttonName}
          </Button>
        </DialogTrigger>

        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle>Thông tin phòng</DialogTitle>
          </DialogHeader>

          <div className='space-y-4 mt-4'>
            <div className='flex flex-col space-y-2'>
              <Label htmlFor='name'>Tên phòng</Label>
              <Input
                id='name'
                name='name'
                placeholder='Ví dụ: Điện, Nước, Wifi...'
                value={form.name}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, priceRef)}
                className='focus-visible:ring-0 focus:outline-none'
              />
            </div>

            {/* Giá */}
            <div className='flex flex-col space-y-2'>
              <Label htmlFor='price'>Giá</Label>
              <Input
                ref={priceRef}
                id='price'
                name='price'
                type='number'
                placeholder='Ví dụ: 4000'
                value={form.price}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, unitRef)}
                className='focus-visible:ring-0 focus:outline-none'
              />
              {/* <Input
                ref={priceRef}
                id="price"
                name="price"
                type="text" // đổi từ number → text
                placeholder="Ví dụ: 4000"
                value={Number(form.price).toLocaleString("vi-VN")}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value.replace(/\D/g, "") })
                } // chỉ lấy số
                onKeyDown={(e) => handleKeyDown(e, unitRef)}
                className="focus-visible:ring-0 focus:outline-none"
              /> */}
            </div>

            {/* Đơn vị */}
            <div className='flex flex-col space-y-2'>
              <Label htmlFor='unit'>Đơn vị</Label>
              <Input
                ref={unitRef}
                id='unit'
                name='unit'
                placeholder='Ví dụ: kWh, m³, tháng...'
                value={form.unit}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmit() // Enter cuối → submit
                }}
                className='focus-visible:ring-0 focus:outline-none'
              />
            </div>
          </div>
          <DialogFooter className='flex justify-end gap-2'>
            <DialogClose asChild>
              <Button variant='outline'>Hủy bỏ</Button>
            </DialogClose>
            <Button
              variant='outline'
              onClick={() => {
                handleSubmit() // submit xong
                setOpen(false) // đóng modal
              }}
            >
              Lưu dịch vụ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
