/* Vera Vision — piezas compartidas entre pantallas */
import { useState } from 'react'
import { ArrowUp, ArrowDown, ArrowRight, View, Time } from '@carbon/icons-react'
import { Sparkline } from './Charts'
import {
  VV_CLIENTES,
  VV_SEG,
  VV_MOTIVO,
  VV_HISTORIAL,
  VV_HIST_ESTADO,
  VV_TITULO,
  vvFmtMonto
} from '@renderer/data'
import type { Cliente, Motivo } from '@renderer/data/types'

/* ---- PageHeader ---------------------------------------------------------- */
interface PageHeaderProps {
  title: string
  helper?: string
  children?: React.ReactNode
}

export function PageHeader({ title, helper, children }: PageHeaderProps): React.JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 24,
        marginBottom: 28,
        flexWrap: 'wrap'
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: 28,
            fontWeight: 400,
            lineHeight: 1.25,
            color: 'var(--cds-text-primary)',
            letterSpacing: 0
          }}
        >
          {title}
        </h1>
        {helper && (
          <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--cds-text-secondary)' }}>
            {helper}
          </p>
        )}
      </div>
      {children && <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>{children}</div>}
    </div>
  )
}

/* ---- MetricTile ---------------------------------------------------------- */
interface MetricTileProps {
  label: string
  value: number | string
  unit?: string
  delta?: string
  deltaDir?: 'up' | 'down'
  foot?: string
  spark?: number[]
  sparkColor?: string
  accent?: string
}

export function MetricTile({
  label,
  value,
  unit,
  delta,
  deltaDir,
  foot,
  spark,
  sparkColor = '#0f62fe',
  accent
}: MetricTileProps): React.JSX.Element {
  return (
    <div
      style={{
        background: 'var(--cds-layer-01)',
        border: '1px solid var(--cds-border-subtle-01)',
        padding: '16px 16px 14px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 132,
        boxSizing: 'border-box'
      }}
    >
      <div style={{ fontSize: 13, color: 'var(--cds-text-secondary)', marginBottom: 'auto' }}>
        {label}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginTop: 12
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span
            style={{
              fontSize: 40,
              fontWeight: 300,
              lineHeight: 1,
              color: accent ?? 'var(--cds-text-primary)'
            }}
          >
            {value}
          </span>
          {unit && (
            <span style={{ fontSize: 18, fontWeight: 300, color: 'var(--cds-text-secondary)' }}>
              {unit}
            </span>
          )}
        </div>
        {spark && <Sparkline data={spark} color={sparkColor} w={88} h={36} />}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginTop: 10,
          fontSize: 12
        }}
      >
        {delta != null && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
              color: deltaDir === 'down' ? 'var(--cds-support-error)' : 'var(--cds-support-success)'
            }}
          >
            {deltaDir === 'down' ? <ArrowDown size={14} /> : <ArrowUp size={14} />}
            {delta}
          </span>
        )}
        {foot && <span style={{ color: 'var(--cds-text-helper)' }}>{foot}</span>}
      </div>
    </div>
  )
}

/* ---- Card ---------------------------------------------------------------- */
interface CardHeadProps {
  title: string
  action?: string
  onAction?: () => void
}

export function CardHead({ title, action, onAction }: CardHeadProps): React.JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 16px',
        borderBottom: '1px solid var(--cds-border-subtle-01)'
      }}
    >
      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--cds-text-primary)' }}>
        {title}
      </h3>
      {action && (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onAction?.()
          }}
          style={{
            fontSize: 14,
            color: 'var(--cds-link-primary)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          {action}
          <ArrowRight size={14} />
        </a>
      )}
    </div>
  )
}

export function Card({
  children,
  style = {}
}: {
  children: React.ReactNode
  style?: React.CSSProperties
}): React.JSX.Element {
  return (
    <div
      style={{
        background: 'var(--cds-layer-01)',
        border: '1px solid var(--cds-border-subtle-01)',
        ...style
      }}
    >
      {children}
    </div>
  )
}

