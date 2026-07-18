import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useSupabase, useSupabaseInsert, useSupabaseUpdate, useSupabaseDelete } from '../../../hooks/useSupabase';
import { TABLES } from '../../../services/supabase';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import Loader from '../../../components/common/Loader';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const emptyForm = { title: '', description: '', researcher: '', mentor: '', category: '', status: 'Ongoing' };

export default function AdminResearch() {
  const { data: research, loading, refetch } = useSupabase(TABLES.RESEARCH, { orderBy: 'created_at' });
  const { insert } = useSupabaseInsert(TABLES.RESEARCH);
  const { update } = useSupabaseUpdate(TABLES.RESEARCH);
  const { remove } = useSupabaseDelete(TABLES.RESEARCH);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset } = useForm({ defaultValues: emptyForm });

  const openAdd = () => { setEditing(null); reset(emptyForm); setModalOpen(true); };
  const openEdit = (r) => { setEditing(r); reset(r); setModalOpen(true); };

  const onSubmit = async (data) => {
    if (editing) {
      const { error } = await update(editing.id, data);
      if (error) toast.error(error.message); else { toast.success('Updated!'); refetch(); }
    } else {
      const { error } = await insert(data);
      if (error) toast.error(error.message); else { toast.success('Added!'); refetch(); }
    }
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this research item?')) return;
    const { error } = await remove(id);
    if (error) toast.error(error.message); else { toast.success('Deleted!'); refetch(); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-dark">Research Management</h1>
        <Button icon={Plus} onClick={openAdd}>Add Research</Button>
      </div>
      {loading ? <Loader /> : (
        <div className="admin-card overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-admin-surface-2"><tr>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Title</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Researcher</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Category</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-admin-border">
              {research.map((r) => (
                <tr key={r.id} className="hover:bg-admin-surface-2">
                  <td className="px-6 py-4 text-sm font-medium text-dark">{r.title}</td>
                  <td className="px-6 py-4 text-sm text-admin-muted">{r.researcher}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${r.status === 'Ongoing' ? 'bg-green-100 text-green-700' : 'bg-admin-surface-2 text-admin-muted'}`}>{r.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-admin-muted">{r.category}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => openEdit(r)} className="p-2 hover:bg-admin-surface-2 rounded-lg"><Edit2 size={16} className="text-primary" /></button>
                    <button onClick={() => handleDelete(r.id)} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 size={16} className="text-red-500" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Research' : 'Add Research'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Title</label><input {...register('title', { required: true })} className="w-full px-4 py-2.5 admin-input" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Description</label><textarea {...register('description')} rows={3} className="w-full px-4 py-2.5 admin-input" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-admin-muted mb-1">Researcher</label><input {...register('researcher')} className="w-full px-4 py-2.5 admin-input" /></div>
            <div><label className="block text-sm font-medium text-admin-muted mb-1">Mentor</label><input {...register('mentor')} className="w-full px-4 py-2.5 admin-input" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-admin-muted mb-1">Category</label><input {...register('category')} className="w-full px-4 py-2.5 admin-input" /></div>
            <div><label className="block text-sm font-medium text-admin-muted mb-1">Status</label><select {...register('status')} className="w-full px-4 py-2.5 admin-input"><option>Ongoing</option><option>Completed</option><option>Published</option></select></div>
          </div>
          <Button type="submit" className="w-full">{editing ? 'Update' : 'Add'} Research</Button>
        </form>
      </Modal>
    </div>
  );
}
