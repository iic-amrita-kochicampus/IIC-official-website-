import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Send } from 'lucide-react';
import { supabase, TABLES } from '../../services/supabase';
import Button from '../common/Button';
import { QUERY_CATEGORIES, DEPARTMENTS } from '../../utils/helpers';
import { useState } from 'react';
import { uploadFile } from '../../utils/supabaseStorage';
import { BUCKETS } from '../../services/supabase';

export default function QueryForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      let attachment_url = null;
      if (data.attachment?.[0]) {
        attachment_url = await uploadFile(BUCKETS.QUERY_ATTACHMENTS, data.attachment[0], 'queries');
      }

      const { attachment: _, ...rest } = data;
      const { error } = await supabase.from(TABLES.QUERIES).insert({
        ...rest,
        attachment_url,
        status: 'Open',
      });

      if (error) throw error;
      toast.success('Query submitted successfully!');
      reset();
    } catch (err) {
      toast.error(err.message || 'Failed to submit query');
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-admin-muted mb-1">Name *</label>
          <input {...register('name', { required: 'Required' })} className="w-full px-4 py-2.5 admin-input focus:ring-2 focus:ring-primary focus:border-transparent" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-admin-muted mb-1">Email *</label>
          <input type="email" {...register('email', { required: 'Required' })} className="w-full px-4 py-2.5 admin-input focus:ring-2 focus:ring-primary focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-admin-muted mb-1">Department *</label>
          <select {...register('department', { required: 'Required' })} className="w-full px-4 py-2.5 admin-input focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">Select</option>
            {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-admin-muted mb-1">Category *</label>
          <select {...register('category', { required: 'Required' })} className="w-full px-4 py-2.5 admin-input focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">Select</option>
            {QUERY_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-admin-muted mb-1">Subject *</label>
        <input {...register('subject', { required: 'Required' })} className="w-full px-4 py-2.5 admin-input focus:ring-2 focus:ring-primary focus:border-transparent" />
      </div>
      <div>
        <label className="block text-sm font-medium text-admin-muted mb-1">Message *</label>
        <textarea {...register('message', { required: 'Required' })} rows={4} className="w-full px-4 py-2.5 admin-input focus:ring-2 focus:ring-primary focus:border-transparent" />
      </div>
      <div>
        <label className="block text-sm font-medium text-admin-muted mb-1">Attachment</label>
        <input type="file" {...register('attachment')} className="w-full px-4 py-2.5 admin-input focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium" />
      </div>
      <Button type="submit" disabled={submitting} icon={Send} className="w-full">
        {submitting ? 'Submitting...' : 'Submit Query'}
      </Button>
    </form>
  );
}
