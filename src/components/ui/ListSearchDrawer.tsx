import type { ReactNode } from 'react'
import { Button } from './Button'
import { Drawer } from './Drawer'
import { useT } from '@/i18n'

/**
 * Filter / search drawer for list pages — form fields as children,
 * clear + apply in the footer.
 */
export function ListSearchDrawer({
  open,
  onClose,
  title,
  children,
  onClear,
  onSubmit,
  clearLabel,
  submitLabel,
  size = 'md',
}: {
  open: boolean
  onClose: () => void
  title?: ReactNode
  children: ReactNode
  onClear: () => void
  onSubmit: () => void
  clearLabel?: ReactNode
  submitLabel?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}) {
  const t = useT()

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={title ?? t('listSearch.title')}
      size={size}
      footer={
        <div className="actions">
          <Button
            variant="ghost"
            onClick={() => {
              onClear()
              onClose()
            }}
          >
            {clearLabel ?? t('listSearch.clear')}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onSubmit()
              onClose()
            }}
          >
            {submitLabel ?? t('listSearch.apply')}
          </Button>
        </div>
      }
    >
      <div className="stack search-drawer">{children}</div>
    </Drawer>
  )
}
