import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Spinner } from './Spinner'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'
export type ButtonSize = 'md' | 'sm'

type Shared = {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  children?: ReactNode
  className?: string
}

type ButtonAsButton = Shared &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

type ButtonAsLink = Shared &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> & {
    href: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsLink

function buttonClass(variant: ButtonVariant, size: ButtonSize, loading: boolean, className?: string) {
  return cn(
    'btn',
    variant === 'primary' && 'btn-primary',
    variant === 'secondary' && 'btn-secondary',
    variant === 'danger' && 'btn-danger',
    variant === 'ghost' && 'btn-ghost',
    size === 'sm' && 'btn-sm',
    loading && 'is-loading',
    className,
  )
}

export function Button(props: ButtonProps) {
  const {
    variant = 'secondary',
    size = 'md',
    loading = false,
    className,
    children,
    ...rest
  } = props

  const cls = buttonClass(variant, size, loading, className)
  const content = (
    <>
      <span className="btn-label">{children}</span>
      {loading ? (
        <span className="btn-spinner" aria-hidden>
          <Spinner />
        </span>
      ) : null}
    </>
  )

  if ('href' in props && props.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a
        href={href}
        className={cls}
        aria-busy={loading || undefined}
        {...anchorRest}
        onClick={(e) => {
          if (loading) e.preventDefault()
          anchorRest.onClick?.(e)
        }}
      >
        {content}
      </a>
    )
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button
      type={buttonRest.type ?? 'button'}
      className={cls}
      disabled={buttonRest.disabled || loading}
      aria-busy={loading || undefined}
      {...buttonRest}
    >
      {content}
    </button>
  )
}
