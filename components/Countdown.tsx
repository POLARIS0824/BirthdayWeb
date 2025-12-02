import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X, PartyPopper } from 'lucide-react';

interface CountdownProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const Countdown: React.FC<CountdownProps> = ({ isModalOpen, setIsModalOpen }) => {
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number, seconds: number} | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Target: Dec 3, 2025 00:00:00
      const targetDate = new Date('2025-12-03T00:00:00').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        return null;
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const initialTime = calculateTimeLeft();
    setTimeLeft(initialTime);
    
    if (initialTime === null) {
      setIsModalOpen(true);
    }

    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);
      if (newTime === null && timeLeft !== null) {
        setIsModalOpen(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, setIsModalOpen]);

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl relative border-4 border-pink-200"
              onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={24} />
                </button>
                
                <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <PartyPopper size={40} className="text-pink-500" />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-4 handwritten">Happy Birthday!</h2>
                <p className="text-gray-600 mb-8">
                    The wait is over! It's finally time to celebrate Taeki's special day. 
                    May your day be filled with love, joy, and wonderful surprises! 🎂🎈
                </p>
                
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors shadow-lg hover:shadow-xl"
                >
                    Let's Celebrate!
                </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!timeLeft ? (
        <section className="py-10 bg-pink-50 text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-3xl md:text-4xl font-bold text-pink-600 handwritten"
          >
            Happy Birthday Taeki! 🎉
          </motion.div>
        </section>
      ) : (
        <section className="py-12 bg-gradient-to-b from-pink-100 to-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center gap-2 mb-6 text-pink-500">
                <Clock size={24} />
                <h2 className="text-2xl md:text-3xl font-serif italic text-gray-700">Until Taeki's Birthday</h2>
              </div>

              <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-xl shadow-lg flex items-center justify-center border border-pink-100">
                      <span className="text-2xl md:text-3xl font-bold text-pink-600">
                        {String(value).padStart(2, '0')}
                      </span>
                    </div>
                    <span className="mt-2 text-sm text-gray-500 uppercase tracking-wider font-medium">
                      {unit}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
};

export default Countdown;
