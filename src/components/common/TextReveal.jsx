import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Splits text into words, each wrapped in an overflow-hidden mask,
 * and reveals them with a staggered upward wipe — the "line lifts
 * out from behind a curtain" effect used on premium agency sites.
 */
export default function TextReveal({ text, as: Tag = 'p', className = '', delay = 0, trigger = 'scroll' }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const words = el.querySelectorAll('.tr-word-inner')

    const ctx = gsap.context(() => {
      gsap.set(words, { yPercent: 110 })

      const anim = gsap.to(words, {
        yPercent: 0,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.035,
        delay,
      })

      if (trigger === 'scroll') {
        anim.pause()
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          onEnter: () => anim.play(),
          onLeaveBack: () => anim.progress(0).pause(),
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [delay, trigger])

  return (
    <Tag ref={containerRef} className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top pb-[0.1em] -mb-[0.1em]">
          <span className="tr-word-inner inline-block">
            {word}
            {i < text.split(' ').length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Tag>
  )
}
