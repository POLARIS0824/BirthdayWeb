import React from 'react';
import { motion } from 'framer-motion';
import { Photo } from '../types';

const PHOTOS: Photo[] = [
  { id: 1, url: 'https://picsum.photos/400/500?random=1', caption: "Our first date", rotation: -2 },
  { id: 2, url: 'https://picsum.photos/400/400?random=2', caption: "That trip to the beach", rotation: 3 },
  { id: 3, url: 'https://picsum.photos/400/600?random=3', caption: "Your beautiful smile", rotation: -1 },
  { id: 4, url: 'https://picsum.photos/400/400?random=4', caption: "Adventures together", rotation: 4 },
  { id: 5, url: 'https://picsum.photos/400/500?random=5', caption: "My favorite person", rotation: -3 },
  { id: 6, url: 'https://picsum.photos/400/300?random=6', caption: "Forever & Always", rotation: 2 },
];

const PhotoGallery: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 handwritten">Our Memories</h2>
          <div className="w-24 h-1 bg-pink-300 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
              whileInView={{ opacity: 1, scale: 1, rotate: photo.rotation }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ 
                scale: 1.05, 
                rotate: 0, 
                zIndex: 10,
                transition: { duration: 0.3 } 
              }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              className="relative group bg-white p-3 shadow-lg rounded-sm border border-gray-100 cursor-pointer"
            >
              <div className="overflow-hidden aspect-auto rounded-sm relative">
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent z-20 pointer-events-none"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />
                
                <img 
                  src={photo.url} 
                  alt={photo.caption} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <span className="text-white font-medium tracking-wide handwritten text-2xl drop-shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {photo.caption}
                  </span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-500 font-handwriting text-sm italic">Memory #{index + 1}</p>
              </div>
              {/* Tape effect */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-pink-100/80 rotate-1 shadow-sm pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;