import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01#$%_/\\'

export default function ScrambleText({ text, as: Tag = 'span', trigger = 'mount', className = '' }) {
  const [display, setDisplay] = useState(trigger === 'mount' ? text : text)
  const ref = useRef(null)
  const running = useRef(false)

  const scramble = () => {
    if (running.current) return
    running.current = true
    let iteration = 0
    const total = text.length
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' '
            if (i < iteration) return text[i]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )
      iteration += total / 18
      if (iteration >= total) {
        clearInterval(interval)
        setDisplay(text)
        running.current = false
      }
    }, 30)
  }

  useEffect(() => {
    if (trigger === 'mount') {
      scramble()
    } else if (trigger === 'visible') {
      const el = ref.current
      if (!el) return
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              scramble()
              io.disconnect()
            }
          })
        },
        { threshold: 0.4 }
      )
      io.observe(el)
      return () => io.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Tag
      ref={ref}
      className={className}
      onMouseEnter={trigger === 'hover' ? scramble : undefined}
    >
      {display}
    </Tag>
  )
}
