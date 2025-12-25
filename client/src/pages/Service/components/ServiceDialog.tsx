/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'
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
import { Textarea } from '@/components/ui/textarea' // Thêm Textarea cho note
import { Plus, Settings2, Trash2, Banknote, Tag, Box, FileText } from 'lucide-react' // Icons chuyên nghiệp
import type { Service } from '@/types/Service'
import { cn } from '@/lib/utils'

type ServiceDialogProps = {
  mode: 'create' | 'update' | 'delete'
  service?: Service
  onCreate?: (data: Omit<Service, 'serviceId'>) => void
  onUpdate?: (id: number, data: Partial<Service>) => void
  onDelete?: (id: number) => void
  trigger?: React.ReactNode
}

const EMPTY_FORM: Omit<Service, 'serviceId'> = {
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

  useEffect(() => {
    if (mode === 'update' && service) {
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
  }, [mode, service, open]) // Thêm open để reset khi đóng/mở

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((f) => ({
      ...f,
      [name]: name === 'price' || name === 'quantity' ? Number(value) : value,
    }))
  }

  const handleSubmit = (isDelete = false) => {
    if (mode === 'create') onCreate?.(form)
    if (mode === 'update' && service && !isDelete) onUpdate?.(service.serviceId!, form)
    if (isDelete && service) onDelete?.(service.serviceId!)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant={mode === 'create' ? 'default' : 'outline'} className='gap-2'>
            {mode === 'create' ? <Plus className='w-4 h-4' /> : <Settings2 className='w-4 h-4' />}
            {mode === 'create' ? 'Thêm dịch vụ' : 'Chỉnh sửa'}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className='max-w-md p-0 overflow-hidden border-none shadow-2xl'>
        {/* Header với background nhẹ */}
        <DialogHeader className='p-6 bg-muted/30'>
          <DialogTitle className='flex items-center gap-2 text-xl font-bold'>
            <div
              className={cn(
                'p-2 rounded-lg',
                mode === 'create' ? 'bg-primary/10 text-primary' : 'bg-orange-100 text-orange-600'
              )}
            >
              {mode === 'create' ? <Plus className='w-5 h-5' /> : <Settings2 className='w-5 h-5' />}
            </div>
            {mode === 'create' ? 'Tạo dịch vụ mới' : 'Cập nhật dịch vụ'}
          </DialogTitle>
        </DialogHeader>

        <div className='p-6 space-y-5'>
          {/* Tên dịch vụ */}
          <div className='space-y-2'>
            <Label className='flex items-center gap-2 font-semibold'>
              <Tag className='w-3.5 h-3.5 text-muted-foreground' /> Tên dịch vụ
            </Label>
            <Input
              name='name'
              placeholder='VD: Tiền điện, Nước, Gửi xe...'
              value={form.name}
              onChange={handleChange}
              className='focus-visible:ring-primary h-11'
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            {/* Giá */}
            <div className='space-y-2'>
              <Label className='flex items-center gap-2 font-semibold'>
                <Banknote className='w-3.5 h-3.5 text-muted-foreground' /> Đơn giá
              </Label>
              <div className='relative'>
                <Input
                  type='number'
                  name='price'
                  value={form.price}
                  onChange={handleChange}
                  className='pl-8 h-11 font-medium'
                />
                <span className='absolute left-3 top-3 text-muted-foreground text-xs'>₫</span>
              </div>
            </div>

            {/* Đơn vị */}
            <div className='space-y-2'>
              <Label className='flex items-center gap-2 font-semibold'>
                <Box className='w-3.5 h-3.5 text-muted-foreground' /> Đơn vị tính
              </Label>
              <Input
                name='unit'
                value={form.unit}
                onChange={handleChange}
                placeholder='kWh, m³, tháng...'
                className='h-11'
              />
            </div>
          </div>

          {/* Ghi chú */}
          <div className='space-y-2'>
            <Label className='flex items-center gap-2 font-semibold'>
              <FileText className='w-3.5 h-3.5 text-muted-foreground' /> Ghi chú
            </Label>
            <Textarea
              name='note'
              value={form.note}
              onChange={handleChange}
              placeholder='Nhập thông tin bổ sung nếu có...'
              className='resize-none min-h-[100px]'
            />
          </div>
        </div>

        <DialogFooter className='p-6 bg-muted/20 border-t flex items-center justify-between sm:justify-between'>
          <div className='flex gap-2'>
            {mode !== 'create' && (
              <Button
                type='button'
                variant='ghost'
                className='text-destructive hover:text-destructive hover:bg-destructive/10 gap-2'
                onClick={() => handleSubmit(true)}
              >
                <Trash2 className='w-4 h-4' /> Xóa
              </Button>
            )}
          </div>

          <div className='flex gap-3'>
            <Button variant='ghost' onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button
              onClick={() => handleSubmit()}
              className='px-6 shadow-lg shadow-primary/20 active:scale-95 transition-all'
            >
              {mode === 'create' ? 'Tạo ngay' : 'Lưu cập nhật'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
