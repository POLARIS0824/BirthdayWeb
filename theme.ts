import { Theme } from './components/ThemeSwitcher';

export const themeConfig = {
  pink: {
    primary: '#ec4899',
    secondary: '#f472b6',
    light: '#fbcfe8',
    gradient: 'from-pink-50 via-white to-pink-100',
    darkGradient: 'from-pink-900 via-gray-900 to-pink-950',
    text: 'text-pink-600',
    bg: 'bg-pink-50',
    confetti: ['#ec4899', '#f472b6', '#fbcfe8'],
    glow: 'rgba(236, 72, 153, 0.3)',
    scrollbarTrack: '#fff0f5',
    scrollbarThumb: '#fbcfe8',
    scrollbarThumbHover: '#f472b6'
  },
  purple: {
    primary: '#a855f7',
    secondary: '#c084fc',
    light: '#e9d5ff',
    gradient: 'from-purple-50 via-white to-purple-100',
    darkGradient: 'from-purple-900 via-gray-900 to-purple-950',
    text: 'text-purple-600',
    bg: 'bg-purple-50',
    confetti: ['#a855f7', '#c084fc', '#e9d5ff'],
    glow: 'rgba(168, 85, 247, 0.3)',
    scrollbarTrack: '#faf5ff',
    scrollbarThumb: '#e9d5ff',
    scrollbarThumbHover: '#c084fc'
  },
  blue: {
    primary: '#3b82f6',
    secondary: '#60a5fa',
    light: '#bfdbfe',
    gradient: 'from-blue-50 via-white to-blue-100',
    darkGradient: 'from-blue-900 via-gray-900 to-blue-950',
    text: 'text-blue-600',
    bg: 'bg-blue-50',
    confetti: ['#3b82f6', '#60a5fa', '#bfdbfe'],
    glow: 'rgba(59, 130, 246, 0.3)',
    scrollbarTrack: '#eff6ff',
    scrollbarThumb: '#bfdbfe',
    scrollbarThumbHover: '#60a5fa'
  },
  dark: {
    primary: '#ec4899',
    secondary: '#f472b6',
    light: '#fbcfe8',
    gradient: 'from-gray-900 via-gray-800 to-gray-900',
    darkGradient: 'from-gray-900 via-gray-800 to-gray-900',
    text: 'text-pink-400',
    bg: 'bg-gray-900',
    confetti: ['#ec4899', '#f472b6', '#fbcfe8'],
    glow: 'rgba(236, 72, 153, 0.5)',
    scrollbarTrack: '#1f2937',
    scrollbarThumb: '#374151',
    scrollbarThumbHover: '#4b5563'
  }
};

export const getThemeColors = (theme: Theme) => themeConfig[theme];

export const applyThemeToDOM = (theme: Theme) => {
  const config = themeConfig[theme];
  const root = document.documentElement;

  // Apply CSS variables
  root.style.setProperty('--theme-primary', config.primary);
  root.style.setProperty('--theme-secondary', config.secondary);
  root.style.setProperty('--theme-light', config.light);
  root.style.setProperty('--theme-glow', config.glow);
  root.style.setProperty('--scrollbar-track', config.scrollbarTrack);
  root.style.setProperty('--scrollbar-thumb', config.scrollbarThumb);
  root.style.setProperty('--scrollbar-thumb-hover', config.scrollbarThumbHover);

  // Apply body background color based on theme
  const body = document.body;
  if (theme === 'dark') {
    body.style.backgroundColor = '#111827';
    root.classList.add('dark');
  } else if (theme === 'purple') {
    body.style.backgroundColor = '#faf5ff';
    root.classList.remove('dark');
  } else if (theme === 'blue') {
    body.style.backgroundColor = '#eff6ff';
    root.classList.remove('dark');
  } else {
    body.style.backgroundColor = '#fff0f5';
    root.classList.remove('dark');
  }

  // Store theme in localStorage
  localStorage.setItem('theme', theme);
};

export const getStoredTheme = (): Theme => {
  const stored = localStorage.getItem('theme');
  return (stored as Theme) || 'pink';
};
