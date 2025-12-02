import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Photo } from '../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

import img1 from '../assets/images/img1.jpg'
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';
import img4 from '../assets/images/img4.jpg';
import img5 from '../assets/images/img5.jpg';
import img6 from '../assets/images/img6.jpg';
import img7 from '../assets/images/img7.jpg';
import img8 from '../assets/images/img8.jpg';
import img9 from '../assets/images/img9.jpg';
import img10 from '../assets/images/img10.jpg';
import img11 from '../assets/images/img11.jpg';
import img12 from '../assets/images/img12.jpg';
import img13 from '../assets/images/img13.jpg';
import img14 from '../assets/images/img14.jpg';
import img15 from '../assets/images/img15.jpg';
import img16 from '../assets/images/img16.jpg';
import img17 from '../assets/images/img17.jpg';
import img18 from '../assets/images/img0.jpg';

const PHOTOS: Photo[] = [
  
  { id: 5, url: img5, caption: "漫游华农", rotation: -3 },
  { id: 8, url: img8, caption: "你看风景 我看你", rotation: 5 },
  { id: 9, url: img9, caption: "乡村一日游", rotation: -1 },

  { id: 2, url: img2, caption: "机场的月色", rotation: 3 },
  { id: 3, url: img3, caption: "故事的开始", rotation: -2 },
  { id: 4, url: img4, caption: "Staycation 共度周末", rotation: 4 },
  
  { id: 6, url: img6, caption: "闪击 CCNU", rotation: 2 },
  { id: 7, url: img7, caption: "你给我的百香果\n 好香好甜", rotation: -4 },
  { id: 10, url: img10, caption: "和你在一起\n\n 泡面也津津有味", rotation: 3 },

  { id: 12, url: img12, caption: "共度生日", rotation: 4 },
  { id: 15, url: img15, caption: "“没头脑与不高兴”", rotation: -4 },
  { id: 18, url: img18, caption: "悄咪咪偷拍~", rotation: 3 },

  { id: 11, url: img11, caption: "Yummy!", rotation: -2 },
  { id: 17, url: img17, caption: "彩蛋（bushi）", rotation: -1 },
  { id: 1, url: img1, caption: "梦幻又迷离的云彩", rotation: -5 },
  
  { id: 13, url: img13, caption: "“双向奔赴”", rotation: -3 },
  { id: 14, url: img14, caption: "超级惊喜！", rotation: 2 },
  { id: 16, url: img16, caption: "又飒又可爱😚", rotation: 5 },
];

const PhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState<{[key: number]: boolean}>({});

  const handlePrevious = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto - 1 + PHOTOS.length) % PHOTOS.length);
    }
  };

  const handleNext = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto + 1) % PHOTOS.length);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') setSelectedPhoto(null);
  };

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
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
              onClick={() => setSelectedPhoto(index)}
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
                  loading="lazy"
                  onLoad={() => setImageLoaded(prev => ({ ...prev, [photo.id]: true }))}
                  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                    imageLoaded[photo.id] ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {!imageLoaded[photo.id] && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-sm" />
                )}
                
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

      {/* Fullscreen Photo Viewer */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-white/80 hover:text-white z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={32} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
              className="absolute left-4 text-white/80 hover:text-white z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronLeft size={40} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 text-white/80 hover:text-white z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronRight size={40} />
            </button>

            <div className="max-w-6xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
              <motion.div
                key={selectedPhoto}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative"
              >
                <img
                  src={PHOTOS[selectedPhoto].url}
                  alt={PHOTOS[selectedPhoto].caption}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mt-6"
                >
                  <p className="text-white text-2xl handwritten">{PHOTOS[selectedPhoto].caption}</p>
                  <p className="text-white/60 text-sm mt-2">
                    {selectedPhoto + 1} / {PHOTOS.length}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;