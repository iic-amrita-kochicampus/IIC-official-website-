import { NavLink } from 'react-router-dom'
import Logo from '../common/Logo'
import amritaLogo from '../../assets/logos/amrita-logo.png'

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-line bg-ink bg-grid overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-innovation-blue/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <Logo src={amritaLogo} alt="Amrita Vishwa Vidyapeetham" layout="full" size={40} />
            <Logo initials="IIC" alt="Institution's Innovation Council" tone="iic" size={38} />
            <span className="font-display text-lg">Innovation Council</span>
          </div>
          <p className="text-sm text-fog max-w-sm">
            Institution&apos;s Innovation Council, Amrita Vishwa Vidyapeetham — a Ministry of Education
            initiative turning student ideas into research, projects, and impact.
          </p>
          <p className="mt-4 text-sm gradient-text font-display italic">
            &ldquo;Innovation should be experienced, not explained.&rdquo;
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4">Navigate</p>
          <div className="flex flex-col gap-2">
            {['/', '/about', '/team', '/events', '/ambassadors', '/research', '/projects', '/establishment', '/ideas-queries', '/contact'].map((to) => (
              <NavLink key={to} to={to} className="text-sm text-fog hover:text-innovation-orange transition-colors w-fit">
                {to === '/' ? 'Home' : to.replace('/', '').replace('-', ' ')}
              </NavLink>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow mb-4">Connect</p>
          <a href="mailto:iic@amrita.edu" className="text-sm text-fog hover:text-innovation-orange block mb-3">
            iic@amrita.edu
          </a>
          <div className="flex gap-4 mt-4">
            <a href="#" aria-label="Instagram" data-cursor-hover className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-fog hover:text-innovation-orange text-xs font-mono">IG</a>
            <a href="#" aria-label="LinkedIn" data-cursor-hover className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-fog hover:text-innovation-orange text-xs font-mono">LI</a>
          </div>
        </div>
      </div>

      <div className="hairline relative" />
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-fog font-mono">
        <span>Amrita Vishwa Vidyapeetham · Institution&apos;s Innovation Council · {new Date().getFullYear()}</span>
        <div className="flex items-center gap-2">
          <NavLink
            to="/admin/login"
            aria-label="Admin"
            className="w-2 h-2 rounded-full bg-fog/20 hover:bg-fog/60 transition-colors"
          />
          <button
            onClick={scrollTop}
            data-cursor-hover
            className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:text-innovation-blue transition-colors"
            aria-label="Back to top"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
