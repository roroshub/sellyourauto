export interface Stat {
  num: string
  label: string
}

export interface Pillar {
  icon: string
  title: string
  desc: string
}

export interface Step {
  num: string
  title: string
  desc: string
}

export interface Value {
  icon: string
  title: string
  desc: string
}

export interface Testimonial {
  stars: number
  text: string
  author: string
  detail: string
  initials: string
}

export type Condition = 'Excellent' | 'Good' | 'Fair' | 'Poor'

export interface VehicleFormStep1 {
  year: string
  make: string
  model: string
  vin: string
  mileage: string
  condition: Condition
  comments: string
}

export interface VehicleFormStep2 {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export type FormStep = 1 | 2 | 3
