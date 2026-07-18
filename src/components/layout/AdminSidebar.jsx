import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import {
  LayoutDashboard, Users, Calendar, Bell, Award, FlaskConical,
  FolderKanban, FileCheck, Lightbulb, MessageSquare, Mail, Settings,
  LogOut, ChevronsLeft,
} from 'lucide-react';

const sidebarLinks = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Leadership', path: '/admin/leadership', icon: Users },
  { name: 'Members', path: '/admin/members', icon: Users },
  { name: 'Events', path: '/admin/events', icon: Calendar },
  { name: 'Notices', path: '/admin/notices', icon: Bell },
  { name: 'Ambassadors', path: '/admin/ambassadors', icon: Award },
  { name: 'Research', path: '/admin/research', icon: FlaskConical },
  { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
  { name: 'Certificates', path: '/admin/certificates', icon: FileCheck },
  { name: 'Ideas', path: '/admin/ideas', icon: Lightbulb },
  { name: 'Queries', path: '/admin/queries', icon: MessageSquare },
  { name: 'Contacts', path: '/admin/contacts', icon: Mail },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export default function AdminSidebar({ collapsed, setCollapsed }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const items = navRef.current?.querySelectorAll('[data-nav-item]');
    if (!items?.length) return;
    gsap.fromTo(
      items,
      { opacity: 0, x: -12 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.035, ease: 'power2.out', onComplete: () => setReady(true) }
    );
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <aside
      className={`bg-admin-surface border-r border-admin-border h-screen sticky top-0 flex flex-col transition-[width] duration-300 ease-out ${
        collapsed ? 'w-[76px]' : 'w-64'
      }`}
    >
      <div className="h-16 px-4 flex items-center justify-between border-b border-admin-border shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 shrink-0 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Lightbulb size={18} className="text-white" />
            </div>
            <span className="font-semibold text-sm text-dark whitespace-nowrap">IIC Admin</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="p-2 hover:bg-admin-surface-2 rounded-lg transition-colors text-admin-muted mx-auto"
          aria-label="Toggle sidebar"
        >
          <ChevronsLeft size={17} className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <nav
        ref={navRef}
        className="flex-1 overflow-y-auto admin-scrollbar py-4 px-3 space-y-0.5"
        style={{ opacity: ready ? 1 : undefined }}
      >
        {sidebarLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            data-nav-item
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors group ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-admin-muted hover:bg-admin-surface-2 hover:text-dark'
              } ${collapsed ? 'justify-center' : ''}`
            }
            title={collapsed ? link.name : undefined}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-primary" />
                )}
                <link.icon size={18} className="shrink-0" />
                {!collapsed && <span className="truncate">{link.name}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-admin-border">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
