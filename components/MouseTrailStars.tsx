import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
}

const MouseTrailStars: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [isEnabled, setIsEnabled] = useState(true);
  const lastMouseTime = useRef(0);
  const starIdCounter = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isEnabled) return;

      const now = Date.now();
      // Throttle star creation to every 50ms
      if (now - lastMouseTime.current < 50) return;
      lastMouseTime.current = now;

      const newStar: Star = {
        id: starIdCounter.current++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 12 + 8,
        rotation: Math.random() * 360
      };

      setStars(prev => [...prev.slice(-20), newStar]); // Keep only last 20 stars
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isEnabled]);

  // Auto-remove stars after animation
  useEffect(() => {
    if (stars.length === 0) return;

    const timer = setTimeout(() => {
      setStars(prev => prev.slice(1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [stars]);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-40">
        <AnimatePresence>
          {stars.map(star => (
            <motion.div
              key={star.id}
              initial={{
                opacity: 1,
                scale: 0,
                x: star.x - star.size / 2,
                y: star.y - star.size / 2,
                rotate: star.rotation
              }}
              animate={{
                opacity: 0,
                scale: 1.5,
                y: star.y - star.size / 2 - 30
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute"
              style={{
                width: star.size,
                height: star.size
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-yellow-300 drop-shadow-lg"
                style={{ filter: 'drop-shadow(0 0 4px rgba(253, 224, 71, 0.8))' }}
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Toggle button */}
      <motion.button
        onClick={() => setIsEnabled(!isEnabled)}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-xl flex items-center justify-center text-xl hover:shadow-2xl transition-shadow"
        whileHover={{ scale: 1.1, rotate: 360 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400 }}
        title={isEnabled ? "关闭星星特效" : "开启星星特效"}
      >
        {isEnabled ? '✨' : '💫'}
      </motion.button>
    </>
  );
};

export default MouseTrailStars;
