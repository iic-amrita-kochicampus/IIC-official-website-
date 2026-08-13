import { MapPin } from 'lucide-react'
import Reveal from '../../components/common/Reveal'
import ContactForm from '../../components/forms/ContactForm'

const MAPS_URL = 'https://maps.app.goo.gl/ViQoyvZdiN5MtLKb7'

export default function Contact() {
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
            <a href="mailto:iic@kh.amrita.edu" className="block mt-2 text-paper hover:text-innovation-blue">iic@kh.amrita.edu</a>
          </div>
          <div>
            <span className="eyebrow">Location</span>
            <p className="mt-2 text-fog text-sm">Amrita Vishwa Vidyapeetham, Kochi Campus</p>
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
              <a
                href="https://www.instagram.com/iic.asas/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                aria-label="Instagram"
                className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-fog hover:text-innovation-orange transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
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