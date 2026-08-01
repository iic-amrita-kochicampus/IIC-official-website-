import Reveal from '../../components/common/Reveal'
import ContactForm from '../../components/forms/ContactForm'

export default function Contact() {
  return (
    <div className="pt-32 pb-24 max-w-[1400px] mx-auto px-6 md:px-10">
      <Reveal>
        <span className="eyebrow">Contact</span>
      </Reveal>
      <Reveal delay={0.1}>
        <h1 className="mt-6 font-display text-3xl md:text-6xl text-paper">Let&apos;s talk.</h1>
      </Reveal>

      <div className="mt-16 grid md:grid-cols-[1fr_1.2fr] gap-16">
        <Reveal delay={0.1} x={-50} y={0} className="space-y-6 glass-card rounded-2xl p-8">
          <div>
            <span className="eyebrow">Email</span>
            <a href="mailto:iic@college.edu" className="block mt-2 text-paper hover:text-innovation-blue">iic@college.edu</a>
          </div>
          <div>
            <span className="eyebrow">Location</span>
            <p className="mt-2 text-fog text-sm">Amrita Vishwa Vidyapeetham, Kochi</p>
          </div>
          <div>
            <span className="eyebrow">Social</span>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-fog hover:text-innovation-blue text-sm font-mono">Instagram</a>
              <a href="#" className="text-fog hover:text-innovation-blue text-sm font-mono">LinkedIn</a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} x={50} y={0}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  )
}
