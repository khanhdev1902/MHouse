import { useEffect, useState, useRef } from 'react'
import { socket } from '@/apis/socket'
import { createChat, getAllChats } from '@/apis/chat'
import { 
  Send, Hash, MoreVertical, Phone, Paperclip, 
  Smile, Search, Plus, Users 
} from 'lucide-react'
import { cn } from '@/lib/utils'

// --- Interfaces ---
interface Message {
  chatId?: number
  userId: number
  message: string
  createdAt?: string
  user?: { fullName: string }
}

const MOCK_GROUPS = [
  { id: 1, name: 'Ban Quản Lý', lastMsg: 'Anh Duy gửi báo cáo chưa?', time: '10:30' },
  { id: 2, name: 'Nhóm Tầng 2', lastMsg: 'Phòng 201 nộp tiền điện ạ', time: '09:15' },
  { id: 3, name: 'Tòa Nhà Thái Hà', lastMsg: 'Thông báo cắt nước tạm thời...', time: 'Hôm qua' },
]

export default function ChatPage() {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [activeGroup, setActiveGroup] = useState(1)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Lấy dữ liệu tin nhắn ban đầu
  useEffect(() => {
    getAllChats().then((chats) => setMessages(chats))
  }, [])

  // Lắng nghe socket
  useEffect(() => {
    socket.on('receive_message', (msg) => {
      setMessages((prev) => [...prev, msg])
    })
    return () => {
      socket.off('receive_message')
    }
  }, [])

  const handleSend = async () => {
    if (!input.trim()) return
    const msg = { userId: user.userId, message: input }
    const saved = await createChat(msg)
    socket.emit('send_message', saved)
    setInput('')
  }

  return (
    <div className='flex h-[800px] w-full max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden'>
      
      {/* --- SIDEBAR BÊN TRÁI --- */}
      <div className="w-[350px] border-r border-slate-50 flex flex-col bg-white">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Trò chuyện</h2>
            <button className="p-2 bg-[#00b09b]/10 text-[#00b09b] rounded-xl hover:bg-[#00b09b] hover:text-white transition-all shadow-sm">
              <Plus size={18} />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              placeholder="Tìm kiếm nhóm..." 
              className="w-full bg-slate-50 border-none rounded-2xl py-2.5 pl-10 text-sm focus:ring-2 focus:ring-main/20 transition-all outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-1 px-3 pb-4 scrollbar-hide">
          {MOCK_GROUPS.map((group) => (
            <div
              key={group.id}
              onClick={() => setActiveGroup(group.id)}
              className={cn(
                "group flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300",
                activeGroup === group.id 
                  ? "bg-main/5 text-main" 
                  : "text-slate-500 hover:bg-slate-50"
              )}
            >
              <div className={cn(
                "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105",
                activeGroup === group.id ? "bg-main text-white" : "bg-slate-100 text-slate-400 group-hover:bg-white"
              )}>
                <Users size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <p className={cn("font-bold text-sm truncate", activeGroup === group.id ? "text-main" : "text-slate-800")}>
                    {group.name}
                  </p>
                  <span className="text-[10px] text-slate-400">{group.time}</span>
                </div>
                <p className="text-xs truncate opacity-70 font-medium">{group.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- CỘT CHAT CHÍNH --- */}
      <div className='flex-1 flex flex-col bg-[#fbfcfd]'>
        {/* Chat Header */}
        <div className='px-6 py-4 bg-white border-b border-slate-50 flex items-center justify-between sticky top-0 z-10'>
          <div className='flex items-center gap-3'>
            <div className='h-10 w-10 rounded-xl bg-linear-to-br from-[#00b09b] to-main flex items-center justify-center text-white shadow-lg shadow-blue-100'>
              <Hash size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className='font-bold text-slate-800 text-sm leading-tight'>
                {MOCK_GROUPS.find(g => g.id === activeGroup)?.name || 'Kênh thảo luận'}
              </h3>
              <span className='text-[10px] text-[#00b09b] font-bold uppercase tracking-wider flex items-center gap-1'>
                <span className='w-1.5 h-1.5 bg-[#00b09b] rounded-full animate-pulse'></span>
                Trực tuyến
              </span>
            </div>
          </div>
          <div className='flex items-center gap-1'>
            <button className='p-2 text-slate-400 hover:text-main hover:bg-blue-50 rounded-lg transition-colors'>
              <Phone size={18} />
            </button>
            <button className='p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors'>
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Message List */}
        <div
          ref={scrollRef}
          className='flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide'
        >
          {messages.map((m, i) => {
            const isMe = m.userId === user?.userId
            return (
              <div
                key={i}
                className={cn(
                  'flex flex-col max-w-[75%]',
                  isMe ? 'ml-auto items-end' : 'mr-auto items-start'
                )}
              >
                {!isMe && (
                  <span className='text-[10px] font-bold text-slate-400 mb-1.5 ml-2 uppercase tracking-wide'>
                    {m.user?.fullName || `User ${m.userId}`}
                  </span>
                )}

                <div
                  className={cn(
                    'px-4 py-3 rounded-3xl text-[14px] font-medium shadow-sm transition-all',
                    isMe
                      ? 'bg-linear-to-br from-main to-[#122b85] text-white rounded-tr-none'
                      : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                  )}
                >
                  {m.message}
                </div>

                {m.createdAt && (
                  <span className='text-[9px] text-slate-300 mt-1.5 px-2 font-semibold'>
                    {new Date(m.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* Input Area */}
        <div className='p-6 bg-white border-t border-slate-50'>
          <div className='flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100 focus-within:ring-2 focus-within:ring-main/20 focus-within:bg-white transition-all'>
            <button className='p-2 text-slate-400 hover:text-main transition-colors'>
              <Paperclip size={20} />
            </button>
            
            <input
              type='text'
              value={input}
              placeholder='Nhập tin nhắn...'
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className='flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none'
            />

            <button className='p-2 text-slate-400 hover:text-main transition-colors'>
              <Smile size={20} />
            </button>

            <button
              onClick={handleSend}
              className='p-3 bg-main text-white rounded-xl shadow-lg shadow-blue-100 hover:scale-105 active:scale-95 transition-all flex items-center justify-center'
            >
              <Send size={18} fill='currentColor' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}