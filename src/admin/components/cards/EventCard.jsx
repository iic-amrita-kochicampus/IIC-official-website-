import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import Countdown from '../Countdown/Countdown';
import Button from '../common/Button';
import { formatDate } from '../../utils/helpers';

export default function EventCard({ event, showCountdown = false }) {
  const isUpcoming = new Date(event.event_date) >= new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="admin-card overflow-hidden group"
    >
      <div className="relative h-48 bg-gradient-to-br from-secondary/20 to-accent/20">
        {event.poster_url ? (
          <img src={event.poster_url} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Calendar size={48} className="text-secondary/30" />
          </div>
        )}
        {isUpcoming && (
          <span className="absolute top-3 right-3 px-3 py-1 bg-success text-white text-xs font-bold rounded-full">
            Upcoming
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-dark group-hover:text-primary transition-colors">{event.title}</h3>
        <div className="mt-3 space-y-2 text-sm text-admin-muted">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-primary" />
            <span>{formatDate(event.event_date)}</span>
          </div>
          {event.event_time && (
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-primary" />
              <span>{event.event_time}</span>
            </div>
          )}
          {event.venue && (
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-primary" />
              <span>{event.venue}</span>
            </div>
          )}
        </div>
        <p className="mt-3 text-admin-muted text-sm line-clamp-2">{event.description}</p>
        {showCountdown && isUpcoming && (
          <div className="mt-4">
            <p className="text-xs font-semibold text-admin-muted mb-2 uppercase tracking-wider">Starts In</p>
            <Countdown targetDate={event.event_date} compact />
          </div>
        )}
        {isUpcoming && event.registration_url && (
          <a href={event.registration_url} target="_blank" rel="noopener noreferrer" className="mt-4 block">
            <Button variant="primary" size="sm" className="w-full" icon={ExternalLink}>
              Register Now
            </Button>
          </a>
        )}
      </div>
    </motion.div>
  );
}
