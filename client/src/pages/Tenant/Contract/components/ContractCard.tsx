/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Contract } from '@/types/Contract'
import type { User } from '@/types/User'
import { Trash2, Calendar, Home, Phone, User as UserIcon, MoreHorizontal, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ContractDialog from './ContractDialong'
import type { Room } from '@/types/Room'

type ContractCardProps = {
  contract: Contract
  rooms?: Room[]
  users?: User[]
  onUpdate: (id: number, data: any) => void
  onDelete: (id: number) => void
  onView?: (contract: Contract) => void
}

export default function ContractCard({
  contract,
  onUpdate,
  onDelete,
  onView,
  rooms,
  users,
}: ContractCardProps) {
  
  const statusConfig = {
    active: { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', label: 'Đang hoạt động' },
    expired: { color: 'bg-amber-100 text-amber-700 border-amber-200', label: 'Hết hạn' },
    cancelled: { color: 'bg-rose-100 text-rose-700 border-rose-200', label: 'Đã hủy' },
  }

  const currentStatus = statusConfig[contract.status] || statusConfig.expired

  return (
    <div
      onClick={() => onView?.(contract)}
      className="group relative p-6 border border-slate-100 rounded-3xl shadow-sm bg-white 
                 hover:shadow-2xl hover:border-blue-100 transition-all duration-500 cursor-pointer overflow-hidden"
    >
      {/* Background Decor (Hiệu ứng vòng tròn mờ nhẹ khi hover) */}
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header: Status & Actions */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${currentStatus.color}`}>
          {currentStatus.label}
        </span>
        
        <div className="flex gap-1 bg-slate-50 p-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ContractDialog
            mode="update"
            rooms={rooms}
            users={users}
            contract={contract}
            onUpdate={onUpdate}
            trigger={
              <Button size="icon" variant="ghost" className="w-8 h-8 rounded-lg hover:bg-white hover:text-blue-600 shadow-sm">
                <Eye className="w-4 h-4" />
              </Button>
            }
          />
          <Button
            size="icon"
            variant="ghost"
            className="w-8 h-8 hidden rounded-lg hover:bg-white hover:text-rose-600 shadow-sm text-slate-400"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(contract.contractId)
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Title */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-blue-600 rounded-xl text-white">
            <Home size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 leading-tight">
              Phòng {contract.room?.roomCode}
            </h3>
            <p className="text-xs text-slate-400 font-medium italic">Tầng {contract.room?.floor} • Mã HĐ: #{contract.contractId}</p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {/* Tenant Info */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
            <UserIcon size={16} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] uppercase text-slate-400 font-bold leading-none mb-1">Người thuê</p>
            <p className="text-sm font-semibold text-slate-700">{contract?.tenant?.fullName}</p>
          </div>
          <a 
            href={`tel:${contract?.tenant?.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="p-2 hover:bg-blue-50 rounded-full text-blue-600 transition-colors"
          >
            <Phone size={16} />
          </a>
        </div>

        {/* Date Info */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
            <Calendar size={16} />
          </div>
          <div>
            <p className="text-[10px] uppercase text-slate-400 font-bold leading-none mb-1">Thời hạn</p>
            <p className="text-sm font-medium text-slate-600">
              {new Date(contract.startDate).toLocaleDateString('vi-VN')} - {new Date(contract.endDate).toLocaleDateString('vi-VN')}
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-slate-200 my-4" />

      {/* Pricing Footer */}
      <div className="flex justify-between items-center">
        <div>
           <p className="text-[10px] uppercase text-slate-400 font-bold">Giá thuê</p>
           <p className="text-lg font-black text-blue-600">
             {contract.rentPrice.toLocaleString()}<span className="text-xs ml-0.5">₫</span>
           </p>
        </div>
        <div className="text-right">
           <p className="text-[10px] uppercase text-slate-400 font-bold">Tiền cọc</p>
           <p className="text-sm font-bold text-slate-700">
             {contract.deposit.toLocaleString()}₫
           </p>
        </div>
      </div>

      {/* Note Badge if exists */}
      {contract.note && (
        <div className="mt-4 flex items-start gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
          <MoreHorizontal size={14} className="text-slate-400 mt-0.5" />
          <p className="text-[11px] text-slate-500 italic line-clamp-1">{contract.note}</p>
        </div>
      )}
    </div>
  )
}