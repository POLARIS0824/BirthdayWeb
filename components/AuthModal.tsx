import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, UserX, Heart } from 'lucide-react';
import { validateInput, getHashParts, reconstructHash } from '../utils/security';

interface AuthModalProps {
  onAuthenticated: (isVisitor: boolean) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onAuthenticated }) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  // Question text
  const QUESTION = "When we become a couple?";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Reconstruct the hash from obfuscated parts
      const hashParts = getHashParts();
      const targetHash = reconstructHash(hashParts);

      // Validate input using timing-safe comparison
      const isValid = await validateInput(answer, targetHash);

      if (isValid) {
        setError('');
        onAuthenticated(false); // Not a visitor
      } else {
        setError('Incorrect answer. Please try again!');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleVisitorMode = () => {
    onAuthenticated(true); // Is a visitor
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[500] bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
            rotate: isShaking ? [0, -5, 5, -5, 5, 0] : 0
          }}
          transition={{
            type: "spring",
            damping: 15,
            rotate: { duration: 0.5 }
          }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400"></div>

          <div className="flex flex-col items-center mb-6">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
              className="bg-gradient-to-br from-pink-100 to-purple-100 p-4 rounded-full mb-4"
            >
              <Heart className="w-12 h-12 text-pink-500 fill-pink-500" />
            </motion.div>

            <h2 className="text-3xl font-bold text-gray-800 mb-2 handwritten">
              Welcome!
            </h2>
            <p className="text-gray-600 text-center text-sm">
              This is a special page for someone special
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <Lock size={18} className="text-pink-500" />
                <span className="text-sm">{QUESTION}</span>
              </label>
              <input
                type="text"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  setError('');
                }}
                placeholder="Enter your answer..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:outline-none transition-colors text-gray-800"
                autoFocus
              />

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-2 flex items-center gap-1"
                  >
                    <span>❌</span> {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
            >
              Enter
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          <button
            onClick={handleVisitorMode}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group"
          >
            <UserX size={18} className="group-hover:scale-110 transition-transform" />
            <span>Continue as Visitor</span>
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">
            Visitor mode provides limited access to content
          </p>
        </motion.div>

        {/* Floating hearts background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300 opacity-20"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 50
              }}
              animate={{
                y: -100,
                x: Math.random() * window.innerWidth
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            >
              <Heart className="w-8 h-8 fill-current" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;
