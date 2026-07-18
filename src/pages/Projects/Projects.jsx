import Reveal from '../../components/common/Reveal'
import TextReveal from '../../components/common/TextReveal'
import ProjectCard from '../../components/cards/ProjectCard'
import AmbientCanvas from '../../components/three/AmbientCanvas'
import { useSupabase } from '../../hooks/useSupabase'
import { TABLES } from '../../services/supabase'

export default function Projects() {
  const { data: projects, loading } = useSupabase(TABLES.PROJECTS, {
    orderBy: 'created_at',
    ascending: false,
  })

  return (
    <div className="relative pt-32 pb-24 max-w-[1400px] mx-auto px-6 md:px-10 overflow-hidden">
      <AmbientCanvas className="-z-10" color="#ff8a3d" count={400} />
      <Reveal><span className="eyebrow">Active Projects</span></Reveal>
      <div className="mt-6">
        <TextReveal as="h1" text="From question to prototype." className="font-display text-3xl md:text-6xl text-paper" trigger="mount" />
      </div>

      <div className="mt-14 grid md:grid-cols-2 gap-6">
        {loading && <p className="text-fog text-sm font-mono">Loading projects…</p>}

        {!loading && (projects || []).map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}

        {!loading && (projects || []).length === 0 && (
          <p className="text-fog text-sm">No active projects yet.</p>
        )}
      </div>
    </div>
  )
}
