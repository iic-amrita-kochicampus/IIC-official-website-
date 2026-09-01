import { motion } from 'framer-motion';
import { CalendarDays, Clock3, MapPin, ExternalLink } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

export default function EventPreviewCard({ event }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-2xl p-5 relative"
    >
      <span className="inline-block px-2 py-0.5 bg-innovation-blue/10 text-innovation-blue text-xs font-bold rounded-full mb-2">
        UPCOMING EVENT
      </span>
      <h3 className="font-display text-lg text-paper">{event.title}</h3>

      <div className="flex flex-wrap gap-2 mt-2">
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/5 text-fog text-xs font-medium rounded-full">
          <CalendarDays size={12} /> {event.event_date ? formatDate(event.event_date) : 'Date TBD'}
        </span>
        {event.event_time && (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/5 text-fog text-xs font-medium rounded-full">
            <Clock3 size={12} /> {event.event_time}
          </span>
        )}
        {event.venue && (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/5 text-fog text-xs font-medium rounded-full">
            <MapPin size={12} /> {event.venue}
          </span>
        )}
      </div>

      {event.description && (
        <p className="mt-3 text-fog text-sm leading-relaxed line-clamp-3">{event.description}</p>
      )}

      {event.registration_url && (
        <a
          href={event.registration_url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="inline-flex items-center gap-1 mt-4 px-3 py-1.5 bg-innovation-orange/10 text-innovation-orange text-sm font-medium rounded-lg hover:bg-innovation-orange/20 transition-colors"
        >
          <ExternalLink size={14} /> Register
        </a>
      )}
    </motion.div>
  );
}
