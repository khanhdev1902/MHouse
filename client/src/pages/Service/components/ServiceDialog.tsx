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
import type { Service } from '@/types/Service'

type ServiceDialogProps = {
  mode: 'create' | 'update' | 'delete'
  service?: Service

  onCreate?: (data: Omit<Service, 'id'>) => void
  onUpdate?: (id: number, data: Partial<Service>) => void
  onDelete?: (id: number) => void

  trigger?: React.ReactNode
}

const EMPTY_FORM: Omit<Service, 'id'> = {
  name: '',
  price: 0,
  unit: '',
  quantity: 1,
  note: '',
}

export default function ServiceDialog({
  mode,
  service,
  onCreate,
  onUpdate,
  onDelete,
  trigger,
}: ServiceDialogProps) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)

  /* ===== Prefill khi update ===== */
  useEffect(() => {
    if (mode === 'update' && service) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: service.name ?? '',
        price: service.price ?? 0,
        unit: service.unit ?? '',
        quantity: service.quantity ?? 1,
        note: service.note ?? '',
      })
    }

    if (mode === 'create') {
      setForm(EMPTY_FORM)
    }
  }, [mode, service])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((f) => ({
      ...f,
      [name]: name === 'price' || name === 'quantity' ? Number(value) : value,
    }))
  }

  const handleSubmit = (isDelete = false) => {
    if (mode === 'create') {
      onCreate?.(form)
    }

    if (mode === 'update' && service && !isDelete) {
      onUpdate?.(service.serviceId!, form)
    }

    if (isDelete && service) {
      onDelete?.(service.serviceId!)
    }

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button>{mode === 'create' ? '+ Thêm dịch vụ' : 'Chỉnh sửa'}</Button>}
      </DialogTrigger>

      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Thêm dịch vụ' : `Cập nhật dịch vụ`}</DialogTitle>
        </DialogHeader>

        <div className='grid gap-4 mt-4'>
          <div className='space-y-2'>
            <Label>Tên dịch vụ</Label>
            <Input name='name' value={form.name} onChange={handleChange} />
          </div>

          <div className='space-y-2'>
            <Label>Giá</Label>
            <Input type='number' name='price' value={form.price} onChange={handleChange} />
          </div>

          <div className='space-y-2'>
            <Label>Đơn vị</Label>
            <Input
              name='unit'
              value={form.unit}
              onChange={handleChange}
              placeholder='kWh / m³ / tháng...'
            />
          </div>

          {/* <div className='space-y-2'>
            <Label>Số lượng</Label>
            <Input type='number' name='quantity' value={form.quantity} onChange={handleChange} />
          </div> */}

          <div className='space-y-2'>
            <Label>Ghi chú</Label>
            <Input name='note' value={form.note} onChange={handleChange} />
          </div>
        </div>

        <DialogFooter className='mt-6'>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Hủy
          </Button>

          {mode !== 'create' && (
            <Button variant='destructive' onClick={() => handleSubmit(true)}>
              Xóa
            </Button>
          )}

          <Button onClick={() => handleSubmit()}>
            {mode === 'create' ? 'Tạo dịch vụ' : 'Lưu thay đổi'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
