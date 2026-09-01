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
import { RESEARCH_CATEGORIES, RESEARCH_STATUSES } from '../../../utils/helpers';

const emptyForm = {
  title: '',
  description: '',
  researcher: '',
  mentor: '',
  category: RESEARCH_CATEGORIES[0],
  status: 'Ongoing',
  image_url: '',
  document_url: '',
  document_urls: [],
};

export default function AdminResearch() {
  const { data: research, loading, refetch } = useSupabase(TABLES.RESEARCH, { orderBy: 'created_at' });
  const { insert } = useSupabaseInsert(TABLES.RESEARCH);
  const { update } = useSupabaseUpdate(TABLES.RESEARCH);
  const { remove } = useSupabaseDelete(TABLES.RESEARCH);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset, watch, setValue } = useForm({ defaultValues: emptyForm });
  
  const watchedFiles = watch('document_files');

  const openAdd = () => { setEditing(null); reset(emptyForm); setValue('document_files', []); setModalOpen(true); };
  const openEdit = (r) => { setEditing(r); reset({ ...r, document_files: [] }); setModalOpen(true); };

  const onSubmit = async (data) => {
    const payload = { ...data };
    const imageFile = payload.image_file?.[0];
    const documentFiles = payload.document_files || [];
    delete payload.image_file;
    delete payload.document_files;

    if (imageFile) {
      const url = await uploadFile(BUCKETS.RESEARCH_FILES, imageFile, '', null, payload.title);
      if (url) payload.image_url = url;
    }

    if (documentFiles.length > 0) {
      const urls = [];
      for (const file of documentFiles) {
        const url = await uploadFile(BUCKETS.RESEARCH_FILES, file, '', null, payload.title);
        if (url) urls.push(url);
      }
      if (urls.length > 0) {
        payload.document_urls = urls;
        payload.document_url = urls[0]; // backward compat
      }
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
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Documents</th>
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
                  <td className="px-6 py-4 text-sm">
                    {r.document_urls && r.document_urls.length > 0 ? (
                      <span className="text-primary hover:underline cursor-pointer" title={r.document_urls.join(', ')}>
                        {r.document_urls.length} document{r.document_urls.length > 1 ? 's' : ''}
                      </span>
                    ) : (
                      <span className="text-admin-muted">—</span>
                    )}
                  </td>
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
            <div>
              <label className="block text-sm font-medium text-admin-muted mb-1">Category</label>
              <select {...register('category')} className="w-full px-4 py-2.5 admin-input">
                {RESEARCH_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-admin-muted mb-1">Status</label>
              <select {...register('status')} className="w-full px-4 py-2.5 admin-input">
                {RESEARCH_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Image URL</label><input {...register('image_url')} placeholder="https://... or uploaded image URL" className="w-full px-4 py-2.5 admin-input" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Upload Image</label><input type="file" {...register('image_file')} className="w-full px-4 py-2.5 admin-input file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Document URL</label><input {...register('document_url')} placeholder="https://... link to paper / patent / file" className="w-full px-4 py-2.5 admin-input" /></div>
          <div>
            <label className="block text-sm font-medium text-admin-muted mb-1">Upload Documents (Multiple)</label>
            <input type="file" {...register('document_files')} multiple className="w-full px-4 py-2.5 admin-input file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium" />
            {watchedFiles && Array.isArray(watchedFiles) && watchedFiles.length > 0 && (
              <ul className="mt-2 text-xs text-fog space-y-1">
                {watchedFiles.map((f, i) => <li key={i} title={f.name}>{f.name}</li>)}
              </ul>
            )}
          </div>
          <Button type="submit" className="w-full">{editing ? 'Update' : 'Add'} Research</Button>
        </form>
      </Modal>
    </div>
  );
}