import { motion } from 'framer-motion';
import { useState } from 'react';
import { Lightbulb, HelpCircle } from 'lucide-react';
import IdeaForm from '../../components/forms/IdeaForm';
import QueryForm from '../../components/forms/QueryForm';

export default function Ideas() {
  const [tab, setTab] = useState('idea');

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-dark">Ideas & Queries</h1>
          <p className="mt-4 text-lg text-slate-600">Share your innovative ideas or ask us a question.</p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 rounded-2xl p-1 mb-8">
          <button onClick={() => setTab('idea')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${tab === 'idea' ? 'bg-white text-primary shadow-lg' : 'text-slate-500'}`}>
            <Lightbulb size={18} /> Submit an Idea
          </button>
          <button onClick={() => setTab('query')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${tab === 'query' ? 'bg-white text-primary shadow-lg' : 'text-slate-500'}`}>
            <HelpCircle size={18} /> Ask a Query
          </button>
        </div>

        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg p-8">
          {tab === 'idea' ? (
            <div>
              <h2 className="text-2xl font-bold text-dark mb-2">Submit Your Idea</h2>
              <p className="text-slate-600 mb-6">Have an innovative solution? Share it with us and we'll review it.</p>
              <IdeaForm />
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-dark mb-2">Ask a Query</h2>
              <p className="text-slate-600 mb-6">Got questions about startups, patents, funding, or anything else? We're here to help.</p>
              <QueryForm />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
