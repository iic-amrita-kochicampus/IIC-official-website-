import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Images } from 'lucide-react';
import { useSupabase, useSupabaseInsert, useSupabaseUpdate, useSupabaseDelete } from '../../../hooks/useSupabase';
import { TABLES, BUCKETS } from '../../../services/supabase';
import { uploadFile } from '../../../utils/supabaseStorage';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import Loader from '../../../components/common/Loader';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { formatDate } from '../../../utils/helpers';

const emptyForm = { title: '', description: '', event_date: '', event_time: '', venue: '', registration_url: '', status: 'upcoming', FacultyCoordinator: '', StudentCoordinator: '', poster_url: '' };

export default function AdminEvents() {
  const navigate = useNavigate();
  const { data: events, loading, refetch } = useSupabase(TABLES.EVENTS, { orderBy: 'event_date', ascending: false });
  const { insert } = useSupabaseInsert(TABLES.EVENTS);
  const { update } = useSupabaseUpdate(TABLES.EVENTS);
  const { remove } = useSupabaseDelete(TABLES.EVENTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset } = useForm({ defaultValues: emptyForm });

  const openAdd = () => { setEditing(null); reset(emptyForm); setModalOpen(true); };
  const openEdit = (e) => { setEditing(e); reset(e); setModalOpen(true); };
  const openGallery = (eventId, title) => { navigate(`/admin/events/${eventId}/gallery`, { state: { eventTitle: title } }); };

  const onSubmit = async (data) => {
    const payload = { ...data };
    const posterFile = payload.poster_file?.[0];
    delete payload.poster_file;

    if (posterFile) {
      const url = await uploadFile(BUCKETS.EVENT_POSTERS, posterFile, '', null, payload.title);
      if (url) payload.poster_url = url;
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
    if (!confirm('Delete this event?')) return;
    const { error } = await remove(id);
    if (error) toast.error(error.message); else { toast.success('Deleted!'); refetch(); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-dark">Events Management</h1>
        <Button icon={Plus} onClick={openAdd}>Add Event</Button>
      </div>
      {loading ? <Loader /> : (
        <div className="admin-card overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-admin-surface-2"><tr>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Title</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Date</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Venue</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-admin-border">
              {events.map((e) => (
                <tr key={e.id} className="hover:bg-admin-surface-2">
                  <td className="px-6 py-4 text-sm font-medium text-dark">{e.title}</td>
                  <td className="px-6 py-4 text-sm text-admin-muted">{e.event_date ? formatDate(e.event_date) : '-'}</td>
                  <td className="px-6 py-4 text-sm text-admin-muted">{e.venue}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${e.status === 'featured' ? 'bg-purple-100 text-purple-700' : e.status === 'upcoming' ? 'bg-green-100 text-green-700' : 'bg-admin-surface-2 text-admin-muted'}`}>{e.status}</span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => openGallery(e.id, e.title)} className="p-2 hover:bg-admin-surface-2 rounded-lg" title="Manage Gallery"><Images size={16} className="text-primary" /></button>
                    <button onClick={() => openEdit(e)} className="p-2 hover:bg-admin-surface-2 rounded-lg"><Edit2 size={16} className="text-primary" /></button>
                    <button onClick={() => handleDelete(e.id)} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 size={16} className="text-red-500" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Event' : 'Add Event'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Title</label><input {...register('title', { required: true })} className="w-full px-4 py-2.5 admin-input" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Description</label><textarea {...register('description')} rows={3} className="w-full px-4 py-2.5 admin-input" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-admin-muted mb-1">Event Date</label><input type="date" {...register('event_date', { required: true })} className="w-full px-4 py-2.5 admin-input" /></div>
            <div><label className="block text-sm font-medium text-admin-muted mb-1">Time</label><input type="time" {...register('event_time')} className="w-full px-4 py-2.5 admin-input" /></div>
          </div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Venue</label><input {...register('venue')} className="w-full px-4 py-2.5 admin-input" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Registration URL</label><input {...register('registration_url')} className="w-full px-4 py-2.5 admin-input" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Status</label><select {...register('status')} className="w-full px-4 py-2.5 admin-input"><option value="upcoming">Upcoming</option><option value="featured">Featured</option><option value="past">Past</option></select></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Poster URL</label><input {...register('poster_url')} className="w-full px-4 py-2.5 admin-input" placeholder="https://..." /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Upload Poster</label><input type="file" {...register('poster_file')} className="w-full px-4 py-2.5 admin-input file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Faculty Coordinator</label><input {...register('FacultyCoordinator')} className="w-full px-4 py-2.5 admin-input" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Student Coordinator</label><input {...register('StudentCoordinator')} className="w-full px-4 py-2.5 admin-input" /></div>
          <Button type="submit" className="w-full">{editing ? 'Update' : 'Add'} Event</Button>
        </form>
      </Modal>
    </div>
  );
}
