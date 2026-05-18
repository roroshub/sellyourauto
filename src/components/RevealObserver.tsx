'use client'

import { useEffect } from 'react'

export default function RevealObserver() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    const attach = () => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => obs.observe(el))
    }

    attach()

    // Re-attach on DOM mutations (for dynamically rendered sections)
    const mo = new MutationObserver(attach)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => { obs.disconnect(); mo.disconnect() }
  }, [])

  return null
}
