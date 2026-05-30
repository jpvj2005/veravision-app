/* Vera Vision — datos de ejemplo (óptica Opticalia · Bogotá) */
import type {
  Cliente,
  Recordatorio,
  MensajeHistorial,
  KPIs,
  SerieMensual,
  SegmentoData,
  TipoData,
  SegConfig,
  MotivoConfig,
  HistEstadoConfig,
  Segmento,
  Motivo,
  EstadoHistorial
} from './types'

export const VV_CLIENTES: Cliente[] = [
  {
    id: 'c01',
    nombre: 'María López',
    ini: 'ML',
    seg: 'riesgo',
    motivo: 'control',
    ultima: 11,
    tel: '+57 311 482 0091',
    email: 'maria.lopez@gmail.com',
    compra: 'Progresivos antirreflejo',
    monto: 680000,
    cumple: '22 abr',
    canal: 'WhatsApp'
  },
  {
    id: 'c02',
    nombre: 'Carlos Ruiz',
    ini: 'CR',
    seg: 'activo',
    motivo: 'cumple',
    ultima: 2,
    tel: '+57 320 771 5530',
    email: 'carlosruiz@hotmail.com',
    compra: 'Montura Ray-Ban RB5154',
    monto: 540000,
    cumple: '22 abr',
    canal: 'WhatsApp'
  },
  {
    id: 'c03',
    nombre: 'Ana Torres',
    ini: 'AT',
    seg: 'activo',
    motivo: 'postventa',
    ultima: 1,
    tel: '+57 315 209 8842',
    email: 'ana.torres@outlook.com',
    compra: 'Lentes de contacto Acuvue',
    monto: 320000,
    cumple: '03 may',
    canal: 'WhatsApp'
  },
  {
    id: 'c04',
    nombre: 'Sarah Pérez',
    ini: 'SP',
    seg: 'riesgo',
    motivo: 'control',
    ultima: 8,
    tel: '+57 312 664 1027',
    email: 'sarah.perez@gmail.com',
    compra: 'Gafas de sol polarizadas',
    monto: 410000,
    cumple: '14 jun',
    canal: 'Email'
  },
  {
    id: 'c05',
    nombre: 'Valeria Castro',
    ini: 'VC',
    seg: 'activo',
    motivo: null,
    ultima: 3,
    tel: '+57 318 045 7781',
    email: 'vale.castro@gmail.com',
    compra: 'Monofocales Essilor',
    monto: 290000,
    cumple: '28 jul',
    canal: 'WhatsApp'
  },
  {
    id: 'c06',
    nombre: 'Luis Gómez',
    ini: 'LG',
    seg: 'perdido',
    motivo: null,
    ultima: 20,
    tel: '+57 301 552 3390',
    email: 'luisgomez@yahoo.com',
    compra: 'Montura Oakley',
    monto: 620000,
    cumple: '09 feb',
    canal: 'WhatsApp'
  },
  {
    id: 'c07',
    nombre: 'Cristo Reyes',
    ini: 'CR',
    seg: 'riesgo',
    motivo: 'control',
    ultima: 11,
    tel: '+57 314 880 6612',
    email: 'cristo.reyes@gmail.com',
    compra: 'Progresivos Varilux',
    monto: 890000,
    cumple: '17 sep',
    canal: 'WhatsApp'
  },
  {
    id: 'c08',
    nombre: 'Armando Torres',
    ini: 'AT',
    seg: 'activo',
    motivo: 'cumple',
    ultima: 4,
    tel: '+57 319 233 1145',
    email: 'armando.t@gmail.com',
    compra: 'Bifocales',
    monto: 350000,
    cumple: '24 abr',
    canal: 'WhatsApp'
  },
  {
    id: 'c09',
    nombre: 'Daniela Mejía',
    ini: 'DM',
    seg: 'activo',
    motivo: 'postventa',
    ultima: 1,
    tel: '+57 316 709 4420',
    email: 'daniela.mejia@gmail.com',
    compra: 'Lentes ocupacionales',
    monto: 470000,
    cumple: '11 mar',
    canal: 'WhatsApp'
  },
  {
    id: 'c10',
    nombre: 'Jorge Vargas',
    ini: 'JV',
    seg: 'riesgo',
    motivo: 'control',
    ultima: 9,
    tel: '+57 313 118 5567',
    email: 'jvargas@empresa.com',
    compra: 'Montura titanio Silhouette',
    monto: 760000,
    cumple: '02 oct',
    canal: 'Email'
  },
  {
    id: 'c11',
    nombre: 'Paula Naranjo',
    ini: 'PN',
    seg: 'activo',
    motivo: null,
    ultima: 5,
    tel: '+57 317 902 3318',
    email: 'paula.naranjo@gmail.com',
    compra: 'Gafas recetadas',
    monto: 380000,
    cumple: '19 nov',
    canal: 'WhatsApp'
  },
  {
    id: 'c12',
    nombre: 'Felipe Cárdenas',
    ini: 'FC',
    seg: 'perdido',
    motivo: null,
    ultima: 16,
    tel: '+57 300 447 8890',
    email: 'felipe.c@gmail.com',
    compra: 'Monofocales',
    monto: 240000,
    cumple: '30 ago',
    canal: 'WhatsApp'
  },
  {
    id: 'c13',
    nombre: 'Lucía Restrepo',
    ini: 'LR',
    seg: 'activo',
    motivo: 'cumple',
    ultima: 2,
    tel: '+57 318 661 2204',
    email: 'lucia.r@outlook.com',
    compra: 'Progresivos Crizal',
    monto: 720000,
    cumple: '21 abr',
    canal: 'WhatsApp'
  },
  {
    id: 'c14',
    nombre: 'Andrés Quintero',
    ini: 'AQ',
    seg: 'riesgo',
    motivo: 'postventa',
    ultima: 7,
    tel: '+57 312 339 7751',
    email: 'andresq@gmail.com',
    compra: 'Lentes de contacto tóricos',
    monto: 410000,
    cumple: '06 dic',
    canal: 'WhatsApp'
  },
  {
    id: 'c15',
    nombre: 'Gabriela Soto',
    ini: 'GS',
    seg: 'activo',
    motivo: null,
    ultima: 3,
    tel: '+57 319 558 0043',
    email: 'gaby.soto@gmail.com',
    compra: 'Gafas de sol Prada',
    monto: 950000,
    cumple: '15 may',
    canal: 'Email'
  },
  {
    id: 'c16',
    nombre: 'Roberto Díaz',
    ini: 'RD',
    seg: 'perdido',
    motivo: null,
    ultima: 22,
    tel: '+57 301 226 9987',
    email: 'rdiaz@gmail.com',
    compra: 'Montura económica',
    monto: 180000,
    cumple: '08 jul',
    canal: 'WhatsApp'
  },
  {
    id: 'c17',
    nombre: 'Carolina Pinzón',
    ini: 'CP',
    seg: 'activo',
    motivo: 'control',
    ultima: 6,
    tel: '+57 316 003 4471',
    email: 'caro.pinzon@gmail.com',
    compra: 'Progresivos antirreflejo',
    monto: 690000,
    cumple: '27 oct',
    canal: 'WhatsApp'
  },
  {
    id: 'c18',
    nombre: 'Miguel Ángel Rey',
    ini: 'MR',
    seg: 'riesgo',
    motivo: 'control',
    ultima: 10,
    tel: '+57 314 770 1129',
    email: 'miguel.rey@gmail.com',
    compra: 'Bifocales',
    monto: 330000,
    cumple: '12 ene',
    canal: 'WhatsApp'
  },
  {
    id: 'c19',
    nombre: 'Natalia Ospina',
    ini: 'NO',
    seg: 'activo',
    motivo: 'postventa',
    ultima: 1,
    tel: '+57 318 449 2266',
    email: 'natalia.o@gmail.com',
    compra: 'Lentes de contacto Acuvue',
    monto: 290000,
    cumple: '04 sep',
    canal: 'WhatsApp'
  },
  {
    id: 'c20',
    nombre: 'Esteban Marín',
    ini: 'EM',
    seg: 'activo',
    motivo: null,
    ultima: 4,
    tel: '+57 312 885 6610',
    email: 'esteban.marin@gmail.com',
    compra: 'Gafas recetadas',
    monto: 360000,
    cumple: '23 jun',
    canal: 'WhatsApp'
  },
  {
    id: 'c21',
    nombre: 'Diana Salazar',
    ini: 'DS',
    seg: 'riesgo',
    motivo: 'control',
    ultima: 9,
    tel: '+57 317 220 7788',
    email: 'diana.salazar@gmail.com',
    compra: 'Monofocales Essilor',
    monto: 280000,
    cumple: '01 dic',
    canal: 'Email'
  },
  {
    id: 'c22',
    nombre: 'Tomás Herrera',
    ini: 'TH',
    seg: 'perdido',
    motivo: null,
    ultima: 18,
    tel: '+57 300 991 3345',
    email: 'tomas.h@gmail.com',
    compra: 'Montura deportiva',
    monto: 420000,
    cumple: '16 feb',
    canal: 'WhatsApp'
  },
  {
    id: 'c23',
    nombre: 'Camila Fuentes',
    ini: 'CF',
    seg: 'activo',
    motivo: 'cumple',
    ultima: 2,
    tel: '+57 319 074 5523',
    email: 'camila.f@gmail.com',
    compra: 'Progresivos Varilux',
    monto: 810000,
    cumple: '20 abr',
    canal: 'WhatsApp'
  },
  {
    id: 'c24',
    nombre: 'Sebastián León',
    ini: 'SL',
    seg: 'activo',
    motivo: null,
    ultima: 5,
    tel: '+57 316 558 1190',
    email: 'sebas.leon@gmail.com',
    compra: 'Gafas de sol polarizadas',
    monto: 390000,
    cumple: '29 may',
    canal: 'WhatsApp'
  }
]

export const VV_SEG: Record<Segmento, SegConfig> = {
  activo: { label: 'Activo', tag: 'green', status: 'active' },
  riesgo: { label: 'En riesgo', tag: 'gray', status: 'pending' },
  perdido: { label: 'Perdido', tag: 'gray', status: 'inactive' }
}

export const VV_MOTIVO: Record<Motivo, MotivoConfig> = {
  control: { label: 'Control anual', icon: 'View', tag: 'blue' },
  cumple: { label: 'Cumpleaños', icon: 'Star', tag: 'purple' },
  postventa: { label: 'Post-entrega', icon: 'Time', tag: 'cyan' }
}

export const VV_RECORDATORIOS: Recordatorio[] = [
  {
    id: 'r01',
    cli: 'c07',
    tipo: 'control',
    estado: 'pendiente',
    fecha: 'Hoy',
    dias: 11,
    canal: 'WhatsApp'
  },
  {
    id: 'r02',
    cli: 'c01',
    tipo: 'control',
    estado: 'pendiente',
    fecha: 'Hoy',
    dias: 11,
    canal: 'WhatsApp'
  },
  {
    id: 'r03',
    cli: 'c08',
    tipo: 'cumple',
    estado: 'pendiente',
    fecha: '24 abr',
    dias: 0,
    canal: 'WhatsApp'
  },
  {
    id: 'r04',
    cli: 'c10',
    tipo: 'control',
    estado: 'pendiente',
    fecha: 'Hoy',
    dias: 9,
    canal: 'Email'
  },
  {
    id: 'r05',
    cli: 'c04',
    tipo: 'control',
    estado: 'pendiente',
    fecha: 'Mañana',
    dias: 8,
    canal: 'Email'
  },
  {
    id: 'r06',
    cli: 'c14',
    tipo: 'postventa',
    estado: 'pendiente',
    fecha: 'Hoy',
    dias: 7,
    canal: 'WhatsApp'
  },
  {
    id: 'r07',
    cli: 'c18',
    tipo: 'control',
    estado: 'pendiente',
    fecha: '25 abr',
    dias: 10,
    canal: 'WhatsApp'
  },
  {
    id: 'r08',
    cli: 'c21',
    tipo: 'control',
    estado: 'pendiente',
    fecha: '25 abr',
    dias: 9,
    canal: 'Email'
  },
  {
    id: 'r09',
    cli: 'c13',
    tipo: 'cumple',
    estado: 'programado',
    fecha: '21 abr',
    dias: 0,
    canal: 'WhatsApp'
  },
  {
    id: 'r10',
    cli: 'c23',
    tipo: 'cumple',
    estado: 'programado',
    fecha: '20 abr',
    dias: 0,
    canal: 'WhatsApp'
  },
  {
    id: 'r11',
    cli: 'c09',
    tipo: 'postventa',
    estado: 'programado',
    fecha: '26 abr',
    dias: 1,
    canal: 'WhatsApp'
  },
  {
    id: 'r12',
    cli: 'c19',
    tipo: 'postventa',
    estado: 'programado',
    fecha: '27 abr',
    dias: 1,
    canal: 'WhatsApp'
  },
  {
    id: 'r13',
    cli: 'c17',
    tipo: 'control',
    estado: 'programado',
    fecha: '28 abr',
    dias: 6,
    canal: 'WhatsApp'
  },
  {
    id: 'r14',
    cli: 'c02',
    tipo: 'cumple',
    estado: 'enviado',
    fecha: '22 abr',
    dias: 0,
    canal: 'WhatsApp'
  },
  {
    id: 'r15',
    cli: 'c03',
    tipo: 'postventa',
    estado: 'enviado',
    fecha: '21 abr',
    dias: 0,
    canal: 'WhatsApp'
  }
]

