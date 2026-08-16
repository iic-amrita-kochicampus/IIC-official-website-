import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Send } from 'lucide-react';
import { supabase, TABLES } from '../../services/supabase';
import Button from '../common/Button';
import { IDEA_CATEGORIES, DEPARTMENTS, YEARS } from '../../utils/helpers';
import { useState } from 'react';
import { uploadFile } from '../../utils/supabaseStorage';
import { BUCKETS } from '../../services/supabase';

export default function IdeaForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      let attachment_url = null;
      if (data.attachment?.[0]) {
        attachment_url = await uploadFile(BUCKETS.IDEA_ATTACHMENTS, data.attachment[0], '', null, data.title);
      }

      const { attachment: _, ...rest } = data;
      const { error } = await supabase.from(TABLES.IDEAS).insert({
        ...rest,
        attachment_url,
        status: 'Pending',
      });

      if (error) throw error;
      toast.success('Idea submitted successfully!');
      reset();
    } catch (err) {
      toast.error(err.message || 'Failed to submit idea');
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-admin-muted mb-1">Full Name *</label>
          <input {...register('name', { required: 'Required' })} className="w-full px-4 py-2.5 admin-input focus:ring-2 focus:ring-primary focus:border-transparent" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-admin-muted mb-1">Register Number</label>
          <input {...register('register_number')} className="w-full px-4 py-2.5 admin-input focus:ring-2 focus:ring-primary focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-admin-muted mb-1">Department *</label>
          <select {...register('department', { required: 'Required' })} className="w-full px-4 py-2.5 admin-input focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">Select</option>
            {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-admin-muted mb-1">Year *</label>
          <select {...register('year', { required: 'Required' })} className="w-full px-4 py-2.5 admin-input focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">Select</option>
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-admin-muted mb-1">Email *</label>
          <input type="email" {...register('email', { required: 'Required' })} className="w-full px-4 py-2.5 admin-input focus:ring-2 focus:ring-primary focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-admin-muted mb-1">Phone</label>
          <input {...register('phone')} className="w-full px-4 py-2.5 admin-input focus:ring-2 focus:ring-primary focus:border-transparent" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-admin-muted mb-1">Idea Title *</label>
        <input {...register('title', { required: 'Required' })} className="w-full px-4 py-2.5 admin-input focus:ring-2 focus:ring-primary focus:border-transparent" />
      </div>
      <div>
        <label className="block text-sm font-medium text-admin-muted mb-1">Category *</label>
        <select {...register('category', { required: 'Required' })} className="w-full px-4 py-2.5 admin-input focus:ring-2 focus:ring-primary focus:border-transparent">
          <option value="">Select</option>
          {IDEA_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-admin-muted mb-1">Problem Statement *</label>
        <textarea {...register('problem_statement', { required: 'Required' })} rows={3} className="w-full px-4 py-2.5 admin-input focus:ring-2 focus:ring-primary focus:border-transparent" />
      </div>
      <div>
        <label className="block text-sm font-medium text-admin-muted mb-1">Proposed Solution *</label>
        <textarea {...register('proposed_solution', { required: 'Required' })} rows={3} className="w-full px-4 py-2.5 admin-input focus:ring-2 focus:ring-primary focus:border-transparent" />
      </div>
      <div>
        <label className="block text-sm font-medium text-admin-muted mb-1">Expected Impact *</label>
        <textarea {...register('expected_impact', { required: 'Required' })} rows={2} className="w-full px-4 py-2.5 admin-input focus:ring-2 focus:ring-primary focus:border-transparent" />
      </div>
      <div>
        <label className="block text-sm font-medium text-admin-muted mb-1">Attachment</label>
        <input type="file" {...register('attachment')} className="w-full px-4 py-2.5 admin-input focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium" />
      </div>
      <Button type="submit" disabled={submitting} icon={Send} className="w-full">
        {submitting ? 'Submitting...' : 'Submit Idea'}
      </Button>
    </form>
  );
}
