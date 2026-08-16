import { useState } from 'react'
import Reveal from '../../components/common/Reveal'
import TextReveal from '../../components/common/TextReveal'
import AmbientCanvas from '../../components/three/AmbientCanvas'
import Modal from '../../components/common/Modal'
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

// Research Detail Modal Component
function ResearchModal({ item, onClose }) {
  if (!item) return null

  const getCategoryLabel = (cat) => CATEGORY[cat] || cat

  return (
    <Modal
      isOpen={!!item}
      onClose={onClose}
      title={item.title || 'Research Details'}
      size="lg"
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 flex-shrink-0">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-innovation-blue/10 to-innovation-orange/10">
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-fog font-mono text-xs">
                  No Image
                </div>
              )}
            </div>
          </div>
          <div className="md:w-2/3 space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {CATEGORY[item.category] || item.category}
              </span>
              {item.status && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  {item.status}
                </span>
              )}
            </div>
            <h2 className="font-display text-2xl md:text-3xl text-paper">{item.title}</h2>
            {item.description && (
              <p className="text-fog text-sm leading-relaxed whitespace-pre-wrap">{item.description}</p>
            )}
            {item.researcher && (
              <p className="text-fog text-sm">
                <span className="font-mono">Researcher:</span> {' '}
                {item.researcher}
              </p>
            )}
            {item.mentor && (
              <p className="text-fog text-sm">
                <span className="font-mono">Mentor:</span> {' '}
                {item.mentor}
              </p>
            )}
            {item.document_urls && item.document_urls.length > 0 && (
              <div className="pt-4 border-t border-white/10">
                <h3 className="font-medium text-paper mb-2">Documents</h3>
                <ul className="space-y-2">
                  {item.document_urls.map((url, idx) => (
                    <li key={idx}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-mono text-innovation-blue hover:text-innovation-orange transition-colors"
                      >
                        Document {idx + 1} <span aria-hidden>↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {item.document_url && !item.document_urls?.length && (
              <a
                href={item.document_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm font-mono text-innovation-blue hover:text-innovation-orange transition-colors"
              >
                Open document <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default function Research() {
  const [selectedItem, setSelectedItem] = useState(null)

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
      <Reveal><span className="eyebrow">Research & Development</span></Reveal>
      <div className="mt-6">
        <TextReveal as="h1" text="Where curiosity gets rigorous." className="font-display text-3xl md:text-6xl text-paper" trigger="mount" />
      </div>

      {loading && <p className="mt-10 text-fog text-sm font-mono">Loading research…</p>}

      {!loading && (
        <>
          {researchProjects.length > 0 && (
            <Block title="Research Projects">
              {researchProjects.map((r, i) => (
                <Reveal key={r.id} delay={i * 0.06} x={i % 2 === 0 ? -40 : 40} y={0}>
                  <div
                    className="glass-card rounded-2xl p-6 cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                    onClick={() => setSelectedItem(r)}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-display text-xl text-paper">{r.title}</h3>
                      <span className="text-[10px] font-mono uppercase text-innovation-orange border border-innovation-orange/50 rounded-full px-2 py-1 shrink-0">{r.status || 'Pending'}</span>
                    </div>
                    <p className="text-fog text-sm mt-2 line-clamp-2">{r.description || 'Pending'}</p>
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
          )}

          {publications.length > 0 && (
            <Block title="Publications">
              {publications.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.05}>
                  <div
                    className="glass-card rounded-xl p-5 cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                    onClick={() => setSelectedItem(p)}
                  >
                    <div className="text-paper text-sm font-medium">{p.title}</div>
                    <div className="text-fog text-xs font-mono mt-1">{p.researcher || 'Pending'} · {p.mentor || 'Pending'}</div>
                    {p.document_url && (
                      <a href={p.document_url} target="_blank" rel="noreferrer" data-cursor-hover className="inline-flex items-center gap-2 mt-3 text-sm font-mono text-innovation-blue hover:text-innovation-orange transition-colors">
                        Open document <span aria-hidden>↗</span>
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
            </Block>
          )}

          <div className="grid md:grid-cols-2 gap-16">
            {patents.length > 0 && (
              <Block title="Patents">
                {patents.map((p, i) => (
                  <Reveal key={p.id} delay={i * 0.05}>
                    <div
                      className="glass-card rounded-xl p-5 cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                      onClick={() => setSelectedItem(p)}
                    >
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
            )}

            {collaborations.length > 0 && (
              <Block title="Collaborations">
                {collaborations.map((c, i) => (
                  <Reveal key={c.id} delay={i * 0.05}>
                    <div
                      className="glass-card rounded-xl p-5 cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                      onClick={() => setSelectedItem(c)}
                    >
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
            )}
          </div>
        </>
      )}

      {/* Empty state when no research data exists */}
      {!loading && researchProjects.length === 0 && publications.length === 0 && patents.length === 0 && collaborations.length === 0 && (
        <div className="mt-16 text-center py-16">
          <Reveal>
            <div className="text-fog text-sm font-mono">No research data available yet.</div>
          </Reveal>
        </div>
      )}

      {/* Research Detail Modal */}
      <ResearchModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  )
}