import { useSupabase } from '../../hooks/useSupabase';
import { TABLES } from '../../services/supabase';

export default function EventGallery({ eventId }) {
  const { data: images, loading } = useSupabase(
    TABLES.EVENT_GALLERY,
    { 
      filters: { event_id: eventId }, 
      orderBy: 'created_at', 
      ascending: false 
    }
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-fog font-mono text-sm">
        Loading gallery...
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12 text-fog">
        <p className="font-mono text-sm mb-4">No gallery images yet</p>
        <p className="text-xs opacity-50">Images will appear here after the event</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((img, idx) => (
        <div key={img.id} className="group relative aspect-square overflow-hidden rounded-2xl">
          <img
            src={img.image_url}
            alt={img.title || `Event gallery ${idx + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            {img.title && (
              <p className="text-sm font-medium text-white truncate">{img.title}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}