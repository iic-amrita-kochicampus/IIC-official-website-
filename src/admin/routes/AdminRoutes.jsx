import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../../routes/ProtectedRoute';
import AdminLayout from '../layouts/AdminLayout';

import Login from '../Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import AdminLeadership from '../pages/Leadership/AdminLeadership';
import AdminMembers from '../pages/Members/AdminMembers';
import AdminEvents from '../pages/Events/AdminEvents';
import AdminNotices from '../pages/Notices/AdminNotices';
import AdminAmbassadors from '../pages/Ambassadors/AdminAmbassadors';
import AdminResearch from '../pages/Research/AdminResearch';
import AdminProjects from '../pages/Projects/AdminProjects';
import AdminCertificates from '../pages/Certificates/AdminCertificates';
import AdminIdeas from '../pages/Ideas/AdminIdeas';
import AdminQueries from '../pages/Queries/AdminQueries';
import AdminContacts from '../pages/Contacts/AdminContacts';
import Settings from '../pages/Settings/Settings';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="leadership" element={<AdminLeadership />} />
        <Route path="members" element={<AdminMembers />} />
        <Route path="events" element={<AdminEvents />} />
        <Route path="notices" element={<AdminNotices />} />
        <Route path="ambassadors" element={<AdminAmbassadors />} />
        <Route path="research" element={<AdminResearch />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="certificates" element={<AdminCertificates />} />
        <Route path="ideas" element={<AdminIdeas />} />
        <Route path="queries" element={<AdminQueries />} />
        <Route path="contacts" element={<AdminContacts />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}
