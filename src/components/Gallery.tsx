"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

// Placeholder data since we don't have Sanity data yet
const defaultGallery = [
  { id: 1, title: "Modern Split Unit Installation", category: "Installation", url: null },
  { id: 2, title: "Commercial Refrigeration", category: "Refrigeration", url: null },
  { id: 3, title: "Routine Maintenance", category: "Maintenance", url: null },
  { id: 4, title: "Outdoor Condenser Setup", category: "Installation", url: null },
  { id: 5, title: "Multi-Split System", category: "Commercial", url: null },
  { id: 6, title: "Diagnostic Repairs", category: "Repairs", url: null },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-sky-600 tracking-wider uppercase mb-2">Our Work</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Recent Projects & Installations</h3>
          <p className="text-lg text-slate-600">
            Take a look at some of our completed work, showcasing our commitment to neat, professional, and high-quality service.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {defaultGallery.map((item, index) => (
            <div 
              key={item.id}
              className="group relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-md bg-slate-100"
              onClick={() => openLightbox(index)}
            >
              {/* Fallback gradient background when no image is available */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-slate-200" />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-all duration-300 z-10 flex items-center justify-center">
                <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 translate-y-4 group-hover:translate-y-0">
                <p className="text-sky-300 text-xs font-semibold uppercase tracking-wider mb-1">{item.category}</p>
                <p className="text-white font-medium">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4 animate-fade-in">
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="relative w-full max-w-5xl aspect-video bg-slate-800 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
            {/* Fallback inside lightbox */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-slate-200" />
            <div className="relative z-10 text-center">
              <h4 className="text-2xl font-bold text-slate-800 mb-2">{defaultGallery[selectedImage].title}</h4>
              <p className="text-slate-600">{defaultGallery[selectedImage].category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
