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
        <div className="text-paper text-sm font-medium mt-1">{person.email}</div>
        
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
