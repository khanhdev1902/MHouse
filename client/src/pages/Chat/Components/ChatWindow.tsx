/* eslint-disable @typescript-eslint/no-unused-vars */
import { MoreVertical, Phone, Send, Paperclip, Smile, User2 } from 'lucide-react'
import MessageItem from './MesageItem'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ChatWindow({ groupId }: any) {
  const MOCK_MESSAGES = [
    {
      id: 1,
      sender: 'Nguyễn Văn A',
      text: 'Chào mọi người, tiền điện tháng này có chưa nhỉ?',
      time: '10:00',
      isMe: false,
    },
    {
      id: 2,
      sender: 'Admin',
      text: 'Đã có rồi nhé, mọi người kiểm tra ở mục Hóa đơn.',
      time: '10:05',
      isMe: true,
    },
    {
      id: 3,
      sender: 'Trần Thị B',
      text: 'Để em check ạ, cảm ơn Admin!',
      time: '10:07',
      isMe: false,
    },
  ]

  return (
    <div className='flex flex-col h-full'>
      {/* Header */}
      <div className='px-6 py-4 bg-white border-b border-slate-50 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='h-10 w-10 rounded-xl bg-linear-to-br from-[#00b09b] to-main flex items-center justify-center text-white shadow-lg shadow-blue-100'>
            <User2 size={20} />
          </div>
          <div>
            <h3 className='font-bold text-slate-800 text-sm leading-tight'>Ban Quản Lý</h3>
            <span className='text-[10px] text-[#00b09b] font-bold uppercase tracking-wider'>
              32 thành viên
            </span>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <button className='p-2 text-slate-400 hover:text-main hover:bg-blue-50 rounded-lg transition-colors'>
            <Phone size={18} />
          </button>
          <button className='p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors'>
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Messages list */}
      <div className='flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide'>
        {MOCK_MESSAGES.map((msg) => (
          <MessageItem key={msg.id} message={msg} />
        ))}
      </div>

      {/* Input Area */}
      <div className='p-6 bg-white border-t border-slate-50'>
        <div className='flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100 focus-within:ring-2 focus-within:ring-main/20 transition-all'>
          <button className='p-2 text-slate-400 hover:text-main'>
            <Paperclip size={20} />
          </button>
          <input
            placeholder='Nhập tin nhắn...'
            className='flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium'
          />
          <button className='p-2 text-slate-400 hover:text-main'>
            <Smile size={20} />
          </button>
          <button className='p-3 bg-main text-white rounded-xl shadow-lg shadow-blue-100 hover:scale-105 active:scale-95 transition-all'>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
