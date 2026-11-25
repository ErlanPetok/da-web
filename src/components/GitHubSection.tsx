import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, GitBranch, GitFork, Github, Star } from 'lucide-react';
import { PROFILE, UI_COPY } from '../data/portfolioData';
import type { Lang } from '../utils/portfolio';
import { POSTER_EASE, PosterReveal } from './MotionPrimitives';
import { SectionHeader } from './SectionHeader';

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
}

interface GitHubSectionProps {
  lang: Lang;
}

export function GitHubSection({ lang }: GitHubSectionProps) {
  const t = UI_COPY[lang].github;
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    async function loadRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${PROFILE.githubHandle}/repos?sort=updated&per_page=6`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error('GitHub API unavailable');
        const data = (await res.json()) as GitHubRepo[];
        const selected = data.filter((r) => !r.fork).slice(0, 4);
        if (!selected.length) throw new Error('No repositories');
        if (active) {
          setRepos(selected);
          setStatus('loaded');
        }
      } catch {
        if (active) setStatus('error');
      }
    }

    loadRepos();
    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  return (
    <section id="github" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader tag={t.tag} jpSub={t.jpSub} title={t.title} subtitle={t.subtitle} />

        <PosterReveal className="poster-box p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b-2 border-[var(--border-strong)]">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: -6, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 360, damping: 20 }}
                className="w-12 h-12 bg-[var(--ink)] text-[var(--bg-canvas)] flex items-center justify-center shrink-0 border-2 border-[var(--border-strong)]"
              >
                <Github className="w-6 h-6" aria-hidden="true" />
              </motion.div>
              <div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-[var(--ink)] tracking-tight">
                  {PROFILE.githubHandle}
                </h3>
                <p className="text-sm text-[var(--ink-muted)]">{t.desc}</p>
              </div>
            </div>

            <motion.a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-display font-bold text-xs uppercase tracking-wider px-4 py-2.5 border-2 border-[var(--border-strong)] shadow-[3px_3px_0px_var(--border-strong)] shrink-0"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              <span>{t.visit}</span>
            </motion.a>
          </div>

          {status === 'loading' && (
            <p className="font-mono-poster text-xs font-bold text-[var(--ink-muted)] py-6 text-center animate-pulse">
              {t.loading}
            </p>
          )}

          {status === 'error' && (
            <div className="p-6 bg-[var(--bg-surface-soft)] border border-[var(--border-soft)] text-center">
              <p className="text-sm text-[var(--ink-muted)] mb-2">{t.unavailable}</p>
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono-poster text-xs font-bold text-[var(--accent)] hover:underline uppercase"
              >
                <span>{t.browseAll}</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          )}

          {status === 'loaded' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repos.map((repo, idx) => (
                <motion.article
                  key={repo.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{ duration: 0.4, delay: idx * 0.06, ease: POSTER_EASE }}
                  whileHover={{ y: -3, x: 1 }}
                  className="p-4 sm:p-5 bg-[var(--bg-surface-soft)] border-2 border-[var(--border-strong)] flex flex-col justify-between gap-3"
                >
                  <div>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 font-display font-black text-base sm:text-lg text-[var(--ink)] hover:text-[var(--accent)] transition-colors mb-1.5"
                    >
                      <span>{repo.name}</span>
                      <ExternalLink
                        className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                    <p className="text-xs sm:text-sm text-[var(--ink-muted)] line-clamp-2">
                      {repo.description || 'Public repository'}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[var(--border-soft)] font-mono-poster text-xs font-bold text-[var(--ink-muted)]">
                    <span className="inline-flex items-center gap-1 text-[var(--ink)]">
                      <GitBranch className="w-3.5 h-3.5 text-[var(--accent)]" aria-hidden="true" />
                      {repo.language || 'Code'}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[var(--accent)]" aria-hidden="true" />
                      {repo.stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-[var(--accent)]" aria-hidden="true" />
                      {repo.forks_count}
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </PosterReveal>
      </div>
    </section>
  );
}
