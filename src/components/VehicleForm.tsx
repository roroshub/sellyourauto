'use client'

import { useState, useCallback } from 'react'
import { vehicleStep1Schema, vehicleStep2Schema } from '@/lib/schemas'
import { formatMileage, getYears } from '@/lib/utils'
import type { VehicleStep1, VehicleStep2 } from '@/lib/schemas'
import type { FormStep, Condition } from '@/types'
import makesData from '@/content/makes.json'

const makes = Object.keys(makesData).sort()
const makesMap = makesData as Record<string, string[]>
const conditions: Condition[] = ['Excellent', 'Good', 'Fair', 'Poor']
const years = getYears()

const conditionDesc: Record<Condition, string> = {
  Excellent: 'No visible damage, fully functional',
  Good: 'Minor wear, all systems working',
  Fair: 'Some damage or mechanical issues',
  Poor: 'Major damage or non-running',
}

type Step1Errors = Partial<Record<keyof VehicleStep1, string>>
type Step2Errors = Partial<Record<keyof VehicleStep2, string>>

const inputBase: React.CSSProperties = {
  width: '100%', padding: '13px 16px', border: '1.5px solid #D1D5DB',
  borderRadius: 8, fontSize: 15, color: '#1A2766', background: '#fff',
  fontFamily: 'var(--font-sans)', outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
  appearance: 'none',
}

const labelBase: React.CSSProperties = {
  fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6,
}

const errorStyle: React.CSSProperties = {
  fontSize: 12, color: '#DC2626', marginTop: 5, display: 'flex', alignItems: 'center', gap: 4,
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={labelBase}>{label}</label>
      {children}
      {error && <p style={errorStyle} role="alert">⚠ {error}</p>}
    </div>
  )
}

