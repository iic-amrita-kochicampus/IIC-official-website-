import { useState } from 'react';
import { Plus, Edit2, Trash2, Users, UserCog } from 'lucide-react';
import { useSupabase, useSupabaseInsert, useSupabaseUpdate, useSupabaseDelete } from '../../../hooks/useSupabase';
import { TABLES, BUCKETS } from '../../../services/supabase';
import { uploadFile } from '../../../utils/supabaseStorage';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import Loader from '../../../components/common/Loader';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { DEPARTMENTS } from '../../../utils/helpers';

const STUDENT_ROLES = [
  'Student President',
  'Student Convener',
  'Innovation Coordinator',
  'Internship Coordinator',
  'Core Member',
  'IPR Coordinator',
  'Start Up Coordinator',
  'Social Media Coordinator',
];

const FACULTY_ROLES = [
  'IIC President',
  'Convener',
  'NIRF Coordinator',
  'Member',
  'Innovation Activity Coordinator',
  'IPR Activity Coordinator',
  'Social Media Coordinator',
  'Startup Activity Coordinator',
  'Vice President',
  'RD Cell Coordinator',
  'Internship Activity Coordinator',
];

const emptyForm = { name: '', type: 'student', role: '', department: '', designation: '', email: '', linkedin: '', display_order: 0, is_active: true, image_url: '' };

export default function AdminLeadership() {
  const [activeTab, setActiveTab] = useState('student');
  
  const { data: leaders, loading, refetch } = useSupabase(TABLES.LEADERSHIP, { orderBy: 'display_order' });
  const { insert } = useSupabaseInsert(TABLES.LEADERSHIP);
  const { update } = useSupabaseUpdate(TABLES.LEADERSHIP);
  const { remove } = useSupabaseDelete(TABLES.LEADERSHIP);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset, watch } = useForm({ defaultValues: emptyForm });
  const selectedType = watch('type') || 'student';

  const filteredLeaders = leaders?.filter(l => l.type === activeTab) || [];

  const openAdd = () => { setEditing(null); reset(emptyForm); setModalOpen(true); };
  const openEdit = (leader) => { 
    setEditing(leader); 
    reset(leader); 
    setModalOpen(true); 
  };

  const onSubmit = async (data) => {
    const payload = { ...data };
    const imageFile = payload.image_file?.[0];
    delete payload.image_file;

    if (imageFile) {
      const url = await uploadFile(BUCKETS.LEADERSHIP_IMAGES, imageFile, '', null, payload.name);
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
        <h1 className="text-2xl font-bold text-dark">Leadership Management</h1>
        <Button icon={Plus} onClick={openAdd}>Add Member</Button>
      </div>
      
      {/* Type Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('student')}
          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition ${
            activeTab === 'student' 
              ? 'bg-primary text-white' 
              : 'bg-admin-surface-2 text-admin-muted hover:bg-admin-surface-3'
          }`}
        >
          <Users className="w-4 h-4 inline mr-2" /> Students
        </button>
        <button
          onClick={() => setActiveTab('faculty')}
          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition ${
            activeTab === 'faculty' 
              ? 'bg-primary text-white' 
              : 'bg-admin-surface-2 text-admin-muted hover:bg-admin-surface-3'
          }`}
        >
          <UserCog className="w-4 h-4 inline mr-2" /> Faculty Council
        </button>
      </div>

      {loading ? <Loader /> : (
        <div className="admin-card overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-admin-surface-2"><tr>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Name</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Type</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Role</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Department</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Designation</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-admin-border">
              {filteredLeaders.map((l) => (
                <tr key={l.id} className="hover:bg-admin-surface-2">
                  <td className="px-6 py-4 text-sm font-medium text-dark">{l.name}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${l.type === 'faculty' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {l.type === 'faculty' ? 'Faculty' : 'Student'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-admin-muted">{l.role || '-'}</td>
                  <td className="px-6 py-4 text-sm text-admin-muted">{l.department}</td>
                  <td className="px-6 py-4 text-sm text-admin-muted">{l.designation || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${l.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {l.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => openEdit(l)} className="p-2 hover:bg-admin-surface-2 rounded-lg"><Edit2 size={16} className="text-primary" /></button>
                    <button onClick={() => handleDelete(l.id)} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 size={16} className="text-red-500" /></button>
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
          
          <div>
            <label className="block text-sm font-medium text-admin-muted mb-1">Type</label>
            <select {...register('type', { required: true })} className="w-full px-4 py-2.5 admin-input">
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-admin-muted mb-1">Role</label>
            <select {...register('role', { required: true })} className="w-full px-4 py-2.5 admin-input">
              <option value="">Select Role</option>
              {selectedType === 'faculty' 
                ? FACULTY_ROLES.map((r) => <option key={r} value={r}>{r}</option>)
                : STUDENT_ROLES.map((r) => <option key={r} value={r}>{r}</option>)
              }
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-admin-muted mb-1">Department</label>
            <select {...register('department')} className="w-full px-4 py-2.5 admin-input">
              <option value="">Select Department</option>
              {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div><label className="block text-sm font-medium text-admin-muted mb-1">Designation</label><input {...register('designation')} className="w-full px-4 py-2.5 admin-input" placeholder="e.g. Assistant Professor (Sr. Gr), HOD" /></div>
          
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Photo URL</label><input {...register('image_url')} className="w-full px-4 py-2.5 admin-input" placeholder="https://..." /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Upload Photo</label><input type="file" {...register('image_file')} className="w-full px-4 py-2.5 admin-input file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Email</label><input type="email" {...register('email')} className="w-full px-4 py-2.5 admin-input" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">LinkedIn</label><input {...register('linkedin')} className="w-full px-4 py-2.5 admin-input" /></div>
          <div><label className="block text-sm font-medium text-admin-muted mb-1">Display Order</label><input type="number" {...register('display_order')} className="w-full px-4 py-2.5 admin-input" /></div>
          <div className="flex items-center gap-2"><input type="checkbox" {...register('is_active')} className="w-4 h-4" /><label className="text-sm text-admin-muted">Active</label></div>
          <Button type="submit" className="w-full">{editing ? 'Update' : 'Add'} Member</Button>
        </form>
      </Modal>
    </div>
  );
}
