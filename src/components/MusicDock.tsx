import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, ChevronUp, ExternalLink, Pause, Play, Volume2 } from 'lucide-react';
import { PROFILE, UI_COPY } from '../data/portfolioData';
import type { Lang } from '../utils/portfolio';
import { POSTER_EASE } from './MotionPrimitives';

interface MusicDockProps {
  lang: Lang;
  expanded: boolean;
  visibleOnMobile?: boolean;
  onToggleExpanded: () => void;
}

export function MusicDock({
  lang,
  expanded,
  visibleOnMobile = true,
  onToggleExpanded,
}: MusicDockProps) {
  const t = UI_COPY[lang].music;
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(60);

  const handleTogglePlay = () => {
    const next = !playing;
    setPlaying(next);
    if (next && !expanded) {
      onToggleExpanded();
    }
  };

  const embedUrl = `https://www.youtube.com/embed/${PROFILE.music.youtubeId}?rel=0&modestbranding=1&autoplay=${
    playing ? 1 : 0
  }`;
  const watchUrl = `https://www.youtube.com/watch?v=${PROFILE.music.youtubeId}`;

  return (
    <aside
      aria-label="Soundtrack player"
      className={`fixed bottom-3 left-3 sm:bottom-4 sm:left-4 z-40 max-w-[300px] ${
        visibleOnMobile ? 'block' : 'hidden sm:block'
      }`}
    >
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.22, ease: POSTER_EASE }}
            className="mb-2 poster-box p-2.5 bg-[var(--bg-surface)] w-[280px] sm:w-[300px]"
          >
            <div className="aspect-video w-full bg-[#1c0914] border border-[var(--border-soft)] overflow-hidden mb-2">
              <iframe
                title={`${PROFILE.music.title} — ${PROFILE.music.artist}`}
                src={embedUrl}
                allow="autoplay; encrypted-media; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full border-0"
              />
            </div>
            <div className="flex items-center justify-between gap-2 text-[10px] font-mono-poster text-[var(--ink-muted)]">
              <span className="truncate">{t.hostHint}</span>
              <a
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[var(--accent)] font-bold shrink-0 hover:underline"
              >
                <span>{t.ytOpen}</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ y: -1 }}
        className="poster-box px-2.5 py-1.5 sm:px-3 sm:py-2 flex items-center gap-2 sm:gap-2.5 bg-[var(--bg-surface)]"
      >
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={handleTogglePlay}
          aria-label={playing ? t.pause : t.play}
          className="w-7 h-7 sm:w-8 sm:h-8 bg-[var(--accent)] text-white border border-[var(--border-strong)] flex items-center justify-center shrink-0 cursor-pointer hover:bg-[var(--accent-hover)]"
        >
          {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </motion.button>

        <div className="min-w-0 hidden sm:block">
          <div className="font-display font-black text-xs text-[var(--ink)] truncate leading-tight">
            {PROFILE.music.title}
          </div>
          <div className="font-mono-poster text-[10px] font-bold text-[var(--accent)] truncate">
            {PROFILE.music.artist}
          </div>
        </div>

        {/* Equalizer */}
        <div
          className={`flex items-end gap-0.5 h-4 shrink-0 ${playing ? 'eq-active' : ''}`}
          aria-hidden="true"
        >
          <span className="w-1 h-4 bg-[var(--accent)] eq-bar" />
          <span className="w-1 h-4 bg-[var(--accent-soft)] eq-bar" />
          <span className="w-1 h-4 bg-[var(--accent)] eq-bar" />
          <span className="w-1 h-4 bg-[var(--accent-soft)] eq-bar" />
        </div>

        <div className="hidden sm:flex items-center gap-1">
          <Volume2 className="w-3.5 h-3.5 text-[var(--ink-muted)]" aria-hidden="true" />
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="Volume"
            className="w-14 accent-[var(--accent)] cursor-pointer"
          />
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={onToggleExpanded}
          aria-expanded={expanded}
          aria-label={expanded ? t.hideVideo : t.showVideo}
          className="w-7 h-7 border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] text-[var(--ink)] flex items-center justify-center shrink-0 cursor-pointer hover:bg-[var(--accent)] hover:text-white"
        >
          {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </motion.button>
      </motion.div>
    </aside>
  );
}
