/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search, Plus, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const MOCK_GROUPS = [
  { id: 1, name: 'Ban Quản Lý', lastMsg: 'Anh Duy gửi báo cáo chưa?', time: '10:30' },
  { id: 2, name: 'Nhóm Tầng 2', lastMsg: 'Phòng 201 nộp tiền điện ạ', time: '09:15' },
  { id: 3, name: 'Tòa Nhà Thái Hà', lastMsg: 'Thông báo cắt nước tạm thời...', time: 'Hôm qua' },
]

export default function ChatSidebar({ activeGroup, onSelect }: any) {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Trò chuyện</h2>
          <button className="p-2 bg-[#00b09b]/10 text-[#00b09b] rounded-xl hover:bg-[#00b09b] hover:text-white transition-all">
            <Plus size={18} />
          </button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            placeholder="Tìm kiếm nhóm..." 
            className="w-full bg-slate-50 border-none rounded-2xl py-2.5 pl-10 text-sm focus:ring-2 focus:ring-main/20 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 px-3 scrollbar-hide">
        {MOCK_GROUPS.map((group) => (
          <div
            key={group.id}
            onClick={() => onSelect(group.id)}
            className={cn(
              "group flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300",
              activeGroup === group.id 
                ? "bg-main/5 text-main" 
                : "text-slate-500 hover:bg-slate-50"
            )}
          >
            <div className={cn(
              "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
              activeGroup === group.id ? "bg-main text-white" : "bg-slate-100 text-slate-400 group-hover:bg-white"
            )}>
              <Users size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <p className="font-bold text-sm truncate text-slate-800">{group.name}</p>
                <span className="text-[10px] text-slate-400">{group.time}</span>
              </div>
              <p className="text-xs truncate opacity-70 font-medium">{group.lastMsg}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}