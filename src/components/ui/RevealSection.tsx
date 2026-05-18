'use client'

import React, { useEffect, useRef, ReactNode, HTMLAttributes, ElementType } from 'react'

interface RevealSectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  delay?: number
  as?: ElementType
}

export default function RevealSection({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  ...rest
}: RevealSectionProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('visible')
          }, delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
