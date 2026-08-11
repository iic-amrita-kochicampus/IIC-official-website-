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

const emptyForm = { title: '', category: '', year: '', description: '', thumbnail_url: '', document_url: '' };

export default function AdminCertificates() {
  const { data: certs, loading, refetch } = useSupabase(TABLES.CERTIFICATES, { orderBy: 'year', ascending: false });
  const { insert } = useSupabaseInsert(TABLES.CERTIFICATES);
  const { update } = useSupabaseUpdate(TABLES.CERTIFICATES);
  const { remove } = useSupabaseDelete(TABLES.CERTIFICATES);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset } = useForm({ defaultValues: emptyForm });

  const openAdd = () => { setEditing(null); reset(emptyForm); setModalOpen(true); };
  const openEdit = (c) => { setEditing(c); reset(c); setModalOpen(true); };

  const onSubmit = async (data) => {
    const payload = { ...data };
    const thumbnailFile = payload.thumbnail_file?.[0];
    const documentFile = payload.document_file?.[0];
    delete payload.thumbnail_file;
    delete payload.document_file;

    if (thumbnailFile) {
      const url = await uploadFile(BUCKETS.CERTIFICATES, thumbnailFile, 'certificates-thumbnails');
      if (url) payload.thumbnail_url = url;
    }
    if (documentFile) {
      const url = await uploadFile(BUCKETS.CERTIFICATES, documentFile, 'certificates-documents');
      if (url) payload.document_url = url;
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
    if (!confirm('Delete this certificate?')) return;
    const { error } = await remove(id);
    if (error) toast.error(error.message); else { toast.success('Deleted!'); refetch(); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-dark">Certificates Management</h1>
        <Button icon={Plus} onClick={openAdd}>Add Certificate</Button>
      </div>
      {loading ? <Loader /> : (
        <div className="admin-card overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-admin-surface-2"><tr>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Title</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Category</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Year</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-admin-border">
              {certs.map((c) => (
                <tr key={c.id} className="hover:bg-admin-surface-2">
                  <td className="px-6 py-4 text-sm font-medium text-dark">{c.title}</td>
                  <td className="px-6 py-4 text-sm text-admin-muted">{c.category}</td>
                  <td className="px-6 py-4 text-sm text-admin-muted">{c.year}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => openEdit(c)} className="p-2 hover:bg-admin-surface-2 rounded-lg"><Edit2 size={16} className="text-primary" /></button>
                    <button onClick={() => handleDelete(c.id)} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 size={16} className="text-red-500" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Certificate' : 'Add Certificate'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Title</label><input {...register('title', { required: true })} className="w-full px-4 py-2.5 admin-input" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-admin-muted mb-1">Category</label>
              <select {...register('category', { required: true })} className="w-full px-4 py-2.5 admin-input">
                <option value="">Select category</option>
                <option value="Establishment Order">Establishment Order</option>
                <option value="Certificate">Certificate</option>
                <option value="Award">Award</option>
                <option value="Annual Report">Annual Report</option>
                <option value="NISP Document">NISP Document</option>
              </select>
            </div>
            <div><label className="block text-sm font-medium text-admin-muted mb-1">Year</label><input {...register('year')} className="w-full px-4 py-2.5 admin-input" placeholder="e.g. 2024" /></div>
          </div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Description</label><textarea {...register('description')} rows={2} className="w-full px-4 py-2.5 admin-input" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Thumbnail URL</label><input {...register('thumbnail_url')} className="w-full px-4 py-2.5 admin-input" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Upload Thumbnail</label><input type="file" {...register('thumbnail_file')} className="w-full px-4 py-2.5 admin-input file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Document URL</label><input {...register('document_url')} className="w-full px-4 py-2.5 admin-input" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Upload Document</label><input type="file" {...register('document_file')} className="w-full px-4 py-2.5 admin-input file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium" /></div>
          <Button type="submit" className="w-full">{editing ? 'Update' : 'Add'} Certificate</Button>
        </form>
      </Modal>
    </div>
  );
}
