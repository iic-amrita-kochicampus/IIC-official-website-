import { useState } from 'react';
import { useSupabase } from '../../../hooks/useSupabase';
import { TABLES } from '../../../services/supabase';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import Loader from '../../../components/common/Loader';
import { formatDate } from '../../../utils/helpers';

export default function AdminContacts() {
  const { data: contacts, loading } = useSupabase(TABLES.CONTACTS, { orderBy: 'created_at' });
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark mb-8">Contact Messages</h1>
      {loading ? <Loader /> : (
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-slate-50"><tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Name</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Email</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Subject</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Date</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {contacts.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-dark">{c.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{c.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{c.subject}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{formatDate(c.created_at)}</td>
                  <td className="px-6 py-4">
                    <Button size="sm" variant="ghost" onClick={() => setSelected(c)}>View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Message Details">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-semibold">Name:</span> {selected.name}</div>
              <div><span className="font-semibold">Email:</span> {selected.email}</div>
              <div><span className="font-semibold">Phone:</span> {selected.phone || 'N/A'}</div>
              <div><span className="font-semibold">Subject:</span> {selected.subject}</div>
            </div>
            <div><span className="font-semibold">Message:</span><p className="text-slate-600 mt-1">{selected.message}</p></div>
          </div>
        )}
      </Modal>
    </div>
  );
}
