export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateTime(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function isRecent(dateString, days = 7) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  return diff <= days;
}

export function truncate(str, length = 100) {
  if (!str) return '';
  return str.length > length ? str.substring(0, length) + '...' : str;
}

export const NOTICE_CATEGORIES = [
  'General', 'Important', 'Events', 'Workshops', 'Competitions',
  'Hackathons', 'Funding Opportunities', 'Internship Opportunities',
];

export const IDEA_CATEGORIES = [
  'AI/ML', 'IoT', 'Web Development', 'Mobile App', 'Robotics',
  'Sustainability', 'Healthcare', 'Education', 'Other',
];

export const QUERY_CATEGORIES = [
  'Startup', 'Innovation', 'Patent/IPR', 'Funding', 'Event', 'General',
];

export const PROJECT_CATEGORIES = [
  'Artificial Intelligence', 'Machine Learning', 'IoT', 'Robotics',
  'Web Development', 'Cybersecurity', 'Sustainability', 'Healthcare', 'Other',
];

export const DEPARTMENTS = [
  'Computer Science', 'Information Technology', 'Electronics',
  'Mechanical', 'Civil', 'Electrical', 'Biotechnology', 'Other',
];

export const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

export const IDEA_STATUSES = ['Pending', 'Under Review', 'Approved', 'Rejected'];
export const QUERY_STATUSES = ['Open', 'In Progress', 'Resolved', 'Closed'];