import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminSidebar from './components/layout/AdminSidebar';
import ProtectedRoute from './routes/ProtectedRoute';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Leadership from './pages/Leadership/Leadership';
import Events from './pages/Events/Events';
import Notices from './pages/Notices/Notices';
import Ambassadors from './pages/InnovationAmbassadors/Ambassadors';
import Research from './pages/Research/Research';
import Projects from './pages/Projects/Projects';
import Establishment from './pages/Establishment/Establishment';
import Ideas from './pages/Ideas/Ideas';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';

import Dashboard from './pages/Admin/Dashboard/Dashboard';
import AdminLeadership from './pages/Admin/Leadership/AdminLeadership';
import AdminMembers from './pages/Admin/Members/AdminMembers';
import AdminEvents from './pages/Admin/Events/AdminEvents';
import AdminNotices from './pages/Admin/Notices/AdminNotices';
import AdminAmbassadors from './pages/Admin/Ambassadors/AdminAmbassadors';
import AdminResearch from './pages/Admin/Research/AdminResearch';
import AdminProjects from './pages/Admin/Projects/AdminProjects';
import AdminCertificates from './pages/Admin/Certificates/AdminCertificates';
import AdminIdeas from './pages/Admin/Ideas/AdminIdeas';
import AdminQueries from './pages/Admin/Queries/AdminQueries';
import AdminContacts from './pages/Admin/Contacts/AdminContacts';
import AdminSettings from './pages/Admin/Settings/Settings';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/leadership" element={<PublicLayout><Leadership /></PublicLayout>} />
          <Route path="/events" element={<PublicLayout><Events /></PublicLayout>} />
          <Route path="/notices" element={<PublicLayout><Notices /></PublicLayout>} />
          <Route path="/ambassadors" element={<PublicLayout><Ambassadors /></PublicLayout>} />
          <Route path="/research" element={<PublicLayout><Research /></PublicLayout>} />
          <Route path="/projects" element={<PublicLayout><Projects /></PublicLayout>} />
          <Route path="/establishment" element={<PublicLayout><Establishment /></PublicLayout>} />
          <Route path="/ideas" element={<PublicLayout><Ideas /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<Login />} />

          {/* Admin Protected Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/leadership" element={<ProtectedRoute><AdminLayout><AdminLeadership /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/members" element={<ProtectedRoute><AdminLayout><AdminMembers /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute><AdminLayout><AdminEvents /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/notices" element={<ProtectedRoute><AdminLayout><AdminNotices /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/ambassadors" element={<ProtectedRoute><AdminLayout><AdminAmbassadors /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/research" element={<ProtectedRoute><AdminLayout><AdminResearch /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/projects" element={<ProtectedRoute><AdminLayout><AdminProjects /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/certificates" element={<ProtectedRoute><AdminLayout><AdminCertificates /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/ideas" element={<ProtectedRoute><AdminLayout><AdminIdeas /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/queries" element={<ProtectedRoute><AdminLayout><AdminQueries /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/contacts" element={<ProtectedRoute><AdminLayout><AdminContacts /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><AdminLayout><AdminSettings /></AdminLayout></ProtectedRoute>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
