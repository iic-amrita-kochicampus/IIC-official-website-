import Logo from '../../components/common/Logo'
import iicLogo from '../../assets/logos/iic-logo.png'
import MaskReveal from '../../components/common/MaskReveal'
import TextReveal from '../../components/common/TextReveal'
import { lazy, Suspense, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import ScrambleText from '../../components/common/ScrambleText'
import Reveal from '../../components/common/Reveal'
import NoticeCard from '../../components/cards/NoticeCard'
import EventPreviewCard from '../../components/cards/EventPreviewCard'
import { useSupabase } from '../../hooks/useSupabase'
import { TABLES } from '../../services/supabase'

const HeroScene = lazy(() => import('../../components/three/HeroScene'))

const CERTS = [
  { org: 'MoE Innovation Cell', note: 'Established Council', href: '/establishment' },
  { org: 'AICTE', note: 'Recognized IIC', href: '/establishment' },
  { org: 'Amrita Vishwa Vidyapeetham,Kochi Campus', note: 'Founding Charter', href: '/establishment' },
]

const FUNCTIONS = [
  { num: '01', title: 'Ideate', text: 'Students submit raw ideas and open questions — no filter, no gatekeeping.', color: 'from-innovation-blue/20' },
  { num: '02', title: 'Research', text: 'Promising ideas move into structured research with faculty and senior guidance.', color: 'from-maroon-light/20' },
  { num: '03', title: 'Build', text: 'Validated concepts become active projects with real timelines and outcomes.', color: 'from-innovation-orange/20' },
  { num: '04', title: 'Share', text: 'Work is presented at events, competitions, and to the wider student body.', color: 'from-accent-red/20' },
]

export default function Home() {
  const heroRef = useRef(null)
  const { data: notices, loading: noticesLoading } = useSupabase(TABLES.NOTICES, {
    filters: { is_active: true },
    orderBy: 'published_date',
    ascending: false,
  })
  const { data: events, loading: eventsLoading } = useSupabase(TABLES.EVENTS, {
    orderBy: 'event_date',
    ascending: true,
  })

  const sortedNotices = [...notices].sort((a, b) => {
    if (a.is_pinned && !b.is_pinned) return -1
    if (!a.is_pinned && b.is_pinned) return 1
    return 0
  })
  const featuredEvents = events.filter((event) => ['upcoming', 'featured'].includes((event.status || '').toLowerCase()) && event.registration_url)
  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-void bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void z-[1] pointer-events-none" />
        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <HeroScene sectionRef={heroRef} />
          </Suspense>
        </div>

        {/* Ambient glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] rounded-full bg-innovation-blue/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] rounded-full bg-innovation-orange/15 blur-[120px] pointer-events-none" />

        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-[2]">
          <div className="max-w-[1400px] w-full mx-auto px-6 md:px-10 pt-32 flex justify-between items-start">
            <div className="flex items-center gap-3 pointer-events-auto glass-card rounded-full pl-2 pr-4 py-2">
              <Logo initials="IIC" alt="Institution's Innovation Council" tone="iic" size={30} />
              <span className="eyebrow ml-1">Ministry of Education Initiative</span>
            </div>
          </div>

          <div className="max-w-[1400px] w-full mx-auto px-6 md:px-10 pb-16 flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16">
            <div className="flex-1 min-w-0">
              <span className="eyebrow block mb-4">Amrita Vishwa Vidyapeetham,Kochi Campus</span>
              <h1 className="font-display leading-[0.92] text-paper">
                <ScrambleText
                  as="span"
                  trigger="mount"
                  text="INSTITUTION'S"
                  className="block text-[11vw] md:text-[5.2vw] tracking-tight"
                />
                <ScrambleText
                  as="span"
                  trigger="mount"
                  text="INNOVATION"
                  className="block text-[11vw] md:text-[5.2vw] tracking-tight gradient-text"
                />
                <ScrambleText
                  as="span"
                  trigger="mount"
                  text="COUNCIL"
                  className="block text-[11vw] md:text-[5.2vw] tracking-tight"
                />
              </h1>
              <p className="mt-6 max-w-md text-fog text-base md:text-lg font-body pointer-events-auto">
                The Institution's Innovation Council fosters a vibrant ecosystem of creativity and entrepreneurship, bridging academia and industry to transform ideas into impactful solutions.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 pointer-events-auto">
                <NavLink
                  to="/team"
                  data-cursor-hover
                  className="btn-premium px-7 py-3.5 rounded-full bg-gradient-to-r from-innovation-blue to-innovation-orange text-void text-sm font-mono font-medium uppercase tracking-wide hover:shadow-[0_0_35px_-5px_rgba(43,111,255,0.7)] transition-shadow"
                >
                  Meet the Team
                </NavLink>
                <NavLink
                  to="/ideas-queries"
                  data-cursor-hover
                  className="px-7 py-3.5 rounded-full border border-white/15 backdrop-blur-sm bg-white/[0.03] text-paper text-sm font-mono uppercase tracking-wide hover:border-innovation-blue hover:text-innovation-blue transition-colors"
                >
                  Submit an Idea
                </NavLink>
              </div>
            </div>

            <Reveal x={40} y={0} className="pointer-events-auto shrink-0 self-center lg:self-auto">
              <div className="relative w-[180px] h-[180px] md:w-[240px] md:h-[240px] lg:w-[280px] lg:h-[280px] mx-auto">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-innovation-blue/30 via-innovation-orange/20 to-maroon/20 blur-2xl animate-pulse" />
                <div className="relative w-full h-full rounded-full border border-white/20 bg-gradient-to-br from-innovation-blue to-innovation-orange p-[3px] shadow-[0_0_60px_-10px_rgba(43,111,255,0.5)]">
                  <div className="w-full h-full rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center overflow-hidden p-4">
                    <img src={iicLogo} alt="Institution's Innovation Council" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

{/* ABOUT PREVIEW */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <Reveal>
          <span className="eyebrow">Who we are</span>
        </Reveal>
        <Reveal delay={0.1} className="mt-6 max-w-3xl">
          <p className="font-display text-2xl md:text-4xl leading-tight text-paper">
            A student-led council turning curiosity into research, and research into things that ship —
            rooted in <span className="gradient-text">Amrita&apos;s innovation ecosystem</span>.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-8">
          <NavLink to="/about" data-cursor-hover className="inline-flex items-center gap-2 text-innovation-orange text-sm font-mono uppercase tracking-wide group">
            Learn more about us <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </NavLink>
        </Reveal>
      </section>

      {/* FUNCTIONS — process storytelling */}
      <section className="border-t border-line bg-ink bg-grid">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <Reveal>
            <span className="eyebrow">How it works</span>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {FUNCTIONS.map((f, i) => (
              <MaskReveal
                key={f.num}
                delay={i * 0.06}
                direction={i % 2 === 0 ? 'left' : 'right'}
                className="rounded-2xl"
                curtainClass="bg-ink"
              >
                <div className={`glass-card rounded-2xl p-8 md:p-12 bg-gradient-to-br ${f.color} to-transparent`}>
                  <span className="font-mono text-innovation-orange text-sm">{f.num}</span>
                  <h3 className="font-display text-2xl mt-4 text-paper">{f.title}</h3>
                  <p className="mt-3 text-fog text-sm leading-relaxed max-w-sm">{f.text}</p>
                </div>
              </MaskReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS STRIP */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
        <Reveal>
          <span className="eyebrow">Established &amp; recognized by</span>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-4">
          {CERTS.map((c, i) => (
            <Reveal key={c.org} delay={i * 0.08} x={-50} y={0}>
              <div className="glass-card rounded-xl flex items-center justify-between gap-4 px-6 py-4">
                <div>
                  <div className="text-sm text-paper font-medium">
                    {c.org}
                  </div>

                  <div className="text-xs text-fog font-mono">
                    {c.note}
                  </div>
                </div>

                <a
                  href={c.href}
                  data-cursor-hover
                  className="ml-4 text-xs font-mono uppercase tracking-wide text-innovation-blue border border-innovation-blue/50 rounded-full px-3 py-1.5 hover:bg-innovation-blue hover:text-void transition-colors"
                >
                  View All
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NOTICES — latest updates & announcements */}
      <section className="relative border-t border-line bg-ink bg-grid overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-innovation-orange/10 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-innovation-blue/10 blur-[140px] pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <span className="eyebrow">Notices &amp; Updates</span>
              </Reveal>
              <Reveal delay={0.1} className="mt-4">
                <h2 className="font-display text-3xl md:text-5xl text-paper leading-tight">
                  Stay in <span className="gradient-text">the loop</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2} className="mt-4 max-w-lg">
                <p className="text-fog text-sm leading-relaxed">
                  Announcements, deadlines and opportunities from the council — fresh off the press.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.25}>
              <NavLink
                to="/events"
                data-cursor-hover
                className="inline-flex items-center gap-2 text-innovation-blue text-sm font-mono uppercase tracking-wide border border-innovation-blue/50 rounded-full px-5 py-2.5 hover:bg-innovation-blue hover:text-void transition-colors"
              >
                View All <span aria-hidden>→</span>
              </NavLink>
            </Reveal>
          </div>

          <div className="mt-12">
            {noticesLoading || eventsLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="glass-card rounded-2xl p-5 h-[220px] animate-pulse">
                    <div className="w-1/3 h-3 rounded-full bg-white/10" />
                    <div className="w-2/3 h-4 rounded-full bg-white/10 mt-4" />
                    <div className="w-full h-3 rounded-full bg-white/5 mt-6" />
                    <div className="w-4/5 h-3 rounded-full bg-white/5 mt-2" />
                  </div>
                ))}
              </div>
            ) : sortedNotices.length > 0 || featuredEvents.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedNotices.slice(0, 3).map((notice, i) => (
                  <Reveal key={notice.id} delay={(i % 3) * 0.08} y={30}>
                    <NoticeCard notice={notice} />
                  </Reveal>
                ))}
                {events.filter((event) => ['upcoming', 'featured'].includes((event.status || '').toLowerCase()) && event.registration_url).slice(0, 3).map((event, i) => (
                  <Reveal key={event.id} delay={((i + sortedNotices.length) % 3) * 0.08} y={30}>
                    <EventPreviewCard event={event} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <Reveal>
                <div className="glass-card rounded-2xl p-10 text-center">
                  <p className="text-fog text-sm font-mono">No notices or featured events published yet — check back soon.</p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-line overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-innovation-blue/10 blur-[140px] pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32 text-center">
          <TextReveal
            as="p"
            text="Got an idea worth breaking things for?"
            className="font-display text-3xl md:text-6xl text-paper leading-tight"
          />
          <Reveal delay={0.15} className="mt-10">
            <NavLink
              to="/ideas-queries"
              data-cursor-hover
              className="btn-premium inline-block px-9 py-4 rounded-full bg-gradient-to-r from-innovation-blue to-innovation-orange text-void text-sm font-mono font-medium uppercase tracking-wide hover:shadow-[0_0_40px_-5px_rgba(43,111,255,0.7)] transition-shadow"
            >
              Submit an Idea
            </NavLink>
          </Reveal>
        </div>
      </section>
    </>
  )
}