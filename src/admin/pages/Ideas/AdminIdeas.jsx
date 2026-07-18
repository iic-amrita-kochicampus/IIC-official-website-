import { useState } from 'react';
import { useSupabase, useSupabaseUpdate } from '../../../hooks/useSupabase';
import { TABLES } from '../../../services/supabase';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import Loader from '../../../components/common/Loader';
import { toast } from 'react-toastify';
import { formatDate, IDEA_STATUSES } from '../../../utils/helpers';

export default function AdminIdeas() {
  const { data: ideas, loading, refetch } = useSupabase(TABLES.IDEAS, { orderBy: 'created_at' });
  const { update } = useSupabaseUpdate(TABLES.IDEAS);
  const [selected, setSelected] = useState(null);
  const [remark, setRemark] = useState('');

  const updateStatus = async (id, status) => {
    const { error } = await update(id, { status, admin_remarks: remark });
    if (error) toast.error(error.message); else { toast.success('Updated!'); refetch(); setSelected(null); }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark mb-8">Ideas Management</h1>
      {loading ? <Loader /> : (
        <div className="admin-card overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-admin-surface-2"><tr>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Title</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Name</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Department</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Date</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-admin-border">
              {ideas.map((i) => (
                <tr key={i.id} className="hover:bg-admin-surface-2">
                  <td className="px-6 py-4 text-sm font-medium text-dark">{i.title}</td>
                  <td className="px-6 py-4 text-sm text-admin-muted">{i.name}</td>
                  <td className="px-6 py-4 text-sm text-admin-muted">{i.department}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      i.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      i.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      i.status === 'Under Review' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>{i.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-admin-muted">{formatDate(i.created_at)}</td>
                  <td className="px-6 py-4">
                    <Button size="sm" variant="ghost" onClick={() => { setSelected(i); setRemark(i.admin_remarks || ''); }}>Review</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Review Idea" size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-semibold">Name:</span> {selected.name}</div>
              <div><span className="font-semibold">Email:</span> {selected.email}</div>
              <div><span className="font-semibold">Department:</span> {selected.department}</div>
              <div><span className="font-semibold">Year:</span> {selected.year}</div>
              <div><span className="font-semibold">Category:</span> {selected.category}</div>
              <div><span className="font-semibold">Register No:</span> {selected.register_number || 'N/A'}</div>
            </div>
            <div><span className="font-semibold">Problem Statement:</span><p className="text-admin-muted mt-1">{selected.problem_statement}</p></div>
            <div><span className="font-semibold">Proposed Solution:</span><p className="text-admin-muted mt-1">{selected.proposed_solution}</p></div>
            <div><span className="font-semibold">Expected Impact:</span><p className="text-admin-muted mt-1">{selected.expected_impact}</p></div>
            <div><label className="block text-sm font-medium text-admin-muted mb-1">Admin Remarks</label><textarea value={remark} onChange={(e) => setRemark(e.target.value)} rows={3} className="w-full px-4 py-2.5 admin-input" /></div>
            <div className="flex gap-3">
              <Button variant="success" onClick={() => updateStatus(selected.id, 'Approved')}>Approve</Button>
              <Button variant="accent" onClick={() => updateStatus(selected.id, 'Under Review')}>Mark Under Review</Button>
              <Button variant="danger" onClick={() => updateStatus(selected.id, 'Rejected')}>Reject</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
