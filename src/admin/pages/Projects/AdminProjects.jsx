import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useSupabase, useSupabaseInsert, useSupabaseUpdate, useSupabaseDelete } from '../../../hooks/useSupabase';
import { TABLES } from '../../../services/supabase';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import Loader from '../../../components/common/Loader';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { PROJECT_CATEGORIES } from '../../../utils/helpers';

const emptyForm = { title: '', description: '', team_lead: '', team_members: '', mentor: '', technologies: [], category: 'Other', status: 'In Progress', progress: 0, project_url: '' };

export default function AdminProjects() {
  const { data: projects, loading, refetch } = useSupabase(TABLES.PROJECTS, { orderBy: 'created_at' });
  const { insert } = useSupabaseInsert(TABLES.PROJECTS);
  const { update } = useSupabaseUpdate(TABLES.PROJECTS);
  const { remove } = useSupabaseDelete(TABLES.PROJECTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset } = useForm({ defaultValues: emptyForm });

  const openAdd = () => { setEditing(null); reset(emptyForm); setModalOpen(true); };
  const openEdit = (p) => { setEditing(p); reset(p); setModalOpen(true); };

  const onSubmit = async (data) => {
    if (data.technologies && typeof data.technologies === 'string') {
      data.technologies = data.technologies.split(',').map((t) => t.trim()).filter(Boolean);
    }
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
    if (!confirm('Delete this project?')) return;
    const { error } = await remove(id);
    if (error) toast.error(error.message); else { toast.success('Deleted!'); refetch(); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-dark">Projects Management</h1>
        <Button icon={Plus} onClick={openAdd}>Add Project</Button>
      </div>
      {loading ? <Loader /> : (
        <div className="admin-card overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-admin-surface-2"><tr>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Title</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Category</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Progress</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-admin-border">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-admin-surface-2">
                  <td className="px-6 py-4 text-sm font-medium text-dark">{p.title}</td>
                  <td className="px-6 py-4 text-sm text-admin-muted">{p.category}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">{p.status}</span></td>
                  <td className="px-6 py-4 text-sm text-admin-muted">{p.progress}%</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => openEdit(p)} className="p-2 hover:bg-admin-surface-2 rounded-lg"><Edit2 size={16} className="text-primary" /></button>
                    <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 size={16} className="text-red-500" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Project' : 'Add Project'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Title</label><input {...register('title', { required: true })} className="w-full px-4 py-2.5 admin-input" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Description</label><textarea {...register('description')} rows={3} className="w-full px-4 py-2.5 admin-input" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-admin-muted mb-1">Team Lead</label><input {...register('team_lead')} className="w-full px-4 py-2.5 admin-input" /></div>
            <div><label className="block text-sm font-medium text-admin-muted mb-1">Mentor</label><input {...register('mentor')} className="w-full px-4 py-2.5 admin-input" /></div>
          </div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Team Members (comma-separated)</label><input {...register('team_members')} className="w-full px-4 py-2.5 admin-input" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Technologies (comma-separated)</label><input {...register('technologies')} className="w-full px-4 py-2.5 admin-input" /></div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="block text-sm font-medium text-admin-muted mb-1">Category</label><select {...register('category')} className="w-full px-4 py-2.5 admin-input">{PROJECT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
            <div><label className="block text-sm font-medium text-admin-muted mb-1">Status</label><select {...register('status')} className="w-full px-4 py-2.5 admin-input"><option>In Progress</option><option>Completed</option><option>Planning</option></select></div>
            <div><label className="block text-sm font-medium text-admin-muted mb-1">Progress (%)</label><input type="number" min="0" max="100" {...register('progress')} className="w-full px-4 py-2.5 admin-input" /></div>
          </div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Project URL</label><input {...register('project_url')} className="w-full px-4 py-2.5 admin-input" /></div>
          <Button type="submit" className="w-full">{editing ? 'Update' : 'Add'} Project</Button>
        </form>
      </Modal>
    </div>
  );
}
