import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Send } from 'lucide-react';
import { supabase, TABLES } from '../../services/supabase';
import Button from '../common/Button';
import { useState } from 'react';

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from(TABLES.CONTACTS).insert(data);
      if (error) throw error;
      toast.success('Message sent successfully!');
      reset();
    } catch (err) {
      toast.error(err.message || 'Failed to send message');
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
          <input {...register('name', { required: 'Required' })} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
          <input type="email" {...register('email', { required: 'Required' })} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
          <input {...register('phone')} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Subject *</label>
          <input {...register('subject', { required: 'Required' })} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Message *</label>
        <textarea {...register('message', { required: 'Required' })} rows={4} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" />
      </div>
      <Button type="submit" disabled={submitting} icon={Send} className="w-full">
        {submitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
