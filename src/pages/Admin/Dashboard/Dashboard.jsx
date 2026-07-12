import { motion } from 'framer-motion';
import { Users, Calendar, Bell, Lightbulb, MessageSquare, FolderKanban, TrendingUp, AlertCircle } from 'lucide-react';
import { useSupabase } from '../../../hooks/useSupabase';
import { TABLES } from '../../../services/supabase';

export default function Dashboard() {
  const { data: members } = useSupabase(TABLES.MEMBERS, { filters: { is_active: true } });
  const { data: events } = useSupabase(TABLES.EVENTS);
  const { data: notices } = useSupabase(TABLES.NOTICES, { filters: { is_active: true } });
  const { data: ideas } = useSupabase(TABLES.IDEAS);
  const { data: queries } = useSupabase(TABLES.QUERIES);
  const { data: projects } = useSupabase(TABLES.PROJECTS);

  const upcomingEvents = events.filter((e) => e.status === 'upcoming');
  const pendingIdeas = ideas.filter((i) => i.status === 'Pending');
  const openQueries = queries.filter((q) => q.status === 'Open');

  const stats = [
    { label: 'Total Members', value: members.length, icon: Users, color: 'bg-primary' },
    { label: 'Total Events', value: events.length, icon: Calendar, color: 'bg-secondary' },
    { label: 'Upcoming Events', value: upcomingEvents.length, icon: TrendingUp, color: 'bg-accent' },
    { label: 'Active Projects', value: projects.length, icon: FolderKanban, color: 'bg-success' },
    { label: 'Total Notices', value: notices.length, icon: Bell, color: 'bg-orange-500' },
    { label: 'Ideas Received', value: ideas.length, icon: Lightbulb, color: 'bg-yellow-500' },
    { label: 'Pending Ideas', value: pendingIdeas.length, icon: AlertCircle, color: 'bg-red-500' },
    { label: 'Open Queries', value: openQueries.length, icon: MessageSquare, color: 'bg-pink-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="text-3xl font-bold text-dark mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon size={22} className="text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-lg text-dark mb-4">Recent Ideas</h3>
          {pendingIdeas.length > 0 ? (
            <div className="space-y-3">
              {pendingIdeas.slice(0, 5).map((idea) => (
                <div key={idea.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <p className="font-medium text-dark text-sm">{idea.title}</p>
                    <p className="text-xs text-slate-500">{idea.name} - {idea.department}</p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">{idea.status}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm">No pending ideas.</p>
          )}
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-lg text-dark mb-4">Recent Queries</h3>
          {openQueries.length > 0 ? (
            <div className="space-y-3">
              {openQueries.slice(0, 5).map((query) => (
                <div key={query.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <p className="font-medium text-dark text-sm">{query.subject}</p>
                    <p className="text-xs text-slate-500">{query.name} - {query.category}</p>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">{query.status}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm">No open queries.</p>
          )}
        </div>
      </div>
    </div>
  );
}
