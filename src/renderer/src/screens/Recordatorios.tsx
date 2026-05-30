/* Vera Vision — Recordatorios */
import { useState } from 'react'
import { Add, View, Time, Email, Notification, Calendar } from '@carbon/icons-react'
import {
  PageHeader,
  MetricTile,
  Tabs,
  Status,
  Avatar,
  Tag,
  Btn
} from '@renderer/components/primitives/Common'
import type { ToastData } from '@renderer/components/primitives/Common'
import { VV_KPI, VV_RECORDATORIOS, VV_MOTIVO, VV_TITULO, vvCliente } from '@renderer/data'
import type { Page } from '@renderer/App'

interface RecordatoriosProps {
  onCrear: () => void
  fireToast: (t: ToastData) => void
  onNav: (p: Page) => void
}

export function Recordatorios({ onCrear, fireToast }: RecordatoriosProps): React.JSX.Element {
  const [tab, setTab] = useState('pendiente')
  const [enviados, setEnviados] = useState<Record<string, boolean>>({})
  const k = VV_KPI

  const counts = {
    pendiente: VV_RECORDATORIOS.filter((r) => r.estado === 'pendiente').length,
    programado: VV_RECORDATORIOS.filter((r) => r.estado === 'programado').length,
    enviado: VV_RECORDATORIOS.filter((r) => r.estado === 'enviado').length
  }

  const tabs = [
    { value: 'pendiente', label: 'Pendientes', count: counts.pendiente },
    { value: 'programado', label: 'Programados', count: counts.programado },
    { value: 'enviado', label: 'Enviados', count: counts.enviado }
  ]

  const rows = VV_RECORDATORIOS.filter((r) => r.estado === tab)

  const enviar = (rId: string, cliNombre: string, tipo: string, canal: string): void => {
    setEnviados((e) => ({ ...e, [rId]: true }))
    fireToast({
      kind: 'success',
      title: 'Mensaje enviado',
      message: `${VV_TITULO[tipo]} enviado a ${cliNombre} por ${canal}.`
    })
  }

  return (
    <div>
      <PageHeader
        title="Recordatorios"
        helper="Mensajes automáticos para retener y reactivar clientes"
      >
        <Btn kind="primary" size="md" iconLeft={<Add size={16} />} onClick={onCrear}>
          Nuevo recordatorio
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
          label="Pendientes de envío"
          value={k.pendientes}
          foot="requieren tu acción"
          accent="var(--cds-support-warning)"
        />
        <MetricTile label="Programados" value={k.programados} foot="próximos 7 días" />
        <MetricTile label="Enviados este mes" value={k.enviadosMes} delta="11%" deltaDir="up" />
        <MetricTile
          label="Tasa de lectura"
          value={Math.round((k.leidos / k.enviadosMes) * 100)}
          unit="%"
          foot={`${k.leidos} leídos`}
          accent="var(--cds-support-success)"
        />
      </div>

      <Tabs tabs={tabs} active={tab} onChange={setTab} style={{ marginBottom: 20 }} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: 16
        }}
      >
        {rows.map((r) => {
          const cli = vvCliente(r.cli)
          if (!cli) return null
          const mot = VV_MOTIVO[r.tipo]
          const done = enviados[r.id] || r.estado === 'enviado'
          const MIcon = r.tipo === 'control' ? View : r.tipo === 'cumple' ? View : Time
          const CIcon = r.canal === 'Email' ? Email : Notification

          return (
            <div
              key={r.id}
              style={{
                background: 'var(--cds-layer-01)',
                border: '1px solid var(--cds-border-subtle-01)',
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 14
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <Avatar
                  ini={cli.ini}
                  size={40}
                  bg="var(--cds-layer-accent-01)"
                  color="var(--cds-text-primary)"
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: 'var(--cds-text-primary)'
                    }}
                  >
                    {cli.nombre}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: 'var(--cds-text-secondary)',
                      marginTop: 2
                    }}
                  >
                    {VV_TITULO[r.tipo]}
                    {r.dias > 0 ? ` · ${r.dias} meses sin contacto` : ''}
                  </div>
                </div>
                {done ? (
                  <Status kind="active" size={13}>
                    Enviado
                  </Status>
                ) : (
                  <Tag color={r.estado === 'programado' ? 'blue' : 'gray'}>
                    {r.estado === 'programado' ? 'Programado' : 'Pendiente'}
                  </Tag>
                )}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  fontSize: 13,
                  color: 'var(--cds-text-secondary)'
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <MIcon size={14} />
                  {mot.label}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <CIcon size={14} />
                  {r.canal}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Calendar size={14} />
                  {r.fecha}
                </span>
              </div>

              <div style={{ display: 'flex', gap: 0, marginTop: 'auto' }}>
                <Btn
                  kind="tertiary"
                  size="md"
                  onClick={onCrear}
                  style={{ flex: 1, justifyContent: 'flex-start' }}
                >
                  Personalizar
                </Btn>
                <Btn
                  kind="primary"
                  size="md"
                  disabled={done}
                  onClick={() => enviar(r.id, cli.nombre, r.tipo, r.canal)}
                  style={{ flex: 1, justifyContent: 'flex-start' }}
                >
                  {done ? 'Enviado' : 'Enviar ahora'}
                </Btn>
              </div>
            </div>
          )
        })}
      </div>

      {rows.length === 0 && (
        <div style={{ padding: 48, textAlign: 'center', color: 'var(--cds-text-helper)' }}>
          No hay recordatorios en este estado.
        </div>
      )}
    </div>
  )
}
