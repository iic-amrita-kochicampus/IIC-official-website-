import amritaLogo from '../../assets/logos/amrita-logo.png'
import iicLogo from '../../assets/logos/iic-logo.png'

/**
 * Logo container — handles sizing for either a full inline brand mark or a
 * smaller badge-style icon. Only use the Amrita logo when it is explicitly
 * requested via props.
 */
const TONES = {
  maroon: 'from-maroon to-maroon-light',
  iic: 'from-innovation-blue to-innovation-orange',
}

export default function Logo({ src, alt, initials, tone = 'iic', size = 44, layout = 'badge' }) {
  const dimension = `${size}px`
  const resolvedSrc = src || (layout === 'badge' && initials?.toUpperCase() === 'IIC' ? iicLogo : null)

  if (layout === 'full') {
    return (
      <div
        className="flex items-center overflow-hidden rounded-3xl bg-white/35 border border-white/20 p-2 backdrop-blur-md shadow-[0_20px_60px_-40px_rgba(255,255,255,0.8)]"
        style={{ height: dimension }}
      >
        {resolvedSrc ? (
          <img src={resolvedSrc} alt={alt} className="h-full w-auto object-contain" />
        ) : (
          <span className="text-sm font-mono text-paper/90">{alt || initials}</span>
        )}
      </div>
    )
  }

  return (
    <div
      className={`relative shrink-0 rounded-full border border-white/20 bg-gradient-to-br ${TONES[tone]} p-[2px] overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.18)]`}
      style={{ width: dimension, height: dimension }}
    >
      <div className="w-full h-full rounded-full bg-white/35 backdrop-blur-md flex items-center justify-center overflow-hidden">
        {resolvedSrc ? (
          <img src={resolvedSrc} alt={alt} className="w-[82%] h-[82%] object-contain" />
        ) : (
          <span className="text-[10px] font-mono text-paper/90">{initials}</span>
        )}
      </div>
    </div>
  )
}
