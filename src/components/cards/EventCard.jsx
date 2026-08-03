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
      {/* Poster */}
      <div className="aspect-video bg-gradient-to-br from-innovation-blue/10 to-innovation-orange/10 flex items-center justify-center text-fog font-mono text-xs overflow-hidden">
        {e.poster_url ? (
          <button
            type="button"
            onClick={() => setIsPosterOpen(true)}
            className="w-full h-full group"
            data-cursor-hover
          >
            <img
              src={e.poster_url}
              alt={e.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ) : (
          'Pending'
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <span className="text-xs font-mono text-innovation-orange">
            {formatDate(e.event_date)}
          </span>

          {e.venue && (
            <span className="text-xs font-mono text-fog">
              {e.venue}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display text-xl text-paper mt-2">
          {e.title}
        </h3>

        {/* Coordinators */}
        {e.FacultyCoordinator && (
          <p className="text-sm text-paper mt-3">
            <span className="font-semibold text-innovation-orange">
              Faculty Coordinator:
            </span>{' '}
            {e.FacultyCoordinator}
          </p>
        )}

        {e.StudentCoordinator && (
          <p className="text-sm text-paper mt-1">
            <span className="font-semibold text-innovation-orange">
              Student Coordinator:
            </span>{' '}
            {e.StudentCoordinator}
          </p>
        )}
        {/* Description */}
        <p className="text-fog text-sm mt-3">
          {e.description || 'Pending'}
        </p>

        {/* Countdown */}
        {tab === 'upcoming' && targetDate && (
          <div className="mt-4">
            <Countdown targetDate={targetDate} compact />
          </div>
        )}

        {/* Button */}
        {tab === 'upcoming' && (
          <a
            href={e.registration_url || '#'}
            data-cursor-hover
            className="mt-4 inline-block text-xs font-mono uppercase text-innovation-blue border border-innovation-blue/50 rounded-full px-3 py-1.5 hover:bg-innovation-blue hover:text-void transition-colors"
          >
            {e.registration_url ? 'Learn More' : 'Pending'}
          </a>
        )}
      </div>
      </Reveal>

      <Modal isOpen={isPosterOpen} onClose={() => setIsPosterOpen(false)} title={e.title || 'Event Poster'} size="xl">
        {e.poster_url ? (
          <div className="flex justify-center">
            <img
              src={e.poster_url}
              alt={e.title}
              className="max-h-[70vh] w-full object-contain rounded-xl"
            />
          </div>
        ) : (
          <p className="text-fog text-sm">No poster available.</p>
        )}
      </Modal>
    </>
  )
}