'use client'

import { useState } from 'react'
import { Bot, Search, Settings, CheckCircle, XCircle, ExternalLink, Zap, Shield, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const integrations = [
  {
    id: 1,
    name: 'HubSpot CRM',
    category: 'CRM',
    icon: '🔗',
    description: 'Sincroniza contactos y conversaciones con HubSpot CRM automáticamente',
    status: 'connected',
    features: ['Sincronización de contactos', 'Historial de conversaciones', 'Automatización de tareas'],
    popularity: 'Muy Popular',
    setupTime: '5 min'
  },
  {
    id: 2,
    name: 'Salesforce',
    category: 'CRM',
    icon: '☁️',
    description: 'Integra tus bots con Salesforce para gestión completa de clientes',
    status: 'disconnected',
    features: ['Gestión de leads', 'Oportunidades de venta', 'Reportes personalizados'],
    popularity: 'Popular',
    setupTime: '10 min'
  },
  {
    id: 3,
    name: 'Google Analytics',
    category: 'Analytics',
    icon: '📊',
    description: 'Rastrea eventos y conversiones de tus bots en Google Analytics',
    status: 'connected',
    features: ['Eventos personalizados', 'Conversiones', 'Embudos de conversión'],
    popularity: 'Muy Popular',
    setupTime: '3 min'
  },
  {
    id: 4,
    name: 'Zapier',
    category: 'Automation',
    icon: '⚡',
    description: 'Conecta con más de 5000 aplicaciones a través de Zapier',
    status: 'disconnected',
    features: ['5000+ apps', 'Workflows automáticos', 'Triggers personalizados'],
    popularity: 'Muy Popular',
    setupTime: '5 min'
  },
  {
    id: 5,
    name: 'Stripe',
    category: 'Payments',
    icon: '💳',
    description: 'Procesa pagos directamente desde tus conversaciones',
    status: 'connected',
    features: ['Pagos seguros', 'Suscripciones', 'Facturación automática'],
    popularity: 'Popular',
    setupTime: '8 min'
  },
  {
    id: 6,
    name: 'Slack',
    category: 'Communication',
    icon: '💬',
    description: 'Recibe notificaciones de conversaciones importantes en Slack',
    status: 'connected',
    features: ['Notificaciones en tiempo real', 'Alertas personalizadas', 'Integración con equipos'],
    popularity: 'Popular',
    setupTime: '2 min'
  },
  {
    id: 7,
    name: 'Mailchimp',
    category: 'Marketing',
    icon: '📧',
    description: 'Sincroniza contactos y automatiza campañas de email marketing',
    status: 'disconnected',
    features: ['Listas de contactos', 'Campañas automáticas', 'Segmentación'],
    popularity: 'Popular',
    setupTime: '5 min'
  },
  {
    id: 8,
    name: 'Shopify',
    category: 'E-commerce',
    icon: '🛍️',
    description: 'Integra tu tienda Shopify con tus bots de ventas',
    status: 'disconnected',
    features: ['Catálogo de productos', 'Gestión de pedidos', 'Inventario en tiempo real'],
    popularity: 'Muy Popular',
    setupTime: '7 min'
  },
  {
    id: 9,
    name: 'Twilio',
    category: 'Communication',
    icon: '📱',
    description: 'Envía SMS y realiza llamadas desde tus bots',
    status: 'disconnected',
    features: ['SMS', 'Llamadas de voz', 'Verificación 2FA'],
    popularity: 'Popular',
    setupTime: '10 min'
  },
  {
    id: 10,
    name: 'Google Sheets',
    category: 'Productivity',
    icon: '📑',
    description: 'Exporta datos de conversaciones a Google Sheets automáticamente',
    status: 'connected',
    features: ['Exportación automática', 'Reportes personalizados', 'Sincronización en tiempo real'],
    popularity: 'Muy Popular',
    setupTime: '3 min'
  },
  {
    id: 11,
    name: 'Zendesk',
    category: 'Support',
    icon: '🎫',
    description: 'Crea tickets de soporte automáticamente desde conversaciones',
    status: 'disconnected',
    features: ['Creación de tickets', 'Escalamiento automático', 'Base de conocimiento'],
    popularity: 'Popular',
    setupTime: '8 min'
  },
  {
    id: 12,
    name: 'OpenAI',
    category: 'AI',
    icon: '🤖',
    description: 'Potencia tus bots con modelos de IA avanzados de OpenAI',
    status: 'connected',
    features: ['GPT-4', 'Respuestas contextuales', 'Procesamiento de lenguaje natural'],
    popularity: 'Muy Popular',
    setupTime: '5 min'
  }
]

const categories = ['Todos', 'CRM', 'Analytics', 'Automation', 'Payments', 'Communication', 'Marketing', 'E-commerce', 'Productivity', 'Support', 'AI']

export default function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [filterStatus, setFilterStatus] = useState<'all' | 'connected' | 'disconnected'>('all')

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || integration.category === selectedCategory
    const matchesStatus = filterStatus === 'all' || integration.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const connectedCount = integrations.filter(i => i.status === 'connected').length

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
                <Link href="/bots" className="text-text-secondary hover:text-text-primary transition-colors">Mis Bots</Link>
                <Link href="/analytics" className="text-text-secondary hover:text-text-primary transition-colors">Analytics</Link>
                <Link href="/integrations" className="text-text-primary font-semibold">Integraciones</Link>
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Integraciones</h1>
          <p className="text-text-secondary">Conecta BexBot con tus herramientas favoritas</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-accent-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{integrations.length}</div>
            <div className="text-text-muted text-sm">Integraciones Disponibles</div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent-secondary/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-accent-secondary" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{connectedCount}</div>
            <div className="text-text-muted text-sm">Conectadas</div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-charts-line/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-charts-line" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">+5</div>
            <div className="text-text-muted text-sm">Nuevas este mes</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="glass-card p-6 mb-6">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Buscar integraciones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field w-full pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    selectedCategory === category
                      ? 'bg-accent-primary text-white'
                      : 'bg-background-secondary text-text-secondary hover:bg-background-hover'
                  }`}
                >
                  {category}
                </button>
              ))}
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
                Todas
              </button>
              <button
                onClick={() => setFilterStatus('connected')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  filterStatus === 'connected'
                    ? 'bg-accent-primary text-white'
                    : 'bg-background-secondary text-text-secondary hover:bg-background-hover'
                }`}
              >
                Conectadas
              </button>
              <button
                onClick={() => setFilterStatus('disconnected')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  filterStatus === 'disconnected'
                    ? 'bg-accent-primary text-white'
                    : 'bg-background-secondary text-text-secondary hover:bg-background-hover'
                }`}
              >
                Disponibles
              </button>
            </div>
          </div>
        </div>

        {/* Integrations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => (
            <div key={integration.id} className="glass-card p-6 hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-4xl">{integration.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg">{integration.name}</h3>
                    <span className="text-xs text-text-muted">{integration.category}</span>
                  </div>
                </div>
                {integration.status === 'connected' ? (
                  <span className="flex items-center space-x-1 text-xs bg-accent-primary/20 text-accent-primary px-2 py-1 rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    <span>Conectado</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-1 text-xs bg-background-hover text-text-muted px-2 py-1 rounded-full">
                    <XCircle className="w-3 h-3" />
                    <span>Disponible</span>
                  </span>
                )}
              </div>

              <p className="text-text-secondary text-sm mb-4">{integration.description}</p>

              {/* Features */}
              <div className="space-y-2 mb-4 pb-4 border-b border-borders-default">
                {integration.features.map((feature, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-text-muted">
                    <div className="w-1.5 h-1.5 bg-accent-primary rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-text-muted mb-4">
                <span className="flex items-center space-x-1">
                  <Shield className="w-3 h-3" />
                  <span>{integration.popularity}</span>
                </span>
                <span>Setup: {integration.setupTime}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                {integration.status === 'connected' ? (
                  <>
                    <button 
                      onClick={() => alert(`Configurando ${integration.name}...\n\nAquí podrás ajustar:\n- Credenciales de API\n- Configuración de sincronización\n- Preferencias de datos`)}
                      className="btn-secondary flex-1 text-sm py-2"
                    >
                      Configurar
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm(`¿Desconectar ${integration.name}?`)) {
                          alert(`${integration.name} desconectado exitosamente`)
                        }
                      }}
                      className="btn-secondary px-3 py-2 hover:bg-accent-error/20 hover:text-accent-error"
                    >
                      Desconectar
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => alert(`Conectando ${integration.name}...\n\nSerás redirigido a la página de autenticación.\n\nTiempo estimado de configuración: ${integration.setupTime}`)}
                      className="btn-primary flex-1 text-sm py-2"
                    >
                      Conectar
                    </button>
                    <button 
                      onClick={() => window.open(`https://www.google.com/search?q=${integration.name}+integration`, '_blank')}
                      className="btn-secondary px-3 py-2"
                      title="Más información"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredIntegrations.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-background-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-text-muted" />
            </div>
            <h3 className="text-xl font-bold mb-2">No se encontraron integraciones</h3>
            <p className="text-text-muted">Intenta con otros términos de búsqueda o filtros</p>
          </div>
        )}
      </div>
    </div>
  )
}