export function LegendDot({
  color,
  label,
  value
}: {
  color: string
  label: string
  value?: number
}): React.JSX.Element {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
      <span style={{ width: 10, height: 10, background: color, flexShrink: 0 }} />
      <span style={{ color: 'var(--cds-text-secondary)' }}>{label}</span>
      {value != null && (
        <span style={{ marginLeft: 'auto', color: 'var(--cds-text-primary)', fontWeight: 600 }}>
          {value}
        </span>
      )}
    </div>
  )
}

/* ---- Status dot ---------------------------------------------------------- */
type StatusKind = 'active' | 'failed' | 'pending' | 'inactive' | 'info'

const STATUS_COLORS: Record<StatusKind, string> = {
  active: 'var(--cds-support-success)',
  failed: 'var(--cds-support-error)',
  pending: 'var(--cds-support-warning)',
  inactive: 'var(--cds-text-helper)',
  info: 'var(--cds-support-info)'
}

export function Status({
  kind,
  children,
  size = 14
}: {
  kind: StatusKind
  children: React.ReactNode
  size?: number
}): React.JSX.Element {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontSize: size,
        color: 'var(--cds-text-primary)'
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: STATUS_COLORS[kind] ?? STATUS_COLORS.inactive,
          flexShrink: 0
        }}
      />
      {children}
    </span>
  )
}

/* ---- Avatar -------------------------------------------------------------- */
export function Avatar({
  ini,
  size = 32,
  bg = '#0f62fe',
  color = '#fff'
}: {
  ini: string
  size?: number
  bg?: string
  color?: string
}): React.JSX.Element {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: bg,
        color,
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.36,
        fontWeight: 600,
        letterSpacing: '.02em'
      }}
    >
      {ini}
    </span>
  )
}

/* ---- Tag ----------------------------------------------------------------- */
const TAG_COLORS: Record<string, [string, string]> = {
  blue: ['#d0e2ff', '#0043ce'],
  green: ['#a7f0ba', '#0e6027'],
  red: ['#ffd7d9', '#a2191f'],
  purple: ['#e8daff', '#6929c4'],
  teal: ['#9ef0f0', '#005d5d'],
  gray: ['#e0e0e0', '#393939'],
  cyan: ['#bae6ff', '#00539a'],
  magenta: ['#ffd6e8', '#9f1853']
}

export function Tag({
  color = 'gray',
  children,
  icon
}: {
  color?: string
  children: React.ReactNode
  icon?: React.ReactNode
}): React.JSX.Element {
  const [bg, fg] = TAG_COLORS[color] ?? TAG_COLORS.gray
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 24,
        padding: '0 8px',
        borderRadius: 13,
        background: bg,
        color: fg,
        fontSize: 12,
        lineHeight: 1,
        letterSpacing: '.16px',
        whiteSpace: 'nowrap'
      }}
    >
      {icon}
      {children}
    </span>
  )
}

/* ---- Btn (small internal button) ---------------------------------------- */
interface BtnProps {
  kind?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
  style?: React.CSSProperties
  children: React.ReactNode
  icon?: React.ReactNode
  iconLeft?: React.ReactNode
  type?: 'button' | 'submit'
}

const BTN_STYLES: Record<string, React.CSSProperties> = {
  primary: { background: '#0f62fe', color: '#fff' },
  secondary: { background: '#393939', color: '#fff' },
  tertiary: { background: 'transparent', color: '#0f62fe', border: '1px solid #0f62fe' },
  ghost: { background: 'transparent', color: '#0f62fe' },
  danger: { background: '#da1e28', color: '#fff' }
}

