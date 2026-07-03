import React, { useState, useEffect } from "react";
import { Upload, Trash2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "./AdminDashboardPage";
import api, { formatApiError } from "@/utils/api";

const AdminGalleryPage = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const r = await api.get("/gallery"); // Adjust route name according to your backend config
      setImages(r.data.images || r.data || []);
    } catch (err) {
      toast.error("Failed to load gallery images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchImages(); }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Use FormData to correctly transmit image binary streams over HTTP
    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      await api.post("/admin/gallery/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Image uploaded to gallery successfully!");
      fetchImages(); // Refresh lists
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      await api.delete(`/admin/gallery/${id}`);
      toast.success("Image removed from gallery");
      fetchImages();
    } catch (err) {
      toast.error(formatApiError(err));
    }
  };

  return (
    <AdminLayout title="Gallery Management">
      <div className="space-y-6">
        {/* Upload Container Area */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center border-dashed border-2 border-slate-200">
          <label className="cursor-pointer flex flex-col items-center gap-2 text-center p-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
              <Upload className="w-6 h-6" />
            </div>
            <span className="font-body text-sm font-semibold text-slate-700">
              {uploading ? "Uploading Image..." : "Click to Upload a Photo"}
            </span>
            <span className="text-xs text-slate-400">Supports PNG, JPG, or JPEG formats</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="hidden" />
          </label>
        </div>

        {/* Existing Grid Gallery Display */}
        <div>
          <h3 className="font-heading font-bold text-slate-800 mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-blue-500" /> Current Live Gallery ({images.length} items)
          </h3>

          {loading ? (
            <p className="text-sm text-slate-400">Loading live photos...</p>
          ) : images.length === 0 ? (
            <p className="text-sm text-slate-400">No photos in the gallery yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((img) => (
                <div key={img._id} className="relative group rounded-xl overflow-hidden border border-gray-100 bg-slate-50 aspect-square">
                  <img src={img.url} alt="Gallery item" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={() => handleDelete(img._id)} className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminGalleryPage;