export default function VehicleForm() {
  const [step, setStep] = useState<FormStep>(1)
  const [step1, setStep1] = useState<Partial<VehicleStep1>>({})
  const [step2, setStep2] = useState<Partial<VehicleStep2>>({})
  const [errors1, setErrors1] = useState<Step1Errors>({})
  const [errors2, setErrors2] = useState<Step2Errors>({})
  const [files, setFiles] = useState<File[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  const inputStyle = (name: string): React.CSSProperties => ({
    ...inputBase,
    borderColor: focused === name ? '#00B2D8' : '#D1D5DB',
    boxShadow: focused === name ? '0 0 0 3px rgba(0,178,216,0.15)' : 'none',
  })

  const models = step1.make ? makesMap[step1.make] ?? [] : []

  const handleStep1Submit = () => {
    const result = vehicleStep1Schema.safeParse(step1)
    if (!result.success) {
      const errs: Step1Errors = {}
      result.error.issues.forEach(i => { errs[i.path[0] as keyof VehicleStep1] = i.message })
      setErrors1(errs)
      return
    }
    setErrors1({})
    setStep(2)
    window.scrollTo({ top: (document.getElementById('appraisal')?.offsetTop ?? 0) - 80, behavior: 'smooth' })
  }

  const handleStep2Submit = async () => {
    const result = vehicleStep2Schema.safeParse(step2)
    if (!result.success) {
      const errs: Step2Errors = {}
      result.error.issues.forEach(i => { errs[i.path[0] as keyof VehicleStep2] = i.message })
      setErrors2(errs)
      return
    }
    setErrors2({})
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1400))
    setStep(3)
  }

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(p => [...p, ...Array.from(e.target.files!)].slice(0, 10))
  }, [])

  /* ── Success state ── */
  if (step === 3) {
    return (
      <div style={{ textAlign: 'center', padding: 'clamp(40px,6vw,64px) 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #00B2D8, #1A2766)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>✓</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: '#1A2766' }}>You&rsquo;re All Set!</h3>
        <p style={{ fontSize: 15, color: '#6B7280', maxWidth: 360, lineHeight: 1.7 }}>
          Our appraisal team is reviewing your <strong style={{ color: '#1A2766' }}>{step1.year} {step1.make} {step1.model}</strong>. Expect your guaranteed offer within minutes.
        </p>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          {['Offer Pending', 'Review', 'Payout'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {i > 0 && <div style={{ width: 24, height: 1.5, background: '#D1D5DB' }} />}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: i === 0 ? '#00B2D8' : '#E5E7EB', boxShadow: i === 0 ? '0 0 0 3px rgba(0,178,216,0.25)' : 'none' }} />
                <span style={{ fontSize: 10, color: i === 0 ? '#00B2D8' : '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, whiteSpace: 'nowrap' }}>{s}</span>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => { setStep(1); setStep1({}); setStep2({}); setFiles([]) }} style={{ marginTop: 16, fontSize: 13, color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
          Submit another vehicle
        </button>
      </div>
    )
  }

  /* ── Step indicator ── */
  const StepBar = () => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
      {[{ n: 1, label: 'Vehicle Details' }, { n: 2, label: 'Your Contact Info' }].map(({ n, label }, i) => (
        <div key={n} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: step >= n ? '#1A2766' : '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: step >= n ? '#fff' : '#9CA3AF', transition: 'all 0.3s', border: step === n ? '3px solid #00B2D8' : '3px solid transparent', boxSizing: 'border-box' }}>
              {step > n ? '✓' : n}
            </div>
            <span style={{ fontSize: 11, letterSpacing: '0.04em', color: step >= n ? '#1A2766' : '#9CA3AF', fontWeight: step === n ? 600 : 400, whiteSpace: 'nowrap' }}>{label}</span>
          </div>
          {i < 1 && <div style={{ flex: 1, height: 2, background: step > 1 ? '#00B2D8' : '#E5E7EB', margin: '0 12px', marginBottom: 22, transition: 'background 0.4s', borderRadius: 2 }} />}
        </div>
      ))}
    </div>
  )

  return (
    <div>
      <StepBar />

      {step === 1 && (
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: '#1A2766', marginBottom: 24 }}>Tell Us About Your Vehicle</h3>

          {/* Year & Make */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 0 }}>
            <Field label="Year *" error={errors1.year}>
              <select value={step1.year ?? ''} onChange={e => setStep1(p => ({ ...p, year: e.target.value, model: '' }))}
                style={inputStyle('year')} onFocus={() => setFocused('year')} onBlur={() => setFocused(null)}>
                <option value=''>Select year</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </Field>
            <Field label="Make *" error={errors1.make}>
              <select value={step1.make ?? ''} onChange={e => setStep1(p => ({ ...p, make: e.target.value, model: '' }))}
                style={inputStyle('make')} onFocus={() => setFocused('make')} onBlur={() => setFocused(null)}>
                <option value=''>Select make</option>
                {makes.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Model *" error={errors1.model}>
            <select value={step1.model ?? ''} onChange={e => setStep1(p => ({ ...p, model: e.target.value }))}
              disabled={!step1.make} style={{ ...inputStyle('model'), opacity: step1.make ? 1 : 0.5, cursor: step1.make ? 'pointer' : 'not-allowed' }}
              onFocus={() => setFocused('model')} onBlur={() => setFocused(null)}>
              <option value=''>{step1.make ? 'Select model' : 'Select a make first'}</option>
              {models.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 14 }}>
            <Field label="VIN (optional — improves accuracy)" error={errors1.vin}>
              <input type='text' value={step1.vin ?? ''} onChange={e => setStep1(p => ({ ...p, vin: e.target.value.toUpperCase() }))}
                placeholder='e.g. 1HGCM82633A004352' maxLength={17}
                style={inputStyle('vin')} onFocus={() => setFocused('vin')} onBlur={() => setFocused(null)} />
            </Field>
            <Field label="Mileage (km) *" error={errors1.mileage}>
              <input type='text' inputMode='numeric' value={step1.mileage ?? ''}
                onChange={e => setStep1(p => ({ ...p, mileage: formatMileage(e.target.value) }))}
                placeholder='e.g. 85,000'
                style={inputStyle('mileage')} onFocus={() => setFocused('mileage')} onBlur={() => setFocused(null)} />
            </Field>
          </div>

          {/* Condition */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelBase}>Vehicle Condition *</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {conditions.map(c => (
                <button key={c} type='button' onClick={() => setStep1(p => ({ ...p, condition: c }))}
                  style={{ padding: '12px 14px', background: step1.condition === c ? '#EEF3FF' : '#F9FAFB', border: `2px solid ${step1.condition === c ? '#00B2D8' : '#E5E7EB'}`, borderRadius: 10, color: step1.condition === c ? '#1A2766' : '#6B7280', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left' }}>
                  <span style={{ display: 'block', fontSize: 14, fontWeight: 700, marginBottom: 2, fontFamily: 'var(--font-display)', color: step1.condition === c ? '#1A2766' : '#374151' }}>{c}</span>
                  <span style={{ display: 'block', fontSize: 11, color: step1.condition === c ? '#00B2D8' : '#9CA3AF', lineHeight: 1.4 }}>{conditionDesc[c]}</span>
                </button>
              ))}
            </div>
            {errors1.condition && <p style={errorStyle} role="alert">⚠ Please select a condition</p>}
          </div>

          <Field label="Additional Notes (optional)">
            <textarea value={step1.comments ?? ''} onChange={e => setStep1(p => ({ ...p, comments: e.target.value }))}
              rows={3} placeholder='Known issues, recent service, modifications, extras included…'
              style={{ ...inputStyle('comments'), resize: 'vertical' }}
              onFocus={() => setFocused('comments')} onBlur={() => setFocused(null)} />
          </Field>

          {/* Photo upload */}
          <div style={{ marginBottom: 24 }}>
            <label style={labelBase}>Photos <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(3+ recommended)</span></label>
            <label style={{ display: 'block', border: '2px dashed #CBD5E1', borderRadius: 10, padding: '28px 20px', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s', background: '#F8FAFF' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#00B2D8'; e.currentTarget.style.background = '#F0F9FF' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.background = '#F8FAFF' }}>
              <input type='file' multiple accept='image/*' onChange={handleFileChange} style={{ display: 'none' }} aria-label="Upload vehicle photos" />
              <div style={{ fontSize: 28, marginBottom: 6 }}>📷</div>
              <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 3 }}>Click to upload or drag &amp; drop</p>
              <p style={{ fontSize: 12, color: '#9CA3AF' }}>JPEG, PNG, HEIC · Up to 20MB each · Max 10 photos</p>
              <p style={{ fontSize: 12, color: '#00B2D8', marginTop: 6, fontWeight: 600 }}>More photos = better offer</p>
            </label>
            {files.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                {files.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#EEF3FF', border: '1px solid rgba(0,178,216,0.25)', borderRadius: 6, padding: '6px 10px' }}>
                    <span style={{ fontSize: 12, color: '#1A2766', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
                    <button onClick={() => setFiles(p => p.filter((_, idx) => idx !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', fontSize: 16, lineHeight: 1, flexShrink: 0 }} aria-label={`Remove ${f.name}`}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button onClick={handleStep1Submit} style={{ width: '100%', padding: '16px', background: '#1A2766', color: '#fff', fontSize: 15, fontWeight: 700, borderRadius: 10, border: 'none', cursor: 'pointer', transition: 'all 0.25s', fontFamily: 'var(--font-display)', boxShadow: '0 4px 16px rgba(26,39,102,0.25)' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#00B2D8'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,178,216,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#1A2766'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(26,39,102,0.25)' }}>
            Continue to Contact Info →
          </button>
          <p style={{ fontSize: 12, color: '#9CA3AF', textAlign: 'center', marginTop: 12 }}>No obligation · Free in 2 minutes</p>
        </div>
      )}

      {step === 2 && (
        <div>
          <div style={{ padding: '12px 16px', borderRadius: 10, background: '#EEF3FF', border: '1px solid rgba(0,178,216,0.2)', marginBottom: 24 }}>
            <p style={{ fontSize: 13, color: '#6B7280' }}>
              Vehicle: <strong style={{ color: '#1A2766' }}>{step1.year} {step1.make} {step1.model}</strong>
              {' · '}{step1.mileage} km · {step1.condition}
            </p>
          </div>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: '#1A2766', marginBottom: 6 }}>Where Should We Send Your Offer?</h3>
          <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 24 }}>We&rsquo;ll send your guaranteed offer here and schedule a free pickup at your convenience.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Field label="First Name *" error={errors2.firstName}>
              <input type='text' value={step2.firstName ?? ''} onChange={e => setStep2(p => ({ ...p, firstName: e.target.value }))}
                placeholder='Jane' autoComplete="given-name"
                style={inputStyle('firstName')} onFocus={() => setFocused('firstName')} onBlur={() => setFocused(null)} />
            </Field>
            <Field label="Last Name *" error={errors2.lastName}>
              <input type='text' value={step2.lastName ?? ''} onChange={e => setStep2(p => ({ ...p, lastName: e.target.value }))}
                placeholder='Doe' autoComplete="family-name"
                style={inputStyle('lastName')} onFocus={() => setFocused('lastName')} onBlur={() => setFocused(null)} />
            </Field>
          </div>

          <Field label="Email Address *" error={errors2.email}>
            <input type='email' value={step2.email ?? ''} onChange={e => setStep2(p => ({ ...p, email: e.target.value }))}
              placeholder='jane@example.com' autoComplete="email"
              style={inputStyle('email')} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} />
          </Field>

          <Field label="Phone Number *" error={errors2.phone}>
            <input type='tel' value={step2.phone ?? ''} onChange={e => setStep2(p => ({ ...p, phone: e.target.value }))}
              placeholder='+1 (416) 000-0000' autoComplete="tel"
              style={inputStyle('phone')} onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)} />
          </Field>

          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button onClick={() => setStep(1)} style={{ padding: '14px 24px', background: '#F3F4F6', color: '#374151', fontSize: 14, fontWeight: 600, borderRadius: 8, border: '1.5px solid #E5E7EB', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font-sans)' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#E5E7EB' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#F3F4F6' }}>← Back</button>
            <button onClick={handleStep2Submit} disabled={submitting} style={{ flex: 1, padding: '14px 24px', background: submitting ? '#7CA3C0' : '#1A2766', color: '#fff', fontSize: 15, fontWeight: 700, borderRadius: 8, border: 'none', cursor: submitting ? 'wait' : 'pointer', transition: 'all 0.25s', fontFamily: 'var(--font-display)', boxShadow: submitting ? 'none' : '0 4px 16px rgba(26,39,102,0.25)' }}
              onMouseEnter={e => { if (!submitting) { e.currentTarget.style.background = '#00B2D8'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,178,216,0.4)' } }}
              onMouseLeave={e => { if (!submitting) { e.currentTarget.style.background = '#1A2766'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(26,39,102,0.25)' } }}>
              {submitting ? 'Submitting…' : 'Get My Free Offer →'}
            </button>
          </div>
          <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 14, textAlign: 'center', lineHeight: 1.6 }}>
            By submitting, you agree to be contacted by SellYourAuto.ca. Your information is never sold or shared.
          </p>
        </div>
      )}
    </div>
  )
}
