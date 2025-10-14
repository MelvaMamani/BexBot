'use client'

import { useState } from 'react'
import { Bot, MessageSquare, Zap, Shield, TrendingUp, CheckCircle, Star, ArrowRight, Sparkles, Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background-primary/80 backdrop-blur-xl border-b border-borders-default">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">BexBot</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-text-secondary hover:text-text-primary transition-colors">Características</a>
              <a href="#pricing" className="text-text-secondary hover:text-text-primary transition-colors">Precios</a>
              <a href="#testimonials" className="text-text-secondary hover:text-text-primary transition-colors">Testimonios</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/registro-empresa" className="btn-primary flex items-center space-x-2">
                <span>Registrar Empresa</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <button className="md:hidden text-text-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-primary/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-secondary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-background-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-borders-default mb-8">
              <Sparkles className="w-4 h-4 text-accent-primary" />
              <span className="text-sm text-text-secondary">Potenciado por IA Avanzada</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transforma tu atención al cliente con{' '}
              <span className="gradient-text">Bots Inteligentes</span>
            </h1>

            <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed">
              BexBot es la plataforma SaaS líder que permite a empresas crear y desplegar bots conversacionales sin código en minutos.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <Link href="/registro-empresa" className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 group">
                <span>Registrar Mi Empresa</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/dashboard" className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2">
                <span>Ver Demo</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { value: '10K+', label: 'Bots Activos' },
                { value: '5M+', label: 'Conversaciones' },
                { value: '98%', label: 'Satisfacción' },
                { value: '24/7', label: 'Disponibilidad' }
              ].map((stat, i) => (
                <div key={i} className="glass-card p-6">
                  <div className="text-3xl font-bold text-accent-primary mb-2">{stat.value}</div>
                  <div className="text-text-muted text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-background-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              ¿Por qué elegir <span className="gradient-text">BexBot</span>?
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Somos tu socio estratégico en la transformación digital de tu atención al cliente
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {[
              {
                icon: <Zap className="w-7 h-7" />,
                title: 'Configuración en Minutos',
                description: 'Sin código, sin complicaciones. Wizard intuitivo para tener tu bot funcionando en menos de 5 minutos.'
              },
              {
                icon: <Shield className="w-7 h-7" />,
                title: 'Seguridad Empresarial',
                description: 'Cumplimiento GDPR, encriptación end-to-end. Tus datos y los de tus clientes están protegidos.'
              },
              {
                icon: <TrendingUp className="w-7 h-7" />,
                title: 'ROI Comprobado',
                description: 'Reducción del 70% en costos de soporte y aumento del 45% en satisfacción del cliente.'
              }
            ].map((item, i) => (
              <div key={i} className="glass-card p-8 hover:scale-105 transition-transform duration-300">
                <div className="w-14 h-14 bg-accent-primary/20 rounded-lg flex items-center justify-center mb-6 text-accent-primary">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="glass-card p-8 md:p-12 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Lo que nos hace únicos</h3>
                <div className="space-y-4">
                  {[
                    { title: 'IA Contextual Avanzada', desc: 'Comprende intenciones complejas y mantiene contexto' },
                    { title: 'Multicanal Nativo', desc: 'WhatsApp, Messenger, Web Widget - todo en una plataforma' },
                    { title: 'Integraciones Ilimitadas', desc: 'Conecta con tu CRM, ERP y herramientas favoritas' },
                    { title: 'Soporte Premium 24/7', desc: 'Equipo experto disponible siempre, en español' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-accent-primary flex-shrink-0 mt-1" />
                      <div>
                        <div className="font-semibold mb-1">{item.title}</div>
                        <div className="text-text-muted text-sm">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6">Resultados garantizados</h3>
                <div className="space-y-6">
                  {[
                    { label: 'Reducción de tickets', value: '-70%', color: 'accent-primary' },
                    { label: 'Tiempo de respuesta', value: '-85%', color: 'accent-secondary' },
                    { label: 'Satisfacción cliente', value: '+45%', color: 'accent-warning' }
                  ].map((metric, i) => (
                    <div key={i} className="bg-background-primary/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-text-secondary">{metric.label}</span>
                        <span className={`text-${metric.color} font-bold`}>{metric.value}</span>
                      </div>
                      <div className="w-full bg-background-secondary rounded-full h-2">
                        <div className={`bg-${metric.color} h-2 rounded-full`} style={{ width: metric.value.replace(/[^0-9]/g, '') + '%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Características <span className="gradient-text">Poderosas</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: '🛍️', title: 'E-commerce', desc: 'Aumenta ventas con recomendaciones personalizadas' },
              { icon: '🏥', title: 'Salud', desc: 'Agenda citas y recordatorios automáticos 24/7' },
              { icon: '🎓', title: 'Educación', desc: 'Asistente virtual para estudiantes y cursos' },
              { icon: '💬', title: 'Atención al Cliente', desc: 'Respuestas instantáneas y escalamiento inteligente' },
              { icon: '🔧', title: 'Soporte Técnico', desc: 'Resolución de problemas y tickets automáticos' },
              { icon: '📊', title: 'Analytics', desc: 'Métricas en tiempo real y reportes detallados' }
            ].map((item, i) => (
              <div key={i} className="glass-card p-6 hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-background-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Lo que dicen nuestros <span className="gradient-text">clientes</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'María González', role: 'CEO, TechShop', avatar: '👩‍💼', text: 'BexBot transformó nuestra atención al cliente. Tiempo de respuesta de horas a segundos.' },
              { name: 'Carlos Ruiz', role: 'Director, HealthCare+', avatar: '👨‍⚕️', text: 'Configuración impresionante. En una semana atendiendo citas. ROI inmediato.' },
              { name: 'Ana Martínez', role: 'Gerente, EduTech', avatar: '👩‍🎓', text: 'Soporte excepcional e integraciones perfectas. Ahora es parte esencial de nuestra operación.' }
            ].map((testimonial, i) => (
              <div key={i} className="glass-card p-8 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-accent-warning text-accent-warning" />
                  ))}
                </div>
                <p className="text-text-secondary mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-accent-primary/20 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-text-muted">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Precios <span className="gradient-text">Transparentes</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'STARTER', price: '$29', features: ['1 Bot', '1K conversaciones', '2 canales', 'Analytics básicos'], popular: false },
              { name: 'PROFESSIONAL', price: '$99', features: ['5 Bots', '10K conversaciones', 'Todos los canales', 'Analytics avanzados', 'Integraciones', 'Soporte 24/7'], popular: true },
              { name: 'ENTERPRISE', price: 'Custom', features: ['Bots ilimitados', 'Conversaciones ilimitadas', 'Analytics personalizados', 'Account Manager', 'SLA garantizado'], popular: false }
            ].map((plan, i) => (
              <div key={i} className={`glass-card p-8 hover:scale-105 transition-transform duration-300 ${plan.popular ? 'border-2 border-accent-primary relative' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    MÁS POPULAR
                  </div>
                )}
                <div className="text-sm font-semibold text-accent-primary mb-2">{plan.name}</div>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-text-muted">/mes</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-accent-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={plan.popular ? 'btn-primary w-full' : 'btn-secondary w-full'}>
                  {plan.price === 'Custom' ? 'Contactar' : 'Comenzar'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 bg-background-secondary/30">
        <div className="container mx-auto">
          <div className="glass-card p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para revolucionar tu atención al cliente?
            </h2>
            <p className="text-xl text-text-secondary mb-8">
              Únete a miles de empresas que transforman su negocio con BexBot
            </p>
            <Link href="/dashboard" className="btn-primary text-lg px-10 py-4 inline-flex items-center space-x-2 group">
              <span>Crear Mi Bot Gratis</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-sm text-text-muted mt-4">
              No se requiere tarjeta de crédito • Configuración en 5 minutos
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-borders-default py-12 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">BexBot</span>
          </div>
          <p className="text-text-muted text-sm">© 2025 BexBot. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
