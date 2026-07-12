import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { useSupabase } from '../../hooks/useSupabase';
import { TABLES } from '../../services/supabase';
import NoticeCard from '../../components/cards/NoticeCard';
import Loader from '../../components/common/Loader';
import { NOTICE_CATEGORIES } from '../../utils/helpers';

export default function Notices() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { data: allNotices, loading } = useSupabase(TABLES.NOTICES, { filters: { is_active: true }, orderBy: 'published_date' });

  const notices = allNotices.filter((n) => {
    const matchSearch = !search || n.title.toLowerCase().includes(search.toLowerCase()) || n.description?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !category || n.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-dark">Notices</h1>
          <p className="mt-4 text-lg text-slate-600">Official announcements and updates from IIC.</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input placeholder="Search notices..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" />
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">All Categories</option>
            {NOTICE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {loading ? <Loader /> : notices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notices.map((notice) => <NoticeCard key={notice.id} notice={notice} />)}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-12">No notices available.</p>
        )}
      </div>
    </div>
  );
}
