/* Vera Vision — Dashboard (Inicio) */
import { View, Time, Star, Download, Add } from '@carbon/icons-react'
import {
  PageHeader,
  MetricTile,
  CardHead,
  Card,
  LegendDot,
  Status,
  Avatar,
  Tag,
  Btn
} from '@renderer/components/primitives/Common'
import { GroupedBarChart, DonutChart } from '@renderer/components/primitives/Charts'
import {
  VV_KPI,
  VV_SERIE_MENSUAL,
  VV_SEGMENTOS,
  VV_RECORDATORIOS,
  VV_HISTORIAL,
  VV_MOTIVO,
  VV_HIST_ESTADO,
  VV_TITULO,
  vvCliente
} from '@renderer/data'
import type { Cliente } from '@renderer/data/types'
import type { Page } from '@renderer/App'

const SEDE_KPI: Record<string, typeof VV_KPI> = {
  chia: VV_KPI,
  tocancipa: {
    ...VV_KPI,
    activos: 98,
    activosDelta: 5,
    riesgo: 21,
    riesgoCrit: 2,
    pendientes: 9,
    programados: 7,
    tasaRespuesta: 41,
    tasaDelta: 8
  }
}

interface DashboardProps {
  onNav: (p: Page) => void
  onCrear: () => void
  onAbrirCliente: (cli: Cliente) => void
  sede?: string
  fireToast?: (x: unknown) => void
}

export function Dashboard({
  onNav,
  onCrear,
  onAbrirCliente,
  sede = 'chia'
}: DashboardProps): React.JSX.Element {
  const k = SEDE_KPI[sede] ?? VV_KPI
  const atencion = VV_RECORDATORIOS.filter((r) => r.estado === 'pendiente').slice(0, 4)
  const reciente = VV_HISTORIAL.slice(0, 5)
  const sedeLabel = sede === 'tocancipa' ? 'Sede Tocancipá' : 'Sede Centro · Chía'

  return (
    <div>
      <PageHeader
        title="Inicio"
        helper={`Resumen de actividad y relación con clientes · ${sedeLabel} · 22 de abril, 2026`}
      >
        <Btn kind="tertiary" size="md" iconLeft={<Download size={16} />}>
          Exportar
        </Btn>
        <Btn kind="primary" size="md" iconLeft={<Add size={16} />} onClick={onCrear}>
          Nuevo recordatorio
        </Btn>
      </PageHeader>

      {/* KPIs */}
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
          label="Clientes activos"
          value={k.activos}
          delta={`${k.activosDelta} este mes`}
          deltaDir="up"
          spark={[120, 124, 128, 131, 136, k.activos]}
          sparkColor="#0f62fe"
        />
        <MetricTile
          label="En riesgo de pérdida"
          value={k.riesgo}
          foot={`${k.riesgoCrit} críticos`}
          accent="var(--cds-support-warning)"
          spark={[44, 42, 41, 40, 39, k.riesgo]}
          sparkColor="var(--cds-support-warning)"
        />
        <MetricTile
          label="Recordatorios pendientes"
          value={k.pendientes}
          foot={`${k.programados} programados`}
          spark={[9, 11, 10, 13, 14, k.pendientes]}
          sparkColor="#0f62fe"
        />
        <MetricTile
          label="Tasa de respuesta"
          value={k.tasaRespuesta}
          unit="%"
          delta={`${k.tasaDelta}%`}
          deltaDir="up"
          spark={[26, 28, 27, 30, 32, k.tasaRespuesta]}
          sparkColor="var(--cds-support-success)"
        />
      </div>

      {/* Gráficas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: 24,
          marginBottom: 24
        }}
      >
        <Card>
          <CardHead
            title="Mensajes enviados vs. respondidos"
            action="Ver historial"
            onAction={() => onNav('historial')}
          />
          <div style={{ padding: 16 }}>
            <div style={{ display: 'flex', gap: 24, marginBottom: 4 }}>
              <LegendDot color="#0f62fe" label="Enviados" />
              <LegendDot color="#78a9ff" label="Respondidos" />
            </div>
            <GroupedBarChart data={VV_SERIE_MENSUAL} height={236} />
          </div>
        </Card>

        <Card>
          <CardHead title="Cartera por segmento" />
          <div
            style={{
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 18
            }}
          >
            <DonutChart
              data={VV_SEGMENTOS}
              centerValue={k.activos + k.riesgo + k.perdidos}
              centerLabel="clientes"
            />
            <div style={{ display: 'grid', gap: 10, width: '100%' }}>
              {VV_SEGMENTOS.map((s) => (
                <LegendDot key={s.key} color={s.color} label={s.label} value={s.valor} />
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Atención + Actividad */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Card>
          <CardHead
            title="Requiere atención hoy"
            action="Ver todos"
            onAction={() => onNav('recordatorios')}
          />
          <div>
            {atencion.map((r, i) => {
              const cli = vvCliente(r.cli)
              if (!cli) return null
              const mot = VV_MOTIVO[r.tipo]
              const MIcon = r.tipo === 'control' ? View : r.tipo === 'cumple' ? Star : Time
              return (
                <div
                  key={r.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 16px',
                    borderTop: i ? '1px solid var(--cds-border-subtle-01)' : 'none'
                  }}
                >
                  <Avatar
                    ini={cli.ini}
                    size={32}
                    bg="var(--cds-layer-accent-01)"
                    color="var(--cds-text-primary)"
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{ fontSize: 14, fontWeight: 600, color: 'var(--cds-text-primary)' }}
                    >
                      {cli.nombre}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: 'var(--cds-text-secondary)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {mot.label} · {r.dias > 0 ? `${r.dias} meses sin contacto` : 'hoy'}
                    </div>
                  </div>
                  <Tag color={mot.tag} icon={<MIcon size={12} />}>
                    {mot.label}
                  </Tag>
                  <Btn kind="ghost" size="sm" onClick={onCrear}>
                    Enviar
                  </Btn>
                </div>
              )
            })}
          </div>
        </Card>

        <Card>
          <CardHead
            title="Actividad reciente"
            action="Ver historial"
            onAction={() => onNav('historial')}
          />
          <div>
            {reciente.map((h, i) => {
              const cli = vvCliente(h.cli)
              if (!cli) return null
              const est = VV_HIST_ESTADO[h.estado]
              return (
                <div
                  key={h.id}
                  onClick={() => onAbrirCliente(cli)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 16px',
                    cursor: 'pointer',
                    borderTop: i ? '1px solid var(--cds-border-subtle-01)' : 'none'
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = 'var(--cds-layer-hover-01)')
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <Avatar
                    ini={cli.ini}
                    size={32}
                    bg="var(--cds-layer-accent-01)"
                    color="var(--cds-text-primary)"
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{ fontSize: 14, fontWeight: 600, color: 'var(--cds-text-primary)' }}
                    >
                      {cli.nombre}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--cds-text-secondary)' }}>
                      {VV_TITULO[h.tipo]} · {h.canal}
                    </div>
                  </div>
                  <Status kind={est.status} size={13}>
                    {est.label}
                  </Status>
                  <span
                    style={{
                      fontSize: 12,
                      color: 'var(--cds-text-helper)',
                      width: 48,
                      textAlign: 'right'
                    }}
                  >
                    {h.fecha}
                  </span>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
