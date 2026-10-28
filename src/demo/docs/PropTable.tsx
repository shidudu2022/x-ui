export type PropDef = {
  name: string
  type: string
  default?: string
  desc: string
}

export function PropTable({ props }: { props: PropDef[] }) {
  if (!props.length) return null
  return (
    <div className="prop-table-wrap">
      <table className="prop-table">
        <thead>
          <tr>
            <th>属性</th>
            <th>类型</th>
            <th>默认</th>
            <th>说明</th>
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
              <td>{p.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
