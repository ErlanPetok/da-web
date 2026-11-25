import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, ChevronUp, ExternalLink, Pause, Play, Sparkles, Volume2 } from 'lucide-react';
import { PROFILE, UI_COPY } from '../data/portfolioData';
import type { Lang } from '../utils/portfolio';
import {
  playClick,
  setMasterVolume,
  startSynthBgm,
  stopSynthBgm,
} from '../utils/soundEngine';
import { POSTER_EASE } from './MotionPrimitives';

interface MusicDockProps {
  lang: Lang;
  expanded: boolean;
  visibleOnMobile?: boolean;
  onToggleExpanded: () => void;
}

type AudioMode = 'synth' | 'youtube';

export function MusicDock({
  lang,
  expanded,
  visibleOnMobile = true,
  onToggleExpanded,
}: MusicDockProps) {
  const t = UI_COPY[lang].music;
  const [mode, setMode] = useState<AudioMode>('synth');
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(60);

  useEffect(() => {
    setMasterVolume(volume / 100);
  }, [volume]);

  useEffect(() => {
    if (mode === 'synth' && playing) {
      startSynthBgm();
    } else {
      stopSynthBgm();
    }
    return () => {
      stopSynthBgm();
    };
  }, [mode, playing]);

  const handleTogglePlay = () => {
    const next = !playing;
    setPlaying(next);
    if (mode === 'youtube' && next && !expanded) {
      onToggleExpanded();
    }
  };

  const handleSwitchMode = (nextMode: AudioMode) => {
    if (nextMode === mode) return;
    playClick();
    setMode(nextMode);
    if (nextMode === 'youtube' && playing && !expanded) {
      onToggleExpanded();
    }
  };

  const embedUrl = `https://www.youtube.com/embed/${PROFILE.music.youtubeId}?rel=0&modestbranding=1&autoplay=${
    playing && mode === 'youtube' ? 1 : 0
  }`;
  const watchUrl = `https://www.youtube.com/watch?v=${PROFILE.music.youtubeId}`;

  return (
    <aside
      aria-label="Soundtrack player"
      className={`fixed bottom-3 left-3 sm:bottom-4 sm:left-4 z-40 max-w-[320px] ${
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
            className="mb-2 poster-box p-2.5 bg-[var(--bg-surface)] w-[290px] sm:w-[310px]"
          >
            {/* Audio Source Switcher */}
            <div className="grid grid-cols-2 gap-1.5 mb-2.5">
              <button
                type="button"
                data-sfx-handled="true"
                onClick={() => handleSwitchMode('synth')}
                className={`px-2 py-1 border border-[var(--border-strong)] font-mono-poster text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                  mode === 'synth'
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--bg-surface-soft)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
                }`}
              >
                <Sparkles className="w-3 h-3" aria-hidden="true" />
                <span>{t.modeSynth}</span>
              </button>
              <button
                type="button"
                data-sfx-handled="true"
                onClick={() => handleSwitchMode('youtube')}
                className={`px-2 py-1 border border-[var(--border-strong)] font-mono-poster text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                  mode === 'youtube'
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--bg-surface-soft)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
                }`}
              >
                {t.modeYt}
              </button>
            </div>

            {mode === 'youtube' ? (
              <>
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
              </>
            ) : (
              <div className="p-3 border border-[var(--border-soft)] bg-[var(--bg-surface-soft)]">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-display font-black text-xs text-[var(--ink)]">
                    {t.synthTitle}
                  </span>
                  <span className="font-mono-poster text-[10px] font-bold text-[var(--accent)] uppercase">
                    {playing ? 'LIVE ♪' : 'READY'}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--ink-muted)] leading-snug">{t.synthHint}</p>
              </div>
            )}
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
            {mode === 'synth' ? t.synthTitle : PROFILE.music.title}
          </div>
          <div className="font-mono-poster text-[10px] font-bold text-[var(--accent)] truncate">
            {mode === 'synth' ? t.synthArtist : PROFILE.music.artist}
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
