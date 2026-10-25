import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'

export function ToggleButton({
  checked,
  children,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  checked?: boolean
  children: ReactNode
}) {
  return (
    <button
      type="button"
      className={cn('btn', 'toggle-btn', checked && 'checked', className)}
      role="checkbox"
      aria-checked={checked}
      {...rest}
    >
      <span className="toggle-btn-check" aria-hidden>
        <Check size={12} />
      </span>
      {children}
    </button>
  )
}
