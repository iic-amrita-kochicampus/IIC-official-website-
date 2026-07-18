import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...pos }

    const move = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      gsap.set(dot, { x: pos.x, y: pos.y })
    }
    window.addEventListener('mousemove', move)

    let raf
    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16
      ringPos.y += (pos.y - ringPos.y) * 0.16
      gsap.set(ring, { x: ringPos.x, y: ringPos.y })
      raf = requestAnimationFrame(tick)
    }
    tick()

    const onEnter = () => ring.classList.add('scale-[2.2]', 'border-signal')
    const onLeave = () => ring.classList.remove('scale-[2.2]', 'border-signal')
    const targets = () => document.querySelectorAll('[data-cursor-hover]')
    const attach = () => {
      targets().forEach((t) => {
        t.addEventListener('mouseenter', onEnter)
        t.addEventListener('mouseleave', onLeave)
      })
    }
    attach()
    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="hidden md:block">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-signal rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-fog/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-[transform,border-color] duration-200 ease-out"
      />
    </div>
  )
}
