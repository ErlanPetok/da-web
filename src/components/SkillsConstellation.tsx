import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Code2, Film, Layout, Network, PenTool, Sparkles } from 'lucide-react';
import { SKILL_NODES, UI_COPY } from '../data/portfolioData';
import {
  getConnectedSkillIds,
  getConstellationEdges,
  type Lang,
  type SkillNode,
} from '../utils/portfolio';
import { playStarNote } from '../utils/soundEngine';
import { MaskedWords, POSTER_EASE, PosterReveal } from './MotionPrimitives';
import { SectionHeader } from './SectionHeader';

interface SkillsConstellationProps {
  lang: Lang;
  onOpenArtworkGallery: () => void;
}

function SkillIcon({ id }: { id: SkillNode['id'] }) {
  switch (id) {
    case 'ui':
      return <Layout className="w-5 h-5" aria-hidden="true" />;
    case 'html':
      return <Code2 className="w-5 h-5" aria-hidden="true" />;
    case 'illus':
      return <PenTool className="w-5 h-5" aria-hidden="true" />;
    case 'edit':
      return <Film className="w-5 h-5" aria-hidden="true" />;
    case 'network':
      return <Network className="w-5 h-5" aria-hidden="true" />;
  }
}

export function SkillsConstellation({
  lang,
  onOpenArtworkGallery,
}: SkillsConstellationProps) {
  const t = UI_COPY[lang].skills;
  const [pinnedId, setPinnedId] = useState<SkillNode['id'] | null>('ui');
  const [hoveredId, setHoveredId] = useState<SkillNode['id'] | null>(null);

  const activeId = hoveredId ?? pinnedId;
  const activeNode = SKILL_NODES.find((n) => n.id === activeId) ?? null;
  const connectedIds = getConnectedSkillIds(SKILL_NODES, activeId);
  const edges = getConstellationEdges(SKILL_NODES);

  const connectedLabels = Array.from(connectedIds)
    .map((id) => SKILL_NODES.find((n) => n.id === id)?.label[lang])
    .filter(Boolean);

  const handleTogglePin = (id: SkillNode['id'], index: number) => {
    playStarNote(index);
    setPinnedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader tag={t.tag} jpSub={t.jpSub} title={t.title} subtitle={t.subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Interactive Constellation Poster Canvas */}
          <PosterReveal
            direction="left"
            className="lg:col-span-7 poster-box p-4 sm:p-6 bg-gradient-to-br from-[var(--bg-surface-soft)] to-[var(--bg-surface)] relative overflow-hidden"
          >
            <div className="poster-halftone absolute inset-0 opacity-60 pointer-events-none" aria-hidden="true" />

            <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-poster font-bold uppercase tracking-widest text-[var(--ink-muted)] mb-4 border-b border-[var(--border-soft)] pb-2">
              <span>CONSTELLATION MAP // 5 NODES</span>
              <span className="text-[var(--accent)]">✦ INTERACTIVE</span>
            </div>

            {/* Desktop Spatial Constellation Canvas */}
            <div className="hidden md:block relative w-full h-[360px]">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden="true"
              >
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{ duration: 0.55, ease: POSTER_EASE }}
                >
                  {edges.map((edge) => {
                    const isHighlighted =
                      activeId !== null && (edge.from.id === activeId || edge.to.id === activeId);
                    return (
                      <line
                        key={edge.key}
                        x1={edge.from.x}
                        y1={edge.from.y}
                        x2={edge.to.x}
                        y2={edge.to.y}
                        stroke={isHighlighted ? 'var(--accent)' : 'var(--border-soft)'}
                        strokeWidth={isHighlighted ? 1.05 : 0.45}
                        strokeDasharray={isHighlighted ? undefined : '1.5 1.5'}
                        className="transition-all duration-300 ease-out"
                      />
                    );
                  })}
                </motion.g>
              </svg>

              {SKILL_NODES.map((node, idx) => {
                const isActive = node.id === activeId;
                const isConnected = connectedIds.has(node.id);
                return (
                  <motion.button
                    key={node.id}
                    type="button"
                    data-sfx-handled="true"
                    aria-pressed={pinnedId === node.id}
                    onMouseEnter={() => setHoveredId(node.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onFocus={() => setHoveredId(node.id)}
                    onBlur={() => setHoveredId(null)}
                    onClick={() => handleTogglePin(node.id, idx)}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    initial={{ opacity: 0, scale: 0.75, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, amount: 'some' }}
                    animate={{
                      scale: isActive ? 1.08 : 1,
                      y: isActive ? -3 : 0,
                    }}
                    transition={{
                      opacity: { duration: 0.38, delay: idx * 0.06 },
                      scale: { type: 'spring', stiffness: 380, damping: 20 },
                      y: { type: 'spring', stiffness: 320, damping: 20 },
                    }}
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.94 }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 px-3.5 py-2.5 border-2 transition-colors cursor-pointer flex items-center gap-2.5 text-left ${
                      isActive
                        ? 'bg-[var(--accent)] text-white border-[var(--border-strong)] shadow-[4px_4px_0px_var(--border-strong)] z-20'
                        : isConnected
                        ? 'bg-[var(--bg-surface)] text-[var(--ink)] border-[var(--accent)] shadow-[3px_3px_0px_var(--accent-soft)] z-10'
                        : 'bg-[var(--bg-surface)] text-[var(--ink)] border-[var(--border-strong)] hover:border-[var(--accent)] z-10'
                    }`}
                  >
                    <span className={isActive ? 'animate-poster-pulse' : ''}>
                      <SkillIcon id={node.id} />
                    </span>
                    <div>
                      <div className="font-mono-poster text-[9px] font-bold tracking-widest opacity-80 leading-none mb-0.5">
                        {node.code}
                      </div>
                      <div className="font-display font-bold text-xs whitespace-nowrap leading-none">
                        {node.label[lang]}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Clean Selectable Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden relative z-10">
              {SKILL_NODES.map((node, idx) => {
                const isActive = node.id === activeId;
                return (
                  <motion.button
                    key={node.id}
                    type="button"
                    data-sfx-handled="true"
                    aria-pressed={pinnedId === node.id}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleTogglePin(node.id, idx)}
                    className={`p-3.5 border-2 text-left flex items-center gap-3 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[var(--accent)] text-white border-[var(--border-strong)] shadow-[3px_3px_0px_var(--border-strong)]'
                        : 'bg-[var(--bg-surface)] text-[var(--ink)] border-[var(--border-strong)]'
                    }`}
                  >
                    <SkillIcon id={node.id} />
                    <div>
                      <div className="font-mono-poster text-[10px] font-bold tracking-widest opacity-80">
                        {node.code}
                      </div>
                      <div className="font-display font-bold text-sm">{node.label[lang]}</div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </PosterReveal>

          {/* Detail Inspector Panel with animated swap */}
          <PosterReveal
            direction="right"
            delay={0.1}
            className="lg:col-span-5 poster-box p-6 sm:p-7 flex flex-col justify-between bg-[var(--bg-surface)]"
          >
            <div aria-live="polite" className="flex-1 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {activeNode ? (
                  <motion.div
                    key={`${activeNode.id}-${lang}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.24, ease: POSTER_EASE }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="bg-[var(--ink)] text-[var(--bg-canvas)] font-mono-poster text-xs font-bold px-2.5 py-1 uppercase tracking-widest">
                        {activeNode.code}
                      </span>
                      <span className="font-mono-poster text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
                        ACTIVE NODE ✦
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        initial={{ rotate: -10, scale: 0.85 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 360, damping: 22 }}
                        className="w-11 h-11 border-2 border-[var(--border-strong)] bg-[var(--bg-surface-soft)] text-[var(--accent)] flex items-center justify-center shrink-0"
                      >
                        <SkillIcon id={activeNode.id} />
                      </motion.div>
                      <h3 className="font-display font-black text-2xl text-[var(--ink)] tracking-tight">
                        <MaskedWords text={activeNode.label[lang]} inView={false} stagger={0.04} />
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed mb-6">
                      {activeNode.description[lang]}
                    </p>

                    {connectedLabels.length > 0 && (
                      <div className="border-t border-[var(--border-soft)] pt-4 mb-5">
                        <div className="font-mono-poster text-[11px] font-bold uppercase tracking-widest text-[var(--ink-muted)] mb-2">
                          {t.connectedWith}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {connectedLabels.map((lbl, i) => (
                            <motion.span
                              key={lbl}
                              initial={{ opacity: 0, scale: 0.88 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                              className="px-2.5 py-1 border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] font-mono-poster text-xs font-bold text-[var(--ink)]"
                            >
                              {lbl}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeNode.id === 'illus' && (
                      <motion.button
                        type="button"
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={onOpenArtworkGallery}
                        className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-display font-bold text-xs uppercase tracking-wider px-4 py-2.5 border-2 border-[var(--border-strong)] shadow-[3px_3px_0px_var(--border-strong)] cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4" aria-hidden="true" />
                        <span>{t.viewArt}</span>
                      </motion.button>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty-skill"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="my-auto py-8 text-center"
                  >
                    <Sparkles className="w-8 h-8 text-[var(--accent)] mx-auto mb-3" aria-hidden="true" />
                    <p className="text-sm font-medium text-[var(--ink-muted)]">{t.hint}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6 pt-4 border-t border-[var(--border-soft)] flex items-center justify-between font-mono-poster text-[11px] text-[var(--ink-muted)] uppercase tracking-widest">
                <span>{t.hint}</span>
              </div>
            </div>
          </PosterReveal>
        </div>
      </div>
    </section>
  );
}
