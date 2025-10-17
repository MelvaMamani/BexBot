'use client'

import { useState } from 'react'
import { Bot, TrendingUp, TrendingDown, MessageSquare, Users, Clock, ThumbsUp, Download, Calendar } from 'lucide-react'
import Link from 'next/link'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const conversationTrend = [
  { date: '01 May', conversaciones: 245, resueltas: 198, escaladas: 47 },
  { date: '08 May', conversaciones: 312, resueltas: 267, escaladas: 45 },
  { date: '15 May', conversaciones: 289, resueltas: 241, escaladas: 48 },
  { date: '22 May', conversaciones: 398, resueltas: 342, escaladas: 56 },
  { date: '29 May', conversaciones: 445, resueltas: 389, escaladas: 56 }
]

const hourlyData = [
  { hour: '00:00', conversaciones: 12 },
  { hour: '03:00', conversaciones: 8 },
  { hour: '06:00', conversaciones: 15 },
  { hour: '09:00', conversaciones: 89 },
  { hour: '12:00', conversaciones: 145 },
  { hour: '15:00', conversaciones: 178 },
  { hour: '18:00', conversaciones: 134 },
  { hour: '21:00', conversaciones: 67 }
]

const channelData = [
  { name: 'WhatsApp', value: 45, color: '#10B981' },
  { name: 'Web Widget', value: 35, color: '#22D3EE' },
  { name: 'Messenger', value: 20, color: '#14B8A6' }
]

const topIntents = [
  { intent: 'Información de productos', count: 1234, percentage: 28 },
  { intent: 'Estado de pedido', count: 987, percentage: 22 },
  { intent: 'Soporte técnico', count: 756, percentage: 17 },
  { intent: 'Precios y promociones', count: 654, percentage: 15 },
  { intent: 'Horarios de atención', count: 432, percentage: 10 },
  { intent: 'Otros', count: 356, percentage: 8 }
]

const recommendations = [
  {
    type: 'improvement',
    title: 'Optimiza respuestas de soporte técnico',
    description: 'El 23% de las conversaciones de soporte técnico se escalan a agentes humanos. Considera agregar más respuestas automáticas.',
    impact: 'Alto'
  },
  {
    type: 'success',
    title: 'Excelente rendimiento en horario pico',
    description: 'Tu bot maneja eficientemente el 87% de conversaciones entre 12:00 y 15:00 hrs.',
    impact: 'Positivo'
  },
  {
    type: 'warning',
    title: 'Baja actividad en fines de semana',
    description: 'Considera promocionar el bot para aumentar engagement los sábados y domingos.',
    impact: 'Medio'
  }
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d')

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="bg-background-secondary border-b border-borders-default sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold gradient-text">BexBot</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-6 ml-8">
                <Link href="/dashboard" className="text-text-secondary hover:text-text-primary transition-colors">Dashboard</Link>
                <Link href="/templates" className="text-text-secondary hover:text-text-primary transition-colors">Templates</Link>
                <Link href="/analytics" className="text-text-primary font-semibold">Analytics</Link>
              </nav>
            </div>

            <button 
              onClick={() => {
                alert('Exportando reporte en formato PDF...\n\nEl reporte incluye:\n- Métricas generales\n- Gráficos de tendencias\n- Análisis de canales\n- Intenciones principales\n- Recomendaciones')
              }}
              className="btn-secondary flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Exportar Reporte</span>
            </button>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Analytics & Reportes</h1>
            <p className="text-text-secondary">Métricas detalladas del rendimiento de tus bots</p>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center space-x-2 bg-background-secondary rounded-lg p-1">
            {['24h', '7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                  timeRange === range
                    ? 'bg-accent-primary text-white'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-accent-primary" />
              </div>
              <div className="flex items-center space-x-1 text-accent-primary text-sm font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span>+28%</span>
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">2,068</div>
            <div className="text-text-muted text-sm">Total Conversaciones</div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent-secondary/20 rounded-lg flex items-center justify-center">
                <ThumbsUp className="w-6 h-6 text-accent-secondary" />
              </div>
              <div className="flex items-center space-x-1 text-accent-primary text-sm font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span>+5%</span>
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">87.3%</div>
            <div className="text-text-muted text-sm">Tasa de Resolución</div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-charts-line/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-charts-line" />
              </div>
              <div className="flex items-center space-x-1 text-accent-primary text-sm font-semibold">
                <TrendingDown className="w-4 h-4" />
                <span>-12%</span>
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">2.4s</div>
            <div className="text-text-muted text-sm">Tiempo Promedio Respuesta</div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent-warning/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-accent-warning" />
              </div>
              <div className="flex items-center space-x-1 text-accent-primary text-sm font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span>+15%</span>
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">1,542</div>
            <div className="text-text-muted text-sm">Usuarios Únicos</div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Conversation Trend */}
          <div className="lg:col-span-2 glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold mb-1">Tendencia de Conversaciones</h3>
                <p className="text-text-muted text-sm">Últimos 30 días</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversationTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94A3B8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#94A3B8" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#F8FAFC'
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="conversaciones" stroke="#22D3EE" strokeWidth={3} name="Total" />
                <Line type="monotone" dataKey="resueltas" stroke="#10B981" strokeWidth={2} name="Resueltas" />
                <Line type="monotone" dataKey="escaladas" stroke="#F59E0B" strokeWidth={2} name="Escaladas" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Channel Distribution */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-6">Distribución por Canal</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {channelData.map((channel, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: channel.color }}></div>
                    <span>{channel.name}</span>
                  </div>
                  <span className="font-semibold">{channel.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Hourly Activity */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-6">Actividad por Hora</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="hour" stroke="#94A3B8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#94A3B8" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#F8FAFC'
                  }} 
                />
                <Bar dataKey="conversaciones" fill="#10B981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Intents */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-6">Intenciones Más Frecuentes</h3>
            <div className="space-y-4">
              {topIntents.map((intent, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="font-semibold">{intent.intent}</span>
                    <span className="text-text-muted">{intent.count}</span>
                  </div>
                  <div className="w-full bg-background-secondary rounded-full h-2">
                    <div 
                      className="bg-accent-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${intent.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
            <span>🤖</span>
            <span>Recomendaciones IA</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.map((rec, i) => (
              <div key={i} className={`p-4 rounded-lg border-2 ${
                rec.type === 'improvement' ? 'border-accent-warning/50 bg-accent-warning/5' :
                rec.type === 'success' ? 'border-accent-primary/50 bg-accent-primary/5' :
                'border-accent-secondary/50 bg-accent-secondary/5'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    rec.type === 'improvement' ? 'bg-accent-warning/20 text-accent-warning' :
                    rec.type === 'success' ? 'bg-accent-primary/20 text-accent-primary' :
                    'bg-accent-secondary/20 text-accent-secondary'
                  }`}>
                    {rec.impact}
                  </span>
                </div>
                <h4 className="font-bold mb-2">{rec.title}</h4>
                <p className="text-sm text-text-secondary">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
