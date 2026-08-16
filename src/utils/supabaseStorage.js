import { supabase } from '../services/supabase';
import { isMissingBucketError } from './storageErrors';

const BUCKET_CONFIG = {
  'leadership-images': { allowedTypes: ['image/jpeg', 'image/png', 'image/webp'] },
  'member-images': { allowedTypes: ['image/jpeg', 'image/png', 'image/webp'] },
  'event-posters': { allowedTypes: ['image/jpeg', 'image/png', 'image/webp'] },
  'event-gallery': { allowedTypes: ['image/jpeg', 'image/png', 'image/webp'] },
  'ambassador-images': { allowedTypes: ['image/jpeg', 'image/png', 'image/webp'] },
  'project-images': { allowedTypes: ['image/jpeg', 'image/png', 'image/webp'] },
  'research-files': { allowedTypes: ['application/pdf', 'image/jpeg', 'image/png'] },
  'certificates': { allowedTypes: ['application/pdf', 'image/jpeg', 'image/png'] },
  'idea-attachments': { allowedTypes: ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'] },
  'query-attachments': { allowedTypes: ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'] },
  'notice-attachments': { allowedTypes: ['application/pdf', 'image/jpeg', 'image/png'] },
  'website-assets': { allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'application/pdf'] },
};

export async function uploadFile(bucket, file, folder = '', customFileName = null, baseName = null) {
  const config = BUCKET_CONFIG[bucket] || { allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'] };

  if (!config.allowedTypes.includes(file.type)) {
    throw new Error(`File type ${file.type} not allowed for ${bucket}. Allowed: ${config.allowedTypes.join(', ')}`);
  }

  let fileName;
  const fileExt = file.name.split('.').pop().toLowerCase();
  
  if (customFileName) {
    fileName = customFileName;
  } else if (baseName) {
    const safeBaseName = baseName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    fileName = `${safeBaseName}.${fileExt}`;
    
    // Check for duplicates and add suffix
    const { data: existingFiles } = await supabase.storage.from(bucket).list(folder, { limit: 1000 });
    if (existingFiles) {
      let counter = 1;
      let testName = fileName;
      while (existingFiles.some(f => f.name === `${folder}/${testName}` || f.name === testName)) {
        counter++;
        testName = `${safeBaseName}-${counter}.${fileExt}`;
      }
      fileName = testName;
    }
  } else {
    fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  }

  const fullPath = folder ? `${folder}/${fileName}` : fileName;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fullPath, file, { upsert: true });

  if (error) {
    if (isMissingBucketError(error)) {
      console.warn(`Supabase storage bucket not found: ${bucket}`);
      return null;
    }
    throw error;
  }

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
  return urlData.publicUrl;
}

export async function deleteFile(bucket, filePath) {
  const { error } = await supabase.storage.from(bucket).remove([filePath]);
  if (error) throw error;
}

export function getFileUrl(bucket, path) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data?.publicUrl;
}

export async function listFiles(bucket, folder = '') {
  const { data, error } = await supabase.storage.from(bucket).list(folder, {
    limit: 1000,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' }
  });
  if (error) throw error;
  return data || [];
}

export async function downloadFile(bucket, filePath) {
  const { data, error } = await supabase.storage.from(bucket).download(filePath);
  if (error) {
    if (isMissingBucketError(error)) {
      return null;
    }
    throw error;
  }
  return data ? URL.createObjectURL(data) : null;
}
