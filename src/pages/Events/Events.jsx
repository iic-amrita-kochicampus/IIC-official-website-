import { useState } from 'react'
import Reveal from '../../components/common/Reveal'
import EventCard from '../../components/cards/EventCard'
import { useSupabase } from '../../hooks/useSupabase'
import { TABLES } from '../../services/supabase'

export default function Events() {
  const [tab, setTab] = useState('upcoming')

  const { data: events, loading } = useSupabase(TABLES.EVENTS, {
    orderBy: 'event_date',
    ascending: tab === 'upcoming',
  })

  const list = (events || []).filter((e) =>
  tab === 'upcoming' ? e.status?.toLowerCase() === 'upcoming' : e.status?.toLowerCase() !== 'upcoming'
  )

  return (
    <div className="pt-32 pb-24 max-w-[1400px] mx-auto px-6 md:px-10">
      <Reveal>
        <span className="eyebrow">Events</span>
      </Reveal>
      <Reveal delay={0.1}>
        <h1 className="mt-6 font-display text-3xl md:text-6xl text-paper">Where ideas meet people.</h1>
      </Reveal>

      <div className="mt-14 flex gap-2 border-b border-line">
        {['upcoming', 'past'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            data-cursor-hover
            className={`px-5 py-3 text-xs font-mono uppercase tracking-wide ${
              tab === t ? 'text-innovation-orange border-b-2 border-innovation-orange' : 'text-fog'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {loading && <p className="text-fog text-sm font-mono">Loading events…</p>}

        {!loading && list.map((e, i) => (
          <EventCard key={e.id} event={e} index={i} tab={tab} />
        ))}

        {!loading && list.length === 0 && (
          <p className="text-fog text-sm">No {tab} events yet.</p>
        )}
      </div>
    </div>
  )
}