export const VV_HISTORIAL: MensajeHistorial[] = [
  { id: 'h01', cli: 'c01', tipo: 'control', estado: 'leido', fecha: '22 abr', canal: 'WhatsApp' },
  {
    id: 'h02',
    cli: 'c02',
    tipo: 'cumple',
    estado: 'respondido',
    fecha: '22 abr',
    canal: 'WhatsApp'
  },
  { id: 'h03', cli: 'c03', tipo: 'postventa', estado: 'leido', fecha: '21 abr', canal: 'WhatsApp' },
  { id: 'h04', cli: 'c04', tipo: 'control', estado: 'entregado', fecha: '21 abr', canal: 'Email' },
  { id: 'h05', cli: 'c05', tipo: 'control', estado: 'leido', fecha: '20 abr', canal: 'WhatsApp' },
  {
    id: 'h06',
    cli: 'c09',
    tipo: 'postventa',
    estado: 'respondido',
    fecha: '20 abr',
    canal: 'WhatsApp'
  },
  { id: 'h07', cli: 'c13', tipo: 'cumple', estado: 'leido', fecha: '19 abr', canal: 'WhatsApp' },
  {
    id: 'h08',
    cli: 'c11',
    tipo: 'control',
    estado: 'sin-leer',
    fecha: '19 abr',
    canal: 'WhatsApp'
  },
  { id: 'h09', cli: 'c17', tipo: 'control', estado: 'leido', fecha: '18 abr', canal: 'WhatsApp' },
  { id: 'h10', cli: 'c15', tipo: 'cumple', estado: 'entregado', fecha: '18 abr', canal: 'Email' },
  {
    id: 'h11',
    cli: 'c19',
    tipo: 'postventa',
    estado: 'respondido',
    fecha: '17 abr',
    canal: 'WhatsApp'
  },
  { id: 'h12', cli: 'c20', tipo: 'control', estado: 'leido', fecha: '17 abr', canal: 'WhatsApp' },
  {
    id: 'h13',
    cli: 'c06',
    tipo: 'control',
    estado: 'sin-leer',
    fecha: '16 abr',
    canal: 'WhatsApp'
  },
  { id: 'h14', cli: 'c24', tipo: 'postventa', estado: 'leido', fecha: '16 abr', canal: 'WhatsApp' },
  {
    id: 'h15',
    cli: 'c08',
    tipo: 'cumple',
    estado: 'respondido',
    fecha: '15 abr',
    canal: 'WhatsApp'
  },
  { id: 'h16', cli: 'c10', tipo: 'control', estado: 'entregado', fecha: '15 abr', canal: 'Email' }
]

