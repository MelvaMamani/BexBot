'use client'

import { useState } from 'react'
import { Bot, ArrowLeft, Settings, Play, Pause, MessageSquare, Zap, Clock, Users, Link as LinkIcon, Code, Save, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'

const flowNodes = [
  { id: 1, type: 'start', label: 'Inicio', x: 100, y: 100, connections: [2] },
  { id: 2, type: 'message', label: '¡Hola! ¿En qué puedo ayudarte?', x: 100, y: 200, connections: [3, 4] },
  { id: 3, type: 'option', label: 'Información de productos', x: 50, y: 320, connections: [5] },
  { id: 4, type: 'option', label: 'Soporte técnico', x: 200, y: 320, connections: [6] },
  { id: 5, type: 'message', label: 'Aquí está nuestro catálogo...', x: 50, y: 440, connections: [] },
  { id: 6, type: 'message', label: 'Conectando con un agente...', x: 200, y: 440, connections: [] }
]

const quickReplies = [
  { id: 1, trigger: 'hola', response: '¡Hola! Bienvenido a nuestro servicio. ¿En qué puedo ayudarte?' },
  { id: 2, trigger: 'horario', response: 'Nuestro horario de atención es de lunes a viernes de 9:00 AM a 6:00 PM.' },
  { id: 3, trigger: 'precio', response: 'Puedo ayudarte con información de precios. ¿Qué producto te interesa?' },
  { id: 4, trigger: 'contacto', response: 'Puedes contactarnos al +52 55 1234 5678 o escribirnos a info@empresa.com' }
]

const integrations = [
  { id: 1, name: 'HubSpot CRM', status: 'connected', icon: '🔗' },
  { id: 2, name: 'Google Analytics', status: 'connected', icon: '📊' },
  { id: 3, name: 'Zapier', status: 'disconnected', icon: '⚡' },
  { id: 4, name: 'Salesforce', status: 'disconnected', icon: '☁️' }
]

export default function BotDetailPage() {
  const [activeTab, setActiveTab] = useState<'flows' | 'replies' | 'settings' | 'integrations'>('flows')
  const [botStatus, setBotStatus] = useState<'active' | 'paused'>('active')
  const [selectedNode, setSelectedNode] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="bg-background-secondary border-b border-borders-default sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-text-secondary hover:text-text-primary transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity mr-4">
                <div className="w-8 h-8 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold gradient-text">BexBot</span>
              </Link>
              <div className="flex items-center space-x-3 pl-4 border-l border-borders-default">
                <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-accent-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Bot de Ventas</h1>
                  <div className="flex items-center space-x-2 text-sm text-text-muted">
                    <span className={`w-2 h-2 rounded-full ${botStatus === 'active' ? 'bg-accent-primary' : 'bg-text-muted'}`}></span>
                    <span>{botStatus === 'active' ? 'Activo' : 'Pausado'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setBotStatus(botStatus === 'active' ? 'paused' : 'active')}
                className={`btn-secondary flex items-center space-x-2 ${
                  botStatus === 'active' ? 'bg-accent-warning/20 text-accent-warning' : 'bg-accent-primary/20 text-accent-primary'
                }`}
              >
                {botStatus === 'active' ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pausar</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Activar</span>
                  </>
                )}
              </button>
              <button className="btn-primary flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-background-secondary border-r border-borders-default min-h-[calc(100vh-73px)] p-4">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('flows')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'flows' ? 'bg-accent-primary/20 text-accent-primary' : 'text-text-secondary hover:bg-background-hover'
              }`}
            >
              <Zap className="w-5 h-5" />
              <span className="font-semibold">Editor de Flujos</span>
            </button>
            <button
              onClick={() => setActiveTab('replies')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'replies' ? 'bg-accent-primary/20 text-accent-primary' : 'text-text-secondary hover:bg-background-hover'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="font-semibold">Respuestas Rápidas</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'settings' ? 'bg-accent-primary/20 text-accent-primary' : 'text-text-secondary hover:bg-background-hover'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className="font-semibold">Configuración</span>
            </button>
            <button
              onClick={() => setActiveTab('integrations')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'integrations' ? 'bg-accent-primary/20 text-accent-primary' : 'text-text-secondary hover:bg-background-hover'
              }`}
            >
              <LinkIcon className="w-5 h-5" />
              <span className="font-semibold">Integraciones</span>
            </button>
          </nav>

          {/* Quick Stats */}
          <div className="mt-8 space-y-4">
            <div className="glass-card p-4">
              <div className="flex items-center justify-between mb-2">
                <MessageSquare className="w-5 h-5 text-accent-primary" />
                <span className="text-xs text-accent-primary">+12%</span>
              </div>
              <div className="text-2xl font-bold">1,234</div>
              <div className="text-xs text-text-muted">Conversaciones hoy</div>
            </div>
            <div className="glass-card p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-5 h-5 text-accent-secondary" />
                <span className="text-xs text-accent-primary">+8%</span>
              </div>
              <div className="text-2xl font-bold">856</div>
              <div className="text-xs text-text-muted">Usuarios activos</div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Flow Editor Tab */}
          {activeTab === 'flows' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Editor de Flujos</h2>
                  <p className="text-text-muted">Diseña la conversación de tu bot con drag-and-drop</p>
                </div>
                <button className="btn-primary flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Agregar Nodo</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Flow Canvas */}
                <div className="lg:col-span-2 glass-card p-6 min-h-[600px] relative bg-background-secondary/30">
                  <div className="absolute inset-0 p-6" style={{ 
                    backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}>
                    {/* Flow Nodes */}
                    {flowNodes.map((node) => (
                      <div key={node.id}>
                        {/* Connections */}
                        {node.connections.map((targetId) => {
                          const target = flowNodes.find(n => n.id === targetId)
                          if (!target) return null
                          return (
                            <svg key={`${node.id}-${targetId}`} className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                              <line
                                x1={node.x + 100}
                                y1={node.y + 40}
                                x2={target.x + 100}
                                y2={target.y}
                                stroke="#10B981"
                                strokeWidth="2"
                                markerEnd="url(#arrowhead)"
                              />
                              <defs>
                                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                  <polygon points="0 0, 10 3, 0 6" fill="#10B981" />
                                </marker>
                              </defs>
                            </svg>
                          )
                        })}

                        {/* Node */}
                        <div
                          onClick={() => setSelectedNode(node.id)}
                          className={`absolute cursor-pointer transition-all hover:scale-105 ${
                            selectedNode === node.id ? 'ring-2 ring-accent-primary' : ''
                          }`}
                          style={{ 
                            left: `${node.x}px`, 
                            top: `${node.y}px`,
                            zIndex: 10
                          }}
                        >
                          <div className={`w-48 p-4 rounded-lg shadow-lg ${
                            node.type === 'start' ? 'bg-accent-primary text-white' :
                            node.type === 'message' ? 'bg-background-card border border-borders-default' :
                            'bg-accent-secondary/20 border border-accent-secondary'
                          }`}>
                            <div className="text-xs font-semibold mb-1 opacity-70">
                              {node.type === 'start' ? '🚀 INICIO' : 
                               node.type === 'message' ? '💬 MENSAJE' : 
                               '🔘 OPCIÓN'}
                            </div>
                            <div className="text-sm font-medium">{node.label}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Node Properties */}
                <div className="glass-card p-6">
                  <h3 className="font-bold mb-4">Propiedades del Nodo</h3>
                  {selectedNode ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Tipo</label>
                        <select className="input-field w-full">
                          <option>Mensaje</option>
                          <option>Opción</option>
                          <option>Condición</option>
                          <option>Acción</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Contenido</label>
                        <textarea 
                          className="input-field w-full min-h-[100px]"
                          placeholder="Escribe el mensaje..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Delay (ms)</label>
                        <input type="number" className="input-field w-full" defaultValue="500" />
                      </div>
                      <button className="btn-secondary w-full flex items-center justify-center space-x-2 text-accent-error">
                        <Trash2 className="w-4 h-4" />
                        <span>Eliminar Nodo</span>
                      </button>
                    </div>
                  ) : (
                    <p className="text-text-muted text-sm">Selecciona un nodo para editar sus propiedades</p>
                  )}
                </div>
              </div>

              {/* Live Preview */}
              <div className="mt-6 glass-card p-6">
                <h3 className="font-bold mb-4">Vista Previa en Vivo</h3>
                <div className="bg-background-primary rounded-lg p-4 max-w-md">
                  <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-borders-default">
                    <div className="w-10 h-10 bg-accent-primary/20 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-accent-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">Bot de Ventas</div>
                      <div className="text-xs text-accent-primary">● En línea</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-background-secondary rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">¡Hola! ¿En qué puedo ayudarte?</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-secondary text-xs px-3 py-2">Información de productos</button>
                      <button className="btn-secondary text-xs px-3 py-2">Soporte técnico</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Replies Tab */}
          {activeTab === 'replies' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Respuestas Rápidas</h2>
                  <p className="text-text-muted">Configura respuestas automáticas para palabras clave</p>
                </div>
                <button className="btn-primary flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Nueva Respuesta</span>
                </button>
              </div>

              <div className="space-y-4">
                {quickReplies.map((reply) => (
                  <div key={reply.id} className="glass-card p-6 hover:scale-[1.01] transition-transform">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-xs bg-accent-primary/20 text-accent-primary px-2 py-1 rounded font-mono">
                            {reply.trigger}
                          </span>
                          <span className="text-text-muted text-xs">→</span>
                        </div>
                        <p className="text-text-secondary">{reply.response}</p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button className="btn-secondary px-3 py-2 text-sm">Editar</button>
                        <button className="w-8 h-8 bg-background-hover rounded-lg flex items-center justify-center hover:bg-accent-error/20 hover:text-accent-error transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Configuración del Bot</h2>

              <div className="space-y-6">
                {/* General Settings */}
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-4">General</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Nombre del Bot</label>
                      <input type="text" className="input-field w-full" defaultValue="Bot de Ventas" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Descripción</label>
                      <textarea className="input-field w-full min-h-[80px]" defaultValue="Bot especializado en ventas y recomendaciones de productos" />
                    </div>
                  </div>
                </div>

                {/* Schedule Settings */}
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-accent-primary" />
                    <span>Horarios de Atención</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Lunes a Viernes</span>
                      <div className="flex items-center space-x-2">
                        <input type="time" className="input-field" defaultValue="09:00" />
                        <span className="text-text-muted">-</span>
                        <input type="time" className="input-field" defaultValue="18:00" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Sábado</span>
                      <div className="flex items-center space-x-2">
                        <input type="time" className="input-field" defaultValue="10:00" />
                        <span className="text-text-muted">-</span>
                        <input type="time" className="input-field" defaultValue="14:00" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Escalamiento automático a agente humano fuera de horario</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Widget Settings */}
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                    <Code className="w-5 h-5 text-accent-primary" />
                    <span>Código de Integración</span>
                  </h3>
                  <p className="text-text-muted text-sm mb-4">Copia este código en tu sitio web antes del cierre de la etiqueta &lt;/body&gt;</p>
                  <div className="bg-background-primary rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <code className="text-accent-secondary">
                      {`<script src="https://bexbot.com/widget.js"></script>\n<script>\n  BexBot.init({ botId: 'bot_12345' });\n</script>`}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Integraciones</h2>
                  <p className="text-text-muted">Conecta tu bot con tus herramientas favoritas</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {integrations.map((integration) => (
                  <div key={integration.id} className="glass-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{integration.icon}</div>
                        <div>
                          <h3 className="font-bold">{integration.name}</h3>
                          <span className={`text-xs ${
                            integration.status === 'connected' ? 'text-accent-primary' : 'text-text-muted'
                          }`}>
                            {integration.status === 'connected' ? '● Conectado' : '○ Desconectado'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className={`w-full ${
                      integration.status === 'connected' ? 'btn-secondary' : 'btn-primary'
                    }`}>
                      {integration.status === 'connected' ? 'Desconectar' : 'Conectar'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
