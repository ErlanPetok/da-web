import { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, ExternalLink, GraduationCap, Mail, MapPin, User } from 'lucide-react';
import { PROFILE, UI_COPY } from '../data/portfolioData';
import type { Lang } from '../utils/portfolio';
import { MaskedWords, POSTER_EASE, PosterReveal } from './MotionPrimitives';
import { SectionHeader } from './SectionHeader';

interface AboutPosterProps {
  lang: Lang;
}

export function AboutPoster({ lang }: AboutPosterProps) {
  const t = UI_COPY[lang].about;
  const [imgSrc, setImgSrc] = useState(PROFILE.aboutPortraitUrl);

  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader tag={t.tag} jpSub={t.jpSub} title={t.title} subtitle={t.subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Portrait Frame */}
          <PosterReveal direction="left" className="lg:col-span-5">
            <div className="poster-box p-3 sm:p-4 relative group">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--border-soft)] font-mono-poster text-[11px] font-bold uppercase tracking-widest text-[var(--ink-muted)]">
                <span>FILE // 2008-ID</span>
                <span className="text-[var(--accent)]">ERLANHOSHI ♡</span>
              </div>
              <div className="relative aspect-[4/4.2] overflow-hidden border border-[var(--border-strong)] bg-[var(--bg-surface-soft)]">
                <img
                  src={imgSrc}
                  alt="Erlangga Juan Fadilah portrait"
                  loading="eager"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    if (imgSrc !== PROFILE.aboutPortraitFallback) {
                      setImgSrc(PROFILE.aboutPortraitFallback);
                    }
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {t.funFacts.map((fact, idx) => (
                  <motion.span
                    key={fact}
                    initial={{ opacity: 0, scale: 0.85, y: 6 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, amount: 'some' }}
                    transition={{ duration: 0.35, delay: 0.08 + idx * 0.06, ease: POSTER_EASE }}
                    whileHover={{ y: -2, rotate: idx % 2 === 0 ? -2 : 2 }}
                    className="px-2.5 py-1 border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] text-xs font-semibold text-[var(--ink)] cursor-default"
                  >
                    {fact}
                  </motion.span>
                ))}
              </div>
            </div>
          </PosterReveal>

          {/* Editorial Bio + Specs Grid */}
          <PosterReveal direction="right" delay={0.1} className="lg:col-span-7 poster-box p-6 sm:p-8">
            <motion.div
              initial={{ opacity: 0, x: -12, scale: 0.94 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 'some' }}
              whileHover={{ scale: 1.04, x: 2 }}
              transition={{ duration: 0.4, ease: POSTER_EASE }}
              className="inline-flex items-center gap-2 bg-[var(--accent)] text-white font-mono-poster text-xs font-bold uppercase tracking-widest px-2.5 py-1 mb-4 shadow-[2px_2px_0px_var(--border-strong)]"
            >
              <span className="w-2 h-2 rounded-full bg-[#bbf7d0] animate-pulse" aria-hidden="true" />
              <span>
                {t.labels.freelance}: {t.labels.freelanceVal}
              </span>
            </motion.div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-[var(--ink)] tracking-tight mb-4">
              <MaskedWords key={t.role} text={t.role} stagger={0.04} />
            </h3>
            <p className="text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed mb-4">
              {t.p1}
            </p>
            <p className="text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed mb-6">
              {t.p2}
            </p>

            {/* Structured Info Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t-2 border-[var(--border-strong)] pt-6">
              {[
                {
                  key: 'name',
                  icon: <User className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" aria-hidden="true" />,
                  label: t.labels.name,
                  value: <div className="text-sm font-bold text-[var(--ink)]">{PROFILE.fullName}</div>,
                  span2: false,
                },
                {
                  key: 'birth',
                  icon: <Calendar className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" aria-hidden="true" />,
                  label: t.labels.birth,
                  value: <div className="text-sm font-bold text-[var(--ink)]">{PROFILE.birthYear}</div>,
                  span2: false,
                },
                {
                  key: 'location',
                  icon: <MapPin className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" aria-hidden="true" />,
                  label: t.labels.location,
                  value: (
                    <a
                      href={PROFILE.locationMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
                    >
                      <span>{PROFILE.location}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[var(--accent)]" aria-hidden="true" />
                    </a>
                  ),
                  span2: false,
                },
                {
                  key: 'edu',
                  icon: <GraduationCap className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" aria-hidden="true" />,
                  label: t.labels.edu,
                  value: <div className="text-sm font-bold text-[var(--ink)]">{PROFILE.school}</div>,
                  span2: false,
                },
                {
                  key: 'email',
                  icon: <Mail className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" aria-hidden="true" />,
                  label: t.labels.email,
                  value: (
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="text-sm font-bold text-[var(--ink)] hover:text-[var(--accent)] break-all transition-colors"
                    >
                      {PROFILE.email}
                    </a>
                  ),
                  span2: true,
                },
                {
                  key: 'freelance',
                  icon: <Briefcase className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" aria-hidden="true" />,
                  label: t.labels.freelance,
                  value: <div className="text-sm font-bold text-[var(--accent)]">{t.labels.freelanceVal}</div>,
                  span2: true,
                },
              ].map((cell, idx) => (
                <motion.div
                  key={cell.key}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{ duration: 0.4, delay: 0.05 * idx, ease: POSTER_EASE }}
                  whileHover={{ x: 3 }}
                  className={`flex items-start gap-3 p-3 bg-[var(--bg-surface-soft)] border border-[var(--border-soft)] hover:border-[var(--accent)] transition-colors ${
                    cell.span2 ? 'sm:col-span-2' : ''
                  }`}
                >
                  {cell.icon}
                  <div className="min-w-0">
                    <div className="font-mono-poster text-[11px] font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                      {cell.label}
                    </div>
                    {cell.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </PosterReveal>
        </div>
      </div>
    </section>
  );
}
