import { Outlet, useLocation } from 'react-router-dom';
import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import AdminSidebar from '../../components/layout/AdminSidebar';
import AdminTopbar from '../../components/layout/AdminTopbar';
import { useAdminTheme } from '../hooks/useAdminTheme';

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { isDark, toggle } = useAdminTheme();
  const location = useLocation();
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    if (!mainRef.current) return;
    gsap.fromTo(
      mainRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
    );
  }, [location.pathname]);

  return (
    <div className={`admin-root flex min-h-screen ${isDark ? 'dark' : ''}`}>
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar isDark={isDark} onToggleTheme={toggle} />
        <main ref={mainRef} className="flex-1 p-6 md:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
