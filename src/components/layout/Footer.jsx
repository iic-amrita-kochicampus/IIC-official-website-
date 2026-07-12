import { Link } from 'react-router-dom';
import { Lightbulb, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Lightbulb className="text-white" size={22} />
              </div>
              <span className="font-bold text-xl">IIC Portal</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Fostering innovation and entrepreneurship within the institution through collaborative initiatives and creative problem-solving.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              {[
                { name: 'About IIC', path: '/about' },
                { name: 'Events', path: '/events' },
                { name: 'Projects', path: '/projects' },
                { name: 'Ideas & Queries', path: '/ideas' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="block text-slate-400 hover:text-white text-sm transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <div className="space-y-2">
              {['Notices', 'Research', 'Certifications', 'Innovation Ambassadors'].map((name, i) => (
                <Link key={i} to={`/${name.toLowerCase().replace(/ /g, '-')}`} className="block text-slate-400 hover:text-white text-sm transition-colors">
                  {name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-slate-400 text-sm">
                <Mail size={16} className="mt-0.5 shrink-0" />
                <span>iic@institution.edu</span>
              </div>
              <div className="flex items-start gap-3 text-slate-400 text-sm">
                <Phone size={16} className="mt-0.5 shrink-0" />
                <span>+91 123 456 7890</span>
              </div>
              <div className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>Institution Campus, City, State</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Institution's Innovation Council. All rights reserved.
          </p>
          <Link to="/admin/login" className="text-slate-500 hover:text-white text-sm transition-colors flex items-center gap-1">
            Admin Panel <ExternalLink size={14} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
