import { motion } from 'framer-motion';
import { useSupabase } from '../../hooks/useSupabase';
import { TABLES } from '../../services/supabase';
import EventCard from '../../components/cards/EventCard';
import Loader from '../../components/common/Loader';

export default function Events() {
  const { data: upcoming, loading } = useSupabase(TABLES.EVENTS, { filters: { status: 'upcoming' }, orderBy: 'event_date' });
  const { data: past } = useSupabase(TABLES.EVENTS, { filters: { status: 'past' }, orderBy: 'event_date', ascending: false });

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-dark">Events</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Discover upcoming workshops, hackathons, and innovation activities.</p>
        </motion.div>

        {/* Upcoming */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-dark mb-8">Upcoming Events</h2>
          {loading ? <Loader /> : upcoming.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcoming.map((event) => <EventCard key={event.id} event={event} showCountdown />)}
            </div>
          ) : (
            <p className="text-slate-500 text-center py-12">No upcoming events at the moment.</p>
          )}
        </div>

        {/* Past */}
        <div>
          <h2 className="text-2xl font-bold text-dark mb-8">Past Events</h2>
          {past.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {past.map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          ) : (
            <p className="text-slate-500 text-center py-12">No past events to display.</p>
          )}
        </div>
      </div>
    </div>
  );
}
