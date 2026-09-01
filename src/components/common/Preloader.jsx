import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Logo from './Logo'

export default function Preloader() {
  const [done, setDone] = useState(false)
  const rootRef = useRef(null)
  const barRef = useRef(null)
  const panelsRef = useRef([])

  useEffect(() => {
    if (sessionStorage.getItem('iic-visited')) {
      setDone(true)
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('iic-visited', '1')
          setDone(true)
        },
      })

      tl.fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'power2.inOut', transformOrigin: 'left' })
        .to('.preloader-word', { yPercent: 0, duration: 0.6, ease: 'power4.out', stagger: 0.08 }, '-=0.7')
        .to({}, { duration: 0.25 }) // hold
        .to(panelsRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          stagger: 0.06,
        })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  if (done) return null

  return (
    <div ref={rootRef} className="fixed inset-0 z-[9999] pointer-events-none">
      {[0, 1, 2].map((i) => {
        // Slight overlap (0.4%) on each shared edge so rounding never leaves
        // a hairline gap that exposes whatever's rendered behind the preloader.
        const overlap = 0.4
        const left = Math.max(0, i * 33.34 - (i > 0 ? overlap : 0))
        const right = Math.max(0, (2 - i) * 33.34 - (i < 2 ? overlap : 0))
        return (
          <div
            key={i}
            ref={(el) => (panelsRef.current[i] = el)}
            className="absolute inset-0 bg-void"
            style={{ clipPath: `inset(0 ${right.toFixed(2)}% 0 ${left.toFixed(2)}%)` }}
          />
        )
      })}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        <div className="flex items-center gap-3">
          <Logo initials="IIC" alt="Institution's Innovation Council" tone="iic" size={34} />
        </div>
        <div className="overflow-hidden">
          <span className="preloader-word block font-display text-sm tracking-[0.3em] uppercase text-fog translate-y-full">
            Institution&apos;s Innovation Council
          </span>
        </div>
        <div className="w-40 h-px bg-line overflow-hidden">
          <div ref={barRef} className="h-full w-full bg-gradient-to-r from-innovation-blue to-innovation-orange" />
        </div>
      </div>
    </div>
  )
}