export function Btn({
  kind = 'primary',
  size = 'lg',
  onClick,
  disabled,
  style = {},
  children,
  icon,
  iconLeft,
  type = 'button'
}: BtnProps): React.JSX.Element {
  const [hover, setHover] = useState(false)
  const minH = size === 'sm' ? 32 : size === 'md' ? 40 : 48

  const hoverBg: Record<string, string> = {
    primary: '#0050e6',
    secondary: '#474747',
    tertiary: '#0f62fe',
    ghost: 'rgba(141,141,141,0.12)',
    danger: '#b81921'
  }

  const base: React.CSSProperties = {
    fontFamily: 'IBM Plex Sans, system-ui, sans-serif',
    fontSize: 14,
    letterSpacing: '.16px',
    lineHeight: 1.28572,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    minHeight: minH,
    display: 'inline-flex',
    alignItems: 'center',
    gap: iconLeft ? 8 : 0,
    position: 'relative',
    padding: icon ? '0 60px 0 16px' : '0 16px',
    whiteSpace: 'nowrap',
    borderRadius: 0,
    transition: 'background 70ms',
    ...BTN_STYLES[kind],
    ...(hover && !disabled ? { background: hoverBg[kind] } : {}),
    ...(kind === 'tertiary' ? { border: '1px solid #0f62fe' } : {}),
    ...(hover && kind === 'tertiary' && !disabled ? { color: '#fff' } : {}),
    ...(disabled
      ? {
          background: kind === 'ghost' || kind === 'tertiary' ? 'transparent' : '#c6c6c6',
          color: '#8d8d8d',
          borderColor: 'transparent'
        }
      : {}),
    ...style
  }

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={base}
    >
      {iconLeft}
      {children}
      {icon && (
        <span
          style={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex'
          }}
        >
          {icon}
        </span>
      )}
    </button>
  )
}

/* ---- Tabs ---------------------------------------------------------------- */
interface TabItem {
  value: string
  label: string
  count?: number
}

interface TabsProps {
  tabs: TabItem[]
  active: string
  onChange: (v: string) => void
  style?: React.CSSProperties
}

export function Tabs({ tabs, active, onChange, style = {} }: TabsProps): React.JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        borderBottom: '1px solid var(--cds-border-subtle-01)',
        overflowX: 'auto',
        ...style
      }}
    >
      {tabs.map((t) => {
        const on = t.value === active
        return (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange(t.value)}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: on
                ? '2px solid var(--cds-border-interactive)'
                : '2px solid transparent',
              padding: '0 16px',
              height: 40,
              fontFamily: 'IBM Plex Sans, system-ui, sans-serif',
              fontSize: 14,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              color: on ? 'var(--cds-text-primary)' : 'var(--cds-text-secondary)',
              fontWeight: on ? 600 : 400,
              marginBottom: -1
            }}
          >
            {t.label}
            {t.count != null && (
              <span style={{ marginLeft: 6, color: 'var(--cds-text-helper)', fontWeight: 400 }}>
                {t.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

/* ---- Checkbox ------------------------------------------------------------ */
export function Checkbox({
  checked,
  onChange,
  indeterminate
}: {
  checked: boolean
  onChange: (v: boolean) => void
  indeterminate?: boolean
}): React.JSX.Element {
  return (
    <span
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      tabIndex={0}
      onClick={() => onChange(!checked)}
      onKeyDown={(e) => e.key === 'Enter' && onChange(!checked)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        cursor: 'pointer'
      }}
    >
      <span
        style={{
          width: 16,
          height: 16,
          border: '1px solid var(--cds-icon-primary)',
          background: checked || indeterminate ? 'var(--cds-icon-primary)' : 'transparent',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxSizing: 'border-box'
        }}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 32 32" fill="var(--cds-layer-01)">
            <path d="M14 21.414l-5.707-5.707 1.414-1.414L14 18.586l8.293-8.293 1.414 1.414z" />
          </svg>
        )}
        {indeterminate && !checked && (
          <span style={{ width: 8, height: 1, background: 'var(--cds-layer-01)' }} />
        )}
      </span>
    </span>
  )
}

/* ---- OverflowMenu -------------------------------------------------------- */
interface OverflowItem {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  danger?: boolean
}

export function OverflowMenu({ items }: { items: OverflowItem[] }): React.JSX.Element {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        type="button"
        aria-label="Acciones"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: 32,
          height: 32,
          border: 'none',
          background: open ? 'var(--cds-background-hover)' : 'transparent',
          color: 'var(--cds-icon-primary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 0
        }}
      >
        <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
          <circle cx="16" cy="8" r="2" />
          <circle cx="16" cy="16" r="2" />
          <circle cx="16" cy="24" r="2" />
        </svg>
      </button>
      {open && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 39
            }}
            onClick={() => setOpen(false)}
          />
          <div
            style={{
              position: 'absolute',
              top: 32,
              right: 0,
              minWidth: 180,
              background: 'var(--cds-layer-02)',
              boxShadow: '0 2px 6px var(--cds-shadow)',
              zIndex: 40
            }}
          >
            {items.map((it, i) => (
              <OverflowBtn key={i} item={it} onClose={() => setOpen(false)} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function OverflowBtn({
  item,
  onClose
}: {
  item: OverflowItem
  onClose: () => void
}): React.JSX.Element {
  const [hover, setHover] = useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        onClose()
        item.onClick?.()
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        height: 40,
        padding: '0 16px',
        border: 'none',
        background: hover ? 'var(--cds-layer-hover-02)' : 'transparent',
        cursor: 'pointer',
        fontFamily: 'IBM Plex Sans, system-ui, sans-serif',
        fontSize: 14,
        textAlign: 'left',
        color: item.danger ? 'var(--cds-text-error)' : 'var(--cds-text-primary)',
        transition: 'background 70ms'
      }}
    >
      {item.icon}
      {item.label}
    </button>
  )
}

