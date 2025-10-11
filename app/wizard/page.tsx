'use client'

import { useState } from 'react'
import { Bot, Building2, Upload, ShoppingBag, MessageCircle, Wrench, ArrowRight, ArrowLeft, Check, Smartphone } from 'lucide-react'
import Link from 'next/link'

const agentTypes = [
  {
    id: 'sales',
    icon: <ShoppingBag className="w-8 h-8" />,
    title: 'Ventas',
    emoji: '🛍️',
    description: 'Impulsa conversiones, recomienda productos y cierra ventas automáticamente',
    features: ['Catálogo de productos', 'Recomendaciones IA', 'Carrito de compras', 'Seguimiento de pedidos']
  },
  {
    id: 'support',
    icon: <MessageCircle className="w-8 h-8" />,
    title: 'Atención al Cliente',
    emoji: '💬',
    description: 'Responde preguntas frecuentes y brinda soporte instantáneo 24/7',
    features: ['FAQ inteligente', 'Tickets automáticos', 'Escalamiento humano', 'Historial de conversaciones']
  },
  {
    id: 'assistance',
    icon: <Wrench className="w-8 h-8" />,
    title: 'Asistencia Técnica',
    emoji: '🔧',
    description: 'Resuelve problemas técnicos y guía a usuarios paso a paso',
    features: ['Diagnóstico automático', 'Guías interactivas', 'Base de conocimiento', 'Reportes de incidencias']
  }
]

const channels = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: '💚',
    description: 'Conecta con tus clientes en la app de mensajería más popular',
    users: '2B+ usuarios'
  },
  {
    id: 'messenger',
    name: 'Messenger',
    icon: '💙',
    description: 'Integra con Facebook Messenger para alcanzar tu audiencia',
    users: '1.3B+ usuarios'
  },
  {
    id: 'web',
    name: 'Widget Web',
    icon: '🌐',
    description: 'Añade un chat widget a tu sitio web con un simple código',
    users: 'Personalizable'
  }
]

