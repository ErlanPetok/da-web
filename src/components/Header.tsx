import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, Moon, Sun, Volume2, VolumeX, X } from 'lucide-react';
import { PROFILE, UI_COPY } from '../data/portfolioData';
import type { Lang, Theme } from '../utils/portfolio';
import { POSTER_EASE } from './MotionPrimitives';

interface HeaderProps {
  lang: Lang;
  theme: Theme;
  sfxEnabled: boolean;
  activeSection: string;
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onToggleSfx: () => void;
}

const NAV_IDS = ['home', 'about', 'skills', 'timeline', 'projects', 'creative', 'github', 'contact'] as const;

export function Header({
  lang,
  theme,
  sfxEnabled,
  activeSection,
  onToggleLang,
  onToggleTheme,
  onToggleSfx,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = UI_COPY[lang].nav;

  return (
    <header className="sticky top-0 z-40 border-b-2 border-[var(--border-strong)] bg-[var(--bg-canvas)]/98">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand */}
        <motion.a
          href="#home"
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-4"
        >
          <motion.span
            whileHover={{ rotate: -6, scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 420, damping: 20 }}
            className="w-9 h-9 bg-[var(--accent)] text-white border-2 border-[var(--border-strong)] flex items-center justify-center font-display font-black text-sm tracking-tight shadow-[2px_2px_0px_var(--border-strong)]"
          >
            {PROFILE.monogram}
          </motion.span>
          <span className="font-display font-black text-lg tracking-tight text-[var(--ink)] uppercase whitespace-nowrap">
            Erlan<span className="text-[var(--accent)]">Hoshi</span>
          </span>
        </motion.a>

        {/* Center: Single-line navigation on desktop with gliding underline */}
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-5">
          {NAV_IDS.map((id) => {
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`relative text-xs font-bold uppercase tracking-wider whitespace-nowrap py-1.5 transition-colors ${
                  isActive
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={`${id}-${lang}`}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.18 }}
                    className="inline-block"
                  >
                    {t[id]}
                  </motion.span>
                </AnimatePresence>
                {isActive && (
                  <motion.span
                    layoutId="navActiveUnderline"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Controls */}
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.92 }}
            onClick={onToggleLang}
            aria-label={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            className="h-9 px-3 border-2 border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--ink)] font-mono-poster text-xs font-bold uppercase tracking-wider hover:bg-[var(--accent)] hover:text-white transition-colors cursor-pointer overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={lang}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.16 }}
                className="inline-block"
              >
                {lang === 'id' ? 'EN' : 'ID'}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <motion.button
            type="button"
            data-sfx-handled="true"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.92 }}
            onClick={onToggleSfx}
            aria-pressed={sfxEnabled}
            aria-label={
              sfxEnabled
                ? lang === 'id'
                  ? 'Matikan suara UI'
                  : 'Mute UI sound effects'
                : lang === 'id'
                  ? 'Aktifkan suara UI'
                  : 'Enable UI sound effects'
            }
            title={sfxEnabled ? UI_COPY[lang].music.sfxOn : UI_COPY[lang].music.sfxOff}
            className={`w-9 h-9 border-2 border-[var(--border-strong)] transition-colors flex items-center justify-center cursor-pointer ${
              sfxEnabled
                ? 'bg-[var(--bg-surface)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white'
                : 'bg-[var(--bg-surface-soft)] text-[var(--ink-muted)] hover:bg-[var(--accent)] hover:text-white'
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={sfxEnabled ? 'sfx-on' : 'sfx-off'}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.16, ease: POSTER_EASE }}
                className="flex items-center justify-center"
              >
                {sfxEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.92 }}
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light sakura theme' : 'Switch to dark berry theme'}
            className="w-9 h-9 border-2 border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -60, scale: 0.6, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 60, scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.22, ease: POSTER_EASE }}
                className="flex items-center justify-center"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            className="lg:hidden w-9 h-9 border-2 border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--ink)] hover:bg-[var(--accent)] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>

      {/* Animated Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: POSTER_EASE }}
            aria-label="Mobile navigation"
            className="lg:hidden overflow-hidden border-t-2 border-[var(--border-strong)] bg-[var(--bg-surface)]"
          >
            <div className="px-4 py-4 grid grid-cols-2 gap-2">
              {NAV_IDS.map((id, idx) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  onClick={() => setMenuOpen(false)}
                  className={`px-3 py-2 border border-[var(--border-soft)] text-xs font-bold uppercase tracking-wider ${
                    activeSection === id
                      ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                      : 'text-[var(--ink)] hover:bg-[var(--bg-surface-soft)]'
                  }`}
                >
                  {t[id]}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
