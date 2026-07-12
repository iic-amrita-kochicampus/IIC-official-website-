import { motion } from 'framer-motion';
import { Calendar, Tag, Pin, ExternalLink, FileText } from 'lucide-react';
import { formatDate, isRecent } from '../../utils/helpers';

export default function NoticeCard({ notice }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-white rounded-2xl shadow-lg p-5 relative ${notice.is_pinned ? 'ring-2 ring-primary' : ''}`}
    >
      {notice.is_pinned && (
        <div className="absolute top-3 right-3">
          <Pin size={16} className="text-primary" />
        </div>
      )}
      {isRecent(notice.published_date) && (
        <span className="inline-block px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full mb-2">NEW</span>
      )}
      <h3 className="font-bold text-lg text-dark">{notice.title}</h3>
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
          <Tag size={12} /> {notice.category}
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
          <Calendar size={12} /> {formatDate(notice.published_date)}
        </span>
        {notice.deadline && (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-full">
            Deadline: {formatDate(notice.deadline)}
          </span>
        )}
      </div>
      <p className="mt-3 text-slate-600 text-sm line-clamp-3">{notice.description}</p>
      <div className="flex gap-2 mt-4">
        {notice.attachment_url && (
          <a href={notice.attachment_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-lg hover:bg-accent/20 transition-colors">
            <FileText size={14} /> Attachment
          </a>
        )}
        {notice.external_link && (
          <a href={notice.external_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-lg hover:bg-primary/20 transition-colors">
            <ExternalLink size={14} /> Link
          </a>
        )}
      </div>
    </motion.div>
  );
}