export default function WizardPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: '',
    companyLogo: null as File | null,
    tone: 'friendly',
    agentType: '',
    selectedChannels: [] as string[]
  })

  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, companyLogo: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleChannel = (channelId: string) => {
    const newChannels = formData.selectedChannels.includes(channelId)
      ? formData.selectedChannels.filter(id => id !== channelId)
      : [...formData.selectedChannels, channelId]
    setFormData({ ...formData, selectedChannels: newChannels })
  }

  const canProceed = () => {
    if (currentStep === 1) return formData.companyName.trim() !== ''
    if (currentStep === 2) return formData.agentType !== ''
    if (currentStep === 3) return formData.selectedChannels.length > 0
    return false
  }

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="bg-background-secondary border-b border-borders-default">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">BexBot</span>
            </Link>
            <Link href="/dashboard" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
              Salir del wizard
            </Link>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-5xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                  currentStep >= step 
                    ? 'bg-accent-primary border-accent-primary text-white' 
                    : 'bg-background-secondary border-borders-default text-text-muted'
                }`}>
                  {currentStep > step ? <Check className="w-6 h-6" /> : step}
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-1 mx-4 rounded-full transition-all ${
                    currentStep > step ? 'bg-accent-primary' : 'bg-borders-default'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className={currentStep >= 1 ? 'text-text-primary font-semibold' : 'text-text-muted'}>Empresa</span>
            <span className={currentStep >= 2 ? 'text-text-primary font-semibold' : 'text-text-muted'}>Tipo de Agente</span>
            <span className={currentStep >= 3 ? 'text-text-primary font-semibold' : 'text-text-muted'}>Canales</span>
          </div>
        </div>

        {/* Step 1: Company Info */}
        {currentStep === 1 && (
          <div className="glass-card p-8 md:p-12 animate-fade-in">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-accent-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-accent-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Información de tu Empresa</h2>
                <p className="text-text-secondary">Personaliza tu bot con la identidad de tu marca</p>
              </div>

              <div className="space-y-6">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Nombre de la Empresa *</label>
                  <input
                    type="text"
                    placeholder="Ej: TechShop México"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="input-field w-full"
                  />
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Logo de la Empresa (Opcional)</label>
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 bg-background-secondary rounded-lg border-2 border-dashed border-borders-default flex items-center justify-center overflow-hidden">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                      ) : (
                        <Upload className="w-8 h-8 text-text-muted" />
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        id="logo-upload"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <label htmlFor="logo-upload" className="btn-secondary cursor-pointer inline-block">
                        Subir Logo
                      </label>
                      <p className="text-xs text-text-muted mt-2">PNG, JPG o SVG (máx. 2MB)</p>
                    </div>
                  </div>
                </div>

                {/* Tone Selection */}
                <div>
                  <label className="block text-sm font-semibold mb-3">Tono de Conversación *</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'formal', label: 'Formal', emoji: '👔', desc: 'Profesional y corporativo' },
                      { value: 'friendly', label: 'Amigable', emoji: '😊', desc: 'Cercano y conversacional' },
                      { value: 'casual', label: 'Casual', emoji: '🤙', desc: 'Relajado e informal' }
                    ].map((tone) => (
                      <button
                        key={tone.value}
                        onClick={() => setFormData({ ...formData, tone: tone.value })}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          formData.tone === tone.value
                            ? 'border-accent-primary bg-accent-primary/10'
                            : 'border-borders-default bg-background-secondary hover:border-accent-primary/50'
                        }`}
                      >
                        <div className="text-2xl mb-2">{tone.emoji}</div>
                        <div className="font-semibold mb-1">{tone.label}</div>
                        <div className="text-xs text-text-muted">{tone.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Agent Type */}
        {currentStep === 2 && (
          <div className="glass-card p-8 md:p-12 animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-accent-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-accent-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Tipo de Agente</h2>
                <p className="text-text-secondary">Selecciona el tipo de bot que mejor se adapte a tus necesidades</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {agentTypes.map((agent) => (
                  <button
                    key={agent.id}
                    onClick={() => setFormData({ ...formData, agentType: agent.id })}
                    className={`p-6 rounded-lg border-2 transition-all text-left hover:scale-105 ${
                      formData.agentType === agent.id
                        ? 'border-accent-primary bg-accent-primary/10'
                        : 'border-borders-default bg-background-secondary hover:border-accent-primary/50'
                    }`}
                  >
                    <div className="text-4xl mb-4">{agent.emoji}</div>
                    <h3 className="text-xl font-bold mb-2">{agent.title}</h3>
                    <p className="text-text-secondary text-sm mb-4">{agent.description}</p>
                    <div className="space-y-2">
                      {agent.features.map((feature, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs text-text-muted">
                          <Check className="w-3 h-3 text-accent-primary" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Channels */}
        {currentStep === 3 && (
          <div className="glass-card p-8 md:p-12 animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-accent-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-accent-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Canales de Comunicación</h2>
                <p className="text-text-secondary">Selecciona dónde quieres que tu bot esté disponible</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => toggleChannel(channel.id)}
                    className={`p-6 rounded-lg border-2 transition-all text-left hover:scale-105 ${
                      formData.selectedChannels.includes(channel.id)
                        ? 'border-accent-primary bg-accent-primary/10'
                        : 'border-borders-default bg-background-secondary hover:border-accent-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{channel.icon}</div>
                      {formData.selectedChannels.includes(channel.id) && (
                        <div className="w-6 h-6 bg-accent-primary rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{channel.name}</h3>
                    <p className="text-text-secondary text-sm mb-3">{channel.description}</p>
                    <div className="text-xs text-accent-primary font-semibold">{channel.users}</div>
                  </button>
                ))}
              </div>

              {/* Preview Section */}
              {formData.selectedChannels.length > 0 && (
                <div className="bg-background-secondary/50 rounded-lg p-6">
                  <h3 className="font-bold mb-4">Vista Previa del Chat</h3>
                  <div className="bg-background-primary rounded-lg p-4 max-w-md mx-auto">
                    <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-borders-default">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo" className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-accent-primary/20 rounded-full flex items-center justify-center">
                          <Bot className="w-5 h-5 text-accent-primary" />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold">{formData.companyName || 'Tu Empresa'}</div>
                        <div className="text-xs text-accent-primary">● En línea</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-background-secondary rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">¡Hola! 👋 Soy el asistente virtual de {formData.companyName || 'tu empresa'}. ¿En qué puedo ayudarte hoy?</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className={`btn-secondary flex items-center space-x-2 ${
              currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Anterior</span>
          </button>

          {currentStep < 3 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
              className={`btn-primary flex items-center space-x-2 ${
                !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span>Siguiente</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <Link
              href="/dashboard"
              className={`btn-primary flex items-center space-x-2 ${
                !canProceed() ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
              }`}
            >
              <span>Crear Bot</span>
              <Check className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
