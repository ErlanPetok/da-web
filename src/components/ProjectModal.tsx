import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ExternalLink, Github, X } from 'lucide-react';
import { UI_COPY } from '../data/portfolioData';
import type { Lang, ProjectItem } from '../utils/portfolio';
import { POSTER_EASE } from './MotionPrimitives';

interface ProjectModalProps {
  project: ProjectItem | null;
  lang: Lang;
  onClose: () => void;
}

export function ProjectModal({ project, lang, onClose }: ProjectModalProps) {
  const t = UI_COPY[lang].projects;

  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="projectModalTitle"
          onClick={onClose}
        >
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.26, ease: POSTER_EASE }}
            className="poster-box w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              type="button"
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-3 right-3 z-10 w-9 h-9 bg-[var(--bg-surface)] text-[var(--ink)] border-2 border-[var(--border-strong)] hover:bg-[var(--accent)] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </motion.button>

            <div className="h-56 sm:h-72 border-b-2 border-[var(--border-strong)] bg-[var(--bg-poster)] overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>

            <div className="p-6 sm:p-7">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="bg-[var(--accent)] text-white font-mono-poster text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5">
                  {project.categoryLabel[lang]}
                </span>
                <span className="border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] font-mono-poster text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 text-[var(--ink)]">
                  {project.statusLabel[lang]}
                </span>
              </div>

              <h3
                id="projectModalTitle"
                className="font-display font-black text-2xl sm:text-3xl text-[var(--ink)] tracking-tight mb-3"
              >
                {project.title}
              </h3>

              <p className="text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed mb-5">
                {project.fullDesc[lang]}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.03 }}
                    className="px-2.5 py-1 border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] font-mono-poster text-xs font-bold text-[var(--ink)]"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 border-t-2 border-[var(--border-strong)] pt-5">
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-display font-bold text-xs uppercase tracking-wider px-5 py-2.5 border-2 border-[var(--border-strong)] shadow-[3px_3px_0px_var(--border-strong)]"
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  <span>{t.demo}</span>
                </motion.a>
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-soft)] text-[var(--ink)] font-display font-bold text-xs uppercase tracking-wider px-5 py-2.5 border-2 border-[var(--border-strong)]"
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                  <span>{t.github}</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
