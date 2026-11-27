import { motion } from 'motion/react';
import { TIMELINE_ITEMS, UI_COPY } from '../data/portfolioData';
import type { Lang } from '../utils/portfolio';
import { MaskedWords, POSTER_EASE } from './MotionPrimitives';
import { SectionHeader } from './SectionHeader';

interface TimelineSectionProps {
  lang: Lang;
}

export function TimelineSection({ lang }: TimelineSectionProps) {
  const t = UI_COPY[lang].timeline;

  return (
    <section id="timeline" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader tag={t.tag} jpSub={t.jpSub} title={t.title} subtitle={t.subtitle} />

        <div className="relative">
          {/* Animated vertical drawing spine */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.9, ease: POSTER_EASE }}
            className="origin-top absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--border-strong)] md:-translate-x-1/2"
          />

          <div className="space-y-8">
            {TIMELINE_ITEMS.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isLeft ? 'md:justify-start' : 'md:justify-end'
                  }`}
                >
                  {/* Animated Star Node Marker */}
                  <motion.div
                    aria-hidden="true"
                    initial={{ scale: 0, rotate: -120 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true, amount: 'some' }}
                    whileHover={{ scale: 1.25, rotate: 90 }}
                    transition={{
                      type: 'spring',
                      stiffness: 340,
                      damping: 18,
                      delay: index * 0.07,
                    }}
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 w-6 h-6 bg-[var(--accent)] border-2 border-[var(--border-strong)] flex items-center justify-center text-[11px] text-white font-bold z-10 top-6 md:top-1/2 md:-translate-y-1/2 shadow-[2px_2px_0px_var(--border-strong)]"
                  >
                    <span className="animate-poster-spin-slow inline-block">✦</span>
                  </motion.div>

                  {/* Card sliding in from left/right */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -32 : 32, scale: 0.97 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, amount: 'some' }}
                    transition={{ duration: 0.52, delay: index * 0.07, ease: POSTER_EASE }}
                    className={`w-full pl-12 md:pl-0 md:w-[calc(50%-2rem)] ${
                      isLeft ? 'md:pr-0' : 'md:pl-0'
                    }`}
                  >
                    <motion.article
                      whileHover={{ y: -4, x: isLeft ? 3 : -3 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                      className="poster-box p-5 sm:p-6 group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-3 border-b border-[var(--border-soft)] pb-2">
                        <span className="bg-[var(--accent)] text-white font-mono-poster text-xs font-bold uppercase tracking-wider px-2.5 py-0.5">
                          {item.date[lang]}
                        </span>
                        <span className="font-mono-poster text-xs font-bold text-[var(--ink-muted)]">
                          #{item.code}
                        </span>
                      </div>
                      <h3 className="font-display font-black text-lg sm:text-xl text-[var(--ink)] tracking-tight mb-1">
                        <MaskedWords key={`${item.id}-${lang}`} text={item.title[lang]} stagger={0.04} />
                      </h3>
                      <h4 className="font-mono-poster text-xs font-bold text-[var(--accent)] uppercase tracking-wider mb-2">
                        {item.sub[lang]}
                      </h4>
                      <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                        {item.desc[lang]}
                      </p>
                    </motion.article>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
