import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

export type AccordionItemData = {
  id: string
  title: ReactNode
  content: ReactNode
}

export function Accordion({
  items,
  defaultOpenId,
  className,
}: {
  items: AccordionItemData[]
  defaultOpenId?: string
  className?: string
}) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? items[0]?.id ?? null)

  return (
    <div className={cn('accordion', className)}>
      {items.map((item) => {
        const open = openId === item.id
        return (
          <div key={item.id} className={cn('accordion-item', open && 'open')}>
            <button
              type="button"
              className="accordion-trigger"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              <span>{item.title}</span>
              <ChevronDown size={16} className="accordion-chevron" />
            </button>
            {open ? <div className="accordion-panel">{item.content}</div> : null}
          </div>
        )
      })}
    </div>
  )
}
