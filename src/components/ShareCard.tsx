import { useRef, useCallback } from 'react'
import type { MatchResult } from '../utils/scoring'
import type { Profile } from '../types'
import { MODELS } from '../utils/scoring'

interface Props {
  result: MatchResult
  profile: Profile
  onClose: () => void
}

const MODEL_COLORS = ['#f0883e', '#f47067', '#8b949e', '#d2a8ff', '#3fb950', '#58a6ff']

function tierToVal(t: string) { return t === 'H' ? 1 : t === 'M' ? 0.55 : 0.15 }

/**
 * Draws a shareable result card to a canvas and lets the user save it.
 */
export default function ShareCard({ result, profile, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const r = result.personality

  const draw = useCallback((canvas: HTMLCanvasElement) => {
    const dpr = window.devicePixelRatio || 2
    const W = 375
    const H = 580
    canvas.width = W * dpr
    canvas.height = H * dpr
    canvas.style.width = W + 'px'
    canvas.style.height = H + 'px'
    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)

    // ── Background ──
    ctx.fillStyle = '#0d1117'
    ctx.fillRect(0, 0, W, H)

    // Subtle border
    ctx.strokeStyle = '#1e2430'
    ctx.lineWidth = 1
    ctx.strokeRect(0.5, 0.5, W - 1, H - 1)

    // ── Header ──
    ctx.fillStyle = '#f0883e'
    ctx.font = 'bold 11px system-ui, sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText('NMTI', 24, 32)
    ctx.fillStyle = '#555'
    ctx.font = '11px system-ui, sans-serif'
    ctx.fillText('牛马型人格测试', 56, 32)

    // ── Code (big) ──
    ctx.fillStyle = '#f0883e'
    ctx.font = 'bold 56px "SF Mono", "Menlo", monospace'
    ctx.textAlign = 'center'
    ctx.fillText(r.code, W / 2, 90)

    // ── Name ──
    ctx.fillStyle = '#e6e1df'
    ctx.font = 'bold 22px system-ui, sans-serif'
    ctx.fillText(r.name, W / 2, 122)

    // ── Match % + Rarity ──
    ctx.fillStyle = '#8b8685'
    ctx.font = '12px system-ui, sans-serif'
    const rarityText = r.rarity != null
      ? `匹配度 ${result.matchPct}%  ·  ${r.rarity < 1 ? '隐藏款' : r.rarity < 3 ? '稀有款' : r.rarity < 5 ? '经典款' : '路人款'} · ${r.rarity < 0.1 ? '<0.1' : r.rarity}%`
      : `匹配度 ${result.matchPct}%`
    ctx.fillText(rarityText, W / 2, 148)

    // ── Tagline ──
    ctx.fillStyle = '#8b8685'
    ctx.font = 'italic 13px system-ui, sans-serif'
    const tagline = `"${r.tagline}"`
    // Word wrap tagline
    const maxW = W - 48
    const lines = wrapText(ctx, tagline, maxW)
    let ty = 178
    for (const line of lines.slice(0, 3)) {
      ctx.fillText(line, W / 2, ty)
      ty += 20
    }

    // ── Radar chart ──
    const cx = W / 2, cy = ty + 80, radius = 65
    drawRadar(ctx, profile, cx, cy, radius)

    // ── Model labels around radar ──
    ctx.font = '10px system-ui, sans-serif'
    ctx.textAlign = 'center'
    const labels = MODELS.map(m => m.name)
    for (let i = 0; i < 6; i++) {
      const angle = -Math.PI / 2 + (Math.PI * 2 * i) / 6
      const lx = cx + Math.cos(angle) * (radius + 22)
      const ly = cy + Math.sin(angle) * (radius + 22) + 4
      ctx.fillStyle = MODEL_COLORS[i]
      ctx.fillText(labels[i], lx, ly)
    }

    // ── Workplace relationships ──
    const relY = cy + radius + 52
    if (r.nemesis || r.soulmate) {
      ctx.textAlign = 'left'
      ctx.font = '12px system-ui, sans-serif'

      if (r.soulmate && r.soulmateReason) {
        ctx.fillStyle = '#3fb950'
        ctx.fillText(`💚 灵魂牛友: ${r.soulmate}`, 24, relY)
        ctx.fillStyle = '#555'
        ctx.fillText(r.soulmateReason, 24, relY + 18)
      }

      if (r.nemesis && r.nemesisReason) {
        ctx.fillStyle = '#f47067'
        ctx.fillText(`🔥 职场天敌: ${r.nemesis}`, 24, relY + 44)
        ctx.fillStyle = '#555'
        ctx.fillText(r.nemesisReason, 24, relY + 62)
      }
    }

    // ── Footer ──
    ctx.fillStyle = '#333'
    ctx.fillRect(0, H - 44, W, 44)
    ctx.fillStyle = '#8b8685'
    ctx.font = '12px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('来测测你是哪种牛马 → nmti.chrisliu.top', W / 2, H - 18)
  }, [r, result, profile])

  function drawRadar(ctx: CanvasRenderingContext2D, profile: Profile, cx: number, cy: number, radius: number) {
    const n = 6
    // Compute model-level scores (avg of 3 dims per model, 0-1)
    const values: number[] = []
    for (let m = 0; m < 6; m++) {
      let sum = 0
      for (let d = 0; d < 3; d++) sum += tierToVal(profile[m * 3 + d])
      values.push(sum / 3)
    }

    // Grid rings
    for (const ring of [0.33, 0.66, 1]) {
      ctx.beginPath()
      for (let i = 0; i <= n; i++) {
        const angle = -Math.PI / 2 + (Math.PI * 2 * i) / n
        const x = cx + Math.cos(angle) * radius * ring
        const y = cy + Math.sin(angle) * radius * ring
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.strokeStyle = '#1e2430'
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Axis lines
    for (let i = 0; i < n; i++) {
      const angle = -Math.PI / 2 + (Math.PI * 2 * i) / n
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius)
      ctx.strokeStyle = '#1e2430'
      ctx.stroke()
    }

    // Data polygon
    ctx.beginPath()
    for (let i = 0; i <= n; i++) {
      const idx = i % n
      const angle = -Math.PI / 2 + (Math.PI * 2 * idx) / n
      const v = values[idx] * radius
      const x = cx + Math.cos(angle) * v
      const y = cy + Math.sin(angle) * v
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.fillStyle = 'rgba(240, 136, 62, 0.15)'
    ctx.fill()
    ctx.strokeStyle = '#f0883e'
    ctx.lineWidth = 2
    ctx.stroke()

    // Data dots
    for (let i = 0; i < n; i++) {
      const angle = -Math.PI / 2 + (Math.PI * 2 * i) / n
      const v = values[i] * radius
      ctx.beginPath()
      ctx.arc(cx + Math.cos(angle) * v, cy + Math.sin(angle) * v, 3, 0, Math.PI * 2)
      ctx.fillStyle = MODEL_COLORS[i]
      ctx.fill()
    }
  }

  function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
    const result: string[] = []
    let line = ''
    for (const ch of text) {
      const test = line + ch
      if (ctx.measureText(test).width > maxWidth && line) {
        result.push(line)
        line = ch
      } else {
        line = test
      }
    }
    if (line) result.push(line)
    return result
  }

  function handleSave() {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.toBlob(blob => {
      if (!blob) return
      // Try native share (mobile)
      if (navigator.share && navigator.canShare?.({ files: [new File([blob], 'nmti.png', { type: 'image/png' })] })) {
        navigator.share({
          files: [new File([blob], 'nmti.png', { type: 'image/png' })],
          title: 'NMTI 牛马型人格测试',
        }).catch(() => {})
      } else {
        // Fallback: download
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `nmti-${r.code}.png`
        a.click()
        URL.revokeObjectURL(url)
      }
    }, 'image/png')
  }

  return (
    <div className="share-overlay" onClick={onClose}>
      <div className="share-card-wrap" onClick={e => e.stopPropagation()}>
        <canvas
          ref={el => { if (el) { canvasRef.current = el; draw(el) } }}
          className="share-canvas"
        />
        <div className="share-actions">
          <button className="btn-save-card" onClick={handleSave}>
            保存图片 / 分享
          </button>
          <button className="btn-close-card" onClick={onClose}>
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}
