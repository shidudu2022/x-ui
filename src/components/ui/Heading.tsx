import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type HeadingLevel = 'page' | 'section' | 'card' | 'sub'

type HeadingProps = HTMLAttributes<HTMLElement> & {
  level?: HeadingLevel
  as?: ElementType
  children?: ReactNode
}

const levelTag: Record<HeadingLevel, ElementType> = {
  page: 'h1',
  section: 'h2',
  card: 'h3',
  sub: 'h4',
}

const levelClass: Record<HeadingLevel, string> = {
  page: 'heading heading-page',
  section: 'heading heading-section',
  card: 'heading heading-card',
  sub: 'heading heading-sub',
}

export function Heading({
  level = 'card',
  as,
  className,
  children,
  ...rest
}: HeadingProps) {
  const Comp = (as ?? levelTag[level]) as ElementType
  return (
    <Comp className={cn(levelClass[level], className)} {...rest}>
      {children}
    </Comp>
  )
}
