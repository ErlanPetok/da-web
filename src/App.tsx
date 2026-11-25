import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { ArrowUp, Music } from 'lucide-react';
import { AboutPoster } from './components/AboutPoster';
import { ContactSection } from './components/ContactSection';
import { CreativeModal } from './components/CreativeModal';
import { CreativeSection, type CreativeModalState } from './components/CreativeSection';
import { GitHubSection } from './components/GitHubSection';
import { Header } from './components/Header';
import { POSTER_EASE } from './components/MotionPrimitives';
import { MusicDock } from './components/MusicDock';
import { PosterHero } from './components/PosterHero';
import { ProjectModal } from './components/ProjectModal';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsConstellation } from './components/SkillsConstellation';
import { TimelineSection } from './components/TimelineSection';
import { UI_COPY } from './data/portfolioData';
import {
  toggleLanguage,
  toggleTheme,
  type Lang,
  type ProjectItem,
  type Theme,
} from './utils/portfolio';

const SECTION_IDS = [
  'home',
  'about',
  'skills',
  'timeline',
  'projects',
  'creative',
  'github',
  'contact',
] as const;

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('lang');
      return saved === 'en' ? 'en' : 'id';
    } catch {
      return 'id';
    }
  });

  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const [activeSection, setActiveSection] = useState<string>('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [creativeModal, setCreativeModal] = useState<CreativeModalState>(null);
  const [musicExpanded, setMusicExpanded] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('lang', lang);
    } catch {
      // ignore storage failure
    }
  }, [lang]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // ignore storage failure
    }
  }, [theme]);

  useEffect(() => {
    let raf = 0;
    const handleScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0);
        setShowBackToTop(y > 400);

        let current = 'home';
        for (const id of SECTION_IDS) {
          const el = document.getElementById(id);
          if (el && y >= el.offsetTop - 160) {
            current = id;
          }
        }
        setActiveSection(current);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const showToast = useCallback((message: string) => {
    setToastMsg(message);
    window.setTimeout(() => {
      setToastMsg((prev) => (prev === message ? null : prev));
    }, 2200);
  }, []);

  const handleToggleLang = () => {
    const next = toggleLanguage(lang);
    setLang(next);
    showToast(next === 'id' ? 'Bahasa: Indonesia' : 'Language: English');
  };

  const handleToggleTheme = () => {
    const next = toggleTheme(theme);
    setTheme(next);
  };

  const tFooter = UI_COPY[lang].footer;

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--ink)] transition-colors duration-200">
        {/* Scroll progress indicator */}
        <div
          aria-hidden="true"
          className="fixed top-0 left-0 h-1 bg-[var(--accent)] z-50 transition-[width] duration-75"
          style={{ width: `${scrollProgress}%` }}
        />

        <Header
          lang={lang}
          theme={theme}
          activeSection={activeSection}
          onToggleLang={handleToggleLang}
          onToggleTheme={handleToggleTheme}
        />

        <main>
          <PosterHero lang={lang} />
          <AboutPoster lang={lang} />
          <SkillsConstellation
            lang={lang}
            onOpenArtworkGallery={() => setCreativeModal({ kind: 'art', index: 0 })}
          />
          <TimelineSection lang={lang} />
          <ProjectsSection lang={lang} onSelectProject={setSelectedProject} />
          <CreativeSection lang={lang} onOpenModal={setCreativeModal} />
          <GitHubSection lang={lang} />
          <ContactSection lang={lang} onToast={showToast} />
        </main>

        <footer className="border-t-2 border-[var(--border-strong)] bg-[var(--bg-surface)] py-8 pb-24 sm:pb-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setMusicExpanded((prev) => !prev)}
              className="inline-flex items-center gap-2.5 px-3.5 py-2 border-2 border-[var(--border-strong)] bg-[var(--bg-surface-soft)] hover:bg-[var(--accent)] hover:text-white transition-colors font-mono-poster text-xs font-bold cursor-pointer"
            >
              <Music className="w-3.5 h-3.5 text-[var(--accent)]" aria-hidden="true" />
              <span>{tFooter.music}</span>
            </motion.button>

            <div className="font-mono-poster text-xs font-bold text-[var(--ink-muted)] text-center sm:text-right">
              &copy; 2026 <span className="text-[var(--accent)]">ErlanHoshi</span>. {tFooter.rights}
            </div>
          </div>
        </footer>

        <MusicDock
          lang={lang}
          expanded={musicExpanded}
          visibleOnMobile={scrollProgress > 4 || musicExpanded}
          onToggleExpanded={() => setMusicExpanded((prev) => !prev)}
        />

        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.7, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 12 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.2, ease: POSTER_EASE }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label={lang === 'id' ? 'Kembali ke atas' : 'Back to top'}
              className="fixed bottom-4 right-4 z-40 w-10 h-10 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white border-2 border-[var(--border-strong)] shadow-[3px_3px_0px_var(--border-strong)] flex items-center justify-center cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {toastMsg && (
            <motion.div
              key={toastMsg}
              role="status"
              initial={{ opacity: 0, x: 24, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24, scale: 0.94 }}
              transition={{ duration: 0.2, ease: POSTER_EASE }}
              className="fixed top-20 right-4 z-50 bg-[var(--ink)] text-[var(--bg-canvas)] border-2 border-[var(--accent)] px-4 py-2 font-mono-poster text-xs font-bold shadow-[4px_4px_0px_var(--accent)]"
            >
              {toastMsg}
            </motion.div>
          )}
        </AnimatePresence>

        <ProjectModal
          project={selectedProject}
          lang={lang}
          onClose={() => setSelectedProject(null)}
        />

        <CreativeModal
          modalState={creativeModal}
          lang={lang}
          onChangeState={setCreativeModal}
        />
      </div>
    </MotionConfig>
  );
}
