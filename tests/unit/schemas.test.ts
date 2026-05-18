import { describe, it, expect } from 'vitest'
import { vehicleStep1Schema, vehicleStep2Schema } from '@/lib/schemas'

describe('vehicleStep1Schema', () => {
  const validStep1 = {
    year: '2020',
    make: 'Toyota',
    model: 'Camry',
    mileage: '50,000',
    condition: 'Good' as const,
  }

  it('accepts valid vehicle data', () => {
    expect(vehicleStep1Schema.safeParse(validStep1).success).toBe(true)
  })

  it('rejects missing year', () => {
    const result = vehicleStep1Schema.safeParse({ ...validStep1, year: '' })
    expect(result.success).toBe(false)
  })

  it('rejects year out of range', () => {
    const result = vehicleStep1Schema.safeParse({ ...validStep1, year: '1950' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid VIN length', () => {
    const result = vehicleStep1Schema.safeParse({ ...validStep1, vin: 'SHORTVIN' })
    expect(result.success).toBe(false)
  })

  it('accepts valid 17-char VIN', () => {
    const result = vehicleStep1Schema.safeParse({ ...validStep1, vin: '1HGCM82633A004352' })
    expect(result.success).toBe(true)
  })

  it('accepts no VIN (optional)', () => {
    const result = vehicleStep1Schema.safeParse({ ...validStep1, vin: undefined })
    expect(result.success).toBe(true)
  })

  it('rejects missing make', () => {
    const result = vehicleStep1Schema.safeParse({ ...validStep1, make: '' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid condition', () => {
    const result = vehicleStep1Schema.safeParse({ ...validStep1, condition: 'Damaged' })
    expect(result.success).toBe(false)
  })
})

describe('vehicleStep2Schema', () => {
  const validStep2 = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    phone: '+1 (416) 555-0100',
  }

  it('accepts valid contact data', () => {
    expect(vehicleStep2Schema.safeParse(validStep2).success).toBe(true)
  })

  it('rejects invalid email', () => {
    const result = vehicleStep2Schema.safeParse({ ...validStep2, email: 'not-an-email' })
    expect(result.success).toBe(false)
  })

  it('rejects empty first name', () => {
    const result = vehicleStep2Schema.safeParse({ ...validStep2, firstName: '' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid phone', () => {
    const result = vehicleStep2Schema.safeParse({ ...validStep2, phone: 'abc' })
    expect(result.success).toBe(false)
  })

  it('accepts various Canadian phone formats', () => {
    for (const phone of ['416-555-0100', '(416) 555-0100', '+14165550100', '416 555 0100']) {
      expect(vehicleStep2Schema.safeParse({ ...validStep2, phone }).success).toBe(true)
    }
  })
})
