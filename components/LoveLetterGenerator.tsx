import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, RefreshCw } from 'lucide-react';

const LoveLetterGenerator: React.FC = () => {
  const [step, setStep] = useState<'input' | 'result'>('input');
  const [generatedMessage, setGeneratedMessage] = useState<string>('');

  // Pre-written messages to cycle through randomly
  const messages = [
    "To my dearest Taeki,\n\nOn this special day, I want to remind you how incredibly beautiful you are, both inside and out. Your smile lights up my world in ways I can't explain. Every moment with you is a treasure I hold close to my heart.\n\nHappy Birthday, my love!",
    "Happy Birthday, Taeki!\n\nThank you for being the most amazing person in my life. Your kindness, your laughter, and your warmth make every day better. I promise to always be by your side, cheering you on and loving you endlessly.",
    "My beloved Taeki,\n\nAnother year has passed, and you've only grown more wonderful. Watching you chase your dreams inspires me every single day. May this year bring you as much joy as you bring to everyone around you.\n\nI love you more than words can say.",
    "Dearest Taeki,\n\nFrom the moment we met, I knew you were special. Today, we celebrate you—the person who makes my heart skip a beat. I hope your birthday is as magical and sweet as you are.\n\nForever yours."
  ];

  const handleGenerate = () => {
    // Pick a random message
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setGeneratedMessage(randomMsg);
    setStep('result');
  };

  const handleReset = () => {
    setStep('input');
    setGeneratedMessage('');
  };

  return (
    <section className="py-20 bg-pink-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 relative z-10 max-w-2xl">
        <motion.div 
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/50"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-pink-100 rounded-full mb-4">
              <Sparkles className="text-pink-500 w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 handwritten">Love Letter</h2>
            <p className="text-gray-500 mt-2">A special message just for you.</p>
          </div>

          <AnimatePresence mode="wait">
            {step === 'input' && (
              <motion.div
                key="input"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8 text-center"
              >
                <p className="text-lg text-gray-600">
                  Click the button below to reveal a heartfelt message written just for you.
                </p>

                <motion.button 
                  onClick={handleGenerate}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Reveal Message <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </motion.div>
            )}

            {step === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-6"
              >
                <div className="bg-pink-50/50 p-6 rounded-xl border border-pink-100 relative">
                  <div className="absolute -top-3 -left-3 text-4xl">❝</div>
                  <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line font-serif italic relative z-10">
                    {generatedMessage}
                  </p>
                  <div className="absolute -bottom-3 -right-3 text-4xl rotate-180">❝</div>
                </div>

                <motion.button 
                  onClick={handleReset}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white text-gray-700 border border-gray-200 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw size={18} /> Read Another
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveLetterGenerator;
