import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useSupabase, useSupabaseInsert, useSupabaseUpdate, useSupabaseDelete } from '../../../hooks/useSupabase';
import { TABLES, BUCKETS } from '../../../services/supabase';
import { uploadFile } from '../../../utils/supabaseStorage';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import Loader from '../../../components/common/Loader';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { DEPARTMENTS } from '../../../utils/helpers';

const emptyForm = { name: '', position: '', team: '', department: '', display_order: 0, is_active: true, image_url: '' };

export default function AdminMembers() {
  const { data: members, loading, refetch } = useSupabase(TABLES.MEMBERS, { orderBy: 'display_order' });
  const { insert } = useSupabaseInsert(TABLES.MEMBERS);
  const { update } = useSupabaseUpdate(TABLES.MEMBERS);
  const { remove } = useSupabaseDelete(TABLES.MEMBERS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset } = useForm({ defaultValues: emptyForm });

  const openAdd = () => { setEditing(null); reset(emptyForm); setModalOpen(true); };
  const openEdit = (m) => { setEditing(m); reset(m); setModalOpen(true); };

  const onSubmit = async (data) => {
    const payload = { ...data };
    const imageFile = payload.image_file?.[0];
    delete payload.image_file;

    if (imageFile) {
      const url = await uploadFile(BUCKETS.MEMBER_IMAGES, imageFile, 'members');
      if (url) payload.image_url = url;
    }

    if (editing) {
      const { error } = await update(editing.id, payload);
      if (error) toast.error(error.message); else { toast.success('Updated!'); refetch(); }
    } else {
      const { error } = await insert(payload);
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
        <h1 className="text-2xl font-bold text-dark">Members Management</h1>
        <Button icon={Plus} onClick={openAdd}>Add Member</Button>
      </div>
      {loading ? <Loader /> : (
        <div className="admin-card overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-admin-surface-2"><tr>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Name</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Position</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Team</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Department</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-admin-border">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-admin-surface-2">
                  <td className="px-6 py-4 text-sm font-medium text-dark">{m.name}</td>
                  <td className="px-6 py-4 text-sm text-admin-muted">{m.position}</td>
                  <td className="px-6 py-4 text-sm text-admin-muted">{m.team}</td>
                  <td className="px-6 py-4 text-sm text-admin-muted">{m.department}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => openEdit(m)} className="p-2 hover:bg-admin-surface-2 rounded-lg"><Edit2 size={16} className="text-primary" /></button>
                    <button onClick={() => handleDelete(m.id)} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 size={16} className="text-red-500" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Member' : 'Add Member'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Name</label><input {...register('name', { required: true })} className="w-full px-4 py-2.5 admin-input" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Position</label><input {...register('position', { required: true })} className="w-full px-4 py-2.5 admin-input" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Photo URL</label><input {...register('image_url')} className="w-full px-4 py-2.5 admin-input" placeholder="https://..." /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Upload Photo</label><input type="file" {...register('image_file')} className="w-full px-4 py-2.5 admin-input file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Team</label><input {...register('team')} className="w-full px-4 py-2.5 admin-input" placeholder="e.g. Executive, Technical, Media" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Department</label><select {...register('department')} className="w-full px-4 py-2.5 admin-input"><option value="">Select</option>{DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}</select></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Display Order</label><input type="number" {...register('display_order')} className="w-full px-4 py-2.5 admin-input" /></div>
          <div className="flex items-center gap-2"><input type="checkbox" {...register('is_active')} className="w-4 h-4" /><label className="text-sm text-admin-muted">Active</label></div>
          <Button type="submit" className="w-full">{editing ? 'Update' : 'Add'} Member</Button>
        </form>
      </Modal>
    </div>
  );
}
