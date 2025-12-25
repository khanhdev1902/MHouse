/* eslint-disable react-hooks/set-state-in-effect */
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
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Plus, Trash2, Receipt, Calendar, User, Home, ShieldCheck } from 'lucide-react'
import type { Invoice, InvoiceDetail } from '@/types/Invoice'
import { formatCurrency } from '@/utils/format'
import { toast } from 'sonner'
import { useContract } from '@/hooks/useContract'
import { useServices } from '@/hooks/useService'
import dayjs from 'dayjs'
import { useInvoice } from '@/hooks/useInvoice'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import httpClient from '@/apis/httpClient'

type InvoiceDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data?: Invoice
  invoices?: Invoice[]
  onSuccess?: () => void
}

export default function InvoiceDialog({ open, setOpen, data }: InvoiceDialogProps) {
  const isEdit = !!data
  const { contracts } = useContract()
  const { services } = useServices()
  const { updateInvoice } = useInvoice()

  const currentYear = dayjs().year()
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const years = Array.from({ length: 3 }, (_, i) => currentYear - 1 + i)
  const [method, setMethod] = useState<'cash' | 'zalopay'>('cash')
  useEffect(() => {
    setMethod(data?.paymentMethod ?? 'cash')
  }, [data])

  const [form, setForm] = useState<Partial<Invoice>>({
    contractId: 0,
    monthSelect: undefined,
    yearSelect: undefined,
    roomId: undefined,
    room: '',
    tenant: '',
    costRoom: 0,
    status: 'unpaid',
    dueDate: '',
    details: [],
    totalAmount: 0,
    transId: '',
  })

  useEffect(() => {
    if (data) {
      const [yearStr, monthStr] = data.month?.split('-') || []
      setForm({
        ...data,
        monthSelect: monthStr ? Number(monthStr) : undefined,
        yearSelect: yearStr ? Number(yearStr) : undefined,
        details: data.details || [],
      })
    }
  }, [data])

  useEffect(() => {
    const detailsTotal = (form.details || []).reduce((sum, d) => sum + (d.amount || 0), 0)
    setForm((prev) => ({ ...prev, totalAmount: (prev.costRoom || 0) + detailsTotal }))
  }, [form.costRoom, form.details])

  const handleChange = <K extends keyof Invoice>(key: K, value: Invoice[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleContractChange = (contractId: number) => {
    const contract = contracts.find((c) => c.contractId === contractId)
    if (!contract) return
    setForm((prev) => ({
      ...prev,
      contractId: contract.contractId,
      tenant: contract.tenant?.fullName || '',
      roomId: contract.room?.roomId,
      room: contract.room?.roomCode || '',
      costRoom: contract.rentPrice || 0,
    }))
  }

  const handleAddDetail = () => {
    if (!services?.length) return
    const service = services[0]
    setForm((prev) => ({
      ...prev,
      details: [
        ...(prev.details || []),
        {
          serviceId: service.serviceId,
          serviceName: service.name,
          unitPrice: service.price,
          quantity: 1,
          amount: service.price,
        },
      ],
    }))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDetailChange = (index: number, key: keyof InvoiceDetail, value: any) => {
    setForm((prev) => {
      const details = [...(prev.details || [])]
      const item = { ...details[index], [key]: value }
      item.amount = (item.quantity || 0) * (item.unitPrice || 0)
      details[index] = item
      return { ...prev, details }
    })
  }

  const handleRemoveDetail = (index: number) => {
    setForm((prev) => ({
      ...prev,
      details: prev.details?.filter((_, i) => i !== index),
    }))
  }

  const handleSave = async () => {
    console.log('Submitting form:', form)
    if (!form.monthSelect || !form.yearSelect || !form.dueDate) {
      return toast.error('Vui lòng điền đầy đủ thông tin bắt buộc')
    }
    if (data?.status === 'paid') {
      return toast.error('Tính năng này chưa được hỗ trợ')
    }
    try {
      if (method === 'zalopay') {
        const res = await httpClient.post('/zalopay', {
          amount: form.totalAmount || 0,
          username: form.tenant,
          transID: form.transId,
          description: `Thanh toán hóa đơn tháng ${form.monthSelect} năm ${form.yearSelect}`,})
        const { pay_url } = res.data
        window.location.href = pay_url
      } else {
        updateInvoice(data!.id, { status: 'paid', paymentMethod: method })
      }
      toast.success('Thanh toán thành công')
      setOpen(false)
    } catch {
      toast.error('Có lỗi xảy ra')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-w-2xl p-0 overflow-hidden gap-0'>
        <DialogHeader className='p-6 pb-2'>
          <DialogTitle className='flex items-center gap-2 text-xl font-bold'>
            <Receipt className='w-5 h-5 text-primary' />
            {isEdit ? 'Thông tin hóa đơn' : 'Tạo hóa đơn mới'}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className='max-h-[75vh] px-6'>
          <div className='space-y-6 pb-6'>
            {/* Section 1: Thông tin chung */}
            <div className='grid grid-cols-2 gap-x-8 gap-y-4 pt-2'>
              <div className='space-y-2'>
                <Label className='flex items-center gap-2 text-muted-foreground'>
                  <User className='w-3.5 h-3.5' /> Người thuê
                </Label>
                {isEdit ? (
                  <div className='flex items-center gap-2 h-10 px-3 rounded-md bg-secondary/50 border border-border font-medium'>
                    <ShieldCheck className='w-4 h-4 text-blue-500' />
                    {form.tenant}
                  </div>
                ) : (
                  <Select
                    value={form.contractId?.toString()}
                    onValueChange={(v) => handleContractChange(Number(v))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Chọn người thuê' />
                    </SelectTrigger>
                    <SelectContent>
                      {contracts
                        ?.filter((c) => c.status === 'active')
                        .map((c) => (
                          <SelectItem key={c.contractId} value={c.contractId.toString()}>
                            {c.tenant?.fullName}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className='space-y-2'>
                <Label className='flex items-center gap-2 text-muted-foreground'>
                  <Calendar className='w-3.5 h-3.5' /> Kỳ hóa đơn
                </Label>
                {isEdit ? (
                  <div className='flex items-center gap-2 h-10 px-3 rounded-md bg-secondary/50 border border-border font-medium italic'>
                    Tháng {form.monthSelect} năm {form.yearSelect}
                  </div>
                ) : (
                  <div className='flex gap-2'>
                    <Select
                      value={form.monthSelect?.toString()}
                      onValueChange={(v) => handleChange('monthSelect', Number(v))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Tháng' />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((m) => (
                          <SelectItem key={m} value={m.toString()}>
                            Tháng {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={form.yearSelect?.toString()}
                      onValueChange={(v) => handleChange('yearSelect', Number(v))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Năm' />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((y) => (
                          <SelectItem key={y} value={y.toString()}>
                            {y}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className='space-y-2'>
                <Label className='flex items-center gap-2 text-muted-foreground'>
                  <Home className='w-3.5 h-3.5' /> Phòng & Tiền thuê
                </Label>
                <div className='flex gap-2 text-sm font-medium'>
                  <div className='flex-1 flex items-center h-10 px-3 bg-muted rounded-md border italic'>
                    {form.room || '---'}
                  </div>
                  <div className='relative flex-2'>
                    <Input
                      type='number'
                      value={form.costRoom}
                      disabled={isEdit}
                      onChange={(e) => handleChange('costRoom', Number(e.target.value))}
                      className='pl-8 font-bold text-primary'
                    />
                    <span className='absolute left-2.5 top-2.5 text-muted-foreground text-xs font-normal'>
                      ₫
                    </span>
                  </div>
                </div>
              </div>

              <div className='space-y-2'>
                <Label className='flex items-center gap-2 text-destructive font-semibold'>
                  <Calendar className='w-3.5 h-3.5' /> Hạn thanh toán
                </Label>
                <Input
                  type='date'
                  value={form.dueDate}
                  disabled={isEdit}
                  min={dayjs().format('YYYY-MM-DD')}
                  onChange={(e) => handleChange('dueDate', e.target.value)}
                  className='bg-red-50/30 border-red-100 focus-visible:ring-red-200'
                />
              </div>
            </div>

            <Separator />

            {/* Section 2: Dịch vụ */}
            <div className='space-y-4'>
              <div className='flex justify-between items-center'>
                <Label className='text-base font-semibold'>Chi tiết dịch vụ dùng thêm</Label>
                {!isEdit && (
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={handleAddDetail}
                    className='h-8 gap-1 bg-primary/5 hover:bg-primary/10 text-primary border-primary/20'
                  >
                    <Plus className='w-4 h-4' /> Thêm dịch vụ
                  </Button>
                )}
              </div>

              <div className='rounded-xl border bg-card overflow-hidden shadow-sm'>
                <Table>
                  <TableHeader className='bg-muted/50'>
                    <TableRow className='hover:bg-transparent'>
                      <TableHead className='w-[220px]'>Tên dịch vụ</TableHead>
                      <TableHead className='text-center w-[100px]'>Số lượng</TableHead>
                      <TableHead>Đơn giá</TableHead>
                      <TableHead className='text-right'>Thành tiền</TableHead>
                      <TableHead className='w-40px'></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {form.details?.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className='text-center py-10 text-muted-foreground italic'
                        >
                          Chưa có dịch vụ nào trong hóa đơn này
                        </TableCell>
                      </TableRow>
                    ) : (
                      form.details?.map((d, i) => (
                        <TableRow key={i} className='group'>
                          <TableCell className='p-3'>
                            {isEdit ? (
                              <Input
                                type='string'
                                disabled
                                value={d.serviceName}
                                className='h-8 text-center'
                              />
                            ) : (
                              <Select
                                value={d.serviceId?.toString()}
                                onValueChange={(v) => {
                                  const s = services.find((x) => x.serviceId === Number(v))
                                  if (s) {
                                    handleDetailChange(i, 'serviceId', s.serviceId)
                                    handleDetailChange(i, 'serviceName', s.name)
                                    handleDetailChange(i, 'unitPrice', s.price)
                                  }
                                }}
                              >
                                <SelectTrigger className='h-8 border-transparent hover:border-border transition-all shadow-none'>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {services.map((s) => (
                                    <SelectItem key={s.serviceId} value={s.serviceId.toString()}>
                                      {s.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          </TableCell>
                          <TableCell className='p-3'>
                            <Input
                              type='number'
                              value={d.quantity}
                              disabled
                              onChange={(e) =>
                                handleDetailChange(i, 'quantity', Number(e.target.value))
                              }
                              className='h-8 text-center'
                            />
                          </TableCell>
                          <TableCell className='p-3 text-muted-foreground text-xs'>
                            {formatCurrency(d.unitPrice || 0)}
                          </TableCell>
                          <TableCell className='p-3 text-right font-semibold text-sm'>
                            {formatCurrency(d.amount || 0)}
                          </TableCell>
                          {!isEdit && (
                            <TableCell className='p-3'>
                              <Button
                                variant='ghost'
                                disabled
                                size='icon'
                                className='h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors'
                                onClick={() => handleRemoveDetail(i)}
                              >
                                <Trash2 className='w-3.5 h-3.5' />
                              </Button>
                            </TableCell>
                          )}
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Section 3: Tổng kết & Footer */}
        <div className='p-6 bg-muted/30 border-t'>
          <div className='flex justify-between items-end mb-6'>
            <div className='space-y-1'>
              <span className='text-sm text-muted-foreground'>Trạng thái:</span>
              <div className=''>
                <Badge
                  variant={form.status === 'paid' ? 'default' : 'destructive'}
                  className={`capitalize ${
                    form.status === 'paid'
                      ? 'bg-green-500/10 text-green-700 border-green-500/20'
                      : ''
                  }`}
                >
                  {form.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                </Badge>
              </div>
              <div className=''>
                ️<span className='text-sm text-muted-foreground'>Phương thức thanh toán</span>
                <RadioGroup
                  value={method}
                  onValueChange={(value) => setMethod(value as 'cash' | 'zalopay')}
                  className='flex gap-2 mt-2'
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='cash' id='cash' />
                    <Label htmlFor='cash'>Tiền mặt</Label>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='zalopay' id='zalopay' />
                    <Label htmlFor='zalopay'>ZaloPay</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div className='text-right'>
              <span className='text-xs text-muted-foreground uppercase font-medium tracking-wider'>
                Tổng cộng thanh toán
              </span>
              <div className='text-3xl font-black text-primary tracking-tight'>
                {formatCurrency(form.totalAmount || 0)}
              </div>
            </div>
          </div>
          <DialogFooter className='gap-3 sm:gap-0'>
            <Button
              variant='ghost'
              onClick={() => setOpen(false)}
              className='font-medium text-muted-foreground'
            >
              Đóng
            </Button>

            <Button
              onClick={handleSave}
              className='px-10 h-11 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95'
            >
              {data?.status === 'paid' ? 'Xuất hóa dơn' : 'Thanh toán'}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
