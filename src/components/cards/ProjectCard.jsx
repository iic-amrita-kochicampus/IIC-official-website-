import Reveal from '../common/Reveal'

export default function ProjectCard({ project: p, index: i }) {
  const technologies = p.technologies
    ? p.technologies.split(',').map((t) => t.trim()).filter(Boolean)
    : []

  return (
    <Reveal delay={i * 0.08} x={i % 2 === 0 ? -40 : 40} y={0} className="glass-card rounded-2xl overflow-hidden">
      <div className="aspect-video bg-gradient-to-br from-innovation-blue/10 to-innovation-orange/10 flex items-center justify-center text-fog font-mono text-xs overflow-hidden">
        {p.image_url ? <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" /> : 'Pending'}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-display text-xl text-paper">{p.title}</h3>
          <span className="text-[10px] font-mono uppercase text-innovation-orange border border-innovation-orange/50 rounded-full px-2 py-1 shrink-0">
            {p.status || 'Pending'}
          </span>
        </div>
        <p className="text-fog text-sm mt-3">{p.description || 'Pending'}</p>

        {technologies.length > 0 && (
          <div className="mt-4 flex gap-2 flex-wrap">
            {technologies.map((t) => (
              <span key={t} className="text-[10px] font-mono uppercase text-fog border border-line rounded-full px-2 py-1">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-line text-xs font-mono text-fog space-y-1">
          <div>Team: {p.team_members || 'Pending'}{p.team_lead ? ` (Lead: ${p.team_lead})` : ''}</div>
          <div>Faculty Mentor: {p.mentor || 'Pending'}</div>
        </div>
      </div>
    </Reveal>
  )
}
