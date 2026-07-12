import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSupabase } from '../../hooks/useSupabase';
import { TABLES } from '../../services/supabase';
import ProjectCard from '../../components/cards/ProjectCard';
import Loader from '../../components/common/Loader';
import { PROJECT_CATEGORIES } from '../../utils/helpers';

export default function Projects() {
  const [category, setCategory] = useState('');
  const { data: projects, loading } = useSupabase(TABLES.PROJECTS, { orderBy: 'created_at' });

  const filtered = category ? projects.filter((p) => p.category === category) : projects;

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-dark">Active Projects</h1>
          <p className="mt-4 text-lg text-slate-600">Innovative projects developed by our students and faculty.</p>
        </motion.div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button onClick={() => setCategory('')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${!category ? 'bg-primary text-white' : 'bg-white text-slate-600 hover:bg-slate-100 shadow'}`}>
            All
          </button>
          {PROJECT_CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${category === c ? 'bg-primary text-white' : 'bg-white text-slate-600 hover:bg-slate-100 shadow'}`}>
              {c}
            </button>
          ))}
        </div>

        {loading ? <Loader /> : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-12">No projects to display.</p>
        )}
      </div>
    </div>
  );
}
