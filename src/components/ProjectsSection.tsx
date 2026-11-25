import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Eye, RefreshCw } from 'lucide-react';
import { PROJECTS, UI_COPY } from '../data/portfolioData';
import {
  filterProjects,
  type Lang,
  type ProjectCategory,
  type ProjectItem,
} from '../utils/portfolio';
import { MaskedWords, POSTER_EASE } from './MotionPrimitives';
import { SectionHeader } from './SectionHeader';

interface ProjectsSectionProps {
  lang: Lang;
  onSelectProject: (project: ProjectItem) => void;
}

const FILTER_KEYS: ProjectCategory[] = ['all', 'web-design', 'ecommerce', 'dashboard', 'game'];

export function ProjectsSection({ lang, onSelectProject }: ProjectsSectionProps) {
  const t = UI_COPY[lang].projects;
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');

  const visibleProjects = filterProjects(PROJECTS, activeFilter);

  return (
    <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader tag={t.tag} jpSub={t.jpSub} title={t.title} subtitle={t.subtitle} />

        {/* Interactive Filter Tabs with gliding background pill */}
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Project category filters">
          {FILTER_KEYS.map((key) => {
            const isActive = activeFilter === key;
            return (
              <motion.button
                key={key}
                type="button"
                aria-pressed={isActive}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(key)}
                className={`relative px-4 py-2 border-2 font-mono-poster text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  isActive
                    ? 'text-white border-[var(--border-strong)] shadow-[3px_3px_0px_var(--border-strong)]'
                    : 'bg-[var(--bg-surface)] text-[var(--ink)] border-[var(--border-strong)] hover:bg-[var(--bg-surface-soft)]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="projectFilterActive"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-[var(--accent)] -z-0"
                  />
                )}
                <span className="relative z-10">{t.filters[key]}</span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {visibleProjects.length === 0 ? (
            <motion.div
              key="empty-projects"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: POSTER_EASE }}
              className="poster-box p-10 text-center"
            >
              <p className="text-sm sm:text-base font-medium text-[var(--ink-muted)] mb-4">
                {t.emptyMsg}
              </p>
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter('all')}
                className="px-4 py-2 bg-[var(--accent)] text-white font-mono-poster text-xs font-bold uppercase tracking-wider border-2 border-[var(--border-strong)] cursor-pointer"
              >
                {t.resetFilter}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              layout
              key="projects-grid"
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {visibleProjects.map((project, index) => (
                  <motion.article
                    layout
                    key={project.id}
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.35, delay: index * 0.06, ease: POSTER_EASE }}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => onSelectProject(project)}
                    className="poster-box group cursor-pointer overflow-hidden flex flex-col"
                  >
                    {/* Header bar inside card */}
                    <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b-2 border-[var(--border-strong)] bg-[var(--bg-surface-soft)]">
                      <span className="font-mono-poster text-[11px] font-bold uppercase tracking-widest text-[var(--ink)]">
                        PRJ-0{index + 1} // {project.categoryLabel[lang]}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 font-mono-poster text-[10px] font-bold uppercase tracking-wider border border-[var(--border-strong)] ${
                          project.status === 'ongoing'
                            ? 'bg-white dark:bg-[#230c1a] text-[var(--accent)]'
                            : 'bg-[var(--ink)] text-[var(--bg-canvas)]'
                        }`}
                      >
                        {project.status === 'ongoing' ? (
                          <RefreshCw className="w-3 h-3 transition-transform duration-500 group-hover:rotate-180" aria-hidden="true" />
                        ) : (
                          <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                        )}
                        <span>{project.statusLabel[lang]}</span>
                      </span>
                    </div>

                    {/* Preview Media */}
                    <div className="relative h-56 sm:h-64 overflow-hidden bg-[var(--bg-poster)] border-b-2 border-[var(--border-strong)]">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="eager"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-[var(--accent)]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <span className="inline-flex items-center gap-2 bg-white text-[var(--ink)] border-2 border-[var(--border-strong)] px-4 py-2 font-display font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_var(--border-strong)] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
                          <Eye className="w-4 h-4 text-[var(--accent)]" aria-hidden="true" />
                          <span>{t.inspect}</span>
                        </span>
                      </div>
                    </div>

                    {/* Copy & Stack */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
                      <div>
                        <h3 className="font-display font-black text-xl sm:text-2xl text-[var(--ink)] tracking-tight mb-2">
                          <MaskedWords text={project.title} stagger={0.04} />
                        </h3>
                        <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                          {project.shortDesc[lang]}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--border-soft)]">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] font-mono-poster text-[11px] font-bold text-[var(--ink)] group-hover:border-[var(--accent)] transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
