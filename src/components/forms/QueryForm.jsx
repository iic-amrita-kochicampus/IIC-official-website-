import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useSupabaseInsert } from '../../hooks/useSupabase'
import { TABLES } from '../../services/supabase'

const inputClass =
  'w-full bg-transparent border-b border-line focus:border-innovation-blue outline-none py-3 text-paper placeholder:text-fog transition-colors'
const errorClass = 'text-xs text-accent-red mt-1 font-mono'

const QUERY_CATEGORIES = ['Startup', 'IPR', 'Innovation', 'Events', 'General']

export default function QueryForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
  const { insert } = useSupabaseInsert(TABLES.QUERIES)

  const onSubmit = async (data) => {
    const { error } = await insert([{
      name: data.name,
      email: data.email,
      category: data.category,
      subject: data.subject,
      message: data.message,
    }])

    if (error) {
      toast.error('Something went wrong — please try again.')
      return
    }

    toast.success('Query received — the council will respond by email.')
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7 glass-card rounded-2xl p-8 md:p-10">
      <div className="grid sm:grid-cols-2 gap-7">
        <div>
          <label className="text-xs font-mono uppercase text-fog">Name</label>
          <input className={inputClass} placeholder="Your name" {...register('name', { required: 'Required' })} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className="text-xs font-mono uppercase text-fog">Email</label>
          <input type="email" className={inputClass} placeholder="you@college.edu" {...register('email', { required: 'Required' })} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="text-xs font-mono uppercase text-fog">Category</label>
        <select className={inputClass} {...register('category', { required: 'Required' })}>
          <option value="">Select a category</option>
          {QUERY_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {errors.category && <p className={errorClass}>{errors.category.message}</p>}
      </div>

      <div>
        <label className="text-xs font-mono uppercase text-fog">Subject</label>
        <input className={inputClass} placeholder="What's this about?" {...register('subject', { required: 'Required' })} />
        {errors.subject && <p className={errorClass}>{errors.subject.message}</p>}
      </div>

      <div>
        <label className="text-xs font-mono uppercase text-fog">Message</label>
        <textarea rows={4} className={inputClass} placeholder="Tell us more..." {...register('message', { required: 'Required' })} />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      <div>
        <label className="text-xs font-mono uppercase text-fog">Attachment (optional)</label>
        <input type="file" className="w-full text-fog text-sm mt-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-innovation-blue/20 file:text-innovation-blue file:text-xs file:font-mono file:uppercase" {...register('attachment')} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        data-cursor-hover
        className="btn-premium self-start px-8 py-4 rounded-full bg-gradient-to-r from-innovation-blue to-innovation-orange text-void text-sm font-mono uppercase tracking-wide disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting…' : 'Submit Query'}
      </button>
    </form>
  )
}
