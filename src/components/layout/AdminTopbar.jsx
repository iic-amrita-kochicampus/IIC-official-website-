import { Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminTopbar({ isDark, onToggleTheme }) {
  const { user } = useAuth();
  const initials = (user?.email || 'A').slice(0, 2).toUpperCase();

  return (
    <header className="h-16 shrink-0 border-b border-admin-border bg-admin-surface/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6">
      <div>
        <p className="text-xs font-mono uppercase tracking-wide text-admin-muted">IIC Portal</p>
        <p className="text-sm font-medium text-dark">Administration</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          className="w-9 h-9 rounded-full border border-admin-border flex items-center justify-center text-admin-muted hover:text-primary hover:border-primary/40 transition-colors"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-semibold">
          {initials}
        </div>
      </div>
    </header>
  );
}
