/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { LayoutDashboard, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LoginPage({ setUser }: { setUser: (user: any) => void }) {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message)
        return
      }
      console.log('Login successful:', data.user)
      localStorage.setItem('user', JSON.stringify(data.user))
      setUser(data.user)
      navigate('/')
    } catch (err) {
      alert('Không kết nối được server')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen w-full bg-slate-50'>
      {/* LEFT SIDE: Brand & Decorative (Ẩn trên mobile) */}
      <div className='relative hidden w-1/2 flex-col justify-between bg-linear-to-br from-main to-[#00b09b] p-12 text-white lg:flex overflow-hidden'>
        {/* Abstract Background Decor */}
        <div className='absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl' />
        <div className='absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-black/10 blur-3xl' />

        <div className='relative z-10 flex items-center gap-3'>
          <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md shadow-xl'>
            <LayoutDashboard size={28} strokeWidth={2.5} />
          </div>
          <h1 className='text-2xl font-black tracking-tighter'>THAI HA PMS</h1>
        </div>

        <div className='relative z-10 space-y-6'>
          <h2 className='text-5xl font-black leading-tight tracking-tight'>
            Quản lý nhà trọ <br />
            <span className='text-white/70 font-medium italic text-4xl'>Thông minh & Hiệu quả</span>
          </h2>
          <p className='max-w-md text-lg font-medium text-white/80 leading-relaxed'>
            Hệ thống tối ưu hóa quy trình quản lý hóa đơn, hợp đồng và tương tác với khách thuê chỉ
            trên một nền tảng duy nhất.
          </p>
          <div className='flex items-center gap-4 pt-4 text-sm font-bold'>
            <div className='flex -space-x-3'>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className='h-10 w-10 rounded-full border-2 border-main bg-slate-200' />
              ))}
            </div>
            <p className='opacity-90 tracking-wide'>+500 chủ trọ đã tin dùng</p>
          </div>
        </div>

        <div className='relative z-10 flex items-center gap-2 text-sm font-medium opacity-60'>
          <ShieldCheck size={16} />
          <span>Bảo mật bởi chuẩn mã hóa 256-bit</span>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className='flex w-full items-center justify-center p-8 lg:w-1/2 bg-white lg:rounded-l-[3rem] shadow-2xl z-20'>
        <div className='w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right-8 duration-700'>
          <div className='text-center lg:text-left'>
            <h3 className='text-3xl font-black tracking-tight text-slate-900'>
              Chào mừng trở lại!
            </h3>
            <p className='mt-2 text-sm font-medium text-slate-400'>
              Vui lòng nhập tài khoản quản trị viên của bạn
            </p>
          </div>

          <form onSubmit={handleLogin} className='space-y-6'>
            <div className='space-y-4'>
              {/* Email/Username */}
              <div className='space-y-2'>
                <Label className='text-xs font-bold uppercase tracking-widest text-slate-400'>
                  Email hoặc Tên đăng nhập
                </Label>
                <div className='relative group'>
                  <Mail
                    className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-main transition-colors'
                    size={18}
                  />
                  <Input
                    type='text'
                    placeholder='admin@thaiha.vn'
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className='h-12 rounded-2xl border-slate-100 bg-slate-50/50 pl-11'
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <Label className='text-xs font-bold uppercase tracking-widest text-slate-400'>
                    Mật khẩu
                  </Label>
                  <a href='#' className='text-xs font-bold text-main hover:underline'>
                    Quên mật khẩu?
                  </a>
                </div>
                <div className='relative group'>
                  <Lock
                    className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-main transition-colors'
                    size={18}
                  />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className='h-12 rounded-2xl border-slate-100 bg-slate-50/50 pl-11 pr-12'
                    required
                  />

                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600'
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='remember'
                className='rounded-md border-slate-300 data-[state=checked]:bg-main'
              />
              <label
                htmlFor='remember'
                className='text-sm font-medium text-slate-500 cursor-pointer select-none'
              >
                Ghi nhớ đăng nhập
              </label>
            </div>

            <Button
              type='submit'
              disabled={isLoading}
              className='group h-12 w-full rounded-2xl bg-main text-white font-bold text-lg shadow-lg shadow-main/25 hover:bg-[#122b85] transition-all active:scale-95'
            >
              {isLoading ? (
                <div className='h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent' />
              ) : (
                <div className='flex items-center gap-2'>
                  Đăng nhập ngay
                  <ArrowRight
                    size={20}
                    className='transition-transform group-hover:translate-x-1'
                  />
                </div>
              )}
            </Button>
          </form>

          <p className='text-center text-sm font-medium text-slate-400'>
            Bạn gặp vấn đề khi đăng nhập?{' '}
            <a href='#' className='font-bold text-[#00b09b] hover:underline'>
              Hỗ trợ kỹ thuật
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
