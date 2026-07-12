import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useSupabase, useSupabaseInsert, useSupabaseUpdate, useSupabaseDelete } from '../../../hooks/useSupabase';
import { TABLES } from '../../../services/supabase';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import Loader from '../../../components/common/Loader';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const emptyForm = { name: '', position: '', department: '', email: '', linkedin: '', display_order: 0, is_active: true, image_url: '' };

export default function AdminLeadership() {
  const { data: leaders, loading, refetch } = useSupabase(TABLES.LEADERSHIP, { orderBy: 'display_order' });
  const { insert } = useSupabaseInsert(TABLES.LEADERSHIP);
  const { update } = useSupabaseUpdate(TABLES.LEADERSHIP);
  const { remove } = useSupabaseDelete(TABLES.LEADERSHIP);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset } = useForm({ defaultValues: emptyForm });

  const openAdd = () => { setEditing(null); reset(emptyForm); setModalOpen(true); };
  const openEdit = (leader) => { setEditing(leader); reset(leader); setModalOpen(true); };

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
    if (!confirm('Delete this member?')) return;
    const { error } = await remove(id);
    if (error) toast.error(error.message); else { toast.success('Deleted!'); refetch(); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-dark">Leadership Management</h1>
        <Button icon={Plus} onClick={openAdd}>Add Leader</Button>
      </div>
      {loading ? <Loader /> : (
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50"><tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Name</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Position</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Department</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {leaders.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-dark">{l.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{l.position}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{l.department}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${l.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {l.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => openEdit(l)} className="p-2 hover:bg-slate-100 rounded-lg"><Edit2 size={16} className="text-primary" /></button>
                    <button onClick={() => handleDelete(l.id)} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 size={16} className="text-red-500" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Leader' : 'Add Leader'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Name</label><input {...register('name', { required: true })} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl" /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Position</label><input {...register('position', { required: true })} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl" /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Department</label><input {...register('department')} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl" /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Email</label><input type="email" {...register('email')} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl" /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn</label><input {...register('linkedin')} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl" /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Display Order</label><input type="number" {...register('display_order')} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl" /></div>
          <div className="flex items-center gap-2"><input type="checkbox" {...register('is_active')} className="w-4 h-4" /><label className="text-sm text-slate-700">Active</label></div>
          <Button type="submit" className="w-full">{editing ? 'Update' : 'Add'} Leader</Button>
        </form>
      </Modal>
    </div>
  );
}
