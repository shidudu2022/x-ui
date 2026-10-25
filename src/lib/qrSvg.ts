import { renderSVG } from 'uqr'

/** Encode text as a QR data-URI SVG (offline, no network). */
export function qrSvgDataUri(
  text: string,
  options?: { pixelSize?: number; border?: number },
) {
  const svg = renderSVG(text, {
    ecc: 'M',
    border: options?.border ?? 2,
    pixelSize: options?.pixelSize ?? 4,
    whiteColor: '#ffffff',
    blackColor: '#111111',
  })
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}
