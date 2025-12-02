import React, { useMemo } from 'react';
import { motion, useMotionValue, useTransform, Variants } from 'framer-motion';
import { Heart, Stars } from 'lucide-react';

interface HeroProps {
  onScrollDown: () => void;
}

const Hero: React.FC<HeroProps> = ({ onScrollDown }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax transform for background elements
  const moveX = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-20, 20]);
  const moveY = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [-20, 20]);

  // Generate stable random values for background elements
  const floatingElements = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      initialX: Math.random() * 100 + "vw",
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 10,
      scale: Math.random() * 0.5 + 0.5,
      rotation: Math.random() * 360,
    }));
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const titleText = "Happy Birthday!";
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.5 }
    }
  };

  const childVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotate: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section 
      className="relative h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-pink-50 via-white to-pink-100"
      onMouseMove={handleMouseMove}
    >
      
      {/* Floating Background Elements with Parallax */}
      <motion.div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ x: moveX, y: moveY }}
      >
        {floatingElements.map((el) => (
          <motion.div
            key={el.id}
            className="absolute text-pink-200/40"
            style={{ left: el.initialX }}
            initial={{ y: "110vh", rotate: el.rotation }}
            animate={{ 
              y: "-10vh", 
              rotate: el.rotation + 360,
            }}
            transition={{ 
              duration: el.duration, 
              repeat: Infinity, 
              ease: "linear",
              delay: el.delay
            }}
          >
            <Heart 
              size={40 * el.scale} 
              fill="currentColor" 
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="z-10 text-center px-4"
      >
        <div className="flex justify-center mb-6">
           <motion.div
             animate={{ rotate: 360, scale: [1, 1.2, 1] }}
             transition={{ 
               rotate: { duration: 20, repeat: Infinity, ease: "linear" },
               scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
             }}
           >
             <Stars className="text-yellow-400 w-10 h-10 filter drop-shadow-md" fill="currentColor" />
           </motion.div>
        </div>

        {/* Name Section: Taeki */}
        <motion.div
          className="relative inline-block mb-2"
          initial={{ opacity: 0, y: 20, scale: 0.5, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.2, type: "spring", bounce: 0.5 }}
        >
          {/* Glow effect behind the name */}
          <div className="absolute inset-0 bg-pink-300 blur-2xl opacity-20 rounded-full scale-150"></div>
          
          <h1 className="relative text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 font-[Playfair Display] drop-shadow-sm pb-2 z-10">
            Taeki
          </h1>
          
          {/* Animated Crown */}
          <motion.div 
            className="absolute -top-8 -right-4 md:-right-8 text-4xl md:text-5xl z-20"
            initial={{ opacity: 0, rotate: -45, y: -20 }}
            animate={{ opacity: 1, rotate: 15, y: 0 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          >
            👑
          </motion.div>
        </motion.div>

        <motion.h2 
          className="text-xl md:text-2xl font-medium text-pink-400 tracking-[0.2em] uppercase mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          It's your special day
        </motion.h2>

        {/* Staggered Animated Title */}
        <motion.div
          className="flex flex-wrap justify-center gap-x-2 md:gap-x-4 mb-8 py-2 relative z-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {titleText.split(" ").map((word, wordIndex) => (
            <div key={wordIndex} className="flex">
              {Array.from(word).map((letter, index) => (
                <motion.span
                  key={index}
                  variants={childVariants}
                  className="text-6xl md:text-8xl lg:text-9xl text-gray-800 font-bold drop-shadow-sm handwritten inline-block origin-bottom"
                  whileHover={{ scale: 1.2, rotate: Math.random() * 20 - 10, color: "#f472b6" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          ))}
        </motion.div>

        <motion.p 
          className="text-lg md:text-xl text-gray-500 mb-8 max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          To the most beautiful person in the world, may your day be as magical as you are.
        </motion.p>
      </motion.div>

      <motion.div 
        className="absolute bottom-10 cursor-pointer animate-bounce text-pink-400 z-30"
        onClick={onScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        Scroll for more surprises
        <div className="flex justify-center mt-2">↓</div>
      </motion.div>
    </section>
  );
};

export default Hero;