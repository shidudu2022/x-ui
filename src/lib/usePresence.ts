import { useEffect, useLayoutEffect, useState } from 'react'

/**
 * Keep content mounted through CSS enter/exit transitions.
 * Mounts with `visible=false` first so the closed style can paint, then flips
 * `visible` on the following frames (cancels both rAFs on cleanup).
 */
export function usePresence(open: boolean, exitMs = 220) {
  const [present, setPresent] = useState(open)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open) {
      setPresent(true)
      return
    }
    setVisible(false)
    const t = window.setTimeout(() => setPresent(false), exitMs)
    return () => window.clearTimeout(t)
  }, [open, exitMs])

  useLayoutEffect(() => {
    if (!present || !open) {
      setVisible(false)
      return
    }

    let alive = true
    let inner = 0
    const outer = requestAnimationFrame(() => {
      // Second frame: closed styles have been painted.
      inner = requestAnimationFrame(() => {
        if (alive) setVisible(true)
      })
    })

    return () => {
      alive = false
      cancelAnimationFrame(outer)
      cancelAnimationFrame(inner)
      // Strict Mode / aborted enter: don't leave visible stuck true
      setVisible(false)
    }
  }, [present, open])

  return { present, visible }
}
