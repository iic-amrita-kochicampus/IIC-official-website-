import { useState } from 'react'
import Reveal from '../../components/common/Reveal'
import TextReveal from '../../components/common/TextReveal'
import IdeaForm from '../../components/forms/IdeaForm'
import QueryForm from '../../components/forms/QueryForm'

export default function Ideas() {
  const [tab, setTab] = useState('idea')

  return (
    <div className="pt-32 pb-24 max-w-[900px] mx-auto px-6 md:px-10">
      <Reveal><span className="eyebrow">Ideas &amp; Queries</span></Reveal>
      <div className="mt-6">
        <TextReveal as="h1" text="Got something on your mind?" className="font-display text-3xl md:text-6xl text-paper" trigger="mount" />
      </div>
      <Reveal delay={0.1} className="mt-4 max-w-lg">
        <p className="text-fog text-sm">
          Raw ideas move into our review pipeline. Queries go straight to the council for a reply.
        </p>
      </Reveal>

      <div className="mt-12 flex gap-2">
        {[['idea', 'Submit an Idea'], ['query', 'Submit a Query']].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            data-cursor-hover
            className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wide border transition-colors ${
              tab === key ? 'border-innovation-blue text-innovation-blue' : 'border-line text-fog'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {tab === 'idea' ? <IdeaForm /> : <QueryForm />}
      </div>
    </div>
  )
}
