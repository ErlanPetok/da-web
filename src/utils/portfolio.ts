export type Lang = 'id' | 'en';
export type Theme = 'light' | 'dark';
export type ProjectCategory = 'all' | 'web-design' | 'ecommerce' | 'dashboard' | 'game';

export interface ProjectItem {
  id: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: Record<Lang, string>;
  title: string;
  shortDesc: Record<Lang, string>;
  fullDesc: Record<Lang, string>;
  tags: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  status: 'ongoing' | 'complete';
  statusLabel: Record<Lang, string>;
}

export interface SkillNode {
  id: 'ui' | 'html' | 'edit' | 'illus' | 'network';
  label: Record<Lang, string>;
  description: Record<Lang, string>;
  x: number;
  y: number;
  links: Array<'ui' | 'html' | 'edit' | 'illus' | 'network'>;
  code: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  error?: string;
}

export function filterProjects(
  projects: readonly ProjectItem[],
  category: ProjectCategory
): ProjectItem[] {
  if (category === 'all') {
    return [...projects];
  }
  return projects.filter((project) => project.category === category);
}

export function getConnectedSkillIds(
  nodes: readonly SkillNode[],
  activeSkillId: SkillNode['id'] | null
): Set<SkillNode['id']> {
  const connected = new Set<SkillNode['id']>();
  if (!activeSkillId) {
    return connected;
  }
  const activeNode = nodes.find((n) => n.id === activeSkillId);
  if (activeNode) {
    for (const id of activeNode.links) {
      connected.add(id);
    }
  }
  for (const node of nodes) {
    if (node.links.includes(activeSkillId)) {
      connected.add(node.id);
    }
  }
  connected.delete(activeSkillId);
  return connected;
}

export function getConstellationEdges(
  nodes: readonly SkillNode[]
): Array<{ key: string; from: SkillNode; to: SkillNode }> {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const seen = new Set<string>();
  const edges: Array<{ key: string; from: SkillNode; to: SkillNode }> = [];

  for (const node of nodes) {
    for (const targetId of node.links) {
      const target = byId.get(targetId);
      if (!target) continue;
      const key = [node.id, target.id].sort().join('-');
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ key, from: node, to: target });
    }
  }
  return edges;
}

export function stepGalleryIndex(current: number, delta: number, total: number): number {
  if (total <= 0) return 0;
  return (((current + delta) % total) + total) % total;
}

export function getGalleryDirection(prevIndex: number, nextIndex: number, total: number): 1 | -1 {
  if (total <= 1 || prevIndex === nextIndex) return 1;
  if (prevIndex === total - 1 && nextIndex === 0) return 1;
  if (prevIndex === 0 && nextIndex === total - 1) return -1;
  return nextIndex > prevIndex ? 1 : -1;
}

export function splitWords(text: string): string[] {
  return text.trim().split(/\s+/).filter(Boolean);
}

export function validateContactForm(
  values: ContactFormValues,
  lang: Lang
): ContactValidationResult {
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) {
    return {
      valid: false,
      error: lang === 'id' ? 'Mohon isi nama lengkap Anda.' : 'Please enter your full name.',
    };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      valid: false,
      error: lang === 'id' ? 'Mohon masukkan alamat email yang valid.' : 'Please enter a valid email address.',
    };
  }
  if (message.length < 4) {
    return {
      valid: false,
      error: lang === 'id' ? 'Pesan terlalu singkat. Tulis minimal beberapa kata.' : 'Message is too short. Please write a brief note.',
    };
  }
  return { valid: true };
}

export function buildMailtoHref(values: ContactFormValues): string {
  const subject = encodeURIComponent(values.subject.trim() || 'Portfolio contact');
  const body = encodeURIComponent(
    `Name: ${values.name.trim()}\nEmail: ${values.email.trim()}\n\n${values.message.trim()}`
  );
  return `mailto:erlanggajuanfadilah10@gmail.com?subject=${subject}&body=${body}`;
}

export function toggleLanguage(current: Lang): Lang {
  return current === 'id' ? 'en' : 'id';
}

export function toggleTheme(current: Theme): Theme {
  return current === 'light' ? 'dark' : 'light';
}
