import { Children, Fragment, isValidElement, type ReactNode } from 'react'

export const EMPTY_CELL = '—'

const EMPTYABLE_COMPONENTS = new Set([
  'Tag',
  'TagGroup',
  'Muted',
  'Text',
  'Mono',
  'Fragment',
])

function classNameOf(node: ReactNode): string {
  if (!isValidElement(node)) return ''
  const cls = (node.props as { className?: unknown }).className
  return typeof cls === 'string' ? cls : ''
}

function componentName(type: unknown): string {
  if (typeof type === 'string') return type
  if (typeof type === 'function') {
    const fn = type as { displayName?: string; name?: string }
    return fn.displayName || fn.name || ''
  }
  if (type && typeof type === 'object' && 'displayName' in type) {
    return String((type as { displayName?: string }).displayName || '')
  }
  return ''
}

function isTextLikeElement(value: React.ReactElement): boolean {
  const cls = classNameOf(value)
  if (
    cls.includes('ui-tag') ||
    cls.includes('text') ||
    cls.includes('muted') ||
    cls.includes('mono') ||
    cls.includes('hint')
  ) {
    return true
  }
  const name = componentName(value.type)
  return EMPTYABLE_COMPONENTS.has(name) || value.type === Fragment
}

/** True for null / blank text / empty arrays / empty Tag·TagGroup wrappers */
export function isEmptyCellValue(value: ReactNode): boolean {
  if (value == null || value === false) return true
  if (typeof value === 'boolean') return true
  if (typeof value === 'string') return value.trim() === ''
  if (typeof value === 'number' || typeof value === 'bigint') return false
  if (Array.isArray(value)) {
    return value.length === 0 || value.every(isEmptyCellValue)
  }
  if (isValidElement(value)) {
    const children = (value.props as { children?: ReactNode }).children
    const count = Children.count(children)
    const textLike = isTextLikeElement(value)
    const type = value.type

    if (count === 0) {
      if (textLike) return true
      if (typeof type === 'string') return ['span', 'div', 'p'].includes(type)
      return false
    }

    if (textLike || typeof type === 'string') {
      return isEmptyCellValue(children)
    }
    return false
  }
  return false
}

export function emptyCell(value: ReactNode, placeholder: ReactNode = EMPTY_CELL): ReactNode {
  if (isEmptyCellValue(value)) {
    return (
      <span className="cell-empty" aria-hidden={placeholder === EMPTY_CELL ? true : undefined}>
        {placeholder}
      </span>
    )
  }
  return value
}
