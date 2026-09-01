import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useSupabaseInsert } from '../../hooks/useSupabase'
import { TABLES, BUCKETS } from '../../services/supabase'
import { uploadFile } from '../../utils/supabaseStorage'
import { IDEA_CATEGORIES } from '../../utils/helpers'

const inputClass =
  'w-full bg-transparent border-b border-line focus:border-innovation-blue outline-none py-3 text-paper placeholder:text-fog transition-colors'
const errorClass = 'text-xs text-accent-red mt-1 font-mono'

export default function IdeaForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
  const { insert } = useSupabaseInsert(TABLES.IDEAS)

  const onSubmit = async (data) => {
    let attachment_url = null
    if (data.attachment?.[0]) {
      attachment_url = await uploadFile(BUCKETS.IDEA_ATTACHMENTS, data.attachment[0], '', null, data.title)
    }

    const { error } = await insert([{
      name: data.name,
      email: data.email,
      phone: data.phone,
      department: data.department,
      year: data.year,
      register_number: data.register_number,
      title: data.title,
      category: data.category,
      problem_statement: data.problem,
      proposed_solution: data.solution,
      expected_impact: data.impact,
      attachment_url,
      status: 'Pending',
    }])

    if (error) {
      toast.error('Something went wrong — please try again.')
      return
    }

    toast.success('Idea received — status: Pending Review.')
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
        <div>
          <label className="text-xs font-mono uppercase text-fog">Department</label>
          <input className={inputClass} placeholder="e.g. Cybersecurity" {...register('department', { required: 'Required' })} />
          {errors.department && <p className={errorClass}>{errors.department.message}</p>}
        </div>
        <div>
          <label className="text-xs font-mono uppercase text-fog">Year</label>
          <input className={inputClass} placeholder="e.g. 2nd Year" {...register('year', { required: 'Required' })} />
          {errors.year && <p className={errorClass}>{errors.year.message}</p>}
        </div>
<div>
          <label className="text-xs font-mono uppercase text-fog">Register No</label>
          <input className={inputClass} placeholder="e.g. KH.EN.U4BCA00020" {...register('register_number')} />
          {errors.register_number && <p className={errorClass}>{errors.register_number.message}</p>}
        </div>
        <div>
          <label className="text-xs font-mono uppercase text-fog">Phone</label>
          <input type="tel" className={inputClass} placeholder="Your phone number" {...register('phone')} />
        </div>
      </div>

      <div>
        <label className="text-xs font-mono uppercase text-fog">Idea Title</label>
        <input className={inputClass} placeholder="One-line summary" {...register('title', { required: 'Required' })} />
        {errors.title && <p className={errorClass}>{errors.title.message}</p>}
      </div>

      <div>
        <label className="text-xs font-mono uppercase text-fog">Category</label>
        <select className={inputClass} style={{ backgroundColor: '#101320', color: '#666e8a' }} {...register('category', { required: 'Required' })}>
          <option value="" style={{ backgroundColor: '#101320', color: '#f3f5fb' }}>Select a category</option>
          {IDEA_CATEGORIES.map((c) => <option key={c} value={c} style={{ backgroundColor: '#101320', color: '#666e8a' }}>{c}</option>)}
        </select>
        {errors.category && <p className={errorClass}>{errors.category.message}</p>}
      </div>

      <div>
        <label className="text-xs font-mono uppercase text-fog">Problem Statement</label>
        <textarea rows={3} className={inputClass} placeholder="What problem does this solve?" {...register('problem', { required: 'Required' })} />
        {errors.problem && <p className={errorClass}>{errors.problem.message}</p>}
      </div>

      <div>
        <label className="text-xs font-mono uppercase text-fog">Proposed Solution</label>
        <textarea rows={3} className={inputClass} placeholder="How would you solve it?" {...register('solution', { required: 'Required' })} />
        {errors.solution && <p className={errorClass}>{errors.solution.message}</p>}
      </div>

      <div>
        <label className="text-xs font-mono uppercase text-fog">Expected Impact</label>
        <textarea rows={2} className={inputClass} placeholder="Who benefits, and how?" {...register('impact', { required: 'Required' })} />
        {errors.impact && <p className={errorClass}>{errors.impact.message}</p>}
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
        {isSubmitting ? 'Submitting…' : 'Submit Idea'}
      </button>
    </form>
  )
}
