import { motion } from 'motion/react';
import { ArrowRight, Gamepad2, Lightbulb, Palette } from 'lucide-react';
import { ART_ITEMS, CREATIVE_ESSAYS, UI_COPY } from '../data/portfolioData';
import type { Lang } from '../utils/portfolio';
import { MaskedWords, POSTER_EASE, PosterReveal } from './MotionPrimitives';
import { SectionHeader } from './SectionHeader';

export type CreativeModalState =
  | { kind: 'art'; index: number }
  | { kind: 'game' }
  | { kind: 'thinking' }
  | null;

interface CreativeSectionProps {
  lang: Lang;
  onOpenModal: (state: Exclude<CreativeModalState, null>) => void;
}

export function CreativeSection({ lang, onOpenModal }: CreativeSectionProps) {
  const t = UI_COPY[lang].creative;

  return (
    <section id="creative" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader tag={t.tag} jpSub={t.jpSub} title={t.title} subtitle={t.subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Featured Digital Art & Illustration Bento Card */}
          <PosterReveal direction="left" className="lg:col-span-7 poster-box p-5 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-[var(--border-strong)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--accent)] text-white border-2 border-[var(--border-strong)] flex items-center justify-center shrink-0">
                    <Palette className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-xl text-[var(--ink)] tracking-tight">
                      <MaskedWords key={t.artTitle} text={t.artTitle} stagger={0.04} />
                    </h3>
                    <span className="font-mono-poster text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                      CR-01 // {t.artCount}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed mb-5">
                {t.artDesc}
              </p>

              {/* 6-Artwork Mosaic with staggered entrance */}
              <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 gap-2.5 mb-6">
                {ART_ITEMS.map((art, index) => (
                  <motion.button
                    key={art.id}
                    type="button"
                    initial={{ opacity: 0, scale: 0.88, y: 14 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, amount: 'some' }}
                    transition={{ duration: 0.42, delay: index * 0.055, ease: POSTER_EASE }}
                    whileHover={{ y: -4, scale: 1.04, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onOpenModal({ kind: 'art', index })}
                    aria-label={art.title[lang]}
                    className="group relative aspect-square overflow-hidden border-2 border-[var(--border-strong)] bg-[var(--bg-surface-soft)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2 shadow-[2px_2px_0px_var(--border-strong)] hover:shadow-[4px_4px_0px_var(--accent)] transition-shadow"
                  >
                    <img
                      src={art.thumb}
                      alt={art.title[lang]}
                      loading="eager"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
                    />
                    <span className="absolute bottom-1 left-1 bg-[var(--ink)] text-[var(--bg-canvas)] font-mono-poster text-[10px] font-bold px-1.5 py-0.5 leading-none group-hover:bg-[var(--accent)] group-hover:text-white transition-colors">
                      {art.indexCode}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border-soft)] flex justify-end">
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onOpenModal({ kind: 'art', index: 0 })}
                className="group inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-display font-bold text-xs uppercase tracking-wider px-4 py-2.5 border-2 border-[var(--border-strong)] shadow-[3px_3px_0px_var(--border-strong)] cursor-pointer"
              >
                <span>{t.openArt}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </motion.button>
            </div>
          </PosterReveal>

          {/* Right Column: Gaming + Creative Thinking */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {(['game', 'thinking'] as const).map((essayKey, idx) => {
              const essay = CREATIVE_ESSAYS[essayKey];
              const Icon = essayKey === 'game' ? Gamepad2 : Lightbulb;
              return (
                <PosterReveal
                  key={essay.id}
                  direction="right"
                  delay={0.08 * (idx + 1)}
                  className="poster-box p-5 sm:p-6 flex-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-[var(--border-soft)]">
                      <div className="flex items-center gap-2.5">
                        <motion.div
                          whileHover={{ rotate: -8, scale: 1.08 }}
                          transition={{ type: 'spring', stiffness: 380, damping: 18 }}
                          className="w-9 h-9 bg-[var(--bg-surface-soft)] text-[var(--accent)] border-2 border-[var(--border-strong)] flex items-center justify-center shrink-0"
                        >
                          <Icon className="w-4 h-4" aria-hidden="true" />
                        </motion.div>
                        <h3 className="font-display font-black text-lg sm:text-xl text-[var(--ink)] tracking-tight">
                          <MaskedWords key={`${essay.id}-${lang}`} text={essay.title[lang]} stagger={0.04} />
                        </h3>
                      </div>
                      <span className="font-mono-poster text-xs font-bold text-[var(--ink-muted)]">
                        {essay.code}
                      </span>
                    </div>

                    <p className="text-sm text-[var(--ink-muted)] leading-relaxed mb-5">
                      {essay.short[lang]}
                    </p>
                  </div>

                  <div>
                    <motion.button
                      type="button"
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => onOpenModal({ kind: essayKey })}
                      className="group inline-flex items-center gap-2 bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-soft)] text-[var(--ink)] font-display font-bold text-xs uppercase tracking-wider px-4 py-2 border-2 border-[var(--border-strong)] cursor-pointer"
                    >
                      <span>{t.readMore}</span>
                      <ArrowRight
                        className="w-3.5 h-3.5 text-[var(--accent)] transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </motion.button>
                  </div>
                </PosterReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
