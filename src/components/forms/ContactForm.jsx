import { useState } from 'react'
import { useSupabaseInsert } from '../../hooks/useSupabase'
import { TABLES } from '../../services/supabase'

const inputClass =
  'w-full bg-transparent border-b border-line focus:border-innovation-blue outline-none py-3 text-paper placeholder:text-fog transition-colors'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const { insert } = useSupabaseInsert(TABLES.CONTACTS)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const { error } = await insert([form])
    if (error) {
      setStatus('error')
      return
    }
    setStatus('success')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 glass-card rounded-2xl p-8">
      <div>
        <label className="text-xs font-mono uppercase text-fog">Name</label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className={inputClass}
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="text-xs font-mono uppercase text-fog">Email</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className={inputClass}
          placeholder="you@college.edu"
        />
      </div>
      <div>
        <label className="text-xs font-mono uppercase text-fog">Message</label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className={inputClass}
          placeholder="How can we help?"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        data-cursor-hover
        className="self-start px-8 py-4 bg-innovation-blue text-void text-sm font-mono uppercase tracking-wide hover:bg-paper transition-colors disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
      {status === 'success' && <p className="text-innovation-blue text-sm font-mono">Sent — we&apos;ll get back to you soon.</p>}
      {status === 'error' && <p className="text-accent-red text-sm font-mono">Something went wrong — please try again.</p>}
    </form>
  )
}
