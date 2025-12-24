import Container from '@/components/Container'
import { useState } from 'react'
import ChatWindow from './Components/ChatWindow'
import ChatSidebar from './Components/ChatSidebar'

export default function GroupChat() {
  const [activeGroup, setActiveGroup] = useState(1)

  return (
    <Container className="h-[calc(100vh-180px)] p-0 overflow-hidden">
      <div className="flex h-full bg-white rounded-4xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {/* Danh sách nhóm bên trái */}
        <div className="w-full md:w-80 border-r border-slate-50 shrink-0 h-full">
          <ChatSidebar activeGroup={activeGroup} onSelect={setActiveGroup} />
        </div>

        {/* Cửa sổ chat bên phải */}
        <div className="grow h-full bg-slate-50/30">
          <ChatWindow groupId={activeGroup} />
        </div>
      </div>
    </Container>
  )
}