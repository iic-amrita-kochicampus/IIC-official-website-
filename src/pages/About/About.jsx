import { lazy, Suspense } from 'react'
import Reveal from '../../components/common/Reveal'
import TextReveal from '../../components/common/TextReveal'

const AmbientCanvas = lazy(() => import('../../components/three/AmbientCanvas'))

const ACTIVITIES = [
  'Hosting workshops, hackathons, and speaker sessions',
  'Running a structured idea-to-project pipeline',
  'Supporting student research and R&D initiatives',
  'Mentoring through the Innovation Ambassador program',
]

export default function About() {
  return (
    <div className="relative pt-32 pb-24 max-w-[1400px] mx-auto px-6 md:px-10 overflow-hidden">
      <Suspense fallback={null}>
        <AmbientCanvas className="-z-10" color="#2b6fff" count={400} />
      </Suspense>
      <Reveal>
        <span className="eyebrow">About</span>
      </Reveal>
      <div className="mt-6 max-w-5xl">
       <TextReveal
       as="p"
       text="In the year 2018, the Ministry of Education (MoE) through MoE's Innovation Cell (MIC) launched the Institution's Innovation Council (IIC) program in collaboration with AICTE for Higher Educational Institutions (HEIs) to systematically foster the culture of innovation and start-up ecosystem in education institutions."
       className="font-display text-base md:text-xl leading-relaxed text-paper"
       trigger="mount"
  />
</div>

      <div className="mt-20 grid md:grid-cols-2 gap-6">
        <Reveal x={-60} y={0}>
          <div className="glass-card rounded-2xl p-8 h-full bg-gradient-to-br from-innovation-blue/10 to-transparent">
            <span className="eyebrow">Mission</span>
            <p className="mt-4 text-fog leading-relaxed">
              The primary focus of an Institution's Innovation Council (IIC) is to foster a culture of innovation and entrepreneurship within higher education institutions (HEIs). This involves creating a vibrant local innovation ecosystem, supporting student startups, and preparing institutions for the Atal Ranking of Institutions on Innovation Achievements framework.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1} x={60} y={0}>
          <div className="glass-card rounded-2xl p-8 h-full bg-gradient-to-br from-innovation-orange/10 to-transparent">
            <span className="eyebrow">Vision</span>
            <p className="mt-4 text-fog leading-relaxed">
              Primarily, IICs' role is to engage large number of faculty, students and staff in various innovation and entrepreneurship related activities such as ideation, Problem solving, Proof of Concept development, Design Thinking, IPR, project handling and management at Pre-incubation/Incubation stage, etc., so that innovation and entrepreneurship ecosystem gets established and stabilized in HEIs.


            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-24">
        <Reveal>
          <span className="eyebrow">What we do</span>
        </Reveal>
        <div className="mt-8 flex flex-col gap-4">
          {ACTIVITIES.map((a, i) => (
            <Reveal key={a} delay={i * 0.07} x={i % 2 === 0 ? -50 : 50} y={0}>
              <div className="glass-card rounded-xl flex items-center gap-6 px-6 py-5">
                <span className="font-mono text-innovation-orange text-sm w-8 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-paper">{a}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
