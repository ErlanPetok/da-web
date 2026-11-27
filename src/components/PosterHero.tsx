import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Heart, Send, Sparkles } from 'lucide-react';
import { PROFILE, UI_COPY } from '../data/portfolioData';
import type { Lang } from '../utils/portfolio';
import {
  MaskedChars,
  MaskedWords,
  POSTER_EASE,
  PosterMarquee,
  TypewriterText,
} from './MotionPrimitives';

interface PosterHeroProps {
  lang: Lang;
}

const COLORFUL_FLOATERS = [
  {
    char: '✦',
    pos: 'left-[5%] top-[20%]',
    color: 'text-[#df2974] dark:text-[#ff75b5]',
    size: 'text-xl',
    anim: 'animate-poster-float',
  },
  {
    char: '♡',
    pos: 'right-[7%] top-[22%]',
    color: 'text-[#0ea5e9] dark:text-[#38bdf8]',
    size: 'text-2xl',
    anim: 'animate-poster-pulse',
  },
  {
    char: '★',
    pos: 'left-[32%] top-[16%]',
    color: 'text-[#f59e0b] dark:text-[#fbbf24]',
    size: 'text-lg',
    anim: 'animate-poster-float-reverse',
  },
  {
    char: '✿',
    pos: 'right-[31%] top-[17%]',
    color: 'text-[#8b5cf6] dark:text-[#c084fc]',
    size: 'text-xl',
    anim: 'animate-poster-spin-slow',
  },
  {
    char: '♪',
    pos: 'left-[8%] bottom-[22%]',
    color: 'text-[#10b981] dark:text-[#34d399]',
    size: 'text-xl',
    anim: 'animate-poster-float-reverse',
  },
  {
    char: '✦',
    pos: 'right-[6%] bottom-[20%]',
    color: 'text-[#f43f5e] dark:text-[#fb7185]',
    size: 'text-2xl',
    anim: 'animate-poster-float',
  },
] as const;

export function PosterHero({ lang }: PosterHeroProps) {
  const t = UI_COPY[lang].hero;
  const [imgSrc, setImgSrc] = useState(PROFILE.heroAvatarUrl);

  const marqueeItems =
    lang === 'id'
      ? [
          'ERLANHOSHI',
          'WEB DEVELOPER',
          'UI DESIGNER',
          'ILUSTRATOR DIGITAL',
          'SMK AL-HADIID 1',
          'BOGOR, INDONESIA',
        ]
      : [
          'ERLANHOSHI',
          'WEB DEVELOPER',
          'UI DESIGNER',
          'DIGITAL ILLUSTRATOR',
          'SMK AL-HADIID 1',
          'BOGOR, INDONESIA',
        ];

  return (
    <section id="home" className="pt-4 sm:pt-6 pb-8 sm:pb-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Editorial Anime Poster Frame with Vibrant Multi-Color Animated Canvas */}
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: POSTER_EASE }}
          className="relative overflow-hidden border-2 border-[var(--border-strong)] hero-poster-vibrant shadow-[8px_8px_0px_var(--border-strong)]"
        >
          {/* Animated Colorful Spectrum Top Ribbon inside border */}
          <div
            aria-hidden="true"
            className="h-1.5 w-full bg-gradient-to-r from-[#ff4d94] via-[#ffb74d] via-[#5eead4] via-[#60a5fa] to-[#c084fc] border-b border-[var(--border-strong)]/40"
          />

          {/* Decorative Pastel Radial Blobs & Rotating Halo inside Poster (no blur filters) */}
          <div
            aria-hidden="true"
            className="hidden sm:block pointer-events-none absolute -top-14 -left-14 w-64 h-64 rounded-full opacity-55 animate-poster-float"
            style={{
              background:
                'radial-gradient(circle, rgba(255,154,196,0.72) 0%, rgba(255,214,153,0.35) 55%, transparent 74%)',
            }}
          />
          <div
            aria-hidden="true"
            className="hidden sm:block pointer-events-none absolute -bottom-16 -right-12 w-72 h-72 rounded-full opacity-55 animate-poster-float-reverse"
            style={{
              background:
                'radial-gradient(circle, rgba(139,92,246,0.45) 0%, rgba(56,189,248,0.32) 52%, transparent 74%)',
            }}
          />

          {/* Poster Creases + Halftone Dots */}
          <div className="absolute inset-0 poster-creases pointer-events-none" aria-hidden="true" />
          <div className="absolute inset-0 poster-halftone pointer-events-none opacity-75" aria-hidden="true" />

          {/* Floating Colorful Cutesy Poster Sparkles */}
          {COLORFUL_FLOATERS.map((item, idx) => (
            <div
              key={idx}
              aria-hidden="true"
              className={`hidden sm:block pointer-events-none select-none absolute ${item.pos} ${item.color} ${item.size} font-bold z-10 ${item.anim}`}
            >
              {item.char}
            </div>
          ))}

          {/* Top Binary & Registration Micro-Strip */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: POSTER_EASE }}
            className="relative z-20 flex items-center justify-between px-4 sm:px-8 pt-3 sm:pt-4 text-[10px] sm:text-xs font-mono-poster font-bold tracking-[0.22em] text-[var(--ink)]/90 uppercase"
          >
            <span>{t.topLeft}</span>
            <span className="hidden md:inline-flex items-center gap-2 opacity-80" aria-hidden="true">
              <span>11</span>
              <span>01 0 1</span>
              <span>00 011</span>
              <span className="text-[var(--accent)] animate-poster-pulse">♡</span>
              <span>11</span>
              <span>01 0 1</span>
            </span>
            <span>{t.topRight}</span>
          </motion.div>

          {/* Giant Display Typography Layer Behind Portrait (Poster Signature) */}
          <div className="relative z-10 px-4 sm:px-8 pt-2 sm:pt-3">
            <div className="relative flex flex-col items-center">
              <h1
                className="font-display font-black uppercase text-center leading-[0.82] tracking-[-0.04em] text-white dark:text-[#ffe0f0] select-none w-full overflow-hidden [text-shadow:0_6px_0_rgba(223,41,116,0.34),0_12px_0_rgba(139,92,246,0.18)]"
                style={{ fontSize: 'clamp(3.6rem, 15vw, 12.2rem)' }}
              >
                <MaskedChars text="HOSHI" delay={0.1} stagger={0.065} />
              </h1>

              {/* Inverse Rectangular Nameplates right beneath giant masthead */}
              <div className="w-full flex items-center justify-between gap-2 mt-1 sm:mt-2 z-20">
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.35, ease: POSTER_EASE }}
                  whileHover={{ x: 3, scale: 1.03 }}
                  className="inline-flex items-center gap-1.5 bg-white dark:bg-[#230c1a] text-[var(--ink)] border border-[var(--border-strong)] px-2.5 py-0.5 font-mono-poster text-[11px] sm:text-xs font-bold tracking-widest uppercase shadow-[2px_2px_0px_var(--accent)]"
                >
                  <span className="inline-flex animate-poster-pulse">
                    <Heart className="w-3 h-3 text-[var(--accent)] fill-[var(--accent)]" aria-hidden="true" />
                  </span>
                  <span>{t.badgeLeft}</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.35, ease: POSTER_EASE }}
                  whileHover={{ x: -3, scale: 1.03 }}
                  className="inline-flex items-center gap-1.5 bg-[var(--ink)] text-[var(--bg-canvas)] px-2.5 py-0.5 font-mono-poster text-[11px] sm:text-xs font-bold tracking-widest uppercase shadow-[2px_2px_0px_#38bdf8]"
                >
                  <span>{t.badgeRight}</span>
                </motion.div>
              </div>
            </div>

            {/* 3-Column Editorial Poster Composition */}
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center pt-4 pb-16 sm:pb-24">
              {/* Background Giant Stroke Japanese Typography */}
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: POSTER_EASE }}
                className="hidden lg:block pointer-events-none select-none absolute right-6 top-2 font-display font-black text-[10rem] leading-none poster-stroke-text tracking-tight z-0 animate-poster-float"
              >
                星野
              </motion.div>

              {/* LEFT COLUMN: Editorial Name Callout + Personality */}
              <div className="lg:col-span-4 z-20 flex flex-col gap-5 order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, x: -24, rotate: -1 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ duration: 0.55, delay: 0.3, ease: POSTER_EASE }}
                  whileHover={{ y: -3, rotate: -0.4 }}
                  className="bg-[var(--bg-surface)]/96 dark:bg-[#230d1b]/95 border-2 border-[var(--border-strong)] p-4 sm:p-5 shadow-[4px_4px_0px_var(--border-strong)] transition-shadow"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 text-[11px] font-mono-poster font-bold uppercase tracking-widest text-[var(--accent)]">
                      <span className="inline-block animate-poster-spin-slow">
                        <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                      <span>{t.status}</span>
                    </div>
                    <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981]" />
                    </span>
                  </div>
                  <p className="font-display font-black text-xl sm:text-2xl text-[var(--ink)] tracking-tight leading-tight">
                    <MaskedWords text="エルラン・ホシ" delay={0.35} inView={false} />
                  </p>
                  <p className="mt-1.5 font-mono-poster text-xs font-bold text-[var(--accent)] uppercase tracking-wider min-h-[1.25rem]">
                    <TypewriterText phrases={t.roles} />
                  </p>
                  <motion.p
                    key={`motto-${lang}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.45, delay: 0.42 }}
                    className="mt-2.5 text-xs sm:text-sm text-[var(--ink-muted)] italic leading-relaxed"
                  >
                    {t.motto}
                  </motion.p>
                </motion.div>

                {/* PERSONALITY / 人格 Block */}
                <motion.div
                  initial={{ opacity: 0, x: -24, rotate: 0.8 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ duration: 0.55, delay: 0.42, ease: POSTER_EASE }}
                  whileHover={{ y: -3, rotate: 0.4 }}
                  className="bg-[var(--bg-surface)]/92 dark:bg-[#230d1b]/92 border-2 border-[var(--border-strong)] p-4 shadow-[4px_4px_0px_#c084fc]"
                >
                  <div className="flex items-baseline gap-2.5 border-b border-[var(--border-soft)] pb-1.5 mb-2">
                    <span className="font-display font-black text-sm sm:text-base tracking-wider uppercase text-[var(--ink)]">
                      {t.personalityEn}
                    </span>
                    <span className="font-bold text-sm text-[var(--accent)]">
                      / {t.personalityJp}
                    </span>
                  </div>
                  <motion.p
                    key={`desc-${lang}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed"
                  >
                    {t.desc}
                  </motion.p>
                </motion.div>
              </div>

              {/* CENTER COLUMN: Focal Portrait Framed Like Poster Cutout with Rotating Star Halo */}
              <div className="lg:col-span-4 z-20 flex flex-col items-center order-1 lg:order-2 lg:-mt-16 relative">
                {/* Rotating crisp pastel starburst ring behind portrait */}
                <svg
                  viewBox="0 0 240 240"
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-6 w-72 h-72 sm:w-80 sm:h-80 opacity-55 animate-poster-spin-slow"
                >
                  <circle
                    cx="120"
                    cy="120"
                    r="110"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeDasharray="8 10"
                  />
                  <circle
                    cx="120"
                    cy="120"
                    r="96"
                    fill="none"
                    stroke="#df2974"
                    strokeOpacity="0.45"
                    strokeWidth="1.5"
                    strokeDasharray="4 8"
                  />
                </svg>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.65, delay: 0.22, ease: POSTER_EASE }}
                  whileHover={{ y: -6, rotate: 1 }}
                  className="relative w-60 sm:w-72 md:w-80 group"
                >
                  <div className="animate-poster-float">
                    <div className="relative bg-white dark:bg-[#220c1a] p-2.5 border-2 border-[var(--border-strong)] shadow-[7px_7px_0px_var(--accent)] group-hover:shadow-[10px_10px_0px_#8b5cf6] transition-shadow duration-300">
                      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--bg-surface-soft)] border border-[var(--border-soft)]">
                        <img
                          src={imgSrc}
                          alt="Erlangga Juan Fadilah — ErlanHoshi portrait"
                          referrerPolicy="no-referrer"
                          onError={() => {
                            if (imgSrc !== PROFILE.heroAvatarFallback) {
                              setImgSrc(PROFILE.heroAvatarFallback);
                            }
                          }}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Diagonal Print Sheen on Hover */}
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-20deg]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#df2974]/20 via-transparent to-[#38bdf8]/10 pointer-events-none" />
                      </div>

                      {/* Graphic credit nameplate */}
                      <div className="mt-2 flex items-center justify-between text-[10px] font-mono-poster font-bold uppercase tracking-wider text-[var(--ink)]">
                        <span className="bg-[var(--ink)] text-[var(--bg-canvas)] px-1.5 py-0.5">
                          Artist : ErlanHoshi
                        </span>
                        <span className="text-[var(--accent)]">Bogor, ID ♡</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT COLUMN: 序章 INTRODUCTION. + Primary CTAs */}
              <div className="lg:col-span-4 z-20 flex flex-col gap-5 order-3">
                <motion.div
                  initial={{ opacity: 0, x: 24, rotate: 1 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ duration: 0.55, delay: 0.34, ease: POSTER_EASE }}
                  whileHover={{ y: -3, rotate: 0.4 }}
                  className="bg-[var(--bg-surface)]/96 dark:bg-[#230d1b]/95 border-2 border-[var(--border-strong)] p-4 sm:p-5 shadow-[4px_4px_0px_#38bdf8] transition-shadow"
                >
                  <div className="flex items-baseline gap-2 border-b border-[var(--border-soft)] pb-2 mb-3">
                    <motion.span
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.45, delay: 0.45, ease: POSTER_EASE }}
                      className="font-display font-black text-2xl sm:text-3xl text-[var(--accent)] leading-none"
                    >
                      {t.introJp}
                    </motion.span>
                    <span className="font-display font-black text-base sm:text-lg tracking-wider uppercase text-[var(--ink)]">
                      <MaskedWords key={t.introEn} text={t.introEn} delay={0.4} inView={false} />
                    </span>
                  </div>
                  <motion.p
                    key={`intro-body-${lang}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed mb-4"
                  >
                    <strong className="text-[var(--ink)]">{PROFILE.fullName}</strong> — {PROFILE.school}.{' '}
                    {lang === 'id'
                      ? 'Membangun web responsif, antarmuka ramah pengguna, dan ilustrasi karakter ekspresif.'
                      : 'Building responsive web apps, clean UI systems, and expressive character art.'}
                  </motion.p>

                  <div className="flex flex-wrap gap-2.5">
                    <motion.a
                      href="#contact"
                      whileHover={{ y: -2, scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      className="group inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider px-4 py-2.5 border-2 border-[var(--border-strong)] shadow-[3px_3px_0px_var(--border-strong)]"
                    >
                      <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                      <span>{t.contactCta}</span>
                    </motion.a>
                    <motion.a
                      href="#projects"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      className="group inline-flex items-center gap-1.5 bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-soft)] text-[var(--ink)] font-display font-bold text-xs sm:text-sm uppercase tracking-wider px-4 py-2.5 border-2 border-[var(--border-strong)] transition-colors"
                    >
                      <span>{t.projectsCta}</span>
                      <ArrowDownRight className="w-4 h-4 text-[var(--accent)] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden="true" />
                    </motion.a>
                  </div>
                </motion.div>

                {/* Micro binary graphic accent */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.85 }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                  className="hidden lg:flex items-center justify-between px-1 font-mono-poster text-[11px] font-bold tracking-[0.24em] text-[var(--ink)] select-none"
                  aria-hidden="true"
                >
                  <span>01 0 1 00 011</span>
                  <span className="text-[var(--accent)] animate-poster-pulse">✦</span>
                  <span>11 01 0 1</span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Tilted Giant Bottom Foreground Display Name with Gentle Drift */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, x: -45, y: 24 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: POSTER_EASE }}
            className="pointer-events-none select-none absolute -bottom-3 sm:-bottom-5 left-[-3%] right-[-3%] z-10 overflow-hidden"
          >
            <div
              className="font-display font-black uppercase text-center whitespace-nowrap leading-[0.82] tracking-[-0.04em] text-white/95 dark:text-[#ffd6ea]/30 [text-shadow:0_-3px_0_rgba(223,41,116,0.24)] animate-poster-drift"
              style={{ fontSize: 'clamp(2.4rem, 9.8vw, 8.2rem)' }}
            >
              ERLANGGA HOSHI
            </div>
          </motion.div>
        </motion.div>

        {/* Kinetic Rainbow-Sakura Ticker Strip directly beneath Hero Poster */}
        <PosterMarquee items={marqueeItems} className="mt-5" />
      </div>
    </section>
  );
}
