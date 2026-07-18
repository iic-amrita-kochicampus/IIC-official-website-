import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Users, Calendar, Bell, Lightbulb, MessageSquare, FolderKanban, TrendingUp, AlertCircle } from 'lucide-react';
import { useSupabase } from '../../../hooks/useSupabase';
import { TABLES } from '../../../services/supabase';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import PageHeader from '../../components/ui/PageHeader';

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
    { label: 'Total Members', value: members.length, icon: Users, tone: 'primary' },
    { label: 'Total Events', value: events.length, icon: Calendar, tone: 'neutral' },
    { label: 'Upcoming Events', value: upcomingEvents.length, icon: TrendingUp, tone: 'success' },
    { label: 'Active Projects', value: projects.length, icon: FolderKanban, tone: 'primary' },
    { label: 'Total Notices', value: notices.length, icon: Bell, tone: 'warning' },
    { label: 'Ideas Received', value: ideas.length, icon: Lightbulb, tone: 'warning' },
    { label: 'Pending Ideas', value: pendingIdeas.length, icon: AlertCircle, tone: 'danger' },
    { label: 'Open Queries', value: openQueries.length, icon: MessageSquare, tone: 'danger' },
  ];

  const statTones = {
    primary: 'bg-primary/10 text-primary',
    neutral: 'bg-admin-surface-2 text-admin-muted',
    success: 'bg-emerald-500/10 text-emerald-600',
    warning: 'bg-amber-500/10 text-amber-600',
    danger: 'bg-red-500/10 text-red-500',
  };

  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const cards = gridRef.current?.querySelectorAll('[data-stat-card]');
    if (!cards?.length) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out' }
    );
  }, []);

  return (
    <div>
      <PageHeader title="Dashboard Overview" subtitle="A snapshot of everything happening across the council" />

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <Card key={stat.label} hover data-stat-card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-admin-muted">{stat.label}</p>
                <p className="text-3xl font-semibold text-dark mt-1">{stat.value}</p>
              </div>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${statTones[stat.tone]}`}>
                <stat.icon size={20} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
        <Card className="p-6">
          <h3 className="font-semibold text-dark mb-4">Recent Ideas</h3>
          {pendingIdeas.length > 0 ? (
            <div className="space-y-2">
              {pendingIdeas.slice(0, 5).map((idea) => (
                <div key={idea.id} className="flex items-center justify-between p-3 bg-admin-surface-2 rounded-xl">
                  <div className="min-w-0">
                    <p className="font-medium text-dark text-sm truncate">{idea.title}</p>
                    <p className="text-xs text-admin-muted">{idea.name} · {idea.department}</p>
                  </div>
                  <Badge tone="warning">{idea.status}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-admin-muted text-sm">No pending ideas.</p>
          )}
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-dark mb-4">Recent Queries</h3>
          {openQueries.length > 0 ? (
            <div className="space-y-2">
              {openQueries.slice(0, 5).map((query) => (
                <div key={query.id} className="flex items-center justify-between p-3 bg-admin-surface-2 rounded-xl">
                  <div className="min-w-0">
                    <p className="font-medium text-dark text-sm truncate">{query.subject}</p>
                    <p className="text-xs text-admin-muted">{query.name} · {query.category}</p>
                  </div>
                  <Badge tone="danger">{query.status}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-admin-muted text-sm">No open queries.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
