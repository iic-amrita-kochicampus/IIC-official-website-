import Reveal from '../../components/common/Reveal'
import TextReveal from '../../components/common/TextReveal'
import AmbientCanvas from '../../components/three/AmbientCanvas'
import { useSupabase } from '../../hooks/useSupabase'
import { TABLES } from '../../services/supabase'

function Block({ title, children }) {
  return (
    <div className="mt-16">
      <Reveal><span className="eyebrow">{title}</span></Reveal>
      <div className="mt-6 space-y-4">{children}</div>
    </div>
  )
}

// The `research` table holds all four sections, distinguished by `category`.
const CATEGORY = {
  project: 'Research Project',
  publication: 'Publication',
  patent: 'Patent',
  collaboration: 'Collaboration',
}

// Tolerant matcher: matches exact value, case-insensitive, or partial.
function matchesCategory(category, target) {
  const c = (category || '').trim().toLowerCase()
  const t = target.toLowerCase()
  return c === t || c.includes(t) || t.includes(c)
}

export default function Research() {
  const { data: research, loading } = useSupabase(TABLES.RESEARCH, {
    orderBy: 'created_at',
    ascending: false,
  })

  const all = research || []
  const researchProjects = all.filter((r) => matchesCategory(r.category, CATEGORY.project))
  const publications = all.filter((r) => matchesCategory(r.category, CATEGORY.publication))
  const patents = all.filter((r) => matchesCategory(r.category, CATEGORY.patent))
  const collaborations = all.filter((r) => matchesCategory(r.category, CATEGORY.collaboration))

  return (
    <div className="relative pt-32 pb-24 max-w-[1400px] mx-auto px-6 md:px-10 overflow-hidden">
      <AmbientCanvas className="-z-10" color="#a5303f" count={400} />
      <Reveal><span className="eyebrow">Research &amp; Development</span></Reveal>
      <div className="mt-6">
        <TextReveal as="h1" text="Where curiosity gets rigorous." className="font-display text-3xl md:text-6xl text-paper" trigger="mount" />
      </div>

      {loading && <p className="mt-10 text-fog text-sm font-mono">Loading research…</p>}

      {!loading && (
        <>
          <Block title="Research Projects">
            {researchProjects.length === 0 && <p className="text-fog text-sm">No research projects yet.</p>}
            {researchProjects.map((r, i) => (
              <Reveal key={r.id} delay={i * 0.06} x={i % 2 === 0 ? -40 : 40} y={0}>
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-display text-xl text-paper">{r.title}</h3>
                    <span className="text-[10px] font-mono uppercase text-innovation-orange border border-innovation-orange/50 rounded-full px-2 py-1 shrink-0">{r.status || 'Pending'}</span>
                  </div>
                  <p className="text-fog text-sm mt-2">{r.description || 'Pending'}</p>
                  <span className="text-[10px] font-mono uppercase text-fog border border-line rounded-full px-2 py-1 mt-3 inline-block">{r.researcher || 'Pending'}</span>
                  {r.document_url && (
                    <a href={r.document_url} target="_blank" rel="noreferrer" data-cursor-hover className="inline-flex items-center gap-2 mt-4 text-sm font-mono text-innovation-blue hover:text-innovation-orange transition-colors">
                      Open document <span aria-hidden>↗</span>
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </Block>

          <Block title="Publications">
            {publications.length === 0 && <p className="text-fog text-sm">No publications yet.</p>}
            {publications.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <a
                  href={p.document_url || '#'}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className={`glass-card rounded-xl p-5 flex justify-between items-center gap-4 transition-colors ${p.document_url ? 'hover:border-innovation-blue/40' : 'pointer-events-none'}`}
                >
                  <div>
                    <div className="text-paper text-sm font-medium">{p.title}</div>
                    <div className="text-fog text-xs font-mono mt-1">{p.researcher || 'Pending'} · {p.mentor || 'Pending'}</div>
                  </div>
                  <span className={`text-sm shrink-0 ${p.document_url ? 'text-innovation-blue' : 'text-fog'}`}>{p.document_url ? '↗' : 'Pending'}</span>
                </a>
              </Reveal>
            ))}
          </Block>

          <div className="grid md:grid-cols-2 gap-16">
            <Block title="Patents">
              {patents.length === 0 && <p className="text-fog text-sm">No patents yet.</p>}
              {patents.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.05}>
                  <div className="glass-card rounded-xl p-5">
                    <div className="text-paper text-sm font-medium">{p.title}</div>
                    <div className="text-fog text-xs font-mono mt-1">{p.status || 'Pending'} · {p.researcher || 'Pending'}</div>
                    {p.document_url && (
                      <a href={p.document_url} target="_blank" rel="noreferrer" data-cursor-hover className="inline-flex items-center gap-2 mt-3 text-sm font-mono text-innovation-blue hover:text-innovation-orange transition-colors">
                        Open document <span aria-hidden>↗</span>
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
            </Block>

            <Block title="Collaborations">
              {collaborations.length === 0 && <p className="text-fog text-sm">No collaborations yet.</p>}
              {collaborations.map((c, i) => (
                <Reveal key={c.id} delay={i * 0.05}>
                  <div className="glass-card rounded-xl p-5">
                    <div className="text-paper text-sm font-medium">{c.title}</div>
                    <div className="text-fog text-xs font-mono mt-1">{c.description || 'Pending'}</div>
                    {c.document_url && (
                      <a href={c.document_url} target="_blank" rel="noreferrer" data-cursor-hover className="inline-flex items-center gap-2 mt-3 text-sm font-mono text-innovation-blue hover:text-innovation-orange transition-colors">
                        Open document <span aria-hidden>↗</span>
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
            </Block>
          </div>
        </>
      )}
    </div>
  )
}
