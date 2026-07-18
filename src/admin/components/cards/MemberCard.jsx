import { motion } from 'framer-motion';
import { Mail, ExternalLink } from 'lucide-react';

export default function MemberCard({ member }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="admin-card overflow-hidden group"
    >
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20">
        {member.image_url ? (
          <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl font-bold text-primary/30">{member.name?.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-dark">{member.name}</h3>
        <p className="text-primary font-medium text-sm">{member.position}</p>
        <p className="text-admin-muted text-sm">{member.department}</p>
        {member.team && <span className="inline-block mt-2 px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">{member.team}</span>}
        <div className="flex gap-2 mt-3">
          {member.email && (
            <a href={`mailto:${member.email}`} className="p-2 bg-slate-100 rounded-lg hover:bg-primary/10 transition-colors">
              <Mail size={16} className="text-admin-muted" />
            </a>
          )}
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 rounded-lg hover:bg-primary/10 transition-colors">
              <ExternalLink size={16} className="text-admin-muted" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