/* ---- RadioTile ----------------------------------------------------------- */
export function RadioTile({
  selected,
  onClick,
  children,
  style = {}
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
  style?: React.CSSProperties
}): React.JSX.Element {
  return (
    <div
      onClick={onClick}
      style={{
        border: selected
          ? '1px solid var(--cds-border-interactive)'
          : '1px solid var(--cds-border-subtle-01)',
        outline: selected ? '1px solid var(--cds-border-interactive)' : 'none',
        outlineOffset: -2,
        padding: 16,
        position: 'relative',
        cursor: 'pointer',
        boxSizing: 'border-box',
        background: 'var(--cds-layer-01)',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        ...style
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          flexShrink: 0,
          boxSizing: 'border-box',
          border: selected
            ? '5px solid var(--cds-icon-interactive)'
            : '1px solid var(--cds-icon-secondary)'
        }}
      />
      {children}
    </div>
  )
}

/* ---- TextInput ----------------------------------------------------------- */
export function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text'
}: {
  label?: string
  value: string
  onChange?: (v: string) => void
  placeholder?: string
  type?: string
}): React.JSX.Element {
  const [focus, setFocus] = useState(false)
  return (
    <label style={{ display: 'block' }}>
      {label && (
        <span
          style={{
            fontSize: 12,
            letterSpacing: '.32px',
            color: 'var(--cds-text-secondary)',
            display: 'block',
            marginBottom: 6
          }}
        >
          {label}
        </span>
      )}
      <input
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          height: 40,
          width: '100%',
          boxSizing: 'border-box',
          background: 'var(--cds-field-01)',
          border: 'none',
          borderBottom: focus ? '1px solid transparent' : '1px solid var(--cds-border-strong-01)',
          outline: focus ? '2px solid var(--cds-focus)' : 'none',
          outlineOffset: -2,
          padding: '0 16px',
          fontFamily: 'IBM Plex Sans, system-ui, sans-serif',
          fontSize: 14,
          color: 'var(--cds-text-primary)',
          borderRadius: 0
        }}
      />
    </label>
  )
}

