/* Vera Vision — App shell: routing, tema, overlays */
import { useState } from 'react'
import { AppHeader, AppSideNav } from '@renderer/components/layout/AppShell'
import type { Sede } from '@renderer/components/layout/AppShell'
import {
  Modal,
  SidePanel,
  Toast,
  CrearRecordatorioForm,
  ClienteDetalle
} from '@renderer/components/primitives/Common'
import type { ToastData } from '@renderer/components/primitives/Common'
import { Btn } from '@renderer/components/primitives/Common'
import { Dashboard } from '@renderer/screens/Dashboard'
import { Clientes } from '@renderer/screens/Clientes'
import { Recordatorios } from '@renderer/screens/Recordatorios'
import { Historial } from '@renderer/screens/Historial'
import type { Cliente, Motivo } from '@renderer/data/types'
import { Add, Settings } from '@carbon/icons-react'

export type Page = 'dashboard' | 'clientes' | 'recordatorios' | 'historial' | 'config' | 'ayuda'

interface FormState {
  tipo: Motivo
  cliente: string
  fecha: string
  canal: 'WhatsApp' | 'Email'
}

const FORM_INICIAL: FormState = {
  tipo: 'control',
  cliente: 'María López',
  fecha: '22 de abril, 2026',
  canal: 'WhatsApp'
}

const VV_TITULO_MAP: Record<string, string> = {
  control: 'Control visual anual',
  cumple: 'Tarjeta de cumpleaños',
  postventa: 'Seguimiento de adaptación'
}

function App(): React.JSX.Element {
  const [theme, setTheme] = useState<'g10' | 'g100'>('g10')
  const [page, setPage] = useState<Page>('dashboard')
  const [navOpen, setNavOpen] = useState(true)
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState<FormState>(FORM_INICIAL)
  const [toast, setToast] = useState<ToastData | null>(null)
  const [sede, setSede] = useState<Sede>('chia')

  const fireToast = (x: ToastData): void => {
    setToast(x)
    clearTimeout((window as Window & { __vt?: ReturnType<typeof setTimeout> }).__vt)
    ;(window as Window & { __vt?: ReturnType<typeof setTimeout> }).__vt = setTimeout(
      () => setToast(null),
      4000
    )
  }

  const nav = (p: Page): void => {
    setPage(p)
    setCliente(null)
  }

  const toggleTheme = (): void => {
    setTheme((t) => (t === 'g100' ? 'g10' : 'g100'))
  }

  const abrirCrear = (): void => {
    setForm(FORM_INICIAL)
    setModal(true)
  }

  const setF = (patch: Partial<FormState>): void => setForm((f) => ({ ...f, ...patch }))

  const guardarRecordatorio = (): void => {
    setModal(false)
    fireToast({
      kind: 'success',
      title: 'Recordatorio creado',
      message: `${VV_TITULO_MAP[form.tipo]} para ${form.cliente} · ${form.fecha}.`
    })
  }

  const screenProps = {
    onNav: nav,
    onCrear: abrirCrear,
    onAbrirCliente: setCliente,
    fireToast,
    sede
  }

  return (
    <div
      data-carbon-theme={theme}
      style={{
        minHeight: '100vh',
        background: 'var(--cds-background)',
        color: 'var(--cds-text-primary)',
        fontFamily: 'IBM Plex Sans, system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <AppHeader
        theme={theme}
        onToggleTheme={toggleTheme}
        onMenuClick={() => setNavOpen((o) => !o)}
        onLogoClick={() => nav('dashboard')}
        onNewReminder={abrirCrear}
        sede={sede}
        onChangeSede={setSede}
      />

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <AppSideNav open={navOpen} page={page} onNav={nav} />

        <main
          style={{
            flex: 1,
            minWidth: 0,
            padding: '28px 32px 64px',
            maxWidth: 1440,
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {page === 'dashboard' && <Dashboard {...screenProps} />}
          {page === 'clientes' && <Clientes {...screenProps} />}
          {page === 'recordatorios' && <Recordatorios {...screenProps} />}
          {page === 'historial' && <Historial {...screenProps} />}
          {page === 'config' && <ConfigPlaceholder />}
        </main>
      </div>

      <SidePanel
        open={!!cliente}
        label="Cliente"
        title="Perfil del cliente"
        onClose={() => setCliente(null)}
        width={520}
        footer={
          cliente ? (
            <>
              <Btn
                kind="secondary"
                size="lg"
                onClick={() => setCliente(null)}
                style={{ flex: 1, minHeight: 64, alignItems: 'flex-start', paddingTop: 15 }}
              >
                Cerrar
              </Btn>
              <Btn
                kind="primary"
                size="lg"
                iconLeft={<Add size={16} />}
                onClick={() => {
                  setCliente(null)
                  abrirCrear()
                }}
                style={{ flex: 1, minHeight: 64, alignItems: 'flex-start', paddingTop: 15 }}
              >
                Crear recordatorio
              </Btn>
            </>
          ) : undefined
        }
      >
        {cliente && <ClienteDetalle cli={cliente} />}
      </SidePanel>

      <Modal
        open={modal}
        label="Recordatorios"
        title="Nuevo recordatorio"
        primaryText="Guardar recordatorio"
        onClose={() => setModal(false)}
        onPrimary={guardarRecordatorio}
        width={620}
      >
        <CrearRecordatorioForm state={form} set={setF} />
      </Modal>

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  )
}

function ConfigPlaceholder(): React.JSX.Element {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 28
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 28,
            fontWeight: 400,
            color: 'var(--cds-text-primary)'
          }}
        >
          Configuración
        </h1>
      </div>
      <div
        style={{
          background: 'var(--cds-layer-01)',
          border: '1px solid var(--cds-border-subtle-01)',
          padding: 64,
          textAlign: 'center',
          color: 'var(--cds-text-helper)'
        }}
      >
        <Settings size={32} style={{ color: 'var(--cds-icon-secondary)' }} />
        <div style={{ marginTop: 12, fontSize: 14 }}>Contenido no incluido en esta versión.</div>
      </div>
    </div>
  )
}

export default App
