import { cn } from '@/lib/utils'

type ContainerProps = {
  className?: string
  children?: React.ReactNode
}
export default function Container({ className, children }: ContainerProps) {
  return <div className={cn('container w-full h-full mx-auto', className)}>{children}</div>
}
