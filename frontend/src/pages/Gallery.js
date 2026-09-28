import React, { useState, useEffect } from "react";
import api from "@/utils/api";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const r = await api.get("/gallery");
        setImages(r.data.images || r.data || []);
      } catch (err) {
        console.error("Could not fetch user side gallery image list", err);
      } finally {
        setLoading(false);
      }
    };
    loadGallery();
  }, []);

  if (loading) return <div className="text-center py-20 text-slate-500">Loading our collection...</div>;

  return (
    <section className="py-12 max-w-6xl mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900">Our Project Gallery</h2>
        <p className="text-slate-500 mt-2">Explore photos uploaded directly from our management team.</p>
      </div>

      {images.length === 0 ? (
        <p className="text-center text-slate-400">No images available to display right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img) => (
            <div key={img._id} className="overflow-hidden rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <img 
                src={img.url} 
                alt="Live Showcase Work" 
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Gallery;
