import Reveal from '../../components/common/Reveal'
import TextReveal from '../../components/common/TextReveal'
import { useSupabase } from '../../hooks/useSupabase'
import { TABLES } from '../../services/supabase'

function DocRow({ title, sub, href, index }) {
  return (
    <Reveal delay={index * 0.05} x={index % 2 === 0 ? -30 : 30} y={0}>
      <a
        href={href || '#'}
        target={href ? '_blank' : undefined}
        rel="noreferrer"
        data-cursor-hover
        className="glass-card rounded-xl p-5 flex items-center justify-between gap-4 hover:border-innovation-blue/40 transition-colors"
      >
        <div>
          <div className="text-paper text-sm font-medium">{title}</div>
          {sub && <div className="text-fog text-xs font-mono mt-1">{sub}</div>}
        </div>
        <span className="text-[10px] font-mono uppercase text-innovation-blue border border-innovation-blue/50 rounded-full px-3 py-1.5 shrink-0">
          {href ? 'View' : 'Pending Upload'}
        </span>
      </a>
    </Reveal>
  )
}

// The `certificates` table holds every document type here, distinguished by `category`.
const CATEGORY = {
  order: 'Establishment Order',
  certificate: 'Certificate',
  award: 'Award',
  annualReport: 'Annual Report',
  nisp: 'NISP Document',
}

export default function Establishment() {
  const { data: docs, loading } = useSupabase(TABLES.CERTIFICATES, {
    orderBy: 'year',
    ascending: false,
  })

  const all = docs || []
  const order = all.find((d) => d.category === CATEGORY.order)
  const certificates = all.filter((d) => d.category === CATEGORY.certificate)
  const awards = all.filter((d) => d.category === CATEGORY.award)
  const annualReports = all.filter((d) => d.category === CATEGORY.annualReport)
  const nisp = all.filter((d) => d.category === CATEGORY.nisp)

  return (
    <div className="pt-32 pb-24 max-w-[1400px] mx-auto px-6 md:px-10">
      <Reveal><span className="eyebrow">Establishment &amp; Certifications</span></Reveal>
      <div className="mt-6">
        <TextReveal as="h1" text="Officially recognized. Formally established." className="font-display text-3xl md:text-6xl text-paper" trigger="mount" />
      </div>

      {loading && <p className="mt-10 text-fog text-sm font-mono">Loading documents…</p>}

      {!loading && (
        <>
          <div className="mt-16">
            <Reveal><span className="eyebrow">Establishment Order</span></Reveal>
            <div className="mt-6">
              <DocRow title={order?.title || 'IIC Establishment Order'} href={order?.document_url} index={0} />
            </div>
          </div>

          <div className="mt-16">
            <Reveal><span className="eyebrow">Certificates</span></Reveal>
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              {certificates.length === 0 && <p className="text-fog text-sm">No certificates uploaded yet.</p>}
              {certificates.map((c, i) => (
                <DocRow key={c.id} title={c.title} sub={`${c.description || 'Pending'} · ${c.year || 'Pending'}`} href={c.document_url} index={i} />
              ))}
            </div>
          </div>

          <div className="mt-16">
            <Reveal><span className="eyebrow">Awards</span></Reveal>
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              {awards.length === 0 && <p className="text-fog text-sm">No awards yet.</p>}
              {awards.map((a, i) => (
                <Reveal key={a.id} delay={i * 0.05}>
                  <div className="glass-card rounded-xl p-5">
                    <div className="text-paper text-sm font-medium">{a.title}</div>
                    <div className="text-fog text-xs font-mono mt-1">{a.description || 'Pending'} · {a.year || 'Pending'}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 mt-16">
            <div>
              <Reveal><span className="eyebrow">Annual Reports</span></Reveal>
              <div className="mt-6 space-y-4">
                {annualReports.length === 0 && <p className="text-fog text-sm">No annual reports yet.</p>}
                {annualReports.map((r, i) => (
                  <DocRow key={r.id} title={r.title} href={r.document_url} index={i} />
                ))}
              </div>
            </div>
            <div>
              <Reveal><span className="eyebrow">NISP Documents</span></Reveal>
              <div className="mt-6 space-y-4">
                {nisp.length === 0 && <p className="text-fog text-sm">No NISP documents yet.</p>}
                {nisp.map((n, i) => (
                  <DocRow key={n.id} title={n.title} href={n.document_url} index={i} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
