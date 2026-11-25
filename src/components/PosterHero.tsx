import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Heart, Send, Sparkles } from 'lucide-react';
import { PROFILE, UI_COPY } from '../data/portfolioData';
import type { Lang } from '../utils/portfolio';
import {
  MaskedChars,
  MaskedWords,
  POSTER_EASE,
  TypewriterText,
} from './MotionPrimitives';

interface PosterHeroProps {
  lang: Lang;
}

export function PosterHero({ lang }: PosterHeroProps) {
  const t = UI_COPY[lang].hero;
  const [imgSrc, setImgSrc] = useState(PROFILE.heroAvatarUrl);

  return (
    <section id="home" className="pt-4 sm:pt-6 pb-10 sm:pb-14 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Editorial Anime Poster Frame */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: POSTER_EASE }}
          className="relative overflow-hidden border-2 border-[var(--border-strong)] bg-gradient-to-br from-[var(--bg-poster)] via-[#ffd4e5] to-[var(--bg-poster-deep)] dark:from-[#3d1730] dark:via-[#2c1022] dark:to-[#491a38] shadow-[8px_8px_0px_var(--border-strong)]"
        >
          {/* Poster Creases + Halftone Dots */}
          <div className="absolute inset-0 poster-creases pointer-events-none" aria-hidden="true" />
          <div className="absolute inset-0 poster-halftone pointer-events-none opacity-65" aria-hidden="true" />

          {/* Floating Cutesy Poster Sparkles */}
          <div
            aria-hidden="true"
            className="hidden sm:block pointer-events-none select-none absolute left-10 top-24 text-[var(--accent)]/65 text-lg z-10 animate-poster-float"
          >
            ✦
          </div>
          <div
            aria-hidden="true"
            className="hidden sm:block pointer-events-none select-none absolute right-12 top-28 text-white/90 dark:text-[var(--accent-soft)]/70 text-xl z-10 animate-poster-pulse"
          >
            ♡
          </div>

          {/* Top Binary & Registration Micro-Strip */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: POSTER_EASE }}
            className="relative z-20 flex items-center justify-between px-4 sm:px-8 pt-3 sm:pt-4 text-[10px] sm:text-xs font-mono-poster font-bold tracking-[0.22em] text-[var(--ink)]/85 uppercase"
          >
            <span>{t.topLeft}</span>
            <span className="hidden md:inline-flex items-center gap-2 opacity-75" aria-hidden="true">
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
                className="font-display font-black uppercase text-center leading-[0.82] tracking-[-0.04em] text-white dark:text-[#ffd6ea] select-none w-full overflow-hidden [text-shadow:0_6px_0_rgba(223,41,116,0.28)]"
                style={{ fontSize: 'clamp(3.6rem, 15vw, 12.2rem)' }}
              >
                <MaskedChars text="HOSHI" delay={0.1} stagger={0.065} />
              </h1>

              {/* Inverse Rectangular Nameplates right beneath giant masthead */}
              <div className="w-full flex items-center justify-between gap-2 mt-1 sm:mt-2 z-20">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.35, ease: POSTER_EASE }}
                  whileHover={{ x: 2 }}
                  className="inline-flex items-center gap-1.5 bg-white dark:bg-[#230c1a] text-[var(--ink)] border border-[var(--border-strong)] px-2.5 py-0.5 font-mono-poster text-[11px] sm:text-xs font-bold tracking-widest uppercase"
                >
                  <span className="inline-flex animate-poster-pulse">
                    <Heart className="w-3 h-3 text-[var(--accent)] fill-[var(--accent)]" aria-hidden="true" />
                  </span>
                  <span>{t.badgeLeft}</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.35, ease: POSTER_EASE }}
                  whileHover={{ x: -2 }}
                  className="inline-flex items-center gap-1.5 bg-[var(--ink)] text-[var(--bg-canvas)] px-2.5 py-0.5 font-mono-poster text-[11px] sm:text-xs font-bold tracking-widest uppercase"
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
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, delay: 0.3, ease: POSTER_EASE }}
                  whileHover={{ y: -2 }}
                  className="bg-[var(--bg-surface)]/96 dark:bg-[#230d1b]/95 border-2 border-[var(--border-strong)] p-4 sm:p-5 shadow-[4px_4px_0px_var(--border-strong)] transition-shadow"
                >
                  <div className="flex items-center gap-2 text-[11px] font-mono-poster font-bold uppercase tracking-widest text-[var(--accent)] mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{t.status}</span>
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
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, delay: 0.42, ease: POSTER_EASE }}
                  whileHover={{ y: -2 }}
                  className="bg-[var(--bg-surface)]/85 dark:bg-[#230d1b]/85 border-2 border-[var(--border-strong)] p-4"
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

              {/* CENTER COLUMN: Focal Portrait Framed Like Poster Cutout */}
              <div className="lg:col-span-4 z-20 flex flex-col items-center order-1 lg:order-2 lg:-mt-16">
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.65, delay: 0.22, ease: POSTER_EASE }}
                  whileHover={{ y: -4, rotate: 0.7 }}
                  className="relative w-60 sm:w-72 md:w-80 group"
                >
                  <div className="relative bg-white dark:bg-[#220c1a] p-2.5 border-2 border-[var(--border-strong)] shadow-[7px_7px_0px_var(--accent)] group-hover:shadow-[10px_10px_0px_var(--accent)] transition-shadow duration-300">
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
                        className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#df2974]/20 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Graphic credit nameplate */}
                    <div className="mt-2 flex items-center justify-between text-[10px] font-mono-poster font-bold uppercase tracking-wider text-[var(--ink)]">
                      <span className="bg-[var(--ink)] text-[var(--bg-canvas)] px-1.5 py-0.5">
                        Artist : ErlanHoshi
                      </span>
                      <span className="text-[var(--accent)]">Bogor, ID ♡</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT COLUMN: 序章 INTRODUCTION. + Primary CTAs */}
              <div className="lg:col-span-4 z-20 flex flex-col gap-5 order-3">
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, delay: 0.34, ease: POSTER_EASE }}
                  whileHover={{ y: -2 }}
                  className="bg-[var(--bg-surface)]/96 dark:bg-[#230d1b]/95 border-2 border-[var(--border-strong)] p-4 sm:p-5 shadow-[4px_4px_0px_var(--border-strong)]"
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
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      className="group inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider px-4 py-2.5 border-2 border-[var(--border-strong)] shadow-[3px_3px_0px_var(--border-strong)]"
                    >
                      <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                      <span>{t.contactCta}</span>
                    </motion.a>
                    <motion.a
                      href="#projects"
                      whileHover={{ y: -2 }}
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
                  animate={{ opacity: 0.75 }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                  className="hidden lg:flex items-center justify-between px-1 font-mono-poster text-[11px] font-bold tracking-[0.24em] text-[var(--ink)] select-none"
                  aria-hidden="true"
                >
                  <span>01 0 1 00 011</span>
                  <span>11 01 0 1</span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Tilted Giant Bottom Foreground Display Name */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, x: -45, y: 24 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: POSTER_EASE }}
            className="pointer-events-none select-none absolute -bottom-3 sm:-bottom-5 left-[-2%] right-[-2%] z-10 -rotate-3 overflow-hidden"
          >
            <div
              className="font-display font-black uppercase text-center whitespace-nowrap leading-[0.82] tracking-[-0.04em] text-white/90 dark:text-[#ffd6ea]/25 [text-shadow:0_-3px_0_rgba(223,41,116,0.2)]"
              style={{ fontSize: 'clamp(2.4rem, 9.8vw, 8.2rem)' }}
            >
              ERLANGGA HOSHI
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
