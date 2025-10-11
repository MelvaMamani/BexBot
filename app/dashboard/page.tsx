'use client'

import { useState } from 'react'
import { Bot, MessageSquare, TrendingUp, Users, Plus, Search, MoreVertical, Power, Settings, BarChart3, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const conversationData = [
  { name: 'Lun', conversaciones: 245 },
  { name: 'Mar', conversaciones: 312 },
  { name: 'Mié', conversaciones: 289 },
  { name: 'Jue', conversaciones: 398 },
  { name: 'Vie', conversaciones: 445 },
  { name: 'Sáb', conversaciones: 201 },
  { name: 'Dom', conversaciones: 178 }
]

const conversionData = [
  { name: 'Ene', conversiones: 65 },
  { name: 'Feb', conversiones: 78 },
  { name: 'Mar', conversiones: 85 },
  { name: 'Abr', conversiones: 92 },
  { name: 'May', conversiones: 88 }
]

const bots = [
  { id: 1, name: 'Bot de Ventas', type: 'Ventas', status: 'active', conversations: 1234, channels: ['WhatsApp', 'Web'], lastActive: 'Hace 2 min' },
  { id: 2, name: 'Soporte Técnico', type: 'Asistencia', status: 'active', conversations: 856, channels: ['Messenger', 'Web'], lastActive: 'Hace 5 min' },
  { id: 3, name: 'Atención Cliente', type: 'Atención', status: 'active', conversations: 2103, channels: ['WhatsApp', 'Messenger', 'Web'], lastActive: 'Hace 1 min' },
  { id: 4, name: 'Bot Educativo', type: 'Educación', status: 'inactive', conversations: 432, channels: ['Web'], lastActive: 'Hace 2 horas' }
]

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('')

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
                <Link href="/dashboard" className="text-text-primary font-semibold">Dashboard</Link>
                <Link href="/bots" className="text-text-secondary hover:text-text-primary transition-colors">Mis Bots</Link>
                <Link href="/analytics" className="text-text-secondary hover:text-text-primary transition-colors">Analytics</Link>
                <Link href="/integrations" className="text-text-secondary hover:text-text-primary transition-colors">Integraciones</Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <button className="w-10 h-10 bg-background-hover rounded-lg flex items-center justify-center hover:bg-background-hover/80 transition-colors">
                <Settings className="w-5 h-5 text-text-secondary" />
              </button>
              <div className="w-10 h-10 bg-accent-primary/20 rounded-lg flex items-center justify-center text-accent-primary font-bold">
                MG
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Bienvenido de vuelta, María 👋</h1>
          <p className="text-text-secondary">Aquí está el resumen de tus bots conversacionales</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-accent-primary" />
              </div>
              <span className="text-accent-primary text-sm font-semibold">+12%</span>
            </div>
            <div className="text-3xl font-bold mb-1">4</div>
            <div className="text-text-muted text-sm">Bots Activos</div>
          </div>

          <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent-secondary/20 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-accent-secondary" />
              </div>
              <span className="text-accent-primary text-sm font-semibold">+28%</span>
            </div>
            <div className="text-3xl font-bold mb-1">2,068</div>
            <div className="text-text-muted text-sm">Conversaciones (7d)</div>
          </div>

          <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent-warning/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent-warning" />
              </div>
              <span className="text-accent-primary text-sm font-semibold">+15%</span>
            </div>
            <div className="text-3xl font-bold mb-1">82%</div>
            <div className="text-text-muted text-sm">Tasa de Conversión</div>
          </div>

          <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-charts-line/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-charts-line" />
              </div>
              <span className="text-accent-primary text-sm font-semibold">+8%</span>
            </div>
            <div className="text-3xl font-bold mb-1">1,542</div>
            <div className="text-text-muted text-sm">Usuarios Únicos</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Conversations Chart */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold mb-1">Conversaciones</h3>
                <p className="text-text-muted text-sm">Últimos 7 días</p>
              </div>
              <BarChart3 className="w-5 h-5 text-accent-primary" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={conversationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94A3B8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#94A3B8" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#F8FAFC'
                  }} 
                />
                <Line type="monotone" dataKey="conversaciones" stroke="#22D3EE" strokeWidth={3} dot={{ fill: '#22D3EE', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Conversions Chart */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold mb-1">Conversiones</h3>
                <p className="text-text-muted text-sm">Últimos 5 meses</p>
              </div>
              <TrendingUp className="w-5 h-5 text-accent-primary" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94A3B8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#94A3B8" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#F8FAFC'
                  }} 
                />
                <Bar dataKey="conversiones" fill="#10B981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bots List Section */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold mb-1">Mis Bots</h3>
              <p className="text-text-muted text-sm">Gestiona y monitorea tus bots conversacionales</p>
            </div>
            <Link href="/wizard" className="btn-primary flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Crear Nuevo Bot</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Buscar bots..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field w-full pl-10"
              />
            </div>
          </div>

          {/* Bots Table */}
          <div className="space-y-4">
            {bots.map((bot) => (
              <div key={bot.id} className="bg-background-secondary/50 rounded-lg p-4 hover:bg-background-hover transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      bot.status === 'active' ? 'bg-accent-primary/20' : 'bg-background-hover'
                    }`}>
                      <Bot className={`w-6 h-6 ${bot.status === 'active' ? 'text-accent-primary' : 'text-text-muted'}`} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h4 className="font-bold text-lg">{bot.name}</h4>
                        {bot.status === 'active' ? (
                          <span className="flex items-center space-x-1 text-xs bg-accent-primary/20 text-accent-primary px-2 py-1 rounded-full">
                            <CheckCircle className="w-3 h-3" />
                            <span>Activo</span>
                          </span>
                        ) : (
                          <span className="flex items-center space-x-1 text-xs bg-background-hover text-text-muted px-2 py-1 rounded-full">
                            <AlertCircle className="w-3 h-3" />
                            <span>Inactivo</span>
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-text-muted">
                        <span className="flex items-center space-x-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{bot.conversations.toLocaleString()} conversaciones</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{bot.lastActive}</span>
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        {bot.channels.map((channel, i) => (
                          <span key={i} className="text-xs bg-background-primary px-2 py-1 rounded">
                            {channel}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Link href={`/bot/${bot.id}`} className="btn-secondary px-4 py-2 text-sm">
                      Ver Detalles
                    </Link>
                    <button className="w-10 h-10 bg-background-hover rounded-lg flex items-center justify-center hover:bg-background-hover/80 transition-colors">
                      <MoreVertical className="w-5 h-5 text-text-secondary" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
