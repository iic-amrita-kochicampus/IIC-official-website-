import { useMemo, useState, useEffect } from 'react'
import Reveal from '../../components/common/Reveal'
import TextReveal from '../../components/common/TextReveal'
import MemberCard from '../../components/cards/MemberCard'
import { useSupabase } from '../../hooks/useSupabase'
import { TABLES } from '../../services/supabase'

// Optional descriptive copy per team — purely UI copy, not data from the DB.
const TEAM_DESCRIPTIONS = {
  'Technical Team': 'Builds and maintains council infrastructure, including this website.',
  'Design Team': 'Owns visual identity — design, posters, and event branding.',
  'Media Team': 'Handles photography, videography, and social media coverage.',
  'Event Team': 'Plans and executes council events end-to-end.',
  'Finance Team': 'Manages budgets, sponsorships, and event finances.',
  'Documentation Team': 'Maintains records, reports, and event documentation.',
  'Innovation Ambassadors': 'Department-wise representatives — see full profiles on the Ambassadors page.',
}

function isLead(position) {
  return /lead/i.test(position || '')
}

function isFacultyCoordinator(position) {
  return /faculty\s*co-?ordinator/i.test(position || '')
}

export default function Leadership() {
  const { data: leadership, loading: leadershipLoading } = useSupabase(TABLES.LEADERSHIP, {
    orderBy: 'display_order',
    ascending: true,
  })
  const { data: members, loading: membersLoading } = useSupabase(TABLES.MEMBERS, {
    orderBy: 'display_order',
    ascending: true,
  })

  const facultyCoordinators = (leadership || []).filter((p) => isFacultyCoordinator(p.position))
  const otherLeadership = (leadership || []).filter((p) => !isFacultyCoordinator(p.position))

  const teams = useMemo(() => {
    const names = Array.from(new Set((members || []).map((m) => m.team).filter(Boolean)))
    return names.map((name) => ({
      id: name,
      name,
      description: TEAM_DESCRIPTIONS[name] || '',
      people: (members || [])
        .filter((m) => m.team === name)
        .sort((a, b) => (isLead(b.position) ? 1 : 0) - (isLead(a.position) ? 1 : 0)),
    }))
  }, [members])

  const [active, setActive] = useState(null)

  useEffect(() => {
    if (!active && teams.length > 0) setActive(teams[0].id)
  }, [teams, active])

  const team = teams.find((t) => t.id === active)
  const loading = leadershipLoading || membersLoading

  return (
    <div className="pt-32 pb-24 max-w-[1400px] mx-auto px-6 md:px-10">
      <Reveal>
        <span className="eyebrow">Leadership &amp; Members</span>
      </Reveal>
      <div className="mt-6">
        <TextReveal as="h1" text="The people behind it." className="font-display text-3xl md:text-6xl text-paper" trigger="mount" />
      </div>

      {/* Faculty Coordinator */}
      {facultyCoordinators.length > 0 && (
        <div className="mt-16">
          <Reveal><span className="eyebrow">Faculty Coordinator</span></Reveal>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {facultyCoordinators.map((p, i) => (
              <MemberCard key={p.id} person={p} index={i} variant="leadership" />
            ))}
          </div>
        </div>
      )}

      {/* Leadership */}
      <div className="mt-16">
        <Reveal><span className="eyebrow">Leadership</span></Reveal>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {leadershipLoading && <p className="text-fog text-sm font-mono">Loading leadership…</p>}
          {!leadershipLoading && otherLeadership.map((p, i) => (
            <MemberCard key={p.id} person={p} index={i} variant="leadership" />
          ))}
          {!leadershipLoading && otherLeadership.length === 0 && (
            <p className="text-fog text-sm">No leadership listed yet.</p>
          )}
        </div>
      </div>

      {/* Members */}
      <div className="mt-24">
        <Reveal><span className="eyebrow">Members</span></Reveal>

        {loading && <p className="mt-8 text-fog text-sm font-mono">Loading members…</p>}

        {!loading && teams.length === 0 && (
          <p className="mt-8 text-fog text-sm">No members listed yet.</p>
        )}

        {!loading && teams.length > 0 && team && (
          <>
            <div className="mt-8 flex flex-wrap gap-2 border-b border-line pb-1">
              {teams.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  data-cursor-hover
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-wide transition-colors ${
                    active === t.id ? 'text-innovation-orange border-b-2 border-innovation-orange' : 'text-fog hover:text-paper'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>

            <div key={team.id} className="mt-10">
              {team.description && <p className="text-fog text-sm max-w-md mb-8">{team.description}</p>}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {team.people.map((m, i) => (
                  <MemberCard key={m.id} person={m} index={i} variant="member" />
                ))}
              </div>
              {team.id === 'Innovation Ambassadors' && (
                <p className="mt-8 text-xs font-mono text-fog">
                  See full ambassador profiles on the{' '}
                  <a href="/ambassadors" className="text-innovation-blue underline">Ambassadors page →</a>
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}