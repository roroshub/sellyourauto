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

const inputStyle = {
  background: '#222222', border: '1px solid rgba(255,255,255,0.08)', color: '#FAFAF8',
  fontFamily: 'var(--font-sans)', fontSize: 14, padding: '14px 16px', outline: 'none',
  width: '100%', transition: 'border-color 0.2s', appearance: 'none' as const,
}

const labelStyle = {
  fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const,
  color: 'rgba(255,255,255,0.45)', display: 'block', marginBottom: 8,
}

const errorStyle = {
  fontSize: 12, color: '#e57373', marginTop: 6,
}

type Step1Errors = Partial<Record<keyof VehicleStep1, string>>
type Step2Errors = Partial<Record<keyof VehicleStep2, string>>

export default function VehicleForm() {
  const [step, setStep] = useState<FormStep>(1)
  const [step1, setStep1] = useState<Partial<VehicleStep1>>({})
  const [step2, setStep2] = useState<Partial<VehicleStep2>>({})
  const [errors1, setErrors1] = useState<Step1Errors>({})
  const [errors2, setErrors2] = useState<Step2Errors>({})
  const [files, setFiles] = useState<File[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const getInputStyle = (name: string) => ({
    ...inputStyle,
    borderColor: focusedField === name ? '#C9A96E' : 'rgba(255,255,255,0.08)',
  })

  const models = step1.make ? makesMap[step1.make] ?? [] : []

  const handleStep1Submit = () => {
    const result = vehicleStep1Schema.safeParse(step1)
    if (!result.success) {
      const errs: Step1Errors = {}
      result.error.issues.forEach((i) => {
        const key = i.path[0] as keyof VehicleStep1
        errs[key] = i.message
      })
      setErrors1(errs)
      return
    }
    setErrors1({})
    setStep(2)
    window.scrollTo({ top: document.getElementById('appraisal')?.offsetTop ?? 0, behavior: 'smooth' })
  }

  const handleStep2Submit = async () => {
    const result = vehicleStep2Schema.safeParse(step2)
    if (!result.success) {
      const errs: Step2Errors = {}
      result.error.issues.forEach((i) => {
        const key = i.path[0] as keyof VehicleStep2
        errs[key] = i.message
      })
      setErrors2(errs)
      return
    }
    setErrors2({})
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1400))
    setStep(3)
  }

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)].slice(0, 10))
    }
  }, [])

  const removeFile = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i))

  if (step === 3) {
    return (
      <div style={{ textAlign: 'center', padding: 'clamp(48px,8vw,80px) 48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', border: '2px solid #C9A96E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#C9A96E', marginBottom: 8 }}>✓</div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 300, color: '#FAFAF8' }}>Submission Received!</h3>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', maxWidth: 400, lineHeight: 1.7 }}>
          Our appraisal team is reviewing your vehicle details. You&rsquo;ll receive your guaranteed offer within minutes.
        </p>
        <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
          {[{ label: 'Offer Pending', active: true }, { label: 'Review', active: false }, { label: 'Payout', active: false }].map((s) => (
            <div key={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.active ? '#C9A96E' : 'rgba(255,255,255,0.15)' }} />
              <span style={{ fontSize: 11, color: s.active ? '#C9A96E' : 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</span>
            </div>
          ))}
        </div>
        <button onClick={() => { setStep(1); setStep1({}); setStep2({}); setFiles([]) }} style={{ marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'underline' }}>
          Submit Another Vehicle
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 48 }}>
        {[{ n: 1, label: 'Vehicle Details' }, { n: 2, label: 'Your Info' }].map(({ n, label }, i) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', border: `2px solid ${step >= n ? '#C9A96E' : 'rgba(255,255,255,0.15)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, color: step >= n ? '#C9A96E' : 'rgba(255,255,255,0.3)', transition: 'all 0.3s', background: step > n ? 'rgba(201,169,110,0.1)' : 'transparent' }}>
                {step > n ? '✓' : n}
              </div>
              <span style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: step >= n ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)' }}>{label}</span>
            </div>
            {i < 1 && <div style={{ flex: 1, height: 1, background: step > 1 ? '#C9A96E' : 'rgba(255,255,255,0.1)', margin: '0 16px', marginBottom: 28, transition: 'background 0.3s' }} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 300, color: '#FAFAF8', marginBottom: 32 }}>Tell Us About Your Vehicle</h3>

          {/* Year & Make */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={labelStyle}>Year *</label>
              <select value={step1.year ?? ''} onChange={(e) => setStep1((p) => ({ ...p, year: e.target.value, model: '' }))}
                style={getInputStyle('year')} onFocus={() => setFocusedField('year')} onBlur={() => setFocusedField(null)}>
                <option value=''>Select year</option>
                {years.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
              {errors1.year && <p style={errorStyle}>{errors1.year}</p>}
            </div>
            <div>
              <label style={labelStyle}>Make *</label>
              <select value={step1.make ?? ''} onChange={(e) => setStep1((p) => ({ ...p, make: e.target.value, model: '' }))}
                style={getInputStyle('make')} onFocus={() => setFocusedField('make')} onBlur={() => setFocusedField(null)}>
                <option value=''>Select make</option>
                {makes.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              {errors1.make && <p style={errorStyle}>{errors1.make}</p>}
            </div>
          </div>

          {/* Model */}
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Model *</label>
            <select value={step1.model ?? ''} onChange={(e) => setStep1((p) => ({ ...p, model: e.target.value }))}
              disabled={!step1.make} style={{ ...getInputStyle('model'), opacity: step1.make ? 1 : 0.4, cursor: step1.make ? 'pointer' : 'not-allowed' }}
              onFocus={() => setFocusedField('model')} onBlur={() => setFocusedField(null)}>
              <option value=''>{step1.make ? 'Select model' : 'Select a make first'}</option>
              {models.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            {errors1.model && <p style={errorStyle}>{errors1.model}</p>}
          </div>

          {/* VIN & Mileage */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={labelStyle}>VIN (optional — helps accuracy)</label>
              <input type='text' value={step1.vin ?? ''} onChange={(e) => setStep1((p) => ({ ...p, vin: e.target.value.toUpperCase() }))}
                placeholder='e.g. 1HGCM82633A004352' maxLength={17}
                style={getInputStyle('vin')} onFocus={() => setFocusedField('vin')} onBlur={() => setFocusedField(null)} />
              {errors1.vin && <p style={errorStyle}>{errors1.vin}</p>}
            </div>
            <div>
              <label style={labelStyle}>Mileage (km) *</label>
              <input type='text' inputMode='numeric' value={step1.mileage ?? ''}
                onChange={(e) => setStep1((p) => ({ ...p, mileage: formatMileage(e.target.value) }))}
                placeholder='e.g. 85,000'
                style={getInputStyle('mileage')} onFocus={() => setFocusedField('mileage')} onBlur={() => setFocusedField(null)} />
              {errors1.mileage && <p style={errorStyle}>{errors1.mileage}</p>}
            </div>
          </div>

          {/* Condition */}
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Condition *</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8 }}>
              {conditions.map((c) => (
                <button key={c} type='button' onClick={() => setStep1((p) => ({ ...p, condition: c }))}
                  style={{ padding: '14px 12px', background: step1.condition === c ? 'rgba(201,169,110,0.15)' : '#222', border: `1px solid ${step1.condition === c ? '#C9A96E' : 'rgba(255,255,255,0.08)'}`, color: step1.condition === c ? '#C9A96E' : 'rgba(255,255,255,0.6)', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left' as const }}>
                  <span style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{c}</span>
                  <span style={{ display: 'block', fontSize: 11, color: step1.condition === c ? 'rgba(201,169,110,0.7)' : 'rgba(255,255,255,0.3)', lineHeight: 1.4 }}>{conditionDesc[c]}</span>
                </button>
              ))}
            </div>
            {errors1.condition && <p style={errorStyle}>{errors1.condition}</p>}
          </div>

          {/* Comments */}
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Additional Comments (optional)</label>
            <textarea value={step1.comments ?? ''} onChange={(e) => setStep1((p) => ({ ...p, comments: e.target.value }))}
              rows={3} placeholder='Any known issues, modifications, recent service, extras included…'
              style={{ ...getInputStyle('comments'), resize: 'vertical' }}
              onFocus={() => setFocusedField('comments')} onBlur={() => setFocusedField(null)} />
          </div>

          {/* Photo upload */}
          <div style={{ marginBottom: 32 }}>
            <label style={labelStyle}>Photos (3+ recommended — front, side, interior)</label>
            <label style={{ display: 'block', border: '2px dashed rgba(255,255,255,0.12)', padding: '32px 24px', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s', background: '#1a1a1a' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}>
              <input type='file' multiple accept='image/*' onChange={handleFileChange} style={{ display: 'none' }} />
              <div style={{ fontSize: 32, marginBottom: 8 }}>📷</div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Click to upload or drag & drop</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>JPEG, PNG, HEIC up to 20MB each · Max 10 photos</p>
            </label>
            {files.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                {files.map((f, i) => (
                  <div key={i} style={{ position: 'relative', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)', padding: '8px 36px 8px 12px', borderRadius: 2 }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{f.name}</span>
                    <button onClick={() => removeFile(i)} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: 14, lineHeight: 1 }}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button onClick={handleStep1Submit} style={{ width: '100%', padding: '16px 32px', background: '#C9A96E', color: '#080808', fontSize: 13, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'all 0.3s', fontFamily: 'var(--font-sans)' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#E8D5B0' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#C9A96E' }}>
            Continue to Contact Info →
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 300, color: '#FAFAF8', marginBottom: 8 }}>Where Should We Send Your Offer?</h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
              Vehicle: <strong style={{ color: 'rgba(255,255,255,0.7)' }}>{step1.year} {step1.make} {step1.model}</strong> · {step1.mileage} km · {step1.condition}
            </p>
          </div>

          {/* Name row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={labelStyle}>First Name *</label>
              <input type='text' value={step2.firstName ?? ''} onChange={(e) => setStep2((p) => ({ ...p, firstName: e.target.value }))}
                placeholder='Jane' style={getInputStyle('firstName')} onFocus={() => setFocusedField('firstName')} onBlur={() => setFocusedField(null)} />
              {errors2.firstName && <p style={errorStyle}>{errors2.firstName}</p>}
            </div>
            <div>
              <label style={labelStyle}>Last Name *</label>
              <input type='text' value={step2.lastName ?? ''} onChange={(e) => setStep2((p) => ({ ...p, lastName: e.target.value }))}
                placeholder='Doe' style={getInputStyle('lastName')} onFocus={() => setFocusedField('lastName')} onBlur={() => setFocusedField(null)} />
              {errors2.lastName && <p style={errorStyle}>{errors2.lastName}</p>}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Email Address *</label>
            <input type='email' value={step2.email ?? ''} onChange={(e) => setStep2((p) => ({ ...p, email: e.target.value }))}
              placeholder='jane@example.com' style={getInputStyle('email')} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} />
            {errors2.email && <p style={errorStyle}>{errors2.email}</p>}
          </div>

          <div style={{ marginBottom: 32 }}>
            <label style={labelStyle}>Phone Number *</label>
            <input type='tel' value={step2.phone ?? ''} onChange={(e) => setStep2((p) => ({ ...p, phone: e.target.value }))}
              placeholder='+1 (416) 000-0000' style={getInputStyle('phone')} onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField(null)} />
            {errors2.phone && <p style={errorStyle}>{errors2.phone}</p>}
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setStep(1)} style={{ padding: '16px 24px', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font-sans)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#FAFAF8' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}>
              ← Back
            </button>
            <button onClick={handleStep2Submit} disabled={submitting} style={{ flex: 1, padding: '16px 32px', background: submitting ? '#8a7248' : '#C9A96E', color: '#080808', fontSize: 13, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: submitting ? 'wait' : 'pointer', transition: 'all 0.3s', fontFamily: 'var(--font-sans)' }}>
              {submitting ? 'Submitting…' : 'Get My Free Offer →'}
            </button>
          </div>

          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', lineHeight: 1.6, marginTop: 16, textAlign: 'center' }}>
            By submitting, you agree to be contacted by SellYourAuto.ca. Your information is never sold or shared with third parties.
          </p>
        </div>
      )}
    </div>
  )
}
