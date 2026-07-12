import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;

if (!supabaseUrl || supabaseUrl === 'your_supabase_url_here' || !supabaseAnonKey || supabaseAnonKey === 'your_supabase_anon_key_here') {
  console.warn('⚠ Supabase not configured. Edit .env with your real Supabase URL and anon key.');
  supabase = createClient('https://placeholder.supabase.co', 'placeholder-key');
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

export const TABLES = {
  LEADERSHIP: 'leadership',
  MEMBERS: 'members',
  EVENTS: 'events',
  NOTICES: 'notices',
  AMBASSADORS: 'ambassadors',
  RESEARCH: 'research',
  PROJECTS: 'projects',
  CERTIFICATES: 'certificates',
  GALLERY: 'gallery',
  IDEAS: 'ideas',
  QUERIES: 'queries',
  CONTACTS: 'contacts',
  SETTINGS: 'settings',
};

export const BUCKETS = {
  LEADERSHIP_IMAGES: 'leadership-images',
  MEMBER_IMAGES: 'member-images',
  EVENT_POSTERS: 'event-posters',
  EVENT_GALLERY: 'event-gallery',
  AMBASSADOR_IMAGES: 'ambassador-images',
  PROJECT_IMAGES: 'project-images',
  RESEARCH_FILES: 'research-files',
  CERTIFICATES: 'certificates',
  IDEA_ATTACHMENTS: 'idea-attachments',
  QUERY_ATTACHMENTS: 'query-attachments',
  WEBSITE_ASSETS: 'website-assets',
};