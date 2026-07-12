import { useCountdown } from '../../hooks/useCountdown';

export default function Countdown({ targetDate, compact = false }) {
  const { days, hours, minutes, seconds, expired } = useCountdown(targetDate);

  if (expired) {
    return <span className="text-success font-semibold">Event has started!</span>;
  }

  const units = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Seconds' },
  ];

  if (compact) {
    return (
      <div className="flex gap-2">
        {units.map(({ value, label }) => (
          <div key={label} className="text-center">
            <span className="text-lg font-bold text-primary">{String(value).padStart(2, '0')}</span>
            <span className="text-xs text-slate-500 block">{label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      {units.map(({ value, label }) => (
        <div key={label} className="bg-white/90 backdrop-blur rounded-xl p-3 shadow-lg text-center min-w-[70px]">
          <span className="text-2xl font-bold text-primary">{String(value).padStart(2, '0')}</span>
          <span className="text-xs text-slate-500 block mt-1">{label}</span>
        </div>
      ))}
    </div>
  );
}
