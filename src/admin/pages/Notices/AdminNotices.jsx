import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useSupabase, useSupabaseInsert, useSupabaseUpdate, useSupabaseDelete } from '../../../hooks/useSupabase';
import { TABLES } from '../../../services/supabase';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import Loader from '../../../components/common/Loader';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { NOTICE_CATEGORIES, formatDate } from '../../../utils/helpers';

const emptyForm = { title: '', description: '', category: 'General', published_date: new Date().toISOString().split('T')[0], deadline: '', external_link: '', is_pinned: false, is_active: true };

const normalizeNoticeData = (data) => ({
  ...data,
  deadline: data.deadline ? data.deadline : null,
  external_link: data.external_link?.trim() ? data.external_link.trim() : null,
});

export default function AdminNotices() {
  const { data: notices, loading, refetch } = useSupabase(TABLES.NOTICES, { orderBy: 'published_date', ascending: false });
  const { insert } = useSupabaseInsert(TABLES.NOTICES);
  const { update } = useSupabaseUpdate(TABLES.NOTICES);
  const { remove } = useSupabaseDelete(TABLES.NOTICES);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset } = useForm({ defaultValues: emptyForm });

  const openAdd = () => { setEditing(null); reset(emptyForm); setModalOpen(true); };
  const openEdit = (n) => { setEditing(n); reset(n); setModalOpen(true); };

  const onSubmit = async (data) => {
    const normalizedData = normalizeNoticeData(data);

    if (editing) {
      const { error } = await update(editing.id, normalizedData);
      if (error) toast.error(error.message); else { toast.success('Updated!'); refetch(); }
    } else {
      const { error } = await insert(normalizedData);
      if (error) toast.error(error.message); else { toast.success('Added!'); refetch(); }
    }
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this notice?')) return;
    const { error } = await remove(id);
    if (error) toast.error(error.message); else { toast.success('Deleted!'); refetch(); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-dark">Notices Management</h1>
        <Button icon={Plus} onClick={openAdd}>Add Notice</Button>
      </div>
      {loading ? <Loader /> : (
        <div className="admin-card overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-admin-surface-2"><tr>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Title</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Category</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Date</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Pinned</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-admin-border">
              {notices.map((n) => (
                <tr key={n.id} className="hover:bg-admin-surface-2">
                  <td className="px-6 py-4 text-sm font-medium text-dark">{n.title}</td>
                  <td className="px-6 py-4 text-sm text-admin-muted">{n.category}</td>
                  <td className="px-6 py-4 text-sm text-admin-muted">{n.published_date ? formatDate(n.published_date) : '-'}</td>
                  <td className="px-6 py-4">{n.is_pinned ? <span className="text-primary font-bold">Yes</span> : 'No'}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => openEdit(n)} className="p-2 hover:bg-admin-surface-2 rounded-lg"><Edit2 size={16} className="text-primary" /></button>
                    <button onClick={() => handleDelete(n.id)} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 size={16} className="text-red-500" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Notice' : 'Add Notice'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Title</label><input {...register('title', { required: true })} className="w-full px-4 py-2.5 admin-input" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Description</label><textarea {...register('description')} rows={3} className="w-full px-4 py-2.5 admin-input" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-admin-muted mb-1">Category</label><select {...register('category')} className="w-full px-4 py-2.5 admin-input">{NOTICE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
            <div><label className="block text-sm font-medium text-admin-muted mb-1">Published Date</label><input type="date" {...register('published_date')} className="w-full px-4 py-2.5 admin-input" /></div>
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-muted mb-1">Deadline (optional)</label>
            <input type="date" {...register('deadline')} className="w-full px-4 py-2.5 admin-input" />
            <p className="mt-1 text-xs text-admin-muted">Leave this empty if the notice does not have a deadline.</p>
          </div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">External Link</label><input {...register('external_link')} className="w-full px-4 py-2.5 admin-input" /></div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2"><input type="checkbox" {...register('is_pinned')} className="w-4 h-4" /><label className="text-sm text-admin-muted">Pinned</label></div>
            <div className="flex items-center gap-2"><input type="checkbox" {...register('is_active')} className="w-4 h-4" /><label className="text-sm text-admin-muted">Active</label></div>
          </div>
          <Button type="submit" className="w-full">{editing ? 'Update' : 'Add'} Notice</Button>
        </form>
      </Modal>
    </div>
  );
}
