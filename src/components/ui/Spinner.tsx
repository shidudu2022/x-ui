import { cn } from '@/lib/cn'

type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  label?: string
}

export function Spinner({ size = 'md', className, label = 'Loading' }: SpinnerProps) {
  return (
    <span
      className={cn('spinner', size === 'sm' && 'spinner-sm', size === 'lg' && 'spinner-lg', className)}
      role="status"
      aria-label={label}
    />
  )
}
