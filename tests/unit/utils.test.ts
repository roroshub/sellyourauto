import { describe, it, expect } from 'vitest'
import { formatMileage, getYears, cn } from '@/lib/utils'

describe('formatMileage', () => {
  it('formats numbers with commas', () => {
    expect(formatMileage('85000')).toBe('85,000')
    expect(formatMileage('1000000')).toBe('1,000,000')
  })

  it('strips non-numeric characters', () => {
    expect(formatMileage('85,000')).toBe('85,000')
    expect(formatMileage('abc123')).toBe('123')
  })

  it('handles empty string', () => {
    expect(formatMileage('')).toBe('')
  })
})

describe('getYears', () => {
  it('starts from next year', () => {
    const years = getYears()
    const nextYear = new Date().getFullYear() + 1
    expect(years[0]).toBe(String(nextYear))
  })

  it('ends at 1980', () => {
    const years = getYears()
    expect(years[years.length - 1]).toBe('1980')
  })

  it('returns years in descending order', () => {
    const years = getYears()
    expect(Number(years[0])).toBeGreaterThan(Number(years[1]))
  })
})

describe('cn', () => {
  it('joins class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('filters falsy values', () => {
    expect(cn('foo', false, null, undefined, 'bar')).toBe('foo bar')
  })

  it('handles empty args', () => {
    expect(cn()).toBe('')
  })
})
