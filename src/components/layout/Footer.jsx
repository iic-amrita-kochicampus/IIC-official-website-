import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { useSupabase } from '../../hooks/useSupabase'
import Logo from '../common/Logo'
import amritaLogo from '../../assets/logos/amrita-logo.png'
import { Phone, Mail, MapPin } from 'lucide-react'

// Inline SVG components for social media icons
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-8.87 0 4.5 4.5 0 0 0 0 6.36 12.5 12.5 0 0 1-9.5 2.8 4.5 4.5 0 0 0 .7 4.7 4.4 4.4 0 0 1-5.3-.3 13 13 0 0 0 5 1.4 4.5 4.5 0 0 0 5.6-3 4.5 4.5 0 0 0 1-3.2V4.7a13 13 0 0 1 1.8-2.6 4.5 4.5 0 0 1 4.7-2.5 4 4 0 0 1 5.2 0 10.5 10.5 0 0 1 5.6 3.8z" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

export default function Footer() {
  const { data: settings, loading, refetch } = useSupabase('settings', {
    orderBy: 'created_at',
    ascending: false,
    limit: 1,
  })

const settingsData = settings?.[0] || {}

  // Listen for settings updates from admin panel (same tab)
  useEffect(() => {
    const handleSettingsUpdate = () => {
      refetch()
    }
    window.addEventListener('settings-updated', handleSettingsUpdate)
    return () => window.removeEventListener('settings-updated', handleSettingsUpdate)
  }, [refetch])

  // Also refetch when window gains focus (for cross-tab updates)
  useEffect(() => {
    const handleFocus = () => {
      refetch()
    }
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [refetch])

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

            {settingsData.about_short && (
              <p className="text-sm text-fog leading-relaxed mt-2">
                {settingsData.about_short}
              </p>
            )}

            {!settingsData.about_short && (
              <p className="text-sm text-fog leading-relaxed">
                Institution&apos;s Innovation Council,
                Amrita Vishwa Vidyapeetham,
                Kochi Campus.
              </p>
            )}

            {settingsData.phone && (
              <div className="mt-4 flex items-center gap-2 text-sm text-fog">
                <Phone className="w-4 h-4 text-fog" />
                <span>{settingsData.phone}</span>
              </div>
            )}

            {settingsData.address && (
              <div className="mt-2 flex items-start gap-2 text-sm text-fog">
                <MapPin className="w-4 h-4 text-fog mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{settingsData.address}</span>
              </div>
            )}
          </div>

          {/* Right */}
          <div>
            <p className="eyebrow mb-2">
              CONNECT
            </p>

            {settingsData.email && (
              <a
                href={`mailto:${settingsData.email}`}
                className="text-sm text-fog hover:text-innovation-orange transition-colors inline-block mb-2"
              >
                {settingsData.email}
              </a>
            )}

            {!settingsData.email && (
              <a
                href="mailto:iic@amrita.edu"
                className="text-sm text-fog hover:text-innovation-orange transition-colors inline-block mb-2"
              >
                iic@amrita.edu
              </a>
            )}

            {settingsData.phone && (
              <a
                href={`tel:${settingsData.phone}`}
                className="text-sm text-fog hover:text-innovation-orange transition-colors inline-block mb-2 flex items-center gap-1"
              >
                <Phone className="w-4 h-4" />
                {settingsData.phone}
              </a>
            )}

            <div className="flex gap-2 mt-3">
              {settingsData.facebook && (
                <a
                  href={settingsData.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:text-innovation-orange transition-colors"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
              )}

              {settingsData.twitter && (
                <a
                  href={settingsData.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:text-innovation-orange transition-colors"
                  aria-label="Twitter"
                >
                  <TwitterIcon />
                </a>
              )}

              {settingsData.instagram && (
                <a
                  href={settingsData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:text-innovation-orange transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
              )}

              {settingsData.linkedin && (
                <a
                  href={settingsData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:text-innovation-orange transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon />
                </a>
              )}

              {/* Fallback: Only show default Instagram and LinkedIn if no custom URLs provided */}
              {!settingsData.instagram && !settingsData.linkedin && (
                <>
                  <a
                    href="https://www.instagram.com/iic.asas?igsh=dHZ4aWNqcHk4dXds"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:text-innovation-orange transition-colors"
                    aria-label="Instagram"
                  >
                    <InstagramIcon />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/institutions-innovation-council-asas/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:text-innovation-orange transition-colors"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon />
                  </a>
                </>
              )}
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
          {settingsData.institution_name || 'Amrita Vishwa Vidyapeetham, Kochi Campus'} ·
          {settingsData.iic_name || 'Institution&apos;s Innovation Council'} ·{' '}
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