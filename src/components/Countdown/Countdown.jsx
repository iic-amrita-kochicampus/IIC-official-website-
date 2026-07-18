import { useCountdown } from '../../hooks/useCountdown'

export default function Countdown({ targetDate, compact = false }) {
  const { days, hours, minutes, seconds, expired } = useCountdown(targetDate)

  if (!targetDate) return null

  if (expired) {
    return <span className="text-[10px] font-mono uppercase text-innovation-blue">Event has started!</span>
  }

  const units = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Seconds' },
  ]

  if (compact) {
    return (
      <div className="flex gap-2">
        {units.map(({ value, label }) => (
          <div key={label} className="text-center">
            <span className="text-sm font-bold font-mono text-innovation-orange">{String(value).padStart(2, '0')}</span>
            <span className="text-[9px] font-mono uppercase text-fog block">{label}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex gap-3">
      {units.map(({ value, label }) => (
        <div key={label} className="glass-card rounded-xl p-3 text-center min-w-[64px]">
          <span className="text-xl font-bold font-mono text-innovation-orange">{String(value).padStart(2, '0')}</span>
          <span className="text-[9px] font-mono uppercase text-fog block mt-1">{label}</span>
        </div>
      ))}
    </div>
  )
}
