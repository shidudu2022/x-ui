import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type TextVariant =
  | 'body'
  | 'muted'
  | 'faint'
  | 'strong'
  | 'mono'
  | 'label'
  | 'hint'
  | 'caption'

export type TextSize = 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl'

type TextProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType
  variant?: TextVariant
  size?: TextSize
  children?: ReactNode
}

const variantClass: Record<TextVariant, string> = {
  body: 'text',
  muted: 'text text-muted',
  faint: 'text text-faint',
  strong: 'text text-strong',
  mono: 'text text-mono mono',
  label: 'text text-label',
  hint: 'text text-hint hint',
  caption: 'text text-caption',
}

export function Text({
  as,
  variant = 'body',
  size,
  className,
  children,
  ...rest
}: TextProps) {
  const Comp = (as ?? (variant === 'hint' || variant === 'caption' ? 'p' : 'span')) as ElementType
  return (
    <Comp
      className={cn(
        variantClass[variant],
        size === 'xs' && 'text-xs',
        size === 'sm' && 'text-sm',
        size === 'md' && 'text-md',
        size === 'base' && 'text-base',
        size === 'lg' && 'text-lg',
        size === 'xl' && 'text-xl',
        className,
      )}
      {...rest}
    >
      {children}
    </Comp>
  )
}

export function Muted({
  as = 'span',
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLElement> & { as?: ElementType; children?: ReactNode }) {
  return (
    <Text as={as} variant="muted" className={className} {...rest}>
      {children}
    </Text>
  )
}

export function Mono({
  as = 'span',
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLElement> & { as?: ElementType; children?: ReactNode }) {
  return (
    <Text as={as} variant="mono" className={className} {...rest}>
      {children}
    </Text>
  )
}
