import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Upload, Trash2, GripVertical, Image as ImageIcon, Download, X } from 'lucide-react';
import { useSupabase, useSupabaseInsert, useSupabaseUpdate, useSupabaseDelete } from '../../../hooks/useSupabase';
import { TABLES, BUCKETS } from '../../../services/supabase';
import { uploadFile, deleteFile, getFileUrl } from '../../../utils/supabaseStorage';
import { supabase } from '../../../services/supabase';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import Loader from '../../../components/common/Loader';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useDragAndDrop } from '../../../hooks/useDragAndDrop';

export default function AdminEventGallery() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const eventTitle = location.state?.eventTitle || 'Event';
  
  const { data: events } = useSupabase(TABLES.EVENTS);
  const _event = events?.find(e => e.id === eventId);
  
  // Gallery images from database
  const { data: galleryImages, loading: imagesLoading, refetch: refetchImages } = useSupabase(
    TABLES.EVENT_GALLERY, 
    { 
      filters: { event_id: eventId }, 
      orderBy: 'created_at', 
      ascending: false 
    }
  );
  
  // CRUD hooks
  const { insert: insertImage } = useSupabaseInsert(TABLES.EVENT_GALLERY);
  const { update: updateImage } = useSupabaseUpdate(TABLES.EVENT_GALLERY);
  const { remove: deleteImage } = useSupabaseDelete(TABLES.EVENT_GALLERY);
  
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { register: _register, handleSubmit, reset, setValue: _setValue } = useForm();

  // Drag and drop reorder handler (defined before useDragAndDrop)
  const handleReorder = async (newOrder) => {
    try {
      const updates = newOrder.map((item, index) => 
        updateImage(item.id, { display_order: index })
      );
      await Promise.all(updates);
      refetchImages();
      toast.success('Order updated!');
    } catch (error) {
      console.error('Reorder error:', error);
      toast.error('Failed to update order');
    }
  };

  // Drag and drop reordering
  const { dragProps, dragOverProps, isDragging } = useDragAndDrop({
    items: galleryImages || [],
    onReorder: handleReorder
  });

  const handleUploadImages = async (_data) => {
    if (uploadingFiles.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    setIsUploading(true);

    try {
      const { data: event } = await supabase
        .from('events')
        .select('title')
        .eq('id', eventId)
        .single();
      
      const eventSlug = event?.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'event';

      const newImagesData = [];

      for (let i = 0; i < uploadingFiles.length; i++) {
        const fileData = uploadingFiles[i];
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(7);
        const fileExt = fileData.file.name.split('.').pop().toLowerCase();
        const filename = `${eventSlug}-${String(i + 1).padStart(2, '0')}-${timestamp}-${randomStr}.${fileExt}`;
        const storagePath = `event-gallery/event-${eventId}/${filename}`;

        const url = await uploadFile(
          BUCKETS.EVENT_GALLERY,
          fileData.file,
          '',
          filename
        );

        if (url) {
          newImagesData.push({
            event_id: eventId,
            title: filename,
            image_url: url,
          });
        }
      }

      if (newImagesData.length > 0) {
        const { error } = await insertImage(newImagesData);
        if (error) throw error;
        
        toast.success(`${newImagesData.length} image(s) uploaded successfully!`);
        setUploadingFiles([]);
        setUploadModalOpen(false);
        reset();
        refetchImages();
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload images');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (imageId, storagePath) => {
    if (!confirm('Delete this image?')) return;

    try {
      // Delete from storage
      await deleteFile(BUCKETS.EVENT_GALLERY, storagePath);
      
      // Delete from database
      const { error } = await deleteImage(imageId);
      if (error) throw error;
      
      toast.success('Image deleted successfully!');
      refetchImages();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete image');
    }
  };

  const addFileToUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      if (/^image\//i.test(file.type)) {
        setUploadingFiles(prev => [...prev, {
          file,
          preview: URL.createObjectURL(file)
        }]);
      }
    });
  };

  const removeFileFromUpload = (index) => {
    setUploadingFiles(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const updateUploadFile = (index, field, value) => {
    setUploadingFiles(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const getImageUrl = (storagePath, imageUrl) => {
    if (storagePath) return getFileUrl(BUCKETS.EVENT_GALLERY, storagePath);
    if (imageUrl) return imageUrl;
    return null;
  };

  const handleDownload = async (storagePath, filename) => {
    try {
      const url = getFileUrl(BUCKETS.EVENT_GALLERY, storagePath);
      if (url) {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/events')}
            className="p-2 hover:bg-admin-surface-2 rounded-lg transition-colors"
            title="Back to Events"
          >
            <ArrowLeft size={20} className="text-admin-muted" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-dark">Event Gallery</h1>
            <p className="text-sm text-admin-muted mt-1">{eventTitle}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            icon={Download} 
            onClick={() => setUploadModalOpen(true)}
            className="hidden sm:inline-flex"
          >
            Upload
          </Button>
          <Button 
            icon={Upload} 
            onClick={() => setUploadModalOpen(true)}
            className="sm:hidden"
          >
            Upload Images
          </Button>
        </div>
</div>

      {/* Gallery Display */}
      {imagesLoading ? (
        <Loader />
      ) : (!galleryImages || galleryImages.length === 0) ? (
        <div className="admin-card text-center py-12">
          <ImageIcon size={48} className="mx-auto mb-4 text-admin-muted" />
          <p className="text-admin-muted mb-4">No images in gallery yet</p>
          <Button icon={Upload} onClick={() => setUploadModalOpen(true)}>
            Upload First Image
          </Button>
        </div>
      ) : (
        <div className="admin-card">
          {/* Reorder hint */}
          {isDragging && (
            <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-lg text-center text-sm text-primary">
              Drag images to reorder - changes save automatically
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-admin-surface-2">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-admin-muted w-12">Order</th>
                  <th className="px-6 py-4 text-sm font-semibold text-admin-muted w-20">Preview</th>
                  <th className="px-6 py-4 text-sm font-semibold text-admin-muted w-32">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border">
                {galleryImages.map((image, idx) => (
                  <tr 
                    key={image.id} 
                    className={`hover:bg-admin-surface-2 ${isDragging ? 'opacity-50' : ''}`}
                    {...dragProps(image.id)}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-dark flex items-center gap-2">
                      <span className="text-admin-muted cursor-grab" {...dragOverProps(image.id)}>
                        <GripVertical size={16} />
                      </span>
                      {idx + 1}
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={getImageUrl(image.storage_path, image.image_url)}
                        alt={image.title}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          e.target.src = 
                            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Crect fill="%23ddd" width="64" height="64"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="12"%3ENo Image%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 flex gap-1">
                      <button
                        onClick={() => handleDownload(image.storage_path, image.filename)}
                        className="p-2 hover:bg-admin-surface-2 rounded-lg text-admin-muted"
                        title="Download"
                      >
                        <Download size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteImage(image.id, image.storage_path)}
                        className="p-2 hover:bg-red-50 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-admin-border mt-4 pt-4 flex items-center justify-between">
            <p className="text-sm text-admin-muted">
              Total Images: <span className="font-semibold text-dark">{galleryImages.length}</span>
            </p>
            <Button icon={Upload} onClick={() => setUploadModalOpen(true)} size="sm">
              Add More
            </Button>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => {
          setUploadModalOpen(false);
          setUploadingFiles([]);
          reset();
        }}
        title="Upload Gallery Images"
        size="lg"
      >
        <div className="space-y-4">
          {/* File Input */}
          {uploadingFiles.length === 0 && (
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={addFileToUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Upload size={32} className="mx-auto mb-2 text-admin-muted" />
              <p className="text-sm font-medium text-dark">Click to select images</p>
              <p className="text-xs text-admin-muted">JPG, PNG, WebP up to 10MB each</p>
            </div>
          )}

          {/* Files to Upload */}
          {uploadingFiles.length > 0 && (
            <>
              <div className="flex justify-end mb-2">
                <input
                  id="add-more-images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={addFileToUpload}
                  className="sr-only"
                />
                <Button variant="outline" size="sm" icon={Upload} onClick={() => document.getElementById('add-more-images')?.click()}>
                  Add More Images
                </Button>
              </div>
<div className="space-y-3 h-[400px] overflow-y-auto border-t border-admin-border pt-4">
                {uploadingFiles.map((fileData, idx) => (
                  <div key={idx} className="bg-admin-surface-2 rounded-lg p-4 space-y-3">
                    <div className="flex gap-3">
                      <img
                        src={fileData.preview}
                        alt="preview"
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 text-sm">
                        <p className="font-medium text-dark truncate">{fileData.file.name}</p>
                        <p className="text-xs text-admin-muted">
                          {(fileData.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFileFromUpload(idx)}
                        className="p-2 hover:bg-red-50 rounded-lg"
                      >
                        <X size={16} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-admin-border">
            <Button
              type="button"
              onClick={() => {
                setUploadModalOpen(false);
                setUploadingFiles([]);
                reset();
              }}
              variant="secondary"
              className="flex-1"
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(handleUploadImages)}
              className="flex-1"
              disabled={uploadingFiles.length === 0 || isUploading}
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Uploading...
                </>
              ) : (
                `Upload ${uploadingFiles.length} ${uploadingFiles.length === 1 ? 'Image' : 'Images'}`
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}