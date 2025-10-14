'use client'

import { useState } from 'react'
import { Bot, Building2, FileText, Package, DollarSign, AlertCircle, CheckCircle, ArrowLeft, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Product {
  id: string
  name: string
  description: string
  price: string
}

interface Service {
  id: string
  name: string
  description: string
  price: string
}

interface Exception {
  id: string
  description: string
}

export default function RegistroEmpresaPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Información de la empresa
  const [companyData, setCompanyData] = useState({
    nombreEmpresa: '',
    ruc: '',
    razonSocial: '',
    direccion: '',
    telefono: '',
    email: '',
    sitioWeb: '',
    sector: '',
    descripcion: ''
  })

  // Productos
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: '', description: '', price: '' }
  ])

  // Servicios
  const [services, setServices] = useState<Service[]>([
    { id: '1', name: '', description: '', price: '' }
  ])

  // Excepciones
  const [exceptions, setExceptions] = useState<Exception[]>([
    { id: '1', description: '' }
  ])

  // Información adicional
  const [additionalInfo, setAdditionalInfo] = useState({
    horarioAtencion: '',
    metodoPago: [] as string[],
    politicasDevolucion: '',
    tiempoEntrega: '',
    cobertura: ''
  })

  const addProduct = () => {
    setProducts([...products, { id: Date.now().toString(), name: '', description: '', price: '' }])
  }

  const removeProduct = (id: string) => {
    if (products.length > 1) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  const updateProduct = (id: string, field: keyof Product, value: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  const addService = () => {
    setServices([...services, { id: Date.now().toString(), name: '', description: '', price: '' }])
  }

  const removeService = (id: string) => {
    if (services.length > 1) {
      setServices(services.filter(s => s.id !== id))
    }
  }

  const updateService = (id: string, field: keyof Service, value: string) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  const addException = () => {
    setExceptions([...exceptions, { id: Date.now().toString(), description: '' }])
  }

  const removeException = (id: string) => {
    if (exceptions.length > 1) {
      setExceptions(exceptions.filter(e => e.id !== id))
    }
  }

  const updateException = (id: string, value: string) => {
    setExceptions(exceptions.map(e => e.id === id ? { ...e, description: value } : e))
  }

  const handleMetodoPagoChange = (metodo: string) => {
    if (additionalInfo.metodoPago.includes(metodo)) {
      setAdditionalInfo({
        ...additionalInfo,
        metodoPago: additionalInfo.metodoPago.filter(m => m !== metodo)
      })
    } else {
      setAdditionalInfo({
        ...additionalInfo,
        metodoPago: [...additionalInfo.metodoPago, metodo]
      })
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    try {
      // Validar campos requeridos
      if (!companyData.nombreEmpresa || !companyData.ruc || !companyData.email) {
        setError('Por favor completa los campos obligatorios: Nombre de Empresa, RUC y Email')
        setLoading(false)
        return
      }

      // Verificar si Firebase está configurado
      if (!db) {
        console.warn('Firebase no configurado. Mostrando datos en consola:')
        const empresaData = {
          ...companyData,
          productos: products.filter(p => p.name.trim() !== ''),
          servicios: services.filter(s => s.name.trim() !== ''),
          excepciones: exceptions.filter(e => e.description.trim() !== ''),
          informacionAdicional: additionalInfo,
          fechaRegistro: new Date().toISOString(),
          estado: 'pendiente'
        }
        console.log('Datos de empresa:', empresaData)
        setError('⚠️ Firebase no está configurado. Los datos se muestran en la consola. Por favor configura Firebase siguiendo las instrucciones en FIREBASE_SETUP.md')
        setLoading(false)
        return
      }

      // Guardar en Firebase
      const docRef = await addDoc(collection(db, 'empresas'), {
        ...companyData,
        productos: products.filter(p => p.name.trim() !== ''),
        servicios: services.filter(s => s.name.trim() !== ''),
        excepciones: exceptions.filter(e => e.description.trim() !== ''),
        informacionAdicional: additionalInfo,
        fechaRegistro: serverTimestamp(),
        estado: 'pendiente'
      })

      console.log('Empresa registrada con ID:', docRef.id)
      setSuccess(true)
      setLoading(false)
    } catch (err: any) {
      console.error('Error al registrar empresa:', err)
      setError('Error al registrar la empresa. Por favor intenta nuevamente.')
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center p-6">
        <div className="glass-card p-12 max-w-2xl w-full text-center">
          <div className="w-20 h-20 bg-accent-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-accent-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">¡Registro Exitoso!</h1>
          <p className="text-text-secondary mb-8">
            Tu empresa ha sido registrada correctamente. Nuestro equipo revisará la información y te contactará pronto.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Link href="/" className="btn-secondary">
              Volver al Inicio
            </Link>
            <Link href="/dashboard" className="btn-primary">
              Ir al Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="bg-background-secondary border-b border-borders-default sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">BexBot</span>
            </Link>
            <Link href="/" className="text-text-secondary hover:text-text-primary transition-colors flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Volver</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-6xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= s ? 'bg-accent-primary text-white' : 'bg-background-secondary text-text-muted'
                }`}>
                  {s}
                </div>
                {s < 4 && (
                  <div className={`flex-1 h-1 mx-2 transition-all ${
                    step > s ? 'bg-accent-primary' : 'bg-background-secondary'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className={step >= 1 ? 'text-text-primary font-semibold' : 'text-text-muted'}>Datos de Empresa</span>
            <span className={step >= 2 ? 'text-text-primary font-semibold' : 'text-text-muted'}>Productos</span>
            <span className={step >= 3 ? 'text-text-primary font-semibold' : 'text-text-muted'}>Servicios</span>
            <span className={step >= 4 ? 'text-text-primary font-semibold' : 'text-text-muted'}>Info Adicional</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="glass-card p-4 mb-6 border-l-4 border-accent-error">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-accent-error" />
              <p className="text-accent-error">{error}</p>
            </div>
          </div>
        )}

        {/* Step 1: Datos de Empresa */}
        {step === 1 && (
          <div className="glass-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Building2 className="w-8 h-8 text-accent-primary" />
              <h2 className="text-2xl font-bold">Información de la Empresa</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Nombre de la Empresa <span className="text-accent-error">*</span>
                </label>
                <input
                  type="text"
                  value={companyData.nombreEmpresa}
                  onChange={(e) => setCompanyData({ ...companyData, nombreEmpresa: e.target.value })}
                  className="input-field w-full"
                  placeholder="Ej: Tecnología SAC"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  RUC <span className="text-accent-error">*</span>
                </label>
                <input
                  type="text"
                  value={companyData.ruc}
                  onChange={(e) => setCompanyData({ ...companyData, ruc: e.target.value })}
                  className="input-field w-full"
                  placeholder="20123456789"
                  maxLength={11}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Razón Social</label>
                <input
                  type="text"
                  value={companyData.razonSocial}
                  onChange={(e) => setCompanyData({ ...companyData, razonSocial: e.target.value })}
                  className="input-field w-full"
                  placeholder="Razón social completa"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Sector/Industria</label>
                <select
                  value={companyData.sector}
                  onChange={(e) => setCompanyData({ ...companyData, sector: e.target.value })}
                  className="input-field w-full"
                >
                  <option value="">Selecciona un sector</option>
                  <option value="tecnologia">Tecnología</option>
                  <option value="retail">Retail/Comercio</option>
                  <option value="servicios">Servicios</option>
                  <option value="manufactura">Manufactura</option>
                  <option value="alimentos">Alimentos y Bebidas</option>
                  <option value="salud">Salud</option>
                  <option value="educacion">Educación</option>
                  <option value="construccion">Construcción</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Dirección</label>
                <input
                  type="text"
                  value={companyData.direccion}
                  onChange={(e) => setCompanyData({ ...companyData, direccion: e.target.value })}
                  className="input-field w-full"
                  placeholder="Dirección completa"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={companyData.telefono}
                  onChange={(e) => setCompanyData({ ...companyData, telefono: e.target.value })}
                  className="input-field w-full"
                  placeholder="+51 999 999 999"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email <span className="text-accent-error">*</span>
                </label>
                <input
                  type="email"
                  value={companyData.email}
                  onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                  className="input-field w-full"
                  placeholder="contacto@empresa.com"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Sitio Web</label>
                <input
                  type="url"
                  value={companyData.sitioWeb}
                  onChange={(e) => setCompanyData({ ...companyData, sitioWeb: e.target.value })}
                  className="input-field w-full"
                  placeholder="https://www.empresa.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Descripción de la Empresa</label>
                <textarea
                  value={companyData.descripcion}
                  onChange={(e) => setCompanyData({ ...companyData, descripcion: e.target.value })}
                  className="input-field w-full"
                  rows={4}
                  placeholder="Describe brevemente tu empresa, qué hace y qué la hace única..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Productos */}
        {step === 2 && (
          <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Package className="w-8 h-8 text-accent-primary" />
                <h2 className="text-2xl font-bold">Productos</h2>
              </div>
              <button onClick={addProduct} className="btn-primary flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Agregar Producto</span>
              </button>
            </div>

            <div className="space-y-6">
              {products.map((product, index) => (
                <div key={product.id} className="bg-background-secondary p-6 rounded-lg border border-borders-default">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">Producto {index + 1}</h3>
                    {products.length > 1 && (
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="text-accent-error hover:bg-accent-error/20 p-2 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Nombre del Producto</label>
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                        className="input-field w-full"
                        placeholder="Ej: Laptop Dell Inspiron"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Precio</label>
                      <input
                        type="text"
                        value={product.price}
                        onChange={(e) => updateProduct(product.id, 'price', e.target.value)}
                        className="input-field w-full"
                        placeholder="S/ 2,500.00"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-2">Descripción</label>
                      <textarea
                        value={product.description}
                        onChange={(e) => updateProduct(product.id, 'description', e.target.value)}
                        className="input-field w-full"
                        rows={3}
                        placeholder="Describe las características principales del producto..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-background-hover rounded-lg">
              <p className="text-sm text-text-muted">
                💡 <strong>Tip:</strong> Agrega todos los productos que ofreces. Esto ayudará al bot a responder preguntas sobre tu catálogo.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Servicios */}
        {step === 3 && (
          <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <FileText className="w-8 h-8 text-accent-primary" />
                <h2 className="text-2xl font-bold">Servicios y Excepciones</h2>
              </div>
            </div>

            {/* Servicios */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Servicios</h3>
                <button onClick={addService} className="btn-secondary flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Agregar Servicio</span>
                </button>
              </div>

              <div className="space-y-6">
                {services.map((service, index) => (
                  <div key={service.id} className="bg-background-secondary p-6 rounded-lg border border-borders-default">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold">Servicio {index + 1}</h4>
                      {services.length > 1 && (
                        <button
                          onClick={() => removeService(service.id)}
                          className="text-accent-error hover:bg-accent-error/20 p-2 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Nombre del Servicio</label>
                        <input
                          type="text"
                          value={service.name}
                          onChange={(e) => updateService(service.id, 'name', e.target.value)}
                          className="input-field w-full"
                          placeholder="Ej: Mantenimiento Preventivo"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Precio</label>
                        <input
                          type="text"
                          value={service.price}
                          onChange={(e) => updateService(service.id, 'price', e.target.value)}
                          className="input-field w-full"
                          placeholder="S/ 150.00"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-2">Descripción</label>
                        <textarea
                          value={service.description}
                          onChange={(e) => updateService(service.id, 'description', e.target.value)}
                          className="input-field w-full"
                          rows={3}
                          placeholder="Describe el servicio que ofreces..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Excepciones */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Excepciones y Políticas Especiales</h3>
                <button onClick={addException} className="btn-secondary flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Agregar Excepción</span>
                </button>
              </div>

              <div className="space-y-4">
                {exceptions.map((exception, index) => (
                  <div key={exception.id} className="bg-background-secondary p-4 rounded-lg border border-borders-default">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1">
                        <label className="block text-sm font-semibold mb-2">Excepción {index + 1}</label>
                        <input
                          type="text"
                          value={exception.description}
                          onChange={(e) => updateException(exception.id, e.target.value)}
                          className="input-field w-full"
                          placeholder="Ej: No se aceptan devoluciones en productos personalizados"
                        />
                      </div>
                      {exceptions.length > 1 && (
                        <button
                          onClick={() => removeException(exception.id)}
                          className="text-accent-error hover:bg-accent-error/20 p-2 rounded-lg transition-colors mt-6"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Información Adicional */}
        {step === 4 && (
          <div className="glass-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <DollarSign className="w-8 h-8 text-accent-primary" />
              <h2 className="text-2xl font-bold">Información Adicional</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Horario de Atención</label>
                <input
                  type="text"
                  value={additionalInfo.horarioAtencion}
                  onChange={(e) => setAdditionalInfo({ ...additionalInfo, horarioAtencion: e.target.value })}
                  className="input-field w-full"
                  placeholder="Ej: Lunes a Viernes 9:00 AM - 6:00 PM"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Métodos de Pago Aceptados</label>
                <div className="grid md:grid-cols-3 gap-3">
                  {['Efectivo', 'Tarjeta de Crédito', 'Tarjeta de Débito', 'Transferencia Bancaria', 'Yape', 'Plin', 'PayPal', 'Otro'].map((metodo) => (
                    <label key={metodo} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={additionalInfo.metodoPago.includes(metodo)}
                        onChange={() => handleMetodoPagoChange(metodo)}
                        className="w-4 h-4 text-accent-primary bg-background-secondary border-borders-default rounded focus:ring-accent-primary"
                      />
                      <span className="text-sm">{metodo}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Políticas de Devolución</label>
                <textarea
                  value={additionalInfo.politicasDevolucion}
                  onChange={(e) => setAdditionalInfo({ ...additionalInfo, politicasDevolucion: e.target.value })}
                  className="input-field w-full"
                  rows={4}
                  placeholder="Describe tus políticas de devolución y garantías..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Tiempo de Entrega</label>
                <input
                  type="text"
                  value={additionalInfo.tiempoEntrega}
                  onChange={(e) => setAdditionalInfo({ ...additionalInfo, tiempoEntrega: e.target.value })}
                  className="input-field w-full"
                  placeholder="Ej: 24-48 horas en Lima, 3-5 días en provincias"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Cobertura Geográfica</label>
                <input
                  type="text"
                  value={additionalInfo.cobertura}
                  onChange={(e) => setAdditionalInfo({ ...additionalInfo, cobertura: e.target.value })}
                  className="input-field w-full"
                  placeholder="Ej: Lima Metropolitana, Callao, y principales ciudades del Perú"
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>

          {step < 4 ? (
            <button onClick={nextStep} className="btn-primary">
              Siguiente
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Finalizar Registro</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
