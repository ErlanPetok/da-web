import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Gamepad2, Lightbulb, X } from 'lucide-react';
import { ART_ITEMS, CREATIVE_ESSAYS } from '../data/portfolioData';
import { getGalleryDirection, stepGalleryIndex, type Lang } from '../utils/portfolio';
import type { CreativeModalState } from './CreativeSection';
import { POSTER_EASE } from './MotionPrimitives';

interface CreativeModalProps {
  modalState: CreativeModalState;
  lang: Lang;
  onChangeState: (state: CreativeModalState) => void;
}

export function CreativeModal({ modalState, lang, onChangeState }: CreativeModalProps) {
  const isArt = modalState?.kind === 'art';
  const artIndex = isArt ? modalState.index : 0;
  const prevIndexRef = useRef<number>(artIndex);
  const [direction, setDirection] = useState<1 | -1>(1);

  const navigateArt = (nextIndex: number) => {
    setDirection(getGalleryDirection(artIndex, nextIndex, ART_ITEMS.length));
    prevIndexRef.current = nextIndex;
    onChangeState({ kind: 'art', index: nextIndex });
  };

  useEffect(() => {
    if (!modalState) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onChangeState(null);
      } else if (modalState.kind === 'art' && e.key === 'ArrowLeft') {
        setDirection(-1);
        onChangeState({
          kind: 'art',
          index: stepGalleryIndex(modalState.index, -1, ART_ITEMS.length),
        });
      } else if (modalState.kind === 'art' && e.key === 'ArrowRight') {
        setDirection(1);
        onChangeState({
          kind: 'art',
          index: stepGalleryIndex(modalState.index, 1, ART_ITEMS.length),
        });
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [modalState, onChangeState]);

  const activeArt = isArt ? ART_ITEMS[artIndex] : null;
  const activeEssay = modalState && modalState.kind !== 'art' ? CREATIVE_ESSAYS[modalState.kind] : null;

  return (
    <AnimatePresence>
      {modalState && (
        <motion.div
          key="creative-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/82 flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="creativeModalTitle"
          onClick={() => onChangeState(null)}
        >
          <motion.div
            key="creative-modal-panel"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.26, ease: POSTER_EASE }}
            className="poster-box w-full max-w-4xl max-h-[92vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              type="button"
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onChangeState(null)}
              aria-label={lang === 'id' ? 'Tutup' : 'Close'}
              className="absolute top-3 right-3 z-20 w-9 h-9 bg-[var(--bg-surface)] text-[var(--ink)] border-2 border-[var(--border-strong)] hover:bg-[var(--accent)] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </motion.button>

            {activeArt ? (
              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Artwork Stage with direction-aware animated slide */}
                <div className="md:col-span-7 relative bg-[#1c0914] flex items-center justify-center min-h-[280px] sm:min-h-[420px] border-b-2 md:border-b-0 md:border-r-2 border-[var(--border-strong)] p-3 overflow-hidden">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.img
                      key={activeArt.id}
                      custom={direction}
                      initial={{ opacity: 0, x: direction * 44, scale: 0.97 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: direction * -44, scale: 0.97 }}
                      transition={{ duration: 0.28, ease: POSTER_EASE }}
                      src={activeArt.full}
                      alt={activeArt.title[lang]}
                      className="max-h-[60vh] w-auto object-contain"
                    />
                  </AnimatePresence>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    aria-label={lang === 'id' ? 'Karya sebelumnya' : 'Previous artwork'}
                    onClick={() => navigateArt(stepGalleryIndex(artIndex, -1, ART_ITEMS.length))}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-[var(--bg-surface)]/95 text-[var(--ink)] border-2 border-[var(--border-strong)] hover:bg-[var(--accent)] hover:text-white flex items-center justify-center cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    aria-label={lang === 'id' ? 'Karya berikutnya' : 'Next artwork'}
                    onClick={() => navigateArt(stepGalleryIndex(artIndex, 1, ART_ITEMS.length))}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-[var(--bg-surface)]/95 text-[var(--ink)] border-2 border-[var(--border-strong)] hover:bg-[var(--accent)] hover:text-white flex items-center justify-center cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Artwork Details + Thumbnail Strip */}
                <div className="md:col-span-5 p-6 flex flex-col justify-between gap-5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeArt.id}-${lang}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22, ease: POSTER_EASE }}
                    >
                      <div className="font-mono-poster text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-2">
                        ARTWORK {artIndex + 1} / {ART_ITEMS.length} · #{activeArt.id}
                      </div>
                      <h3
                        id="creativeModalTitle"
                        className="font-display font-black text-2xl text-[var(--ink)] tracking-tight mb-3"
                      >
                        {activeArt.title[lang]}
                      </h3>
                      <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                        {activeArt.desc[lang]}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div>
                    <div className="font-mono-poster text-[11px] font-bold uppercase tracking-widest text-[var(--ink-muted)] mb-2">
                      {lang === 'id' ? 'Pilih Karya' : 'Select Artwork'}
                    </div>
                    <div className="grid grid-cols-6 gap-1.5">
                      {ART_ITEMS.map((item, idx) => (
                        <motion.button
                          key={item.id}
                          type="button"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.92 }}
                          onClick={() => navigateArt(idx)}
                          aria-label={item.title[lang]}
                          aria-current={idx === artIndex ? 'true' : 'false'}
                          className={`aspect-square overflow-hidden border-2 cursor-pointer transition-opacity ${
                            idx === artIndex
                              ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/40 opacity-100'
                              : 'border-[var(--border-soft)] opacity-75 hover:opacity-100'
                          }`}
                        >
                          <img src={item.thumb} alt="" className="w-full h-full object-cover" />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : activeEssay ? (
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-[var(--border-strong)]">
                  <div className="w-10 h-10 bg-[var(--accent)] text-white border-2 border-[var(--border-strong)] flex items-center justify-center shrink-0">
                    {activeEssay.id === 'game' ? (
                      <Gamepad2 className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <Lightbulb className="w-5 h-5" aria-hidden="true" />
                    )}
                  </div>
                  <div>
                    <span className="font-mono-poster text-[11px] font-bold uppercase tracking-widest text-[var(--accent)] block">
                      {activeEssay.code} // CREATIVE NOTE
                    </span>
                    <h3
                      id="creativeModalTitle"
                      className="font-display font-black text-2xl text-[var(--ink)] tracking-tight"
                    >
                      {activeEssay.title[lang]}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {activeEssay.paras[lang].map((para) => (
                    <p key={para} className="text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeEssay.points[lang].map(([heading, desc], i) => (
                    <motion.li
                      key={heading}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + i * 0.06, ease: POSTER_EASE }}
                      className="p-4 bg-[var(--bg-surface-soft)] border-2 border-[var(--border-strong)]"
                    >
                      <strong className="block font-display font-bold text-sm text-[var(--ink)] mb-1">
                        {heading}
                      </strong>
                      <span className="text-xs text-[var(--ink-muted)] leading-relaxed block">
                        {desc}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
