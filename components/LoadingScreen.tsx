import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9999] bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 flex flex-col items-center justify-center"
      >
        {/* Animated Hearts */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300/40"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 50,
                scale: Math.random() * 0.5 + 0.5,
                rotate: Math.random() * 360,
              }}
              animate={{
                y: -100,
                rotate: Math.random() * 360 + 360,
              }}
              transition={{
                duration: Math.random() * 3 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
            >
              <Heart size={40} fill="currentColor" />
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center">
          {/* Animated Logo/Icon */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mb-8"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-pink-400 blur-2xl opacity-50"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <Heart size={80} className="text-pink-500 relative z-10" fill="currentColor" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 mb-4 handwritten"
          >
            Taeki
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 text-lg mb-8"
          >
            Preparing your special surprise...
          </motion.p>

          {/* Progress Bar */}
          <div className="w-64 h-2 bg-white/50 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-500 text-sm mt-4"
          >
            {Math.round(Math.min(progress, 100))}%
          </motion.p>
        </div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-10 text-pink-400/60 text-sm"
        >
          Made with love by POLARIS 💗
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
