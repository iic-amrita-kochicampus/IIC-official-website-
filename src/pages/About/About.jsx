import Reveal from '../../components/common/Reveal'
import TextReveal from '../../components/common/TextReveal'
import AmbientCanvas from '../../components/three/AmbientCanvas'

const ACTIVITIES = [
  'Hosting workshops, hackathons, and speaker sessions',
  'Running a structured idea-to-project pipeline',
  'Supporting student research and R&D initiatives',
  'Mentoring through the Innovation Ambassador program',
]

export default function About() {
  return (
    <div className="relative pt-32 pb-24 max-w-[1400px] mx-auto px-6 md:px-10 overflow-hidden">
      <AmbientCanvas className="-z-10" color="#2b6fff" count={400} />
      <Reveal>
        <span className="eyebrow">About</span>
      </Reveal>
      <div className="mt-6 max-w-3xl">
        <TextReveal
          as="h1"
          text="We exist so good ideas don't die in a WhatsApp group."
          className="font-display text-3xl md:text-6xl leading-tight text-paper"
          trigger="mount"
        />
      </div>

      <div className="mt-20 grid md:grid-cols-2 gap-6">
        <Reveal x={-60} y={0}>
          <div className="glass-card rounded-2xl p-8 h-full bg-gradient-to-br from-innovation-blue/10 to-transparent">
            <span className="eyebrow">Mission</span>
            <p className="mt-4 text-fog leading-relaxed">
              To build a culture of innovation on campus by giving every student a real path from
              raw idea to research to a working project — with mentorship, structure, and visibility
              at every step.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1} x={60} y={0}>
          <div className="glass-card rounded-2xl p-8 h-full bg-gradient-to-br from-innovation-orange/10 to-transparent">
            <span className="eyebrow">Vision</span>
            <p className="mt-4 text-fog leading-relaxed">
              A campus where innovation isn&apos;t confined to a few labs or a few students — where
              curiosity is systematically turned into capability.
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