/* ---- Select -------------------------------------------------------------- */
export function CarbonSelect({
  label,
  value,
  options,
  onChange
}: {
  label?: string
  value: string
  options: string[]
  onChange?: (v: string) => void
}): React.JSX.Element {
  return (
    <label style={{ display: 'block' }}>
      {label && (
        <span
          style={{
            fontSize: 12,
            letterSpacing: '.32px',
            color: 'var(--cds-text-secondary)',
            display: 'block',
            marginBottom: 6
          }}
        >
          {label}
        </span>
      )}
      <div style={{ position: 'relative' }}>
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          style={{
            height: 40,
            width: '100%',
            boxSizing: 'border-box',
            background: 'var(--cds-field-01)',
            border: 'none',
            borderBottom: '1px solid var(--cds-border-strong-01)',
            padding: '0 40px 0 16px',
            fontFamily: 'IBM Plex Sans, system-ui, sans-serif',
            fontSize: 14,
            color: 'var(--cds-text-primary)',
            appearance: 'none',
            cursor: 'pointer',
            borderRadius: 0
          }}
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span
          style={{
            position: 'absolute',
            right: 14,
            top: 12,
            color: 'var(--cds-icon-primary)',
            pointerEvents: 'none',
            display: 'flex'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 22L6 12l1.4-1.4 8.6 8.6 8.6-8.6L26 12z" />
          </svg>
        </span>
      </div>
    </label>
  )
}

/* ---- Modal --------------------------------------------------------------- */
interface ModalProps {
  open: boolean
  title: string
  label?: string
  children: React.ReactNode
  primaryText?: string
  secondaryText?: string
  danger?: boolean
  onClose: () => void
  onPrimary?: () => void
  primaryDisabled?: boolean
  width?: number
}

export function Modal({
  open,
  title,
  label,
  children,
  primaryText = 'Guardar',
  secondaryText = 'Cancelar',
  danger,
  onClose,
  onPrimary,
  primaryDisabled,
  width = 640
}: ModalProps): React.JSX.Element | null {
  if (!open) return null
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--cds-overlay)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: `min(${width}px, 92vw)`,
          maxHeight: '90vh',
          background: 'var(--cds-layer-01)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 8px 24px var(--cds-shadow)'
        }}
      >
        <div
          style={{
            padding: '16px 16px 12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderBottom: '1px solid var(--cds-border-subtle-01)'
          }}
        >
          <div>
            {label && (
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: '.32px',
                  color: 'var(--cds-text-secondary)',
                  marginBottom: 4
                }}
              >
                {label}
              </div>
            )}
            <h2
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 400,
                lineHeight: 1.4,
                color: 'var(--cds-text-primary)'
              }}
            >
              {title}
            </h2>
          </div>
          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            style={{
              width: 40,
              height: 40,
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--cds-icon-primary)'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
              <path d="M17.414 16l6.293-6.293-1.414-1.414L16 14.586 9.707 8.293 8.293 9.707 14.586 16l-6.293 6.293 1.414 1.414L16 17.414l6.293 6.293 1.414-1.414z" />
            </svg>
          </button>
        </div>
        <div
          style={{
            padding: 16,
            overflow: 'auto',
            flex: 1,
            fontSize: 14,
            color: 'var(--cds-text-secondary)'
          }}
        >
          {children}
        </div>
        <div style={{ display: 'flex' }}>
          <Btn
            kind="secondary"
            size="lg"
            onClick={onClose}
            style={{
              flex: 1,
              minHeight: 64,
              alignItems: 'flex-start',
              paddingTop: 15
            }}
          >
            {secondaryText}
          </Btn>
          <Btn
            kind={danger ? 'danger' : 'primary'}
            size="lg"
            onClick={onPrimary}
            disabled={primaryDisabled}
            style={{
              flex: 1,
              minHeight: 64,
              alignItems: 'flex-start',
              paddingTop: 15
            }}
          >
            {primaryText}
          </Btn>
        </div>
      </div>
    </div>
  )
}

/* ---- SidePanel ----------------------------------------------------------- */
interface SidePanelProps {
  open: boolean
  title: string
  label?: string
  children: React.ReactNode
  onClose: () => void
  footer?: React.ReactNode
  width?: number
}

