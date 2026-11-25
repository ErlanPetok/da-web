import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildMailtoHref,
  filterProjects,
  getConnectedSkillIds,
  getConstellationEdges,
  getGalleryDirection,
  splitWords,
  stepGalleryIndex,
  toggleLanguage,
  toggleTheme,
  validateContactForm,
  type ProjectItem,
  type SkillNode,
} from './portfolio.ts';

const SAMPLE_PROJECTS: ProjectItem[] = [
  {
    id: 'wallet',
    category: 'dashboard',
    categoryLabel: { id: 'Dashboard', en: 'Dashboard' },
    title: "Hoshino's Daily — Wallet Tracker",
    shortDesc: { id: 'Pelacak dompet', en: 'Wallet tracker' },
    fullDesc: { id: 'Pelacak dompet lengkap', en: 'Full wallet tracker' },
    tags: ['PWA', 'HTML'],
    image: '/assets/portfolio/wallet-tracker.jpg',
    demoUrl: 'https://wallethingy.erlanpetok.web.id',
    githubUrl: 'https://github.com/ErlanPetok/Wallet-thingy',
    status: 'ongoing',
    statusLabel: { id: 'Pengembangan Berlanjut', en: 'Ongoing Development' },
  },
  {
    id: 'fishing',
    category: 'game',
    categoryLabel: { id: 'Game', en: 'Game' },
    title: 'Fishing Adventure',
    shortDesc: { id: 'Game memancing', en: 'Fishing game' },
    fullDesc: { id: 'Game memancing browser', en: 'Browser fishing game' },
    tags: ['HTML', 'JavaScript'],
    image: '/assets/portfolio/fishing-adventure.svg',
    demoUrl: 'https://erlanpetok.github.io/fishing-game/',
    githubUrl: 'https://github.com/ErlanPetok',
    status: 'complete',
    statusLabel: { id: 'Selesai · Demo Tersedia', en: 'Completed · Demo Available' },
  },
];

const SAMPLE_SKILLS: SkillNode[] = [
  {
    id: 'ui',
    label: { id: 'Desain UI', en: 'UI Design' },
    description: { id: 'Figma', en: 'Figma' },
    x: 46,
    y: 48,
    links: ['html', 'illus', 'edit'],
    code: '01',
  },
  {
    id: 'html',
    label: { id: 'HTML', en: 'HTML' },
    description: { id: 'Web', en: 'Web' },
    x: 20,
    y: 28,
    links: ['ui', 'network'],
    code: '02',
  },
  {
    id: 'illus',
    label: { id: 'Ilustrasi Digital', en: 'Digital Illustration' },
    description: { id: 'Art', en: 'Art' },
    x: 74,
    y: 24,
    links: ['ui', 'edit'],
    code: '03',
  },
  {
    id: 'edit',
    label: { id: 'Editing', en: 'Editing' },
    description: { id: 'Photo', en: 'Photo' },
    x: 78,
    y: 72,
    links: ['ui', 'illus'],
    code: '04',
  },
  {
    id: 'network',
    label: { id: 'MikroTik', en: 'MikroTik' },
    description: { id: 'RouterOS', en: 'RouterOS' },
    x: 16,
    y: 74,
    links: ['html'],
    code: '05',
  },
];

test('filterProjects returns all items for "all" and narrows by category', () => {
  assert.equal(filterProjects(SAMPLE_PROJECTS, 'all').length, 2);
  assert.deepEqual(
    filterProjects(SAMPLE_PROJECTS, 'dashboard').map((p) => p.id),
    ['wallet']
  );
  assert.deepEqual(
    filterProjects(SAMPLE_PROJECTS, 'game').map((p) => p.id),
    ['fishing']
  );
  assert.equal(filterProjects(SAMPLE_PROJECTS, 'ecommerce').length, 0);
});

test('constellation neighbor lookup and deduplicated edges work bidirectionally', () => {
  const connectedToNetwork = getConnectedSkillIds(SAMPLE_SKILLS, 'network');
  assert.deepEqual([...connectedToNetwork], ['html']);

  const connectedToUi = getConnectedSkillIds(SAMPLE_SKILLS, 'ui');
  assert.equal(connectedToUi.has('html'), true);
  assert.equal(connectedToUi.has('illus'), true);
  assert.equal(connectedToUi.has('edit'), true);
  assert.equal(connectedToUi.has('ui'), false);

  assert.equal(getConnectedSkillIds(SAMPLE_SKILLS, null).size, 0);

  const edges = getConstellationEdges(SAMPLE_SKILLS);
  assert.equal(edges.length, 5);
});

test('stepGalleryIndex wraps cleanly across bounds', () => {
  assert.equal(stepGalleryIndex(0, -1, 6), 5);
  assert.equal(stepGalleryIndex(5, 1, 6), 0);
  assert.equal(stepGalleryIndex(2, 1, 6), 3);
  assert.equal(stepGalleryIndex(0, 1, 0), 0);
});

test('validateContactForm and buildMailtoHref handle valid and invalid payloads', () => {
  assert.equal(
    validateContactForm({ name: '', email: 'a@b.com', subject: '', message: 'Hello world' }, 'en').valid,
    false
  );
  assert.equal(
    validateContactForm({ name: 'Ari', email: 'bad-email', subject: '', message: 'Hello world' }, 'id').valid,
    false
  );
  assert.equal(
    validateContactForm({ name: 'Ari', email: 'ari@mail.com', subject: '', message: 'Hi' }, 'en').valid,
    false
  );
  assert.equal(
    validateContactForm({ name: 'Ari', email: 'ari@mail.com', subject: 'Project', message: 'Let us build something!' }, 'en').valid,
    true
  );

  const href = buildMailtoHref({
    name: 'Ari',
    email: 'ari@mail.com',
    subject: 'Site Design',
    message: 'Hi Erlan!',
  });
  assert.ok(href.startsWith('mailto:erlanggajuanfadilah10@gmail.com?subject=Site%20Design&body='));
  assert.ok(href.includes('ari%40mail.com'));
});

test('toggleLanguage and toggleTheme switch deterministically', () => {
  assert.equal(toggleLanguage('id'), 'en');
  assert.equal(toggleLanguage('en'), 'id');
  assert.equal(toggleTheme('light'), 'dark');
  assert.equal(toggleTheme('dark'), 'light');
});

test('getGalleryDirection handles sequential and wrap-around navigation', () => {
  assert.equal(getGalleryDirection(0, 1, 6), 1);
  assert.equal(getGalleryDirection(3, 1, 6), -1);
  assert.equal(getGalleryDirection(5, 0, 6), 1);
  assert.equal(getGalleryDirection(0, 5, 6), -1);
});

test('splitWords normalizes whitespace cleanly', () => {
  assert.deepEqual(splitWords('  Tentang   Saya '), ['Tentang', 'Saya']);
  assert.deepEqual(splitWords(''), []);
});
