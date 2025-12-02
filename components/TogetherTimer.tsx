import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar } from 'lucide-react';

const TogetherTimer: React.FC = () => {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const calculateDays = () => {
      const startDate = new Date('2024-09-04T00:00:00');
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - startDate.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays);
    };

    calculateDays();
    // Update every day at midnight
    const interval = setInterval(calculateDays, 1000 * 60 * 60); // Update every hour to catch day changes

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-white via-pink-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Heart size={20 + Math.random() * 20} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <Calendar className="w-12 h-12 mx-auto mb-4 text-pink-500" />
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2 handwritten">
              我们已经在一起
            </h2>
          </motion.div>

          {/* Days Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 blur-3xl opacity-30 rounded-full"></div>

            {/* Counter card */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-pink-200 p-12 md:p-16">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex flex-col items-center"
              >
                <div className="text-8xl md:text-9xl font-bold bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 bg-clip-text text-transparent mb-4 font-[Playfair Display] leading-tight">
                  {days}
                </div>
                <div className="text-2xl md:text-3xl text-gray-600 font-semibold tracking-wider">
                  天
                </div>
              </motion.div>

              {/* Decorative hearts */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 -left-6 text-pink-400"
              >
                <Heart size={40} fill="currentColor" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-6 -right-6 text-purple-400"
              >
                <Heart size={40} fill="currentColor" />
              </motion.div>
            </div>
          </motion.div>

          {/* Footer text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <p className="text-xl md:text-2xl text-gray-600 handwritten">
              故事还在继续......
            </p>
          </motion.div>

          {/* Timeline decoration */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-12 h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TogetherTimer;
