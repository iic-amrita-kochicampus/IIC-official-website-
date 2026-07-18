import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../common/Logo'
import amritaLogo from '../../assets/logos/amrita-logo.png'
import iicLogo from '../../assets/logos/iic-logo.png'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/team', label: 'Team' },
  { to: '/events', label: 'Events' },
  { to: '/ambassadors', label: 'Ambassadors' },
  { to: '/research', label: 'Research' },
  { to: '/projects', label: 'Projects' },
  { to: '/establishment', label: 'Certifications' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 md:px-6 pt-3">
      <div
        className={`max-w-[1400px] mx-auto flex items-center justify-between rounded-2xl border transition-all duration-500 ${
          scrolled
            ? 'h-16 px-5 bg-ink/70 backdrop-blur-xl border-white/10 shadow-[0_8px_40px_-12px_rgba(43,111,255,0.25)]'
            : 'h-20 px-6 bg-white/[0.02] backdrop-blur-md border-white/5'
        }`}
      >
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-4 py-2 shadow-[0_8px_30px_-20px_rgba(255,255,255,0.35)] backdrop-blur-xl">
          <Logo src={amritaLogo} alt="Amrita Vishwa Vidyapeetham" layout="full" size={46} />
          <div className="w-px h-10 bg-white/20" />
          <Logo src={iicLogo} alt="Institution's Innovation Council" layout="full" size={46} />
          <NavLink to="/" className="hidden sm:flex flex-col leading-none ml-2" data-cursor-hover>
            <span className="font-display text-sm tracking-tight text-paper">Innovation Council</span>
            <span className="text-[10px] font-mono text-fog">Amrita Vishwa Vidyapeetham</span>
          </NavLink>
        </div>

        <nav className="hidden xl:flex items-center gap-5">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-cursor-hover
              className={({ isActive }) =>
                `relative text-[12px] font-mono uppercase tracking-wide transition-colors group whitespace-nowrap ${
                  isActive ? 'text-innovation-orange' : 'text-fog hover:text-paper'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-[1.5px] bg-gradient-to-r from-innovation-blue to-innovation-orange transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <NavLink
            to="/ideas-queries"
            data-cursor-hover
            className="btn-premium hidden md:inline-block px-5 py-2.5 rounded-full bg-gradient-to-r from-innovation-blue to-innovation-orange text-void text-xs font-mono font-medium uppercase tracking-wide hover:shadow-[0_0_25px_-4px_rgba(43,111,255,0.7)] transition-shadow"
          >
            Submit an Idea
          </NavLink>
          <button
            aria-label="Toggle menu"
            className="xl:hidden flex flex-col gap-1.5 w-8"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`h-px bg-paper transition-transform ${open ? 'rotate-45 translate-y-[3px]' : ''}`} />
            <span className={`h-px bg-paper transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`h-px bg-paper transition-transform ${open ? '-rotate-45 -translate-y-[3px]' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden mt-2 max-w-[1400px] mx-auto bg-ink/90 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-6 flex flex-col gap-5">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-base font-mono uppercase tracking-wide text-fog"
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/ideas-queries"
            onClick={() => setOpen(false)}
            className="mt-2 inline-block px-4 py-3 rounded-full bg-gradient-to-r from-innovation-blue to-innovation-orange text-void text-xs font-mono uppercase tracking-wide text-center"
          >
            Submit an Idea
          </NavLink>
        </div>
      )}
    </header>
  )
}
