import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useSupabase, useSupabaseInsert, useSupabaseUpdate, useSupabaseDelete } from '../../../hooks/useSupabase';
import { TABLES } from '../../../services/supabase';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import Loader from '../../../components/common/Loader';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { DEPARTMENTS } from '../../../utils/helpers';

const emptyForm = { name: '', department: '', position: 'Innovation Ambassador', responsibilities: '', achievements: '', year: '', is_active: true };

export default function AdminAmbassadors() {
  const { data: ambassadors, loading, refetch } = useSupabase(TABLES.AMBASSADORS, { orderBy: 'created_at' });
  const { insert } = useSupabaseInsert(TABLES.AMBASSADORS);
  const { update } = useSupabaseUpdate(TABLES.AMBASSADORS);
  const { remove } = useSupabaseDelete(TABLES.AMBASSADORS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset } = useForm({ defaultValues: emptyForm });

  const openAdd = () => { setEditing(null); reset(emptyForm); setModalOpen(true); };
  const openEdit = (a) => { setEditing(a); reset(a); setModalOpen(true); };

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
    if (!confirm('Delete this ambassador?')) return;
    const { error } = await remove(id);
    if (error) toast.error(error.message); else { toast.success('Deleted!'); refetch(); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-dark">Ambassadors Management</h1>
        <Button icon={Plus} onClick={openAdd}>Add Ambassador</Button>
      </div>
      {loading ? <Loader /> : (
        <div className="admin-card overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-admin-surface-2"><tr>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Name</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Department</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Year</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-admin-border">
              {ambassadors.map((a) => (
                <tr key={a.id} className="hover:bg-admin-surface-2">
                  <td className="px-6 py-4 text-sm font-medium text-dark">{a.name}</td>
                  <td className="px-6 py-4 text-sm text-admin-muted">{a.department}</td>
                  <td className="px-6 py-4 text-sm text-admin-muted">{a.year}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${a.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {a.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => openEdit(a)} className="p-2 hover:bg-admin-surface-2 rounded-lg"><Edit2 size={16} className="text-primary" /></button>
                    <button onClick={() => handleDelete(a.id)} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 size={16} className="text-red-500" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Ambassador' : 'Add Ambassador'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Name</label><input {...register('name', { required: true })} className="w-full px-4 py-2.5 admin-input" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Department</label><select {...register('department', { required: true })} className="w-full px-4 py-2.5 admin-input"><option value="">Select</option>{DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}</select></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Position</label><input {...register('position')} className="w-full px-4 py-2.5 admin-input" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Year/Batch</label><input {...register('year')} className="w-full px-4 py-2.5 admin-input" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Responsibilities</label><textarea {...register('responsibilities')} rows={2} className="w-full px-4 py-2.5 admin-input" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Achievements</label><textarea {...register('achievements')} rows={2} className="w-full px-4 py-2.5 admin-input" /></div>
          <div className="flex items-center gap-2"><input type="checkbox" {...register('is_active')} className="w-4 h-4" /><label className="text-sm text-admin-muted">Active</label></div>
          <Button type="submit" className="w-full">{editing ? 'Update' : 'Add'} Ambassador</Button>
        </form>
      </Modal>
    </div>
  );
}
