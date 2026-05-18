export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatMileage(value: string): string {
  const numeric = value.replace(/\D/g, '')
  return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function getYears(): string[] {
  const current = new Date().getFullYear() + 1
  const years: string[] = []
  for (let y = current; y >= 1980; y--) {
    years.push(String(y))
  }
  return years
}
