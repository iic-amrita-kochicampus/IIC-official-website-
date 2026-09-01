import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Wraps any content (image, glass card, panel) in an overflow-hidden
 * mask. On scroll-into-view, a solid curtain wipes away while the
 * content scales/settles in from a slight zoom — the signature
 * "reveal" moment used on Cunliffe / Noomo-style sites.
 */
export default function MaskReveal({
  children,
  delay = 0,
  className = '',
  curtainClass = 'bg-void',
  direction = 'up', // 'up' | 'left' | 'right'
}) {
  const wrapRef = useRef(null)
  const curtainRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const curtain = curtainRef.current
    const content = contentRef.current
    if (!wrap) return

    const curtainOrigin =
      direction === 'left' ? { xPercent: -100 } : direction === 'right' ? { xPercent: 100 } : { yPercent: -100 }

    const ctx = gsap.context(() => {
      gsap.set(content, { scale: 1.15, opacity: 0.4 })
      const tl = gsap.timeline({ paused: true })
      tl.to(curtain, { ...curtainOrigin, duration: 0.9, ease: 'power4.inOut', delay })
        .to(content, { scale: 1, opacity: 1, duration: 1.1, ease: 'power3.out' }, '-=0.7')

      ScrollTrigger.create({
        trigger: wrap,
        start: 'top 85%',
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.progress(0).pause(),
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [delay, direction])

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <div ref={contentRef}>{children}</div>
      <div ref={curtainRef} className={`absolute inset-0 z-10 ${curtainClass}`} />
    </div>
  )
}
