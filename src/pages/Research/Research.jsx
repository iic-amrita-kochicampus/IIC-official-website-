import { motion } from 'framer-motion';
import { useState } from 'react';
import { FlaskConical, Search } from 'lucide-react';
import { useSupabase } from '../../hooks/useSupabase';
import { TABLES } from '../../services/supabase';
import Loader from '../../components/common/Loader';

export default function Research() {
  const [filter, setFilter] = useState('all');
  const { data: research, loading } = useSupabase(TABLES.RESEARCH, { orderBy: 'created_at' });

  const filtered = filter === 'all' ? research : research.filter((r) => r.status?.toLowerCase() === filter);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-dark">Research & Development</h1>
          <p className="mt-4 text-lg text-slate-600">Explore our ongoing and completed research activities.</p>
        </motion.div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {['all', 'ongoing', 'completed', 'published'].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === f ? 'bg-primary text-white' : 'bg-white text-slate-600 hover:bg-slate-100 shadow'}`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {loading ? <Loader /> : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((item) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {item.image_url && <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${item.status === 'ongoing' ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>
                      {item.status || 'Ongoing'}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">{item.category}</span>
                  </div>
                  <h3 className="font-bold text-lg text-dark">{item.title}</h3>
                  <p className="mt-2 text-slate-600 text-sm line-clamp-3">{item.description}</p>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
                    {item.researcher && <span>By: {item.researcher}</span>}
                    {item.mentor && <span>Mentor: {item.mentor}</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-12">No research items to display.</p>
        )}
      </div>
    </div>
  );
}