export function SidePanel({
  open,
  title,
  label,
  children,
  onClose,
  footer,
  width = 480
}: SidePanelProps): React.JSX.Element | null {
  if (!open) return null
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--cds-overlay)',
        zIndex: 45,
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: `min(${width}px, 100%)`,
          height: '100%',
          background: 'var(--cds-layer-01)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-2px 0 12px var(--cds-shadow)'
        }}
      >
        <div
          style={{
            padding: '16px 16px 14px',
            borderBottom: '1px solid var(--cds-border-subtle-01)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}
        >
          <div>
            {label && (
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: '.32px',
                  color: 'var(--cds-text-secondary)',
                  marginBottom: 4
                }}
              >
                {label}
              </div>
            )}
            <h2
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 400,
                color: 'var(--cds-text-primary)'
              }}
            >
              {title}
            </h2>
          </div>
          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            style={{
              width: 40,
              height: 40,
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--cds-icon-primary)'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
              <path d="M17.414 16l6.293-6.293-1.414-1.414L16 14.586 9.707 8.293 8.293 9.707 14.586 16l-6.293 6.293 1.414 1.414L16 17.414l6.293 6.293 1.414-1.414z" />
            </svg>
          </button>
        </div>
        <div style={{ flex: 1, overflow: 'auto' }}>{children}</div>
        {footer && (
          <div style={{ display: 'flex', borderTop: '1px solid var(--cds-border-subtle-01)' }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

/* ---- Toast --------------------------------------------------------------- */
export interface ToastData {
  kind: 'success' | 'error' | 'info' | 'warning'
  title: string
  message?: string
}

export function Toast({
  toast,
  onDismiss
}: {
  toast: ToastData | null
  onDismiss: () => void
}): React.JSX.Element | null {
  if (!toast) return null
  const map: Record<string, [string, string]> = {
    success: [
      'var(--cds-support-success)',
      'M14 21.414l-5.707-5.707 1.414-1.414L14 18.586l8.293-8.293 1.414 1.414z'
    ],
    error: [
      'var(--cds-support-error)',
      'M21.707 10.293l-1.414-1.414L16 13.172l-4.293-4.293-1.414 1.414L14.586 14.586l-4.293 4.293 1.414 1.414L16 16l4.293 4.293 1.414-1.414L17.414 16z'
    ],
    info: ['var(--cds-support-info)', 'M17 22h-2v-8h2zm0-12h-2v2h2z'],
    warning: [
      'var(--cds-support-warning)',
      'M16 2L2 30h28zm-1 11h2v8h-2zm1 12a1.5 1.5 0 110 3 1.5 1.5 0 010-3z'
    ]
  }
  const [bar] = map[toast.kind] ?? map.info
  return (
    <div
      style={{
        position: 'fixed',
        top: 60,
        right: 16,
        zIndex: 60,
        width: 340,
        background: 'var(--cds-layer-02)',
        borderLeft: `3px solid ${bar}`,
        boxShadow: '0 4px 12px var(--cds-shadow)',
        display: 'flex',
        gap: 12,
        padding: 14
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          flexShrink: 0,
          marginTop: 1,
          color: bar,
          display: 'flex'
        }}
      >
        <svg width="20" height="20" viewBox="0 0 32 32" fill={bar}>
          <circle cx="16" cy="16" r="14" fill={bar} opacity="0.15" />
          <path d="M14 21.414l-5.707-5.707 1.414-1.414L14 18.586l8.293-8.293 1.414 1.414z" />
        </svg>
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--cds-text-primary)'
          }}
        >
          {toast.title}
        </div>
        {toast.message && (
          <div
            style={{
              fontSize: 14,
              color: 'var(--cds-text-secondary)',
              marginTop: 2
            }}
          >
            {toast.message}
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Cerrar notificación"
        style={{
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          color: 'var(--cds-icon-primary)',
          display: 'flex',
          alignItems: 'center',
          padding: 0
        }}
      >
        <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
          <path d="M17.414 16l6.293-6.293-1.414-1.414L16 14.586 9.707 8.293 8.293 9.707 14.586 16l-6.293 6.293 1.414 1.414L16 17.414l6.293 6.293 1.414-1.414z" />
        </svg>
      </button>
    </div>
  )
}

/* ---- CrearRecordatorioForm ----------------------------------------------- */
interface FormState {
  tipo: Motivo
  cliente: string
  fecha: string
  canal: 'WhatsApp' | 'Email'
}

export function CrearRecordatorioForm({
  state,
  set
}: {
  state: FormState
  set: (patch: Partial<FormState>) => void
}): React.JSX.Element {
  const tipos: {
    key: Motivo
    label: string
    desc: string
    Icon: React.ComponentType<{ size?: number }>
  }[] = [
    {
      key: 'control',
      label: 'Control anual',
      desc: 'Recordatorio de examen visual anual',
      Icon: View as React.ComponentType<{ size?: number }>
    },
    {
      key: 'cumple',
      label: 'Cumpleaños',
      desc: 'Tarjeta y promoción personalizada',
      Icon: (({ size }: { size?: number }) => (
        <svg width={size ?? 18} height={size ?? 18} viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 4l2.4 7.3H26l-6.2 4.5 2.4 7.3L16 18.6l-6.2 4.5 2.4-7.3L6 11.3h7.6z" />
        </svg>
      )) as React.ComponentType<{ size?: number }>
    },
    {
      key: 'postventa',
      label: 'Post-entrega',
      desc: 'Seguimiento de adaptación de lentes',
      Icon: Time as React.ComponentType<{ size?: number }>
    }
  ]

  const msg: Record<Motivo, string> = {
    control: `Hola ${state.cliente.split(' ')[0]}, en Opticalia notamos que ya pasó un año de tu último control visual. Te invitamos a agendar tu examen anual — la primera cita no tiene costo.`,
    cumple: `¡Feliz cumpleaños, ${state.cliente.split(' ')[0]}! Como cliente de Opticalia tienes 20% de descuento en monturas durante todo tu mes. Te esperamos.`,
    postventa: `Hola ${state.cliente.split(' ')[0]}, queremos saber cómo va tu adaptación a tus nuevos lentes. Si sientes alguna molestia, agenda una revisión sin costo con nosotros.`
  }

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <div>
        <div
          style={{
            fontSize: 12,
            letterSpacing: '.32px',
            color: 'var(--cds-text-secondary)',
            marginBottom: 8
          }}
        >
          Tipo de recordatorio
        </div>
        <div style={{ display: 'grid', gap: 8 }}>
          {tipos.map((t) => (
            <RadioTile
              key={t.key}
              selected={state.tipo === t.key}
              onClick={() => set({ tipo: t.key })}
            >
              <span
                style={{
                  width: 32,
                  height: 32,
                  flexShrink: 0,
                  background: state.tipo === t.key ? '#0f62fe' : 'var(--cds-layer-accent-01)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <t.Icon size={18} />
              </span>
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--cds-text-primary)'
                  }}
                >
                  {t.label}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: 'var(--cds-text-secondary)',
                    marginTop: 2
                  }}
                >
                  {t.desc}
                </div>
              </div>
            </RadioTile>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <CarbonSelect
          label="Cliente"
          value={state.cliente}
          onChange={(v) => set({ cliente: v })}
          options={VV_CLIENTES.map((c) => c.nombre)}
        />
        <TextInput label="Fecha de envío" value={state.fecha} onChange={(v) => set({ fecha: v })} />
      </div>

      <div>
        <div
          style={{
            fontSize: 12,
            letterSpacing: '.32px',
            color: 'var(--cds-text-secondary)',
            marginBottom: 8
          }}
        >
          Canal
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {(
            [
              { k: 'WhatsApp' as const, d: 'Mejor tasa de lectura' },
              { k: 'Email' as const, d: 'Tono más formal' }
            ] satisfies { k: 'WhatsApp' | 'Email'; d: string }[]
          ).map((c) => (
            <RadioTile key={c.k} selected={state.canal === c.k} onClick={() => set({ canal: c.k })}>
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--cds-text-primary)'
                  }}
                >
                  {c.k}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: 'var(--cds-text-secondary)',
                    marginTop: 2
                  }}
                >
                  {c.d}
                </div>
              </div>
            </RadioTile>
          ))}
        </div>
      </div>

      <div>
        <div
          style={{
            fontSize: 12,
            letterSpacing: '.32px',
            color: 'var(--cds-text-secondary)',
            marginBottom: 8
          }}
        >
          Vista previa del mensaje
        </div>
        <div
          style={{
            background: 'var(--cds-field-01)',
            borderLeft: '3px solid var(--cds-border-interactive)',
            padding: 16,
            fontSize: 14,
            lineHeight: 1.5,
            color: 'var(--cds-text-primary)'
          }}
        >
          {msg[state.tipo]}
        </div>
      </div>
    </div>
  )
}

