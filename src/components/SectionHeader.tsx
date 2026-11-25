import { motion } from 'motion/react';
import { MaskedWords, POSTER_EASE } from './MotionPrimitives';

interface SectionHeaderProps {
  tag: string;
  jpSub: string;
  title: string;
  subtitle: string;
}

export function SectionHeader({ tag, jpSub, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-10 sm:mb-12">
      <div className="relative pb-3 mb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <motion.span
              initial={{ opacity: 0, x: -12, scale: 0.92 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.4, ease: POSTER_EASE }}
              className="inline-block bg-[var(--ink)] text-[var(--bg-canvas)] font-mono-poster text-xs font-bold tracking-widest px-2.5 py-1 uppercase"
            >
              {tag}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.45, delay: 0.08, ease: POSTER_EASE }}
              className="font-mono-poster text-xs font-bold tracking-[0.2em] text-[var(--accent)] uppercase"
            >
              {jpSub}
            </motion.span>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.75 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hidden sm:flex items-center gap-2 font-mono-poster text-[11px] tracking-[0.25em] text-[var(--ink-muted)] select-none"
            aria-hidden="true"
          >
            <span>11</span>
            <span>01 0 1</span>
            <span className="inline-block text-[var(--accent)] animate-poster-pulse">♡</span>
            <span>00 011</span>
          </motion.div>
        </div>

        {/* Drawing hairline rule */}
        <motion.div
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.65, ease: POSTER_EASE }}
          className="origin-left absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--border-strong)]"
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[var(--ink)] leading-none">
          <MaskedWords key={title} text={title} stagger={0.07} />
        </h2>
        <motion.p
          key={subtitle}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.5, delay: 0.14, ease: POSTER_EASE }}
          className="text-sm sm:text-base font-medium text-[var(--ink-muted)] max-w-md"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}
