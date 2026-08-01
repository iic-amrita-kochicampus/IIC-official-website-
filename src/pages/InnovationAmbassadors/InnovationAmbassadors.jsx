import Reveal from '../../components/common/Reveal'
import { useSupabase } from '../../hooks/useSupabase'
import { TABLES } from '../../services/supabase'

export default function InnovationAmbassadors() {
  const { data: ambassadors = [], loading, error } = useSupabase(
    TABLES.AMBASSADORS,
    {
      orderBy: 'year',
      ascending: false,
    }
  )

  console.log('Ambassadors:', ambassadors)
  console.log('Error:', error)

  return (
    <div className="pt-32 pb-24 max-w-[1400px] mx-auto px-6 md:px-10">
      <Reveal>
        <span className="eyebrow">Innovation Ambassadors</span>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="mt-6 font-display text-3xl md:text-6xl text-paper">
          Representing innovation, department-wide.
        </h1>
      </Reveal>

      <Reveal delay={0.15} className="mt-6 max-w-xl">
        <p className="text-fog text-sm leading-relaxed">
          The Innovation Ambassador Program puts a council representative
          in every department — the first point of contact for ideas,
          events, and opportunities.
        </p>
      </Reveal>

      {error && (
        <p className="text-red-400 text-sm mt-4">
          Failed to load ambassadors.
        </p>
      )}

      <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {loading ? (
          <p className="text-fog text-sm font-mono">
            Loading ambassadors…
          </p>
        ) : ambassadors.length > 0 ? (
          ambassadors.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.05} x={0} y={30}>
              <div className="aspect-square glass-card rounded-xl overflow-hidden">
                {a.image_url ? (
                  <img
                    src={a.image_url}
                    alt={a.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-fog font-mono text-xs">
                    Pending
                  </div>
                )}
              </div>

              <div className="mt-3">
                <div className="text-paper text-sm font-medium">
                  {a.name || 'Pending'}
                </div>
                <div className="text-fog text-xs font-mono">
                  {a.department || 'Pending'} ·
                  {' '}
                  {a.position || 'Pending'}
                </div>
              </div>
            </Reveal>
          ))
        ) : (
          <p className="text-fog text-sm">
            No ambassadors listed yet.
          </p>
        )}
      </div>
    </div>
  )
}