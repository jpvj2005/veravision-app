/* Vera Vision — gráficas SVG ligeras, estilo Carbon */
import { useEffect, useRef, useState } from 'react'
import type { SerieMensual, SegmentoData, TipoData } from '@renderer/data/types'

/* ---- Barras agrupadas ------------------------------------------------------ */
interface GroupedBarChartProps {
  data: SerieMensual[]
  height?: number
}

export function GroupedBarChart({ data, height = 220 }: GroupedBarChartProps): React.JSX.Element {
  const pad = { l: 32, r: 8, t: 12, b: 28 }
  const [w, setW] = useState(560)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ro = new ResizeObserver((e) => setW(e[0].contentRect.width))
    if (ref.current) ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])

  const series = [
    { key: 'enviados' as const, color: '#0f62fe' },
    { key: 'respondidos' as const, color: '#78a9ff' }
  ]

  const max = Math.max(...data.flatMap((d) => series.map((s) => d[s.key]))) * 1.15
  const innerW = w - pad.l - pad.r
  const innerH = height - pad.t - pad.b
  const groupW = innerW / data.length
  const barW = Math.min(18, (groupW - 12) / series.length)
  const ticks = 4

  return (
    <div ref={ref} style={{ width: '100%' }}>
      <svg
        width={w}
        height={height}
        style={{ display: 'block', fontFamily: 'IBM Plex Sans, system-ui, sans-serif' }}
      >
        {Array.from({ length: ticks + 1 }).map((_, i) => {
          const y = pad.t + (innerH / ticks) * i
          const val = Math.round(max - (max / ticks) * i)
          return (
            <g key={i}>
              <line
                x1={pad.l}
                y1={y}
                x2={w - pad.r}
                y2={y}
                stroke="var(--cds-border-subtle-01)"
                strokeWidth="1"
              />
              <text
                x={pad.l - 6}
                y={y + 4}
                textAnchor="end"
                fontSize="11"
                fill="var(--cds-text-helper)"
              >
                {val}
              </text>
            </g>
          )
        })}
        {data.map((d, i) => {
          const gx = pad.l + groupW * i + (groupW - barW * series.length - 4) / 2
          return (
            <g key={i}>
              {series.map((s, j) => {
                const h = (d[s.key] / max) * innerH
                return (
                  <rect
                    key={s.key}
                    x={gx + j * (barW + 4)}
                    y={pad.t + innerH - h}
                    width={barW}
                    height={h}
                    fill={s.color}
                  />
                )
              })}
              <text
                x={pad.l + groupW * i + groupW / 2}
                y={height - 8}
                textAnchor="middle"
                fontSize="11"
                fill="var(--cds-text-secondary)"
              >
                {d.mes}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/* ---- Donut ---------------------------------------------------------------- */
interface DonutChartProps {
  data: SegmentoData[]
  size?: number
  thickness?: number
  centerLabel?: string
  centerValue?: number
}

export function DonutChart({
  data,
  size = 168,
  thickness = 26,
  centerLabel,
  centerValue
}: DonutChartProps): React.JSX.Element {
  const total = data.reduce((s, d) => s + d.valor, 0)
  const r = (size - thickness) / 2
  const c = size / 2
  const circ = 2 * Math.PI * r

  // Pre-compute cumulative fractions to avoid mutation during render
  const segments = data.map((d, i) => {
    const offset = data.slice(0, i).reduce((s, x) => s + x.valor / total, 0)
    const frac = d.valor / total
    return { ...d, frac, offset }
  })

  return (
    <svg
      width={size}
      height={size}
      style={{ display: 'block', fontFamily: 'IBM Plex Sans, system-ui, sans-serif' }}
    >
      <circle
        cx={c}
        cy={c}
        r={r}
        fill="none"
        stroke="var(--cds-border-subtle-01)"
        strokeWidth={thickness}
      />
      {segments.map((seg, i) => {
        const dash = seg.frac * circ
        return (
          <circle
            key={i}
            cx={c}
            cy={c}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={thickness}
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={-seg.offset * circ}
            transform={`rotate(-90 ${c} ${c})`}
          />
        )
      })}
      {centerValue != null && (
        <text
          x={c}
          y={c - 2}
          textAnchor="middle"
          fontSize="30"
          fontWeight="300"
          fill="var(--cds-text-primary)"
        >
          {centerValue}
        </text>
      )}
      {centerLabel && (
        <text x={c} y={c + 18} textAnchor="middle" fontSize="12" fill="var(--cds-text-secondary)">
          {centerLabel}
        </text>
      )}
    </svg>
  )
}

/* ---- Barras horizontales -------------------------------------------------- */
interface HBarChartProps {
  data: TipoData[]
  max?: number
}

export function HBarChart({ data, max: maxProp }: HBarChartProps): React.JSX.Element {
  const m = maxProp ?? Math.max(...data.map((d) => d.valor)) * 1.05
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {data.map((d, i) => (
        <div key={i}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 13,
              marginBottom: 6,
              color: 'var(--cds-text-secondary)'
            }}
          >
            <span>{d.label}</span>
            <span style={{ color: 'var(--cds-text-primary)', fontWeight: 600 }}>{d.valor}</span>
          </div>
          <span
            style={{
              display: 'block',
              width: '100%',
              height: 8,
              background: 'var(--cds-border-subtle-01)'
            }}
          >
            <span
              style={{
                display: 'block',
                height: '100%',
                width: (d.valor / m) * 100 + '%',
                background: d.color
              }}
            />
          </span>
        </div>
      ))}
    </div>
  )
}

/* ---- Sparkline ------------------------------------------------------------ */
interface SparklineProps {
  data: number[]
  w?: number
  h?: number
  color?: string
  fill?: boolean
}

export function Sparkline({
  data,
  w = 120,
  h = 40,
  color = '#0f62fe',
  fill = true
}: SparklineProps): React.JSX.Element {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const rng = max - min || 1
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - ((v - min) / rng) * (h - 6) - 3])
  const line = pts
    .map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1))
    .join(' ')
  const area = line + ` L ${w} ${h} L 0 ${h} Z`

  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      {fill && <path d={area} fill={color} opacity="0.12" />}
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}
