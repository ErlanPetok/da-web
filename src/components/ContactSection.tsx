import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy, ExternalLink, Github, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { PROFILE, UI_COPY } from '../data/portfolioData';
import { buildMailtoHref, validateContactForm, type Lang } from '../utils/portfolio';
import { MaskedWords, POSTER_EASE, PosterReveal } from './MotionPrimitives';
import { SectionHeader } from './SectionHeader';

interface ContactSectionProps {
  lang: Lang;
  onToast: (message: string) => void;
}

export function ContactSection({ lang, onToast }: ContactSectionProps) {
  const t = UI_COPY[lang].contact;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<{ kind: 'success' | 'error'; text: string } | null>(null);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  const handleCopy = async (value: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      onToast(t.copied);
      window.setTimeout(() => setCopiedField((prev) => (prev === field ? null : prev)), 2000);
    } catch {
      onToast(t.copyFail);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm({ name, email, subject, message }, lang);
    if (!validation.valid) {
      setStatus({ kind: 'error', text: validation.error ?? 'Invalid form input' });
      return;
    }
    setStatus({ kind: 'success', text: t.sentNote });
    const href = buildMailtoHref({ name, email, subject, message });
    window.location.href = href;
  };

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader tag={t.tag} jpSub={t.jpSub} title={t.title} subtitle={t.subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Direct Contact Info */}
          <PosterReveal
            direction="left"
            className="lg:col-span-5 poster-box p-6 sm:p-7 flex flex-col justify-between gap-6"
          >
            <div>
              <h3 className="font-display font-black text-2xl text-[var(--ink)] tracking-tight mb-2">
                <MaskedWords key={t.heading} text={t.heading} stagger={0.05} />
              </h3>
              <p className="text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed mb-6">
                {t.desc}
              </p>

              <div className="space-y-3">
                <motion.div
                  whileHover={{ x: 2 }}
                  className="flex items-center justify-between gap-3 p-3 bg-[var(--bg-surface-soft)] border border-[var(--border-soft)] hover:border-[var(--accent)] transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Mail className="w-4 h-4 text-[var(--accent)] shrink-0" aria-hidden="true" />
                    <span className="text-xs sm:text-sm font-bold text-[var(--ink)] truncate">
                      {PROFILE.email}
                    </span>
                  </div>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.88 }}
                    onClick={() => handleCopy(PROFILE.email, 'email')}
                    aria-label="Copy email address"
                    className="w-8 h-8 border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--ink)] hover:bg-[var(--accent)] hover:text-white flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    {copiedField === 'email' ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </motion.button>
                </motion.div>

                <motion.div
                  whileHover={{ x: 2 }}
                  className="flex items-center justify-between gap-3 p-3 bg-[var(--bg-surface-soft)] border border-[var(--border-soft)] hover:border-[var(--accent)] transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Phone className="w-4 h-4 text-[var(--accent)] shrink-0" aria-hidden="true" />
                    <span className="text-xs sm:text-sm font-bold text-[var(--ink)]">
                      {PROFILE.phoneDisplay}
                    </span>
                  </div>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.88 }}
                    onClick={() => handleCopy(PROFILE.phoneCopy, 'phone')}
                    aria-label="Copy phone number"
                    className="w-8 h-8 border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--ink)] hover:bg-[var(--accent)] hover:text-white flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    {copiedField === 'phone' ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </motion.button>
                </motion.div>

                <motion.div
                  whileHover={{ x: 2 }}
                  className="flex items-center gap-3 p-3 bg-[var(--bg-surface-soft)] border border-[var(--border-soft)] hover:border-[var(--accent)] transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0" aria-hidden="true" />
                  <a
                    href={PROFILE.locationMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--ink)] hover:text-[var(--accent)]"
                  >
                    <span>{PROFILE.location}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[var(--accent)]" aria-hidden="true" />
                  </a>
                </motion.div>
              </div>
            </div>

            <div className="space-y-4">
              <motion.a
                href={PROFILE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider px-5 py-3 border-2 border-[var(--border-strong)] shadow-[3px_3px_0px_var(--border-strong)]"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>{t.wa}</span>
              </motion.a>

              <div className="flex items-center gap-2">
                <motion.a
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="GitHub profile"
                  className="inline-flex items-center gap-2 px-3 py-2 border-2 border-[var(--border-strong)] bg-[var(--bg-surface-soft)] text-[var(--ink)] hover:bg-[var(--accent)] hover:text-white font-mono-poster text-xs font-bold uppercase transition-colors"
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                  <span>GitHub</span>
                </motion.a>
                <motion.a
                  href={`mailto:${PROFILE.email}`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Send email"
                  className="inline-flex items-center gap-2 px-3 py-2 border-2 border-[var(--border-strong)] bg-[var(--bg-surface-soft)] text-[var(--ink)] hover:bg-[var(--accent)] hover:text-white font-mono-poster text-xs font-bold uppercase transition-colors"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  <span>Email</span>
                </motion.a>
              </div>
            </div>
          </PosterReveal>

          {/* Dispatch Message Form */}
          <PosterReveal direction="right" delay={0.1} className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="poster-box p-6 sm:p-7 space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono-poster text-[11px] font-bold uppercase tracking-widest text-[var(--ink-muted)] mb-1.5">
                    {t.namePh}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.namePh}
                    required
                    className="w-full px-3.5 py-2.5 border-2 border-[var(--border-strong)] bg-[var(--bg-surface-soft)] text-[var(--ink)] placeholder:text-[var(--ink-muted)]/70 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono-poster text-[11px] font-bold uppercase tracking-widest text-[var(--ink-muted)] mb-1.5">
                    {t.emailPh}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPh}
                    required
                    className="w-full px-3.5 py-2.5 border-2 border-[var(--border-strong)] bg-[var(--bg-surface-soft)] text-[var(--ink)] placeholder:text-[var(--ink-muted)]/70 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono-poster text-[11px] font-bold uppercase tracking-widest text-[var(--ink-muted)] mb-1.5">
                  {t.subjectPh}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={t.subjectPh}
                  className="w-full px-3.5 py-2.5 border-2 border-[var(--border-strong)] bg-[var(--bg-surface-soft)] text-[var(--ink)] placeholder:text-[var(--ink-muted)]/70 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono-poster text-[11px] font-bold uppercase tracking-widest text-[var(--ink-muted)] mb-1.5">
                  {t.messagePh}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.messagePh}
                  required
                  className="w-full px-3.5 py-2.5 border-2 border-[var(--border-strong)] bg-[var(--bg-surface-soft)] text-[var(--ink)] placeholder:text-[var(--ink-muted)]/70 text-sm focus:outline-none focus:border-[var(--accent)] resize-y transition-colors"
                />
              </div>

              <AnimatePresence>
                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease: POSTER_EASE }}
                    role="status"
                    className={`px-3.5 py-2.5 border-2 font-mono-poster text-xs font-bold ${
                      status.kind === 'success'
                        ? 'border-[#16a34a] bg-[#16a34a]/10 text-[#15803d] dark:text-[#4ade80]'
                        : 'border-[var(--accent)] bg-[var(--accent-tint)] text-[var(--accent)]'
                    }`}
                  >
                    {status.text}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-3 border-2 border-[var(--border-strong)] shadow-[4px_4px_0px_var(--border-strong)] cursor-pointer"
              >
                <Send
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
                <span>{t.send}</span>
              </motion.button>
            </form>
          </PosterReveal>
        </div>
      </div>
    </section>
  );
}
