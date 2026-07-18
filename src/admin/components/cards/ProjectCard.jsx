import { motion } from 'framer-motion';
import { FolderKanban, ExternalLink, Users, TrendingUp } from 'lucide-react';

export default function ProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="admin-card overflow-hidden group"
    >
      <div className="relative h-48 bg-gradient-to-br from-accent/20 to-success/20">
        {project.image_url ? (
          <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FolderKanban size={48} className="text-accent/30" />
          </div>
        )}
        <span className="absolute top-3 left-3 px-3 py-1 bg-dark/80 text-white text-xs font-medium rounded-full backdrop-blur">
          {project.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-dark group-hover:text-primary transition-colors">{project.title}</h3>
        <p className="mt-2 text-admin-muted text-sm line-clamp-2">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {project.technologies?.slice(0, 4).map((tech, i) => (
            <span key={i} className="px-2 py-0.5 bg-admin-surface-2 text-admin-muted text-xs rounded-full">{tech}</span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-admin-muted">
            <Users size={14} />
            <span>{project.team_lead || 'Team'}</span>
          </div>
          {project.progress !== undefined && (
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-success rounded-full" style={{ width: `${project.progress}%` }} />
              </div>
              <span className="text-xs text-admin-muted">{project.progress}%</span>
            </div>
          )}
        </div>
        {project.project_url && (
          <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline">
            <ExternalLink size={14} /> View Project
          </a>
        )}
      </div>
    </motion.div>
  );
}
