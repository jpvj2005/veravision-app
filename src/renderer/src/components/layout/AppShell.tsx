/* Vera Vision — UI Shell: Header + SideNav (pixel-faithful to design handoff) */
import { useState } from 'react'
import {
  Search,
  Notification,
  Asleep,
  Light,
  Dashboard,
  View,
  Time,
  Settings,
  Help,
  Add
} from '@carbon/icons-react'
import type { Page } from '@renderer/App'

interface AppHeaderProps {
  theme: 'g10' | 'g100'
  onToggleTheme: () => void
  onMenuClick: () => void
  onLogoClick: () => void
  onNewReminder: () => void
}

export function AppHeader({
  theme,
  onToggleTheme,
  onMenuClick,
  onLogoClick,
  onNewReminder
}: AppHeaderProps): React.JSX.Element {
  return (
    <header
      style={{
        height: 48,
        background: '#161616',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        borderBottom: '1px solid #393939',
        flexShrink: 0
      }}
    >
      <HeaderIconBtn aria-label="Abrir menú" onClick={onMenuClick}>
        <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
          <rect x="4" y="9" width="24" height="2" />
          <rect x="4" y="15" width="24" height="2" />
          <rect x="4" y="21" width="24" height="2" />
        </svg>
      </HeaderIconBtn>

      <button
        type="button"
        onClick={onLogoClick}
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: 14,
          padding: '0 16px 0 8px',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          fontFamily: 'IBM Plex Sans, system-ui, sans-serif'
        }}
      >
        <b style={{ fontWeight: 600 }}>Opticalia</b>{' '}
        <span style={{ fontWeight: 400, opacity: 0.95 }}>VeraVision</span>
      </button>

      <div style={{ width: 1, height: 24, background: '#393939', margin: '0 4px' }} />
      <span style={{ fontSize: 13, color: '#c6c6c6', padding: '0 12px', whiteSpace: 'nowrap' }}>
        Sede Chapinero · Bogotá
      </span>

      <div style={{ flex: 1 }} />

      <HeaderIconBtn aria-label="Buscar">
        <Search size={20} />
      </HeaderIconBtn>

      <div style={{ position: 'relative', display: 'inline-flex' }}>
        <HeaderIconBtn aria-label="Notificaciones">
          <Notification size={20} />
        </HeaderIconBtn>
        <span
          style={{
            position: 'absolute',
            top: 12,
            right: 11,
            minWidth: 16,
            height: 16,
            padding: '0 3px',
            boxSizing: 'border-box',
            borderRadius: 8,
            background: '#da1e28',
            color: '#fff',
            fontSize: 10,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1.5px solid #161616',
            pointerEvents: 'none'
          }}
        >
          3
        </span>
      </div>

      <HeaderIconBtn aria-label="Cambiar tema" onClick={onToggleTheme}>
        {theme === 'g100' ? <Light size={20} /> : <Asleep size={20} />}
      </HeaderIconBtn>

      <div style={{ width: 1, height: 24, background: '#393939', margin: '0 4px' }} />

      <button
        type="button"
        aria-label="Nuevo recordatorio"
        onClick={onNewReminder}
        style={{
          height: 48,
          padding: '0 16px',
          background: '#0f62fe',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 14,
          fontFamily: 'IBM Plex Sans, system-ui, sans-serif',
          whiteSpace: 'nowrap'
        }}
      >
        <Add size={16} />
        Nuevo recordatorio
      </button>

      <button
        type="button"
        title="Marlen Vargas"
        style={{
          width: 48,
          height: 48,
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: '#0f62fe',
            color: '#fff',
            fontSize: 10,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          MV
        </span>
      </button>
    </header>
  )
}

function HeaderIconBtn({
  children,
  onClick,
  'aria-label': ariaLabel
}: {
  children: React.ReactNode
  onClick?: () => void
  'aria-label': string
}): React.JSX.Element {
  const [hover, setHover] = useState(false)
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 48,
        height: 48,
        border: 'none',
        background: hover ? '#393939' : 'transparent',
        color: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'background 70ms'
      }}
    >
      {children}
    </button>
  )
}

/* ---- Nav items ------------------------------------------------------------ */
const NAV_ITEMS: { id: Page; label: string; Icon: React.ComponentType<{ size?: number }> }[] = [
  { id: 'dashboard', label: 'Inicio', Icon: Dashboard },
  { id: 'clientes', label: 'Clientes', Icon: View },
  { id: 'recordatorios', label: 'Recordatorios', Icon: Notification },
  { id: 'historial', label: 'Historial', Icon: Time }
]

interface AppSideNavProps {
  open: boolean
  page: Page
  onNav: (p: Page) => void
}

export function AppSideNav({ open, page, onNav }: AppSideNavProps): React.JSX.Element {
  return (
    <aside
      style={{
        width: open ? 256 : 0,
        flexShrink: 0,
        background: 'var(--cds-layer-01)',
        borderRight: open ? '1px solid var(--cds-border-subtle-01)' : 'none',
        overflow: 'hidden',
        transition: 'width 150ms cubic-bezier(0.2,0,0.38,0.9)',
        position: 'sticky',
        top: 48,
        height: 'calc(100vh - 48px)',
        alignSelf: 'flex-start'
      }}
    >
      <nav
        aria-label="Navegación lateral"
        style={{
          width: 256,
          paddingTop: 8,
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div
          style={{
            fontSize: 12,
            letterSpacing: '.32px',
            textTransform: 'uppercase',
            color: 'var(--cds-text-helper)',
            padding: '16px 16px 8px'
          }}
        >
          Gestión
        </div>

        {NAV_ITEMS.map(({ id, label, Icon }) => (
          <SideNavItem
            key={id}
            id={id}
            label={label}
            Icon={Icon}
            active={page === id}
            onNav={onNav}
          />
        ))}

        <div style={{ flex: 1 }} />

        <div style={{ borderTop: '1px solid var(--cds-border-subtle-01)' }}>
          <SideNavItem
            id="config"
            label="Configuración"
            Icon={Settings}
            active={page === 'config'}
            onNav={onNav}
          />
          <SideNavItem
            id="ayuda"
            label="Ayuda y soporte"
            Icon={Help}
            active={false}
            onNav={onNav}
          />
        </div>
      </nav>
    </aside>
  )
}

function SideNavItem({
  id,
  label,
  Icon,
  active,
  onNav
}: {
  id: Page | 'ayuda'
  label: string
  Icon: React.ComponentType<{ size?: number }>
  active: boolean
  onNav: (p: Page) => void
}): React.JSX.Element {
  const [hover, setHover] = useState(false)
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault()
        if (id !== 'ayuda') onNav(id as Page)
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        height: 40,
        padding: '0 16px',
        textDecoration: 'none',
        fontSize: 14,
        fontWeight: active ? 600 : 400,
        color: 'var(--cds-text-primary)',
        background: active
          ? 'var(--cds-background-selected)'
          : hover
            ? 'var(--cds-background-hover)'
            : 'transparent',
        borderLeft: active ? '3px solid var(--cds-border-interactive)' : '3px solid transparent',
        boxSizing: 'border-box',
        transition: 'background 70ms'
      }}
    >
      <Icon size={16} />
      {label}
    </a>
  )
}
