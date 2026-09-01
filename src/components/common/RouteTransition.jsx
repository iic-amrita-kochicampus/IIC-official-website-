import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

export default function RouteTransition() {
  const location = useLocation()
  const curtainRef = useRef(null)
  const prevPath = useRef(null)

  useEffect(() => {
    // First-ever run (and StrictMode's simulated re-run in dev) both land here
    // if prevPath hasn't diverged from the current path yet — so compare values,
    // not a boolean flag, or StrictMode's double-invoke fires the animation
    // on initial load and leaves the curtain stuck visible.
    if (prevPath.current === null) {
      prevPath.current = location.pathname
      return
    }
    if (prevPath.current === location.pathname) return
    prevPath.current = location.pathname

    const el = curtainRef.current
    if (!el) return
    gsap.set(el, { yPercent: 100, opacity: 0 })
    const tl = gsap.timeline()
    tl.to(el, { yPercent: 0, opacity: 1, duration: 0.24, ease: 'power2.out' }).to(el, {
      yPercent: -100,
      opacity: 0,
      duration: 0.32,
      ease: 'power2.inOut',
      delay: 0.04,
    })
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [location.pathname])

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-[9997] pointer-events-none bg-void/80"
      style={{ transform: 'translateY(100%)', opacity: 0 }}
    />
  )
}
