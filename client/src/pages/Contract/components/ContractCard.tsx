import { type Contract } from '@/types/Contract'
import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

type ContractCardProps = {
  contract: Contract
  onUpdate: (id: number, data: Partial<Contract>) => void
  onDelete: (id: number) => void
  onView?: (contract: Contract) => void
}

export default function ContractCard({ contract, onUpdate, onDelete, onView }: ContractCardProps) {
  const statusColor = {
    active: 'bg-green-100 text-green-800',
    expired: 'bg-gray-100 text-gray-600',
    cancelled: 'bg-red-100 text-red-800',
  } as const

  return (
    <div
      onClick={() => onView?.(contract)}
      className='relative cursor-pointer p-5 border rounded-2xl shadow-sm bg-white
                 hover:shadow-xl hover:-translate-y-2 transition-all duration-300'
    >
      {/* Actions */}
      <div className='absolute top-3 right-3 flex gap-2'>
        <Button
          size='icon'
          variant='ghost'
          onClick={(e) => {
            e.stopPropagation()
            onDelete(contract.contractId)
          }}
          title='Xóa hợp đồng'
        >
          <Trash2 className='w-5 h-5 text-red-500 hover:text-red-600 transition-colors' />
        </Button>
        <Button
          size='icon'
          variant='ghost'
          onClick={(e) => {
            e.stopPropagation()
            onUpdate(contract.contractId, contract)
          }}
          title='Chỉnh sửa'
        >
          <Pencil className='w-5 h-5 text-blue-500 hover:text-blue-600 transition-colors' />
        </Button>
      </div>

      {/* Header */}
      <h2 className='text-center text-xl font-bold text-gray-800 mb-4'>Hợp đồng phòng trọ</h2>

      {/* Tenant Info */}
      <div className='mb-4 p-4 rounded-xl bg-gray-50'>
        <p className='text-sm font-medium text-gray-600'>
          <span className='font-semibold'>Người thuê:</span> {contract?.user?.fullName}
        </p>
        <p className='text-sm font-medium text-gray-600'>
          <span className='font-semibold'>Số điện thoại:</span> {contract?.user?.phone}
        </p>
      </div>

      {/* Room & Dates */}
      <div className='mb-3'>
        <p className='text-md font-semibold text-gray-700'>Phòng thuê: {contract.room?.roomCode}</p>
        <div>
          <span className='text-sm text-gray-500'>Thời gian: </span>
          <span className='text-sm text-gray-500'>
            {`Từ ${new Date(contract.startDate).toLocaleDateString('vi-VN')} đến ${new Date(
              contract.endDate
            ).toLocaleDateString('vi-VN')}`}
          </span>
        </div>
      </div>

      {/* Pricing */}
      <div className='mb-4 flex flex-wrap gap-3 text-sm'>
        <span className='font-medium text-yellow-700'>
          Tiền cọc: <span className='font-bold'>{contract.deposit.toLocaleString()}₫</span>
        </span>
        <span className='font-medium text-green-700'>
          Giá thuê: <span className='font-bold'>{contract.rentPrice.toLocaleString()}₫</span>
        </span>
      </div>

      {/* Status */}
      <div className='mb-3'>
        <span className='text-sm font-semibold text-gray-600'>Trạng thái hợp đồng: </span>
        <span
          className={`inline-block px-3 py-1 mt-1 rounded-full text-sm font-semibold ${
            statusColor[contract.status]
          }`}
        >
          {contract.status === 'active'
            ? 'Đang hoạt động'
            : contract.status === 'expired'
            ? 'Hết hạn'
            : 'Hủy'}
        </span>
      </div>

      {/* Note */}
      {contract.note && (
        <p className='mt-2 text-xs text-gray-500 italic'>Ghi chú: {contract.note}</p>
      )}
    </div>
  )
}
