import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Users, Lightbulb, FlaskConical, Award, TrendingUp, Send, MessageCircle, MapPin, Clock, ExternalLink } from 'lucide-react';
import { useSupabase } from '../../hooks/useSupabase';
import { TABLES } from '../../services/supabase';
import Button from '../../components/common/Button';
import EventCard from '../../components/cards/EventCard';
import NoticeCard from '../../components/cards/NoticeCard';
import ProjectCard from '../../components/cards/ProjectCard';
import Loader from '../../components/common/Loader';
import Countdown from '../../components/Countdown/Countdown';
import { formatDate } from '../../utils/helpers';

const stats = [
  { label: 'Events Conducted', icon: Calendar, value: 50 },
  { label: 'Active Projects', icon: FlaskConical, value: 25 },
  { label: 'Innovation Ambassadors', icon: Award, value: 15 },
  { label: 'Ideas Received', icon: Lightbulb, value: 200 },
  { label: 'Research Projects', icon: TrendingUp, value: 30 },
];

function SectionTitle({ title, subtitle, center = true }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-dark">{title}</h2>
      {subtitle && <p className="mt-3 text-slate-600 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}

const demoEvents = [
  {
    id: 'demo-1',
    title: 'Innovation Summit 2026',
    description: 'Join us for a day of inspiring talks, hands-on workshops, and networking with innovators from across the region.',
    event_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    event_time: '10:00 AM - 4:00 PM',
    venue: 'Main Auditorium',
    status: 'upcoming',
  },
  {
    id: 'demo-2',
    title: 'Hackathon: Code for Change',
    description: 'A 24-hour hackathon to build solutions for real-world problems.',
    event_date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    event_time: '9:00 AM onwards',
    venue: 'Innovation Lab',
    status: 'upcoming',
  },
];

const demoNotices = [
  { id: 'demo-1', title: 'IIC Annual Report 2025-26 Released', description: 'The annual report summarizing all IIC activities is now available for download.', category: 'General', published_date: new Date().toISOString(), is_pinned: true },
  { id: 'demo-2', title: 'Call for Innovation Ambassadors', description: 'Nominations are open for the Innovation Ambassador program.', category: 'Important', published_date: new Date().toISOString() },
];

const demoProjects = [
  { id: 'demo-1', title: 'Smart Irrigation System', description: 'IoT-based automated irrigation using soil moisture sensors and weather data.', category: 'IoT', status: 'In Progress', progress: 72, team_lead: 'Rahul S.', technologies: ['Arduino', 'IoT', 'Python'] },
  { id: 'demo-2', title: 'AI Chatbot for Campus', description: 'An AI-powered chatbot to assist students with campus queries and navigation.', category: 'Artificial Intelligence', status: 'In Progress', progress: 45, team_lead: 'Priya M.', technologies: ['React', 'NLP', 'FastAPI'] },
];

export default function Home() {
  const { data: dbEvents } = useSupabase(TABLES.EVENTS, { filters: { status: 'upcoming' }, limit: 3 });
  const { data: dbNotices } = useSupabase(TABLES.NOTICES, { filters: { is_active: true }, limit: 5 });
  const { data: dbProjects } = useSupabase(TABLES.PROJECTS, { limit: 3 });
  const { data: leadership } = useSupabase(TABLES.LEADERSHIP, { filters: { is_active: true }, limit: 1 });

  const events = dbEvents.length > 0 ? dbEvents : demoEvents;
  const notices = dbNotices.length > 0 ? dbNotices : demoNotices;
  const projects = dbProjects.length > 0 ? dbProjects : demoProjects;

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-dark via-slate-900 to-primary overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-6 backdrop-blur border border-primary/30">
              Institution's Innovation Council
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Innovate. <br />
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Inspire.</span> <br />
              Impact.
            </h1>
            <p className="mt-6 text-lg text-slate-300 max-w-xl">
              Fostering a culture of innovation and entrepreneurship within our institution. Join us in shaping the future through creative problem-solving and cutting-edge research.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/events">
                <Button size="lg" icon={Calendar}>Explore Events</Button>
              </Link>
              <Link to="/ideas">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-dark">
                  Submit Idea <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold text-dark">
                Empowering <span className="text-primary">Innovation</span> Across Campus
              </h2>
              <p className="mt-6 text-slate-600 leading-relaxed">
                The Institution's Innovation Council is a vibrant platform that brings together students, faculty, and industry experts to collaborate on groundbreaking ideas. We nurture entrepreneurial thinking and provide resources to transform ideas into reality.
              </p>
              <Link to="/about" className="mt-8 inline-block">
                <Button icon={ArrowRight}>Learn More About Us</Button>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
              {stats.slice(0, 4).map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg text-center">
                  <stat.icon size={28} className="mx-auto text-primary mb-3" />
                  <div className="text-3xl font-bold text-dark">{stat.value}+</div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center text-white">
                <stat.icon size={32} className="mx-auto mb-3 text-white/80" />
                <div className="text-3xl md:text-4xl font-bold">{stat.value}+</div>
                <div className="text-sm text-white/70 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Event Countdown */}
      {events.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle title="Next Upcoming Event" subtitle="Don't miss our next innovation activity" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-dark via-slate-900 to-primary rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Event Info */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 bg-success/20 text-success text-xs font-bold rounded-full w-fit mb-4">
                    Upcoming
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-white">{events[0].title}</h3>
                  <p className="mt-4 text-slate-300 leading-relaxed">{events[0].description}</p>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-slate-300 text-sm">
                      <Calendar size={16} className="text-primary" />
                      <span>{formatDate(events[0].event_date)}</span>
                    </div>
                    {events[0].event_time && (
                      <div className="flex items-center gap-3 text-slate-300 text-sm">
                        <Clock size={16} className="text-primary" />
                        <span>{events[0].event_time}</span>
                      </div>
                    )}
                    {events[0].venue && (
                      <div className="flex items-center gap-3 text-slate-300 text-sm">
                        <MapPin size={16} className="text-primary" />
                        <span>{events[0].venue}</span>
                      </div>
                    )}
                  </div>
                  {events[0].registration_url && (
                    <div className="mt-8">
                      <a href={events[0].registration_url} target="_blank" rel="noopener noreferrer">
                        <Button size="lg" icon={ExternalLink}>Register Now</Button>
                      </a>
                    </div>
                  )}
                </div>

                {/* Countdown + Poster */}
                <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 p-8 lg:p-12 flex flex-col items-center justify-center">
                  {events[0].poster_url && (
                    <img src={events[0].poster_url} alt={events[0].title} className="w-full max-w-xs rounded-2xl shadow-lg mb-8" />
                  )}
                  <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">Starts In</p>
                  <Countdown targetDate={events[0].event_date} />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {events.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle title="Upcoming Events" subtitle="Stay updated with our latest events and activities" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard key={event.id} event={event} showCountdown />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/events"><Button variant="outline">View All Events</Button></Link>
            </div>
          </div>
        </section>
      )}

      {/* Latest Notices */}
      {notices.length > 0 && (
        <section className="py-20 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle title="Latest Notices" subtitle="Official announcements and updates" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/notices"><Button variant="outline">View All Notices</Button></Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle title="Featured Projects" subtitle="Innovative projects from our students" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/projects"><Button variant="outline">View All Projects</Button></Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-dark to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Have an Innovative Idea?</h2>
            <p className="mt-4 text-slate-300 max-w-xl mx-auto">Share your ideas with us and help shape the future of innovation at our institution.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/ideas">
                <Button size="lg" icon={Lightbulb}>Submit an Idea</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-dark" icon={MessageCircle}>
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
