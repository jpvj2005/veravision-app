/* Vera Vision — Historial de mensajes */
import { Download, View, Renew, Copy, Time } from '@carbon/icons-react'
import {
  PageHeader,
  MetricTile,
  Tabs,
  Status,
  Avatar,
  OverflowMenu,
  Btn
} from '@renderer/components/primitives/Common'
import type { ToastData } from '@renderer/components/primitives/Common'
import {
  VV_KPI,
  VV_HISTORIAL,
  VV_HIST_ESTADO,
  VV_TITULO,
  vvCliente,
  vvFmtMonto
} from '@renderer/data'
import type { Cliente } from '@renderer/data/types'
import { useState } from 'react'
import type { Page } from '@renderer/App'

interface HistorialProps {
  onAbrirCliente: (cli: Cliente) => void
  fireToast: (t: ToastData) => void
  onNav: (p: Page) => void
}

export function Historial({ onAbrirCliente, fireToast }: HistorialProps): React.JSX.Element {
  const [tab, setTab] = useState('todos')
  const [query, setQuery] = useState('')
  const k = VV_KPI

  const counts = {
    todos: VV_HISTORIAL.length,
    respondido: VV_HISTORIAL.filter((h) => h.estado === 'respondido').length,
    leido: VV_HISTORIAL.filter((h) => h.estado === 'leido').length,
    'sin-leer': VV_HISTORIAL.filter((h) => h.estado === 'sin-leer').length
  }

  const tabs = [
    { value: 'todos', label: 'Todos', count: counts.todos },
    { value: 'respondido', label: 'Respondidos', count: counts.respondido },
    { value: 'leido', label: 'Leídos', count: counts.leido },
    { value: 'sin-leer', label: 'Sin leer', count: counts['sin-leer'] }
  ]

  const rows = VV_HISTORIAL.filter((h) => tab === 'todos' || h.estado === tab).filter((h) => {
    const c = vvCliente(h.cli)
    return !query || (c?.nombre ?? '').toLowerCase().includes(query.toLowerCase())
  })

  return (
    <div>
      <PageHeader title="Historial" helper="Registro de todos los mensajes enviados a tus clientes">
        <Btn
          kind="tertiary"
          size="md"
          iconLeft={<Download size={16} />}
          onClick={() =>
            fireToast({
              kind: 'info',
              title: 'Exportando reporte',
              message: 'Generando CSV del historial…'
            })
          }
        >
          Exportar reporte
        </Btn>
      </PageHeader>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          background: 'var(--cds-border-subtle-01)',
          marginBottom: 24
        }}
      >
        <MetricTile
          label="Enviados este mes"
          value={k.enviadosMes}
          delta="11%"
          deltaDir="up"
          spark={[31, 44, 38, 41, 46, 48]}
        />
        <MetricTile
          label="Leídos"
          value={k.leidos}
          foot={`${Math.round((k.leidos / k.enviadosMes) * 100)}% del total`}
          accent="var(--cds-support-info)"
        />
        <MetricTile
          label="Respondidos"
          value={VV_HISTORIAL.filter((h) => h.estado === 'respondido').length + 12}
          delta="3"
          deltaDir="up"
          accent="var(--cds-support-success)"
        />
        <MetricTile
          label="Reactivaciones"
          value={k.recuperados}
          unit="clientes"
          foot={`${vvFmtMonto(18400000)} en ventas`}
        />
      </div>

      <Tabs tabs={tabs} active={tab} onChange={setTab} style={{ marginBottom: 0 }} />

      <div
        style={{
          background: 'var(--cds-layer-01)',
          border: '1px solid var(--cds-border-subtle-01)',
          borderTop: 'none'
        }}
      >
        <div
          style={{
            height: 48,
            borderBottom: '1px solid var(--cds-border-subtle-01)',
            display: 'flex',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: 16,
              color: 'var(--cds-icon-primary)',
              pointerEvents: 'none',
              display: 'flex'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
              <path d="M29 27.586l-7.552-7.552A11 11 0 1027.586 29zm-17-4a9 9 0 110-18 9 9 0 010 18z" />
            </svg>
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por cliente…"
            style={{
              flex: 1,
              height: '100%',
              border: 'none',
              background: 'transparent',
              padding: '0 16px 0 44px',
              fontFamily: 'IBM Plex Sans, system-ui, sans-serif',
              fontSize: 14,
              color: 'var(--cds-text-primary)',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--cds-layer-accent-01)', height: 48 }}>
                {['Cliente', 'Tipo de mensaje', 'Canal', 'Estado', 'Fecha'].map((header) => (
                  <th
                    key={header}
                    style={{
                      textAlign: 'left',
                      padding: '0 16px',
                      fontWeight: 600,
                      color: 'var(--cds-text-primary)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {header}
                  </th>
                ))}
                <th style={{ width: 48 }} />
              </tr>
            </thead>
            <tbody>
              {rows.map((h) => {
                const cli = vvCliente(h.cli)
                if (!cli) return null
                const est = VV_HIST_ESTADO[h.estado]
                const MotIcon = h.tipo === 'control' ? View : h.tipo === 'cumple' ? View : Time

                return (
                  <tr
                    key={h.id}
                    style={{
                      height: 56,
                      borderTop: '1px solid var(--cds-border-subtle-01)'
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = 'var(--cds-layer-hover-01)')
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '0 16px' }}>
                      <span
                        onClick={() => onAbrirCliente(cli)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 12,
                          cursor: 'pointer'
                        }}
                      >
                        <Avatar
                          ini={cli.ini}
                          size={32}
                          bg="var(--cds-layer-accent-01)"
                          color="var(--cds-text-primary)"
                        />
                        <span
                          style={{
                            color: 'var(--cds-link-primary)',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {cli.nombre}
                        </span>
                      </span>
                    </td>
                    <td style={{ padding: '0 16px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 8,
                          color: 'var(--cds-text-primary)'
                        }}
                      >
                        <MotIcon size={16} />
                        {VV_TITULO[h.tipo]}
                      </span>
                    </td>
                    <td style={{ padding: '0 16px', color: 'var(--cds-text-secondary)' }}>
                      {h.canal}
                    </td>
                    <td style={{ padding: '0 16px' }}>
                      <Status kind={est.status}>{est.label}</Status>
                    </td>
                    <td
                      style={{
                        padding: '0 16px',
                        color: 'var(--cds-text-secondary)',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {h.fecha}
                    </td>
                    <td style={{ padding: '0 8px' }}>
                      <OverflowMenu
                        items={[
                          {
                            label: 'Ver perfil',
                            icon: <View size={16} />,
                            onClick: () => onAbrirCliente(cli)
                          },
                          {
                            label: 'Reenviar mensaje',
                            icon: <Renew size={16} />,
                            onClick: () =>
                              fireToast({
                                kind: 'success',
                                title: 'Mensaje reenviado',
                                message: `A ${cli.nombre} por ${h.canal}.`
                              })
                          },
                          {
                            label: 'Copiar contenido',
                            icon: <Copy size={16} />,
                            onClick: () => {}
                          }
                        ]}
                      />
                    </td>
                  </tr>
                )
              })}
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      padding: 48,
                      textAlign: 'center',
                      color: 'var(--cds-text-helper)'
                    }}
                  >
                    Sin mensajes en este filtro.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div
          style={{
            height: 40,
            borderTop: '1px solid var(--cds-border-subtle-01)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            fontSize: 13,
            color: 'var(--cds-text-secondary)'
          }}
        >
          {rows.length} mensajes
        </div>
      </div>
    </div>
  )
}