/* ---- ClienteDetalle (side panel content) --------------------------------- */
export function ClienteDetalle({ cli }: { cli: Cliente }): React.JSX.Element {
  const seg = VV_SEG[cli.seg]
  const mot = cli.motivo ? VV_MOTIVO[cli.motivo] : null
  const hist = VV_HISTORIAL.filter((h) => h.cli === cli.id)
  const rows: [string, string][] = [
    ['Teléfono', cli.tel],
    ['Correo', cli.email],
    ['Última visita', `hace ${cli.ultima} meses`],
    ['Última compra', cli.compra],
    ['Monto', vvFmtMonto(cli.monto)],
    ['Cumpleaños', cli.cumple],
    ['Canal preferido', cli.canal]
  ]

  return (
    <div>
      <div
        style={{
          padding: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          borderBottom: '1px solid var(--cds-border-subtle-01)'
        }}
      >
        <Avatar ini={cli.ini} size={56} bg="#0f62fe" />
        <div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: 'var(--cds-text-primary)'
            }}
          >
            {cli.nombre}
          </div>
          <div
            style={{
              display: 'flex',
              gap: 8,
              marginTop: 8,
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
          >
            <Status kind={seg.status} size={13}>
              {seg.label}
            </Status>
            {mot && <Tag color={mot.tag}>{mot.label}</Tag>}
          </div>
        </div>
      </div>

      <div style={{ padding: 24 }}>
        <div
          style={{
            fontSize: 12,
            letterSpacing: '.32px',
            textTransform: 'uppercase',
            color: 'var(--cds-text-helper)',
            marginBottom: 12
          }}
        >
          Información
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '18px 16px'
          }}
        >
          {rows.map(([k, v]) => (
            <div key={k}>
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--cds-text-helper)',
                  marginBottom: 3
                }}
              >
                {k}
              </div>
              <div style={{ fontSize: 14, color: 'var(--cds-text-primary)' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 24px 24px' }}>
        <div
          style={{
            fontSize: 12,
            letterSpacing: '.32px',
            textTransform: 'uppercase',
            color: 'var(--cds-text-helper)',
            marginBottom: 12
          }}
        >
          Historial de contacto
        </div>
        {hist.length ? (
          <div style={{ position: 'relative' }}>
            {hist.map((h, i) => {
              const est = VV_HIST_ESTADO[h.estado]
              return (
                <div
                  key={h.id}
                  style={{
                    display: 'flex',
                    gap: 12,
                    paddingBottom: i < hist.length - 1 ? 18 : 0
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#0f62fe',
                        marginTop: 5
                      }}
                    />
                    {i < hist.length - 1 && (
                      <span
                        style={{
                          flex: 1,
                          width: 1,
                          background: 'var(--cds-border-subtle-01)'
                        }}
                      />
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 14,
                        color: 'var(--cds-text-primary)'
                      }}
                    >
                      {VV_TITULO[h.tipo]} · {h.canal}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: 'var(--cds-text-secondary)',
                        marginTop: 2
                      }}
                    >
                      {h.fecha} · {est.label}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div style={{ fontSize: 14, color: 'var(--cds-text-helper)' }}>
            Sin mensajes registrados.
          </div>
        )}
      </div>
    </div>
  )
}

// Re-export icons for use in screens
export { View, Time }
