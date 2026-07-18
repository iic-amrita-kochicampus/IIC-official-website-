import { useEffect, useState } from 'react'

function getTimeParts(targetDate) {
  const target = new Date(targetDate).getTime()
  const now = Date.now()
  const diff = target - now

  if (!targetDate || Number.isNaN(target) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds, expired: false }
}

export function useCountdown(targetDate) {
  const [time, setTime] = useState(() => getTimeParts(targetDate))

  useEffect(() => {
    setTime(getTimeParts(targetDate))
    const id = setInterval(() => {
      setTime(getTimeParts(targetDate))
    }, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return time
}
