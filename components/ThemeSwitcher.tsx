import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';

export type Theme = 'pink' | 'purple' | 'blue' | 'dark';

interface ThemeSwitcherProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const themes = [
  {
    id: 'pink' as Theme,
    name: '少女粉',
    icon: '💗',
    preview: 'from-pink-400 to-pink-600',
    colors: ['#ec4899', '#f472b6', '#fbcfe8']
  },
  {
    id: 'purple' as Theme,
    name: '薰衣草紫',
    icon: '💜',
    preview: 'from-purple-400 to-purple-600',
    colors: ['#a855f7', '#c084fc', '#e9d5ff']
  },
  {
    id: 'blue' as Theme,
    name: '天空蓝',
    icon: '💙',
    preview: 'from-blue-400 to-blue-600',
    colors: ['#3b82f6', '#60a5fa', '#bfdbfe']
  },
  {
    id: 'dark' as Theme,
    name: '深色模式',
    icon: '🌙',
    preview: 'from-gray-700 to-gray-900',
    colors: ['#374151', '#4b5563', '#6b7280']
  }
];

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-2xl shadow-2xl p-4 min-w-[240px] border border-gray-200/50 dark:border-gray-700/50"
          >
            <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <Palette size={16} />
              选择主题
            </h3>
            <div className="space-y-2">
              {themes.map((theme) => (
                <motion.button
                  key={theme.id}
                  onClick={() => {
                    onThemeChange(theme.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    currentTheme === theme.id
                      ? 'bg-gradient-to-r ' + theme.preview + ' text-white shadow-md'
                      : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-2xl">{theme.icon}</span>
                  <span className="flex-1 text-left text-sm font-medium">
                    {theme.name}
                  </span>
                  {currentTheme === theme.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <Check size={16} />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 dark:from-gray-700 dark:to-gray-900 text-white shadow-2xl flex items-center justify-center hover:shadow-3xl transition-shadow"
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <Palette size={24} />
      </motion.button>
    </div>
  );
};

export default ThemeSwitcher;
export { themes };
