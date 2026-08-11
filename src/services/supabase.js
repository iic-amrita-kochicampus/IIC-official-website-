import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Check your .env file.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const TABLES = {
  LEADERSHIP: 'leadership',
  MEMBERS: 'members',
  EVENTS: 'events',
  NOTICES: 'notices',
  AMBASSADORS: 'ambassadors',
  RESEARCH: 'research',
  PROJECTS: 'projects',
  CERTIFICATES: 'certificates',
  IDEAS: 'ideas',
  QUERIES: 'queries',
  CONTACTS: 'contacts',
  SETTINGS: 'settings',
};

export const BUCKETS = {
  LEADERSHIP_IMAGES: import.meta.env.VITE_LEADERSHIP_IMAGES_BUCKET || 'leadership-images',
  MEMBER_IMAGES: import.meta.env.VITE_MEMBER_IMAGES_BUCKET || 'member-images',
  EVENT_POSTERS: import.meta.env.VITE_EVENT_POSTERS_BUCKET || 'event-posters',
  EVENT_GALLERY: import.meta.env.VITE_EVENT_GALLERY_BUCKET || 'event-gallery',
  AMBASSADOR_IMAGES: import.meta.env.VITE_AMBASSADOR_IMAGES_BUCKET || 'ambassador-images',
  PROJECT_IMAGES: import.meta.env.VITE_PROJECT_IMAGES_BUCKET || 'project-images',
  RESEARCH_FILES: import.meta.env.VITE_RESEARCH_FILES_BUCKET || 'research-files',
  CERTIFICATES: import.meta.env.VITE_CERTIFICATES_BUCKET || 'certificates',
  IDEA_ATTACHMENTS: import.meta.env.VITE_IDEA_ATTACHMENTS_BUCKET || 'idea-attachments',
  QUERY_ATTACHMENTS: import.meta.env.VITE_QUERY_ATTACHMENTS_BUCKET || 'query-attachments',
  NOTICE_ATTACHMENTS: import.meta.env.VITE_NOTICE_ATTACHMENTS_BUCKET || 'notice-attachments',
  WEBSITE_ASSETS: import.meta.env.VITE_WEBSITE_ASSETS_BUCKET || 'website-assets',
};
