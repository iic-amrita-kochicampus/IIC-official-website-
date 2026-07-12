import { motion } from 'framer-motion';
import { useSupabase } from '../../hooks/useSupabase';
import { TABLES } from '../../services/supabase';
import MemberCard from '../../components/cards/MemberCard';
import Loader from '../../components/common/Loader';

export default function Leadership() {
  const { data: leaders, loading } = useSupabase(TABLES.LEADERSHIP, { filters: { is_active: true }, orderBy: 'display_order' });
  const { data: members, loading: membersLoading } = useSupabase(TABLES.MEMBERS, { filters: { is_active: true }, orderBy: 'display_order' });

  const teams = [...new Set(members.map((m) => m.team).filter(Boolean))];

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-dark">Leadership & Members</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Meet the people driving innovation at our institution.</p>
        </motion.div>

        {/* Leadership */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-dark mb-8 text-center">Leadership</h2>
          {loading ? <Loader /> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leaders.map((leader) => <MemberCard key={leader.id} member={leader} />)}
            </div>
          )}
          {!loading && leaders.length === 0 && (
            <p className="text-center text-slate-500">No leadership profiles available yet.</p>
          )}
        </div>

        {/* Teams */}
        {teams.map((team) => (
          <div key={team} className="mb-12">
            <h2 className="text-2xl font-bold text-dark mb-8 text-center">{team}</h2>
            {membersLoading ? <Loader /> : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {members.filter((m) => m.team === team).map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            )}
          </div>
        ))}

        {!membersLoading && members.length === 0 && leaders.length === 0 && (
          <p className="text-center text-slate-500">No members available yet.</p>
        )}
      </div>
    </div>
  );
}
