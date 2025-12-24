import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Invoice } from '@/types/Invoice'
import InvoiceAPI from '@/apis/invoiceAPI'
import { formatCurrency } from '@/utils/format'
import { toast } from 'sonner'
import { useRoom } from '@/hooks/useRoom'

type InvoiceDialogProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  data?: Invoice
  onSuccess?: () => void
}

export default function InvoiceDialog({ open, setOpen, data, onSuccess }: InvoiceDialogProps) {
  const isEdit = !!data
  const { rooms } = useRoom()

  const [form, setForm] = useState<Partial<Invoice>>({
    month: '',
    roomId: undefined,
    tenant: '',
    total: 0,
    status: 'unpaid',
  })

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (data) setForm(data)
  }, [data])

  const handleChange = <K extends keyof Invoice>(key: K, value: Invoice[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    try {
      if (isEdit && data) {
        await InvoiceAPI.updateInvoice(data.id, form)
        toast.success('Cập nhật hóa đơn thành công')
      } else {
        await InvoiceAPI.createInvoice(form)
        toast.success('Tạo hóa đơn thành công')
      }
      onSuccess?.()
      setOpen(false)
    } catch {
      toast.error('Có lỗi xảy ra')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Cập nhật hóa đơn' : 'Tạo hóa đơn'}</DialogTitle>
        </DialogHeader>

        <div className='space-y-4 text-sm'>
          <Input
            placeholder='Tháng (VD: 09/2024)'
            value={form.month || ''}
            onChange={(e) => handleChange('month', e.target.value)}
          />

          <Select
            value={form.roomId?.toString() || ''}
            onValueChange={(value) => handleChange('roomId', Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder='Chọn phòng' />
            </SelectTrigger>
            <SelectContent>
              {rooms
                ?.filter((r) => r.status === 'occupied')
                .map((room) => (
                  <SelectItem key={room.roomId} value={room.roomId.toString()}>
                    {room.roomCode}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Input
            placeholder='Người thuê'
            value={form.tenant || ''}
            onChange={(e) => handleChange('tenant', e.target.value)}
          />

          <Input
            type='number'
            placeholder='Tổng tiền'
            value={form.total || 0}
            onChange={(e) => handleChange('total', Number(e.target.value))}
          />

          {isEdit && (
            <div className='flex justify-between items-center'>
              <span>Hiện tại</span>
              <Badge>{formatCurrency(form.total || 0)}</Badge>
            </div>
          )}
        </div>

        <DialogFooter className='mt-4'>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button onClick={handleSave}>{isEdit ? 'Lưu thay đổi' : 'Tạo hóa đơn'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
