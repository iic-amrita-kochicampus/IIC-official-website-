import MaskReveal from '../common/MaskReveal'

function isLead(position) {
  return /lead/i.test(position || '')
}

// Used for the Leadership grid on the Leadership page.
function LeadershipVariant({ person, index }) {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="aspect-square bg-gradient-to-br from-maroon/25 to-innovation-blue/15 flex items-center justify-center text-fog font-mono text-xs overflow-hidden">
        {person.image_url ? (
          <img src={person.image_url} alt={person.name} className="w-full h-full object-cover" />
        ) : (
          'Pending'
        )}
      </div>
      <div className="p-4">
        <span className="text-[10px] font-mono uppercase text-innovation-orange">{person.position}</span>
        <div className="text-paper text-sm font-medium mt-1">{person.name}</div>
        <div className="text-fog text-xs font-mono">{person.department || 'Pending'}</div>

        <div className="mt-2 flex items-center gap-3">
          {person.email && (
            <a
              href={`mailto:${person.email}`}
              data-cursor-hover
              aria-label="Email"
              className="inline-flex items-center gap-1 text-xs font-mono text-fog hover:text-innovation-blue transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 5L2 7" />
              </svg>
              Email
            </a>
          )}

          {person.linkedin && (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              aria-label="LinkedIn"
              className="inline-flex items-center gap-1 text-xs font-mono text-fog hover:text-innovation-blue transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// Used for the team-member grid on the Leadership page.
function MemberVariant({ person }) {
  return (
    <div className="group">
      <div className="aspect-square glass-card rounded-xl overflow-hidden relative">
        {person.image_url ? (
          <img src={person.image_url} alt={person.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-fog font-mono text-xs">Pending</div>
        )}
        {isLead(person.position) && (
          <span className="absolute top-2 left-2 bg-gradient-to-r from-innovation-blue to-innovation-orange text-void text-[10px] font-mono uppercase px-2 py-1 rounded">
            Lead
          </span>
        )}
      </div>
      <div className="mt-3">
        <div className="text-paper text-sm font-medium">{person.name}</div>
        <div className="text-fog text-xs font-mono">{person.department || 'Pending'}</div>
      </div>
    </div>
  )
}

// variant: 'leadership' | 'member'
export default function MemberCard({ person, index, variant = 'member' }) {
  return (
    <MaskReveal delay={index * 0.05} direction="up" className="rounded-xl" curtainClass="bg-ink-2">
      {variant === 'leadership' ? (
        <LeadershipVariant person={person} index={index} />
      ) : (
        <MemberVariant person={person} index={index} />
      )}
    </MaskReveal>
  )
}
