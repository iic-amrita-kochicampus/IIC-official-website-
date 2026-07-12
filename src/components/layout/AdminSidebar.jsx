import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, Users, Calendar, Bell, Award, FlaskConical,
  FolderKanban, FileCheck, Lightbulb, MessageSquare, Mail, Settings,
  LogOut, ChevronLeft,
} from 'lucide-react';
import { useState } from 'react';

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

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <aside className={`bg-dark text-white h-screen sticky top-0 flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-slate-700">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Lightbulb size={20} />
            </div>
            <span className="font-bold text-sm">Admin Panel</span>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
          <ChevronLeft size={18} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Links */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {sidebarLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-primary text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              } ${collapsed ? 'justify-center' : ''}`
            }
            title={collapsed ? link.name : undefined}
          >
            <link.icon size={18} />
            {!collapsed && <span>{link.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
