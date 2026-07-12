import { motion } from 'framer-motion';
import { useState } from 'react';
import { FileCheck, Download, ExternalLink } from 'lucide-react';
import { useSupabase } from '../../hooks/useSupabase';
import { TABLES } from '../../services/supabase';
import Loader from '../../components/common/Loader';

export default function Establishment() {
  const [filter, setFilter] = useState('');
  const { data: certificates, loading } = useSupabase(TABLES.CERTIFICATES, { orderBy: 'year', ascending: false });

  const categories = [...new Set(certificates.map((c) => c.category).filter(Boolean))];
  const filtered = filter ? certificates.filter((c) => c.category === filter) : certificates;

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-dark">Establishment & Certifications</h1>
          <p className="mt-4 text-lg text-slate-600">Official IIC certificates, awards, and recognition documents.</p>
        </motion.div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <button onClick={() => setFilter('')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${!filter ? 'bg-primary text-white' : 'bg-white text-slate-600 hover:bg-slate-100 shadow'}`}>
              All
            </button>
            {categories.map((c) => (
              <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === c ? 'bg-primary text-white' : 'bg-white text-slate-600 hover:bg-slate-100 shadow'}`}>
                {c}
              </button>
            ))}
          </div>
        )}

        {loading ? <Loader /> : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cert) => (
              <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {cert.thumbnail_url ? (
                  <img src={cert.thumbnail_url} alt={cert.title} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <FileCheck size={48} className="text-primary/30" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">{cert.category}</span>
                    {cert.year && <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">{cert.year}</span>}
                  </div>
                  <h3 className="font-bold text-lg text-dark">{cert.title}</h3>
                  {cert.description && <p className="mt-2 text-slate-600 text-sm">{cert.description}</p>}
                  {cert.document_url && (
                    <a href={cert.document_url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline">
                      <Download size={14} /> View Document
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-12">No certifications available yet.</p>
        )}
      </div>
    </div>
  );
}
