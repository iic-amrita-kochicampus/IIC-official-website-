import { NavLink } from 'react-router-dom'
import Logo from '../common/Logo'
import amritaLogo from '../../assets/logos/amrita-logo.png'

export default function Footer() {
  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })

  const links = [
    ['/', 'Home'],
    ['/about', 'About'],
    ['/team', 'Team'],
    ['/events', 'Events'],
    ['/ambassadors', 'Ambassadors'],
    ['/research', 'Research'],
    ['/projects', 'Projects'],
    ['/establishment', 'Establishment'],
    ['/ideas-queries', 'Ideas & Queries'],
    ['/contact', 'Contact'],
  ]

  return (
    <footer className="relative border-t border-line bg-ink bg-grid overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350px] h-[180px] rounded-full bg-innovation-blue/10 blur-[90px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-6">

        {/* Top Row */}
        <div className="flex flex-col lg:flex-row justify-between gap-8">

          {/* Left */}
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-3">
              <Logo
                src={amritaLogo}
                alt="Amrita Vishwa Vidyapeetham"
                layout="full"
                size={34}
              />

              <Logo
                initials="IIC"
                alt="Institution's Innovation Council"
                tone="iic"
                size={32}
              />

              <span className="font-display text-xl">
                Innovation Council
              </span>
            </div>

            <p className="text-sm text-fog leading-relaxed">
              Institution&apos;s Innovation Council,
              Amrita Vishwa Vidyapeetham,
              Kochi Campus.
            </p>
          </div>

          {/* Right */}
          <div>
            <p className="eyebrow mb-2">
              CONNECT
            </p>

            <a
              href="mailto:iic@amrita.edu"
              className="text-sm text-fog hover:text-innovation-orange transition-colors"
            >
              iic@amrita.edu
            </a>

            <div className="flex gap-2 mt-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/iic.asas?igsh=dHZ4aWNqcHk4dXds"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:text-innovation-orange transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/institutions-innovation-council-asas/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:text-innovation-orange transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="border-t border-line mt-5 pt-4">
          <p className="eyebrow mb-3">
            NAVIGATE
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {links.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                className="text-sm text-fog hover:text-innovation-orange transition-colors"
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="hairline" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-3 flex justify-between items-center text-xs text-fog font-mono">

        <span>
          Amrita Vishwa Vidyapeetham, Kochi Campus ·
          Institution&apos;s Innovation Council ·{' '}
          {new Date().getFullYear()}
        </span>

        <div className="flex items-center gap-3">

          <NavLink
            to="/admin/login"
            aria-label="Admin"
            className="w-2 h-2 rounded-full bg-fog/20 hover:bg-fog/60 transition-colors"
          />

          <button
            onClick={scrollTop}
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