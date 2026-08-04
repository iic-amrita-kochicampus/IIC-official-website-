import { useState } from 'react';
import { useSupabase, useSupabaseUpdate } from '../../../hooks/useSupabase';
import { TABLES } from '../../../services/supabase';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import Loader from '../../../components/common/Loader';
import { toast } from 'react-toastify';
import { formatDate, QUERY_STATUSES } from '../../../utils/helpers';

export default function AdminQueries() {
  const { data: queries, loading, refetch } = useSupabase(TABLES.QUERIES, { orderBy: 'created_at' });
  const { update } = useSupabaseUpdate(TABLES.QUERIES);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState('');

  const updateQuery = async (id, status) => {
    const { error } = await update(id, { status, reply });
    if (error) toast.error(error.message); else { toast.success('Updated!'); refetch(); setSelected(null); }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark mb-8">Queries Management</h1>
      {loading ? <Loader /> : (
        <div className="admin-card overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-admin-surface-2"><tr>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Subject</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Name</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Category</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Date</th>
              <th className="px-6 py-4 text-sm font-semibold text-admin-muted">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-admin-border">
              {queries.map((q) => (
                <tr key={q.id} className="hover:bg-admin-surface-2">
                  <td className="px-6 py-4 text-sm font-medium text-dark">{q.subject}</td>
                  <td className="px-6 py-4 text-sm text-admin-muted">{q.name}</td>
                  <td className="px-6 py-4 text-sm text-admin-muted">{q.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      q.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                      q.status === 'Closed' ? 'bg-admin-surface-2 text-admin-muted' :
                      q.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>{q.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-admin-muted">{formatDate(q.created_at)}</td>
                  <td className="px-6 py-4">
                    <Button size="sm" variant="ghost" onClick={() => { setSelected(q); setReply(q.reply || ''); }}>View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Query Details" size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-semibold">Name:</span> {selected.name}</div>
              <div><span className="font-semibold">Email:</span> {selected.email}</div>
              <div><span className="font-semibold">Department:</span> {selected.department || 'N/A'}</div>
              <div><span className="font-semibold">Category:</span> {selected.category}</div>
            </div>
            <div><span className="font-semibold">Subject:</span><p className="text-dark font-medium">{selected.subject}</p></div>
            <div><span className="font-semibold">Message:</span><p className="text-admin-muted mt-1">{selected.message}</p></div>
            {selected.attachment_url ? (
              <div>
                <span className="font-semibold">Attachment:</span>{' '}
                <a
                  href={selected.attachment_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:text-primary/80"
                >
                  View Attachment
                </a>
              </div>
            ) : (
              <div className="text-sm text-admin-muted">
                No attachment was uploaded or the storage bucket is not configured yet.
              </div>
            )}
            <div><label className="block text-sm font-medium text-admin-muted mb-1">Reply</label><textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={3} className="w-full px-4 py-2.5 admin-input" placeholder="Type your reply..." /></div>
            <div className="flex gap-3">
              <Button onClick={() => updateQuery(selected.id, 'Resolved')}>Mark Resolved</Button>
              <Button variant="accent" onClick={() => updateQuery(selected.id, 'In Progress')}>In Progress</Button>
              <Button variant="ghost" onClick={() => updateQuery(selected.id, 'Closed')}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
