'use client'

import { useState } from 'react'
import { Bot, Search, Plus, MoreVertical, Power, Settings, MessageSquare, Clock, CheckCircle, AlertCircle, Trash2, Copy, Edit } from 'lucide-react'
import Link from 'next/link'

const allBots = [
  { 
    id: 1, 
    name: 'Bot de Ventas', 
    type: 'Ventas', 
    status: 'active', 
    conversations: 1234, 
    channels: ['WhatsApp', 'Web'], 
    lastActive: 'Hace 2 min',
    createdAt: '15 Abr 2024',
    responseRate: 94
  },
  { 
    id: 2, 
    name: 'Soporte Técnico', 
    type: 'Asistencia', 
    status: 'active', 
    conversations: 856, 
    channels: ['Messenger', 'Web'], 
    lastActive: 'Hace 5 min',
    createdAt: '10 Abr 2024',
    responseRate: 89
  },
  { 
    id: 3, 
    name: 'Atención Cliente', 
    type: 'Atención', 
    status: 'active', 
    conversations: 2103, 
    channels: ['WhatsApp', 'Messenger', 'Web'], 
    lastActive: 'Hace 1 min',
    createdAt: '5 Abr 2024',
    responseRate: 97
  },
  { 
    id: 4, 
    name: 'Bot Educativo', 
    type: 'Educación', 
    status: 'inactive', 
    conversations: 432, 
    channels: ['Web'], 
    lastActive: 'Hace 2 horas',
    createdAt: '1 Abr 2024',
    responseRate: 82
  },
  { 
    id: 5, 
    name: 'E-commerce Assistant', 
    type: 'Ventas', 
    status: 'active', 
    conversations: 1567, 
    channels: ['WhatsApp', 'Web'], 
    lastActive: 'Hace 3 min',
    createdAt: '28 Mar 2024',
    responseRate: 91
  },
  { 
    id: 6, 
    name: 'Reservaciones', 
    type: 'Atención', 
    status: 'active', 
    conversations: 678, 
    channels: ['Messenger'], 
    lastActive: 'Hace 10 min',
    createdAt: '20 Mar 2024',
    responseRate: 88
  }
]

export default function BotsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')

  const filteredBots = allBots.filter(bot => {
    const matchesSearch = bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bot.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || bot.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const activeBotsCount = allBots.filter(b => b.status === 'active').length
  const totalConversations = allBots.reduce((sum, b) => sum + b.conversations, 0)

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
                <Link href="/bots" className="text-text-primary font-semibold">Mis Bots</Link>
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
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Mis Bots</h1>
            <p className="text-text-secondary">Gestiona todos tus bots conversacionales</p>
          </div>
          <Link href="/wizard" className="btn-primary flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Crear Nuevo Bot</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-accent-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{allBots.length}</div>
            <div className="text-text-muted text-sm">Total de Bots</div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent-secondary/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-accent-secondary" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{activeBotsCount}</div>
            <div className="text-text-muted text-sm">Bots Activos</div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-charts-line/20 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-charts-line" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{totalConversations.toLocaleString()}</div>
            <div className="text-text-muted text-sm">Conversaciones Totales</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="glass-card p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Buscar bots..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field w-full pl-10"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-accent-primary text-white'
                    : 'bg-background-secondary text-text-secondary hover:bg-background-hover'
                }`}
              >
                Todos ({allBots.length})
              </button>
              <button
                onClick={() => setFilterStatus('active')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  filterStatus === 'active'
                    ? 'bg-accent-primary text-white'
                    : 'bg-background-secondary text-text-secondary hover:bg-background-hover'
                }`}
              >
                Activos ({activeBotsCount})
              </button>
              <button
                onClick={() => setFilterStatus('inactive')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  filterStatus === 'inactive'
                    ? 'bg-accent-primary text-white'
                    : 'bg-background-secondary text-text-secondary hover:bg-background-hover'
                }`}
              >
                Inactivos ({allBots.length - activeBotsCount})
              </button>
            </div>
          </div>
        </div>

        {/* Bots Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredBots.map((bot) => (
            <div key={bot.id} className="glass-card p-6 hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${
                    bot.status === 'active' ? 'bg-accent-primary/20' : 'bg-background-hover'
                  }`}>
                    <Bot className={`w-7 h-7 ${bot.status === 'active' ? 'text-accent-primary' : 'text-text-muted'}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{bot.name}</h3>
                    <span className="text-xs text-text-muted">{bot.type}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
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
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-borders-default">
                <div>
                  <div className="text-2xl font-bold text-accent-primary">{bot.conversations.toLocaleString()}</div>
                  <div className="text-xs text-text-muted">Conversaciones</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent-secondary">{bot.responseRate}%</div>
                  <div className="text-xs text-text-muted">Tasa Respuesta</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-charts-line">{bot.channels.length}</div>
                  <div className="text-xs text-text-muted">Canales</div>
                </div>
              </div>

              {/* Channels */}
              <div className="flex items-center space-x-2 mb-4">
                {bot.channels.map((channel, i) => (
                  <span key={i} className="text-xs bg-background-primary px-2 py-1 rounded">
                    {channel}
                  </span>
                ))}
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-text-muted mb-4">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{bot.lastActive}</span>
                </span>
                <span>Creado: {bot.createdAt}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Link href={`/bot/${bot.id}`} className="btn-primary flex-1 text-sm py-2 text-center">
                  Ver Detalles
                </Link>
                <Link href={`/bot/${bot.id}`} className="btn-secondary px-3 py-2" title="Editar">
                  <Edit className="w-4 h-4" />
                </Link>
                <button 
                  onClick={() => {
                    alert(`Bot "${bot.name}" copiado exitosamente!`)
                  }}
                  className="btn-secondary px-3 py-2"
                  title="Duplicar"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    if (confirm(`¿Estás seguro de eliminar el bot "${bot.name}"?`)) {
                      alert(`Bot "${bot.name}" eliminado`)
                    }
                  }}
                  className="btn-secondary px-3 py-2 hover:bg-accent-error/20 hover:text-accent-error"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBots.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-background-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="w-10 h-10 text-text-muted" />
            </div>
            <h3 className="text-xl font-bold mb-2">No se encontraron bots</h3>
            <p className="text-text-muted mb-6">Intenta con otros términos de búsqueda o filtros</p>
            <Link href="/wizard" className="btn-primary inline-flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Crear Nuevo Bot</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
