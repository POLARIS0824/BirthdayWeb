import React, { useRef } from 'react';
import Hero from './components/Hero';
import PhotoGallery from './components/PhotoGallery';
import LoveLetterGenerator from './components/LoveLetterGenerator';
import { Gift, Music } from 'lucide-react';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation / Header (Simple) */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto bg-white/30 backdrop-blur-md p-2 rounded-full shadow-sm">
           <span className="font-bold text-pink-600 px-2 handwritten text-xl">Lumina</span>
        </div>
        <div className="pointer-events-auto">
          {/* Placeholder for music toggle if added later */}
          <button className="bg-white/30 backdrop-blur-md p-3 rounded-full hover:bg-white/50 transition-colors text-pink-600">
             <Music size={20} />
          </button>
        </div>
      </nav>

      <main>
        <Hero onScrollDown={scrollToGallery} />
        
        <div ref={galleryRef}>
          <PhotoGallery />
        </div>

        <LoveLetterGenerator />

        {/* Footer / Surprise Section */}
        <section className="py-24 bg-gray-900 text-white relative overflow-hidden text-center">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10 container mx-auto px-4"
            >
              <Gift className="w-16 h-16 mx-auto mb-6 text-pink-400" />
              <h2 className="text-3xl md:text-5xl font-bold mb-6 handwritten">One Last Surprise...</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                I have a real gift waiting for you. Look under your pillow!
                (Or wherever you hid it 😉)
              </p>
              <p className="text-sm text-gray-500">
                Made with ❤️ & React
              </p>
            </motion.div>
        </section>
      </main>
    </div>
  );
};

export default App;