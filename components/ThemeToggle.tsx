'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'dark' | 'light';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('aura-theme') as Theme | null;
    const initial: Theme =
      stored ?? (document.documentElement.getAttribute('data-theme') as Theme) ?? 'dark';
    setTheme(initial);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('aura-theme', next);
    document.documentElement.setAttribute('data-theme', next);
    window.dispatchEvent(new CustomEvent('aura-theme-change', { detail: { theme: next } }));
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '2.25rem',
        height: '2.25rem',
        borderRadius: '50%',
        border: '1px solid var(--color-gold-border, rgba(168,123,40,0.35))',
        background: 'var(--color-surface-2, rgba(255,255,255,0.06))',
        color: 'var(--color-gold, #c9a84c)',
        cursor: 'pointer',
        transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
        flexShrink: 0,
      }}
    >
      {theme === 'dark' ? (
        <Sun size={16} strokeWidth={1.8} />
      ) : (
        <Moon size={16} strokeWidth={1.8} />
      )}
    </button>
  );
};
