import { useState } from 'react'
import Reveal from '../../components/common/Reveal'
import Modal from '../../components/common/Modal'
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

  const [selectedAmbassador, setSelectedAmbassador] = useState(null)

  const openModal = (ambassador) => {
    setSelectedAmbassador(ambassador)
  }

  const closeModal = () => {
    setSelectedAmbassador(null)
  }

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
    The Student Innovation Ambassador is a designated student leader trained
    under the Ministry of Education's Innovation Cell (MIC) and AICTE
    framework. They serve as a vital link between the student community and
    the Institution's Innovation Council (IIC).
  </p>

  <ul className="mt-4 space-y-3 text-fog text-sm leading-relaxed">
    <li>
      <span className="font-semibold text-white">Peer Mentoring:</span> Guide
      fellow students through idea validation, basic design thinking, and
      early-stage prototype creation.
    </li>
    <li>
      <span className="font-semibold text-white">Idea Facilitation:</span>{" "}
      Assist in scouting and submitting innovative student ideas to platforms
      like the YUKTI Innovation Repository.
    </li>
    <li>
      <span className="font-semibold text-white">Event Coordination:</span>{" "}
      Help organize campus-level hackathons, ideathons, workshops, and
      entrepreneurship awareness campaigns.
    </li>
    <li>
      <span className="font-semibold text-white">Ecosystem Builder:</span>{" "}
      Cultivate an active entrepreneurial mindset and encourage risk-taking
      and problem-solving on campus.
    </li>
  </ul>
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
              <div
                className="aspect-square glass-card rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                onClick={() => openModal(a)}
              >
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
                  {a.department && <span>{a.department} · </span>}
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

      {/* Ambassador Detail Modal */}
      <Modal
        isOpen={!!selectedAmbassador}
        onClose={closeModal}
        title={selectedAmbassador?.name || 'Ambassador Details'}
        size="lg"
      >
        {selectedAmbassador && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 flex-shrink-0">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-innovation-blue/10 to-innovation-orange/10">
                  {selectedAmbassador.image_url ? (
                    <img
                      src={selectedAmbassador.image_url}
                      alt={selectedAmbassador.name}
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
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {selectedAmbassador.department}
                  </span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-paper">
                  {selectedAmbassador.name}
                </h2>
                {selectedAmbassador.position && (
                  <p className="text-fog text-sm font-mono uppercase tracking-wide">
                    {selectedAmbassador.position}
                  </p>
                )}
                {selectedAmbassador.year && (
                  <p className="text-fog text-sm">
                    <span className="font-mono">Batch/Year:</span> {' '}
                    {selectedAmbassador.year}
                  </p>
                )}
                {selectedAmbassador.responsibilities && (
                  <div className="pt-4 border-t border-white/10">
                    <h3 className="font-medium text-paper mb-2">Responsibilities</h3>
                    <p className="text-fog text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedAmbassador.responsibilities}
                    </p>
                  </div>
                )}
                {selectedAmbassador.achievements && (
                  <div className="pt-4 border-t border-white/10">
                    <h3 className="font-medium text-paper mb-2">Achievements</h3>
                    <p className="text-fog text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedAmbassador.achievements}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}