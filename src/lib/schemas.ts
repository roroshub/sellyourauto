import { z } from 'zod'

const currentYear = new Date().getFullYear()

export const vehicleStep1Schema = z.object({
  year: z
    .string()
    .min(1, 'Year is required')
    .refine((v) => {
      const y = parseInt(v)
      return y >= 1980 && y <= currentYear + 1
    }, 'Select a valid year'),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  vin: z
    .string()
    .optional()
    .refine((v) => !v || v.length === 17, 'VIN must be exactly 17 characters'),
  mileage: z
    .string()
    .min(1, 'Mileage is required')
    .refine((v) => !isNaN(Number(v.replace(/,/g, ''))) && Number(v.replace(/,/g, '')) >= 0, 'Enter a valid mileage'),
  condition: z.enum(['Excellent', 'Good', 'Fair', 'Poor']),
  comments: z.string().max(1000, 'Maximum 1000 characters').optional(),
})

export const vehicleStep2Schema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[\d\s\(\)\-\+\.]{7,20}$/, 'Enter a valid phone number'),
})

export type VehicleStep1 = z.infer<typeof vehicleStep1Schema>
export type VehicleStep2 = z.infer<typeof vehicleStep2Schema>
