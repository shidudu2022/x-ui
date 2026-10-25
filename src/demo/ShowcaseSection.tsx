import type { ReactNode } from 'react'
import { Heading, Text } from '@/components/ui'

export function ShowcaseSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="showcase-section">
      <Heading level="section">{title}</Heading>
      {description ? (
        <Text as="p" variant="muted" size="md">
          {description}
        </Text>
      ) : null}
      {children}
    </section>
  )
}
