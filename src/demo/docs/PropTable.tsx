import { useDemoMessages } from '../i18n/useDemoT'
import type { L10n } from '../i18n/types'
import { pickL10n } from '../i18n/types'
import { useLocale } from '@/i18n'

export type PropDef = {
  name: string
  type: string
  default?: string
  desc: string | L10n
}

export function PropTable({ props }: { props: PropDef[] }) {
  const m = useDemoMessages()
  const { locale } = useLocale()
  if (!props.length) return null
  return (
    <div className="prop-table-wrap">
      <table className="prop-table">
        <thead>
          <tr>
            <th>{m('prop.name')}</th>
            <th>{m('prop.type')}</th>
            <th>{m('prop.default')}</th>
            <th>{m('prop.desc')}</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr key={p.name}>
              <td className="prop-name">{p.name}</td>
              <td>
                <code>{p.type}</code>
              </td>
              <td className="prop-default">{p.default ?? '—'}</td>
              <td>{typeof p.desc === 'string' ? p.desc : pickL10n(locale, p.desc)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
