import React, { useRef, useState, useEffect } from 'react';
import Hero from './components/Hero';
import PhotoGallery from './components/PhotoGallery';
import LoveLetterGenerator from './components/LoveLetterGenerator';
import { Gift, Music, Play, Pause, X, SkipForward, SkipBack } from 'lucide-react';
import { motion } from 'framer-motion';

// Import music files
import bgm1 from './assets/music/Michael Learns To Rock - Take Me To Your Heart-《.flac';
import bgm2 from './assets/music/Samuel Kim Lorien - I Really Want to Stay at You.flac';
import bgm3 from './assets/music/单依纯 - 永不失联的爱 (Live).flac';
import bgm4 from './assets/music/小阿七 - 五十年以后.flac';
import bgm5 from './assets/music/胡夏 - 我只喜欢你-《我只喜欢你》影视剧主题曲.flac';
import bgm6 from './assets/music/钱润玉Runyu - 归期-《凡人修仙传》插曲.flac';
import bgm7 from './assets/music/银临 - 落英.flac';
import bgm8 from './assets/music/黄龄 - 等待.flac';

const PLAYLIST = [
  { title: "Take Me To Your Heart", src: bgm1 },
  { title: "I Really Want to Stay at You", src: bgm2 },
  { title: "永不失联的爱", src: bgm3 },
  { title: "五十年以后", src: bgm4 },
  { title: "我只喜欢你", src: bgm5 },
  { title: "归期", src: bgm6 },
  { title: "落英", src: bgm7 },
  { title: "等待", src: bgm8 },
];

const App: React.FC = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle track changes
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    setIsPlaying(true);
  };

  const playPrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation / Header (Simple) */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto bg-white/30 backdrop-blur-md p-2 rounded-full shadow-sm">
           <span className="font-bold text-pink-600 px-2 handwritten text-xl">Taeki</span>
        </div>
        <div className="pointer-events-auto">
          <audio 
            ref={audioRef} 
            src={PLAYLIST[currentTrackIndex].src} 
            onEnded={playNext}
          />
          
          {!isPlayerOpen ? (
            <button 
              onClick={() => setIsPlayerOpen(true)}
              className="bg-white/30 backdrop-blur-md p-3 rounded-full hover:bg-white/50 transition-colors text-pink-600 shadow-sm"
            >
               <Music size={20} />
            </button>
          ) : (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-md flex items-center gap-2 pr-3 border border-white/50"
            >
              <button 
                onClick={playPrev}
                className="p-2 text-pink-400 hover:text-pink-600 transition-colors"
              >
                <SkipBack size={16} fill="currentColor" />
              </button>

              <button 
                onClick={togglePlay}
                className="w-9 h-9 flex items-center justify-center bg-pink-100 rounded-full text-pink-600 hover:bg-pink-200 transition-colors shadow-sm"
              >
                {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} className="ml-0.5" fill="currentColor" />}
              </button>

              <button 
                onClick={playNext}
                className="p-2 text-pink-400 hover:text-pink-600 transition-colors"
              >
                <SkipForward size={16} fill="currentColor" />
              </button>
              
              <div className="flex flex-col w-24 px-2 overflow-hidden">
                <div className="w-full overflow-hidden relative h-4">
                  <motion.div
                    className="flex whitespace-nowrap absolute"
                    animate={{ x: "-50%" }}
                    transition={{ 
                      repeat: Infinity, 
                      ease: "linear", 
                      duration: 8
                    }}
                    style={{ width: "max-content" }}
                  >
                    <span className="text-xs font-bold text-gray-700 leading-tight mr-6">
                      {PLAYLIST[currentTrackIndex].title}
                    </span>
                    <span className="text-xs font-bold text-gray-700 leading-tight mr-6">
                      {PLAYLIST[currentTrackIndex].title}
                    </span>
                  </motion.div>
                </div>
                <span className="text-[10px] text-gray-500 leading-tight">
                  {isPlaying ? 'Playing...' : 'Paused'}
                </span>
              </div>

              <button 
                onClick={() => setIsPlayerOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 border-l border-gray-200 pl-2"
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
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
                I have a real gift waiting for you!
              </p>
              <p className="text-sm text-gray-500">
                Made by POLARIS 💗 
              </p>
              <p className="text-sm text-gray-500">
                Only for Taeki 😚
              </p>
            </motion.div>
        </section>
      </main>
    </div>
  );
};

export default App;