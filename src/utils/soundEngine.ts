// Lightweight Web Audio API sound engine for ErlanHoshi portfolio
// Synthesizes delicate UI feedback and an optional sakura music-box ambient loop
// without external audio files or runtime dependencies.

let audioCtx: AudioContext | null = null;
let sfxEnabledState = true;
let masterVolumeState = 0.6;
let bgmTimer: number | null = null;
let bgmStep = 0;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  if (!audioCtx) {
    audioCtx = new Ctx();
  }
  if (audioCtx.state === 'suspended') {
    void audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isSfxEnabled(): boolean {
  return sfxEnabledState;
}

export function setSfxEnabled(enabled: boolean): void {
  sfxEnabledState = enabled;
}

export function getMasterVolume(): number {
  return masterVolumeState;
}

export function setMasterVolume(normalizedVolume: number): void {
  masterVolumeState = Math.max(0, Math.min(1, normalizedVolume));
}

function playTone(options: {
  freqStart: number;
  freqEnd?: number;
  duration?: number;
  delay?: number;
  gain?: number;
  type?: OscillatorType;
  ignoreSfxMute?: boolean;
}) {
  if (!options.ignoreSfxMute && !sfxEnabledState) return;
  const vol = masterVolumeState;
  if (vol <= 0.001) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + (options.delay ?? 0);
  const duration = options.duration ?? 0.07;
  const peakGain = (options.gain ?? 0.08) * vol;

  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.type = options.type ?? 'triangle';
  osc.frequency.setValueAtTime(options.freqStart, now);
  if (options.freqEnd && options.freqEnd !== options.freqStart) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(40, options.freqEnd), now + duration);
  }

  gainNode.gain.setValueAtTime(0.0001, now);
  gainNode.gain.linearRampToValueAtTime(peakGain, now + 0.008);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.02);
}

/** Tactile crisp UI tap */
export function playClick(): void {
  playTone({
    freqStart: 640,
    freqEnd: 880,
    duration: 0.048,
    gain: 0.065,
    type: 'triangle',
  });
}

/** Rising or falling toggle chime */
export function playToggle(on: boolean, ignoreMute = false): void {
  if (on) {
    playTone({ freqStart: 523.25, duration: 0.075, gain: 0.075, type: 'sine', ignoreSfxMute: ignoreMute });
    playTone({
      freqStart: 783.99,
      duration: 0.11,
      delay: 0.055,
      gain: 0.075,
      type: 'sine',
      ignoreSfxMute: ignoreMute,
    });
  } else {
    playTone({ freqStart: 659.25, duration: 0.07, gain: 0.06, type: 'sine', ignoreSfxMute: ignoreMute });
    playTone({
      freqStart: 440,
      duration: 0.09,
      delay: 0.05,
      gain: 0.055,
      type: 'sine',
      ignoreSfxMute: ignoreMute,
    });
  }
}

/** Pentatonic music-box note for constellation stars */
const STAR_NOTES = [523.25, 587.33, 659.25, 783.99, 880.0]; // C5 D5 E5 G5 A5

export function playStarNote(index: number): void {
  const base = STAR_NOTES[Math.abs(index) % STAR_NOTES.length];
  playTone({ freqStart: base, duration: 0.14, gain: 0.085, type: 'sine' });
  playTone({ freqStart: base * 2, duration: 0.12, delay: 0.025, gain: 0.035, type: 'triangle' });
}

/** Modal / gallery open sparkle */
export function playOpen(): void {
  playTone({ freqStart: 587.33, duration: 0.09, gain: 0.07, type: 'sine' });
  playTone({ freqStart: 880, duration: 0.14, delay: 0.055, gain: 0.07, type: 'triangle' });
}

/** Modal / gallery close */
export function playClose(): void {
  playTone({ freqStart: 659.25, duration: 0.07, gain: 0.055, type: 'sine' });
  playTone({ freqStart: 493.88, duration: 0.1, delay: 0.045, gain: 0.05, type: 'sine' });
}

/** Success sparkle chord (copy, contact submit) */
export function playSuccess(): void {
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, idx) => {
    playTone({
      freqStart: freq,
      duration: 0.16,
      delay: idx * 0.055,
      gain: 0.07,
      type: 'sine',
    });
  });
}

/** Soft validation nudge */
export function playError(): void {
  playTone({ freqStart: 250, freqEnd: 210, duration: 0.09, gain: 0.065, type: 'triangle' });
  playTone({ freqStart: 205, freqEnd: 175, duration: 0.11, delay: 0.09, gain: 0.06, type: 'triangle' });
}

// Dreamy 16-step pastel music-box melody in F major / D minor pentatonic
const MELODY_PATTERN: Array<{ lead: number | null; bass?: number }> = [
  { lead: 698.46, bass: 174.61 }, // F5 / F3
  { lead: 880.0 }, // A5
  { lead: 1046.5 }, // C6
  { lead: 880.0 }, // A5
  { lead: 783.99, bass: 196.0 }, // G5 / G3
  { lead: 880.0 }, // A5
  { lead: 698.46 }, // F5
  { lead: null },
  { lead: 659.25, bass: 220.0 }, // E5 / A3
  { lead: 783.99 }, // G5
  { lead: 880.0 }, // A5
  { lead: 1046.5 }, // C6
  { lead: 1174.66, bass: 146.83 }, // D6 / D3
  { lead: 1046.5 }, // C6
  { lead: 880.0 }, // A5
  { lead: 783.99 }, // G5
];

export function isSynthBgmPlaying(): boolean {
  return bgmTimer !== null;
}

export function startSynthBgm(): void {
  if (typeof window === 'undefined') return;
  if (bgmTimer !== null) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  const tick = () => {
    const step = MELODY_PATTERN[bgmStep % MELODY_PATTERN.length];
    bgmStep += 1;

    if (step.lead) {
      playTone({
        freqStart: step.lead,
        duration: 0.34,
        gain: 0.06,
        type: 'sine',
        ignoreSfxMute: true,
      });
    }
    if (step.bass) {
      playTone({
        freqStart: step.bass,
        duration: 0.65,
        gain: 0.045,
        type: 'triangle',
        ignoreSfxMute: true,
      });
    }
  };

  tick();
  bgmTimer = window.setInterval(tick, 310);
}

export function stopSynthBgm(): void {
  if (bgmTimer !== null) {
    window.clearInterval(bgmTimer);
    bgmTimer = null;
  }
}
