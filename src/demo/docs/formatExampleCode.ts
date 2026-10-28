/**
 * Format short TSX/JS doc snippets for display (2-space indent).
 * Prefer keeping intentional newlines; expand cramped single-line JSX.
 */
export function formatExampleCode(input: string): string {
  const src = input.replace(/\r\n/g, '\n').trim()
  if (!src) return src

  // Multi-line already: normalize + break long opening tags
  if (src.includes('\n')) {
    return src
      .split('\n')
      .map((l) => l.trimEnd())
      .join('\n')
      .split('\n')
      .flatMap(breakLongJsxLine)
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  }

  return expandSingleLine(src)
}

function breakLongJsxLine(line: string): string[] {
  if (line.length < 78) return [line]
  const m = line.match(/^(\s*)(<[\w.]+)(\s+)(.+?)(\s*\/?>)$/)
  if (!m) return [line]
  const [, ind, tag, , props, end] = m
  const parts = splitProps(props!)
  if (parts.length < 2) return [line]
  return [`${ind}${tag}`, ...parts.map((p) => `${ind}  ${p}`), `${ind}${end!.trim()}`]
}

function expandSingleLine(src: string): string {
  // Split sibling root statements on `><` / `;` boundaries carefully
  const chunks = splitTopLevelStatements(src)
  return chunks.map((c) => formatOneExpression(c.trim())).filter(Boolean).join('\n\n')
}

function splitTopLevelStatements(src: string): string[] {
  const out: string[] = []
  let cur = ''
  let depthAngle = 0
  let depthBrace = 0
  let depthParen = 0
  let quote: string | null = null
  for (let i = 0; i < src.length; i++) {
    const c = src[i]!
    if (quote) {
      cur += c
      if (c === '\\') {
        cur += src[++i] ?? ''
        continue
      }
      if (c === quote) quote = null
      continue
    }
    if (c === "'" || c === '"' || c === '`') {
      quote = c
      cur += c
      continue
    }
    if (c === '<') depthAngle++
    if (c === '>' && depthAngle > 0) depthAngle--
    if (c === '{') depthBrace++
    if (c === '}') depthBrace = Math.max(0, depthBrace - 1)
    if (c === '(') depthParen++
    if (c === ')') depthParen = Math.max(0, depthParen - 1)

    // Sibling JSX: `/><Foo` or `></Foo` or `><Foo`
    if (
      depthBrace === 0 &&
      depthParen === 0 &&
      (src.startsWith('/><', i) || src.startsWith('><', i))
    ) {
      if (src.startsWith('/>', i)) {
        cur += '/>'
        out.push(cur)
        cur = ''
        i++ // skip /
        // next char is < — loop will add it
        continue
      }
      cur += '>'
      out.push(cur)
      cur = ''
      continue
    }
    if (c === ';' && depthBrace === 0 && depthParen === 0 && depthAngle === 0) {
      cur += c
      out.push(cur)
      cur = ''
      continue
    }
    cur += c
  }
  if (cur.trim()) out.push(cur)
  return out
}

function formatOneExpression(expr: string): string {
  if (!expr.includes('<')) {
    return breakLongJsxLine(expr).join('\n')
  }

  const tokens = tokenize(expr)
  const lines: string[] = []
  let indent = 0
  let buf = ''

  const flush = () => {
    const t = buf.trimEnd()
    if (t) lines.push(`${'  '.repeat(indent)}${t.trimStart()}`)
    buf = ''
  }

  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i]!
    if (tok === ' ') {
      if (buf && !buf.endsWith(' ') && !buf.endsWith('=') && !buf.endsWith('<') && !buf.endsWith('</') && !buf.endsWith('{') && !buf.endsWith('(') && !buf.endsWith('[')) {
        buf += ' '
      }
      continue
    }
    if (tok === '</') {
      flush()
      indent = Math.max(0, indent - 1)
      buf += tok
      continue
    }
    if (tok === '/>') {
      buf += tok
      flush()
      continue
    }
    if (tok === '<') {
      if (buf.trim()) flush()
      buf += tok
      continue
    }
    if (tok === '>') {
      buf += tok
      // Peek: short text child then close → keep inline <Tag>text</Tag>
      const rest = tokens.slice(i + 1).filter((x) => x !== ' ')
      if (
        rest[0] &&
        rest[0] !== '<' &&
        rest[0] !== '</' &&
        rest[1] === '</' &&
        typeof rest[0] === 'string' &&
        rest[0].length < 48 &&
        !rest[0].includes('\n')
      ) {
        buf += rest[0]
        buf += '</'
        // skip until after tag name and '>'
        i++
        while (i < tokens.length && tokens[i] === ' ') i++
        // rest[0] consumed; next should be </
        while (i < tokens.length && tokens[i] !== '</') i++
        i++ // skip </
        while (i < tokens.length && tokens[i] !== '>') {
          buf += tokens[i]
          i++
        }
        if (tokens[i] === '>') buf += '>'
        flush()
        continue
      }
      flush()
      const last = lines[lines.length - 1] ?? ''
      if (/^\s*<[\w.]/.test(last) && !last.includes('</') && !last.trimEnd().endsWith('/>')) {
        indent++
      }
      continue
    }
    buf += tok
  }
  flush()

  return lines.flatMap(breakLongJsxLine).join('\n')
}

function tokenize(src: string): string[] {
  const tokens: string[] = []
  let i = 0
  while (i < src.length) {
    const c = src[i]!
    if (c === "'" || c === '"' || c === '`') {
      const q = c
      let j = i + 1
      while (j < src.length) {
        if (src[j] === '\\') {
          j += 2
          continue
        }
        if (src[j] === q) {
          j++
          break
        }
        j++
      }
      tokens.push(src.slice(i, j))
      i = j
      continue
    }
    if (/\s/.test(c)) {
      let j = i + 1
      while (j < src.length && /\s/.test(src[j]!)) j++
      tokens.push(' ')
      i = j
      continue
    }
    if (src.startsWith('</', i) || src.startsWith('/>', i) || src.startsWith('=>', i)) {
      tokens.push(src.slice(i, i + 2))
      i += 2
      continue
    }
    if ('<>{}()[],;='.includes(c)) {
      tokens.push(c)
      i++
      continue
    }
    let j = i + 1
    while (
      j < src.length &&
      !/\s/.test(src[j]!) &&
      !'<>{}()[],;='.includes(src[j]!) &&
      src[j] !== "'" &&
      src[j] !== '"' &&
      src[j] !== '`'
    ) {
      j++
    }
    tokens.push(src.slice(i, j))
    i = j
  }
  return tokens
}

function splitProps(props: string): string[] {
  const parts: string[] = []
  let cur = ''
  let depth = 0
  let quote: string | null = null
  for (let i = 0; i < props.length; i++) {
    const c = props[i]!
    if (quote) {
      cur += c
      if (c === '\\') {
        cur += props[++i] ?? ''
        continue
      }
      if (c === quote) quote = null
      continue
    }
    if (c === "'" || c === '"' || c === '`') {
      quote = c
      cur += c
      continue
    }
    if ('{[('.includes(c)) {
      depth++
      cur += c
      continue
    }
    if ('}])'.includes(c)) {
      depth = Math.max(0, depth - 1)
      cur += c
      continue
    }
    if (c === ' ' && depth === 0) {
      if (cur.trim()) parts.push(cur.trim())
      cur = ''
      continue
    }
    cur += c
  }
  if (cur.trim()) parts.push(cur.trim())
  return parts
}
