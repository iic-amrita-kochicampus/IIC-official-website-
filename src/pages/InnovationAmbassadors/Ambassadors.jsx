import { motion } from 'framer-motion';
import { useSupabase } from '../../hooks/useSupabase';
import { TABLES } from '../../services/supabase';
import Loader from '../../components/common/Loader';

export default function Ambassadors() {
  const { data: ambassadors, loading } = useSupabase(TABLES.AMBASSADORS, { filters: { is_active: true } });

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-dark">Innovation Ambassadors</h1>
          <p className="mt-4 text-lg text-slate-600">Meet our dedicated Innovation Ambassadors driving change.</p>
        </motion.div>

        {loading ? <Loader /> : ambassadors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ambassadors.map((amb) => (
              <motion.div key={amb.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-secondary/20 to-accent/20">
                  {amb.image_url ? (
                    <img src={amb.image_url} alt={amb.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-5xl font-bold text-secondary/30">{amb.name?.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-dark">{amb.name}</h3>
                  <p className="text-primary font-medium text-sm">{amb.position || 'Innovation Ambassador'}</p>
                  <p className="text-slate-500 text-sm">{amb.department}</p>
                  {amb.year && <span className="inline-block mt-2 px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">{amb.year}</span>}
                  {amb.responsibilities && <p className="mt-3 text-slate-600 text-sm">{amb.responsibilities}</p>}
                  {amb.achievements && <p className="mt-2 text-success text-sm font-medium">{amb.achievements}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-12">No Innovation Ambassadors listed yet.</p>
        )}
      </div>
    </div>
  );
}
