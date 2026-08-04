import { useState } from 'react'
import Reveal from '../common/Reveal'
import Countdown from '../Countdown/Countdown'
import Modal from '../common/Modal'

function formatDate(dateStr) {
  if (!dateStr) return 'Pending'

  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return 'Pending'

  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function EventCard({ event: e, index: i, tab }) {
  const [isPosterOpen, setIsPosterOpen] = useState(false)
  const targetDate = e.event_date
    ? `${e.event_date}T${e.event_time || '00:00:00'}`
    : null

  return (
    <>
      <Reveal
        delay={i * 0.08}
        x={i % 2 === 0 ? -40 : 40}
        y={0}
        className="glass-card rounded-2xl overflow-hidden"
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr] p-6">
          {e.poster_url && (
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-innovation-blue/10 to-innovation-orange/10">
              <button
                type="button"
                onClick={() => setIsPosterOpen(true)}
                className="relative w-full h-full group"
                data-cursor-hover
                aria-label={`Open poster for ${e.title}`}
              >
                <img
                  src={e.poster_url}
                  alt={e.title}
                  className="w-full h-full min-h-[220px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
              </button>
            </div>
          )}

          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-innovation-orange">
                  {formatDate(e.event_date)}
                </span>

                {e.venue && (
                  <span className="text-xs font-mono uppercase tracking-[0.3em] text-fog">
                    {e.venue}
                  </span>
                )}
              </div>

              <h3 className="font-display text-3xl text-paper mt-5 leading-tight">
                {e.title}
              </h3>

              {tab === 'upcoming' && targetDate && (
                <div className="mt-4">
                  <Countdown targetDate={targetDate} compact />
                </div>
              )}

              <p className="mt-5 text-sm leading-6 text-fog line-clamp-2">
                {e.description || 'Tap View Details to learn more about this upcoming event.'}
              </p>

              <div className="mt-4 grid gap-3 text-sm text-paper">
                {e.FacultyCoordinator && (
                  <div className="rounded-full bg-white/5 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-fog mb-1">Faculty Coordinator</p>
                    <p className="font-medium">{e.FacultyCoordinator}</p>
                  </div>
                )}
                {e.StudentCoordinator && (
                  <div className="rounded-full bg-white/5 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-fog mb-1">Student Coordinator</p>
                    <p className="font-medium">{e.StudentCoordinator}</p>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsPosterOpen(true)}
              data-cursor-hover
              className="mt-6 inline-flex w-fit items-center justify-center rounded-full border border-innovation-blue/50 bg-innovation-blue/5 px-5 py-2 text-xs font-mono uppercase tracking-[0.3em] text-innovation-blue transition hover:bg-innovation-blue hover:text-void"
            >
              View Details
            </button>
          </div>
        </div>
      </Reveal>

      <Modal isOpen={isPosterOpen} onClose={() => setIsPosterOpen(false)} title={e.title || 'Event Details'} size="xl">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] items-start">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-innovation-blue/10 to-innovation-orange/10 max-h-[70vh]">
            {e.poster_url ? (
              <img
                src={e.poster_url}
                alt={e.title}
                className="w-full h-full max-h-[70vh] object-contain"
              />
            ) : (
              <div className="flex min-h-[420px] max-h-[70vh] items-center justify-center px-6 py-10 text-center text-fog">
                <div>
                  <p className="text-lg font-semibold text-paper">Event details</p>
                  <p className="mt-3 text-sm">No poster image available for this event.</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-innovation-orange">
                  {formatDate(e.event_date)}
                </span>
                {e.venue && (
                  <span className="text-xs font-mono uppercase tracking-[0.3em] text-fog">
                    {e.venue}
                  </span>
                )}
              </div>

              <h2 className="font-display text-4xl text-paper mt-5 leading-tight">
                {e.title}
              </h2>

              {e.description && (
                <p className="mt-6 text-sm leading-7 text-fog">
                  {e.description}
                </p>
              )}
            </div>

            <div className="grid gap-4 text-sm text-paper">
              {e.FacultyCoordinator && (
                <div className="rounded-3xl bg-white/5 p-5">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-fog mb-2">Faculty Coordinator</p>
                  <p>{e.FacultyCoordinator}</p>
                </div>
              )}
              {e.StudentCoordinator && (
                <div className="rounded-3xl bg-white/5 p-5">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-fog mb-2">Student Coordinator</p>
                  <p>{e.StudentCoordinator}</p>
                </div>
              )}
            </div>

            {e.registration_url && (
              <a
                href={e.registration_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center justify-center rounded-full bg-innovation-orange px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-void transition hover:bg-orange-500"
              >
                Register Now
              </a>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}
