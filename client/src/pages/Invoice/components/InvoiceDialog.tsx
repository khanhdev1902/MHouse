import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { Invoice } from '@/types/Invoice'
import { ProfileForm } from './InvoiceForm'
type InvoiceDialogProps = {
  open?: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  data?: Invoice
}
export default function InvoiceDialog({ open, setOpen, data }: InvoiceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thông tin hóa đơn</DialogTitle>
        </DialogHeader>
        <div>
          {/* <div>{data?.id}</div>
          <div>{data?.month}</div>
          <div>{data?.room}</div>
          <div>{data?.status}</div>
          <div>{data?.tenant}</div>
          <div>{data?.total}</div>
           */}
           <ProfileForm/>
        </div>

        <DialogFooter>
          <Button
            onClick={() => {
              setOpen(false)
            }}
            variant={'outline'}
            className=' cursor-pointer'
          >
            Lưu thông tin
          </Button>

          <DialogClose>
            <Button variant={'outline'} className=' cursor-pointer'>
              Hủy bỏ
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
