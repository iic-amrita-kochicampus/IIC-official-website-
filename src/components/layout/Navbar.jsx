import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Lightbulb, ChevronDown } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Leadership', path: '/leadership' },
  { name: 'Events', path: '/events' },
  { name: 'Notices', path: '/notices' },
  { name: 'Ambassadors', path: '/ambassadors' },
  { name: 'Research', path: '/research' },
  { name: 'Projects', path: '/projects' },
  { name: 'Certifications', path: '/establishment' },
  { name: 'Ideas & Queries', path: '/ideas' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Lightbulb className="text-white" size={22} />
            </div>
            <div>
              <span className="font-bold text-dark text-lg leading-tight block">IIC Portal</span>
              <span className="text-xs text-slate-500">Innovation Council</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-600 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Link
            to="/admin/login"
            className="hidden lg:inline-flex px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Admin
          </Link>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-200 shadow-lg"
          >
            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/admin/login"
                className="block px-4 py-3 bg-primary text-white rounded-lg font-semibold text-center mt-4"
              >
                Admin Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