export const VV_HIST_ESTADO: Record<EstadoHistorial, HistEstadoConfig> = {
  respondido: { label: 'Respondido', status: 'active' },
  leido: { label: 'Leído', status: 'info' },
  entregado: { label: 'Entregado', status: 'inactive' },
  'sin-leer': { label: 'Sin leer', status: 'pending' }
}

export const VV_KPI: KPIs = {
  activos: 142,
  activosDelta: 8,
  riesgo: 38,
  riesgoCrit: 3,
  perdidos: 21,
  recuperados: 5,
  pendientes: 15,
  programados: 12,
  enviadosMes: 48,
  leidos: 35,
  tasaRespuesta: 34,
  tasaDelta: 11,
  ingresoMes: 18.4
}

export const VV_SERIE_MENSUAL: SerieMensual[] = [
  { mes: 'Nov', enviados: 31, respondidos: 8 },
  { mes: 'Dic', enviados: 44, respondidos: 12 },
  { mes: 'Ene', enviados: 38, respondidos: 11 },
  { mes: 'Feb', enviados: 41, respondidos: 13 },
  { mes: 'Mar', enviados: 46, respondidos: 15 },
  { mes: 'Abr', enviados: 48, respondidos: 16 }
]

export const VV_SEGMENTOS: SegmentoData[] = [
  { key: 'activo', label: 'Activos', valor: 142, color: '#0f62fe' },
  { key: 'riesgo', label: 'En riesgo', valor: 38, color: '#78a9ff' },
  { key: 'perdido', label: 'Perdidos', valor: 21, color: '#c6c6c6' }
]

export const VV_POR_TIPO: TipoData[] = [
  { label: 'Control anual', valor: 22, color: '#0f62fe' },
  { label: 'Cumpleaños', valor: 14, color: '#78a9ff' },
  { label: 'Post-entrega', valor: 12, color: '#009d9a' }
]

export const VV_TITULO: Record<string, string> = {
  control: 'Control visual anual',
  cumple: 'Tarjeta de cumpleaños',
  postventa: 'Seguimiento de adaptación'
}

export function vvCliente(id: string): Cliente | undefined {
  return VV_CLIENTES.find((c) => c.id === id)
}

export function vvFmtMonto(n: number): string {
  return '$' + n.toLocaleString('es-CO')
}
