import { cn } from '@/lib/utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MessageItem({ message }: any) {
  const { isMe, sender, text, time } = message

  return (
    <div className={cn("flex flex-col max-w-[70%]", isMe ? "ml-auto items-end" : "mr-auto items-start")}>
      {!isMe && <span className="text-[10px] font-bold text-slate-400 mb-1 ml-2 uppercase tracking-wide">{sender}</span>}
      
      <div className={cn(
        "px-4 py-3 rounded-3xl text-sm font-medium shadow-sm",
        isMe 
          ? "bg-linear-to-br from-main to-[#122b85] text-white rounded-tr-none" 
          : "bg-white border border-slate-100 text-slate-700 rounded-tl-none"
      )}>
        {text}
      </div>
      
      <span className="text-[10px] text-slate-300 mt-1 px-2">{time}</span>
    </div>
  )
}