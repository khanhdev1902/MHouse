import { cn } from '@/lib/utils'
export default function Footer({ className }: { className?: string }) {
  const currentYear = new Date().getFullYear()
  return (
    <footer
      className={cn('mt-auto w-full border-t border-slate-100 bg-white/50 py-6 px-10', className)}
    >
      <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
        {/* Left Side: School Info */}
        <div className='flex items-center gap-3'>
          <div className='h-8 w-1 rounded-full bg-linear-to-b from-[#00b09b] to-main' />
          <div className='flex flex-col'>
            <p className='text-xs font-black uppercase tracking-widest text-slate-800'>
              Trường Đại học Thăng Long
            </p>
            <p className='text-[10px] font-bold text-[#00b09b]'>Bộ môn Công nghệ thông tin</p>
          </div>
        </div>
        
        <div className='flex flex-col md:items-end'>
          <p className='text-[11px] font-semibold text-slate-400 italic'>
            &copy; {currentYear} Toàn bộ bản quyền thuộc về nhóm phát triển.
          </p>
          <div className='flex items-center gap-2 mt-1'>
            <span className='h-1 w-1 rounded-full bg-slate-200' />
            <span className='text-[10px] font-bold text-slate-300 uppercase tracking-tighter'>
              Phiên bản hệ thống 2.0.1
            </span>
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 left-0 h-0.5 w-full bg-linear-to-r from-transparent via-[#00b09b]/20 to-transparent' />
    </footer>
  )
}
