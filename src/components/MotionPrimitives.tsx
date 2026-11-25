import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useInView } from 'motion/react';
import { splitWords } from '../utils/portfolio';

export const POSTER_EASE = [0.22, 1, 0.36, 1] as const;

interface MaskedWordsProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  inView?: boolean;
}

export function MaskedWords({
  text,
  className = '',
  delay = 0,
  stagger = 0.055,
  inView = true,
}: MaskedWordsProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 'some' });
  const shouldShow = !inView || isInView;
  const words = splitWords(text);

  return (
    <span ref={containerRef} className={`inline-flex flex-wrap gap-x-[0.26em] ${className}`}>
      {words.map((word, idx) => (
        <span key={`${word}-${idx}`} className="inline-block overflow-hidden align-bottom py-[0.04em]">
          <motion.span
            className="inline-block"
            initial={{ y: '112%', opacity: 0 }}
            animate={shouldShow ? { y: '0%', opacity: 1 } : { y: '112%', opacity: 0 }}
            transition={{
              duration: 0.52,
              delay: delay + idx * stagger,
              ease: POSTER_EASE,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

interface MaskedCharsProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function MaskedChars({
  text,
  className = '',
  delay = 0.05,
  stagger = 0.06,
}: MaskedCharsProps) {
  const chars = Array.from(text);

  return (
    <span className={`inline-flex justify-center ${className}`}>
      {chars.map((char, idx) => (
        <span key={`${char}-${idx}`} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '105%', opacity: 0, rotate: -4 }}
            animate={{ y: '0%', opacity: 1, rotate: 0 }}
            transition={{
              duration: 0.65,
              delay: delay + idx * stagger,
              ease: POSTER_EASE,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

interface TypewriterTextProps {
  phrases: readonly string[];
  className?: string;
}

export function TypewriterText({ phrases, className = '' }: TypewriterTextProps) {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charCount, setCharCount] = useState(() => phrases[0]?.length ?? 0);
  const [deleting, setDeleting] = useState(false);

  const safeIdx = phraseIdx % phrases.length;
  const target = phrases[safeIdx] ?? '';

  useEffect(() => {
    setPhraseIdx(0);
    setDeleting(false);
    setCharCount(phrases[0]?.length ?? 0);
  }, [phrases]);

  useEffect(() => {
    let delay = deleting ? 36 : 62;
    if (!deleting && charCount === target.length) {
      delay = 2000;
    } else if (deleting && charCount === 0) {
      delay = 280;
    }

    const timer = window.setTimeout(() => {
      if (!deleting) {
        if (charCount < target.length) {
          setCharCount((c) => c + 1);
        } else {
          setDeleting(true);
        }
      } else {
        if (charCount > 0) {
          setCharCount((c) => c - 1);
        } else {
          setDeleting(false);
          setPhraseIdx((i) => (i + 1) % phrases.length);
        }
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [charCount, deleting, target, phrases.length]);

  const displayed = target.slice(0, charCount);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{displayed || '\u00A0'}</span>
      <span
        aria-hidden="true"
        className="inline-block w-2 h-[1em] bg-[var(--accent)] ml-1.5 align-middle animate-cursor-blink"
      />
    </span>
  );
}

interface PosterRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}

export function PosterReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: PosterRevealProps) {
  const initialOffset =
    direction === 'left'
      ? { x: -24, y: 0 }
      : direction === 'right'
      ? { x: 24, y: 0 }
      : { x: 0, y: 22 };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{ duration: 0.55, delay, ease: POSTER_EASE }}
    >
      {children}
    </motion.div>
  );
}
