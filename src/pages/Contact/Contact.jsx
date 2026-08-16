import { MapPin } from 'lucide-react'
import Reveal from '../../components/common/Reveal'
import ContactForm from '../../components/forms/ContactForm'
import { useSupabase } from '../../hooks/useSupabase'
import { TABLES } from '../../services/supabase'

// Inline SVG components for social media icons
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-8.87 0 4.5 4.5 0 0 0 0 6.36 12.5 12.5 0 0 1-9.5 2.8 4.5 4.5 0 0 0 .7 4.7 4.4 4.4 0 0 1-5.3-.3 13 13 0 0 0 5 1.4 4.5 4.5 0 0 0 5.6-3 4.5 4.5 0 0 0 1-3.2V4.7a13 13 0 0 1 1.8-2.6 4.5 4.5 0 0 1 4.7-2.5 4 4 0 0 1 5.2 0 10.5 10.5 0 0 1 5.6 3.8z" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const MAPS_URL = 'https://maps.app.goo.gl/ViQoyvZdiN5MtLKb7'

export default function Contact() {
  const { data: settings, loading } = useSupabase(TABLES.SETTINGS, {
    orderBy: 'created_at',
    ascending: false,
    limit: 1,
  })

  const settingsData = settings?.[0] || {}

  return (
    <div className="pt-32 pb-24 max-w-[1400px] mx-auto px-6 md:px-10">
      <Reveal>
        <span className="eyebrow">Contact</span>
      </Reveal>
      <Reveal delay={0.1}>
        <h1 className="mt-6 font-display text-3xl md:text-6xl text-paper">Let&apos;s talk.</h1>
      </Reveal>

      <div className="mt-16 grid md:grid-cols-[1fr_1.2fr] gap-16">
        <Reveal delay={0.1} x={-50} y={0} className="space-y-6 glass-card rounded-2xl p-8">
          <div>
            <span className="eyebrow">Email</span>
            {settingsData.email ? (
              <a href={`mailto:${settingsData.email}`} className="block mt-2 text-paper hover:text-innovation-blue">{settingsData.email}</a>
            ) : (
              <a href="mailto:iic@kh.amrita.edu" className="block mt-2 text-paper hover:text-innovation-blue">iic@kh.amrita.edu</a>
            )}
          </div>
          <div>
            <span className="eyebrow">Phone</span>
            {settingsData.phone ? (
              <a href={`tel:${settingsData.phone}`} className="block mt-2 text-paper hover:text-innovation-blue flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2v4a2 2 0 0 1-2 2H2" />
                </svg>
                <span>{settingsData.phone}</span>
              </a>
            ) : (
              <p className="text-fog text-sm mt-2">Phone number not available</p>
            )}
          </div>
          <div>
            <span className="eyebrow">Location</span>
            {settingsData.address ? (
              <p className="text-fog text-sm mt-2">{settingsData.address}</p>
            ) : (
              <p className="text-fog text-sm mt-2">Amrita Vishwa Vidyapeetham, Kochi Campus</p>
            )}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              aria-label="Open location in Google Maps"
              className="mt-3 inline-flex w-9 h-9 rounded-full glass-card items-center justify-center text-fog hover:text-innovation-orange transition-colors"
            >
              <MapPin size={16} />
            </a>
          </div>
          <div>
            <span className="eyebrow">Social</span>
            <div className="flex gap-2 mt-2">
              {settingsData.facebook && (
                <a
                  href={settingsData.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-fog hover:text-innovation-orange transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              )}
              {settingsData.twitter && (
                <a
                  href={settingsData.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  aria-label="Twitter"
                  className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-fog hover:text-innovation-orange transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-8.87 0 4.5 4.5 0 0 0 0 6.36 12.5 12.5 0 0 1-9.5 2.8 4.5 4.5 0 0 0 .7 4.7 4.4 4.4 0 0 1-5.3-.3 13 13 0 0 0 5 1.4 4.5 4.5 0 0 0 5.6-3 4.5 4.5 0 0 0 1-3.2V4.7a13 13 0 0 1 1.8-2.6 4.5 4.5 0 0 1 4.7-2.5 4 4 0 0 1 5.2 0 10.5 10.5 0 0 1 5.6 3.8z" />
                  </svg>
                </a>
              )}
              {settingsData.instagram && (
                <a
                  href={settingsData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-fog hover:text-innovation-orange transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              )}
              {settingsData.linkedin && (
                <a
                  href={settingsData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-fog hover:text-innovation-orange transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              )}
              {!settingsData.instagram && !settingsData.linkedin && !settingsData.facebook && !settingsData.twitter && (
                <>
                  <a
                    href="https://www.instagram.com/iic.asas/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    aria-label="Instagram"
                    className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-fog hover:text-innovation-orange transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/institutions-innovation-council-asas/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    aria-label="LinkedIn"
                    className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-fog hover:text-innovation-orange transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} x={50} y={0}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  )
}