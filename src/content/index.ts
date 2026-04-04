import yaml from 'js-yaml'

// --- Types ---

export interface HomeContent {
  title: string
  shortDesc: string
  description: string
  ctaLabel: string
}

export interface Product {
  name: string
  description: string
  price: string
  imageSrc: string       // TinaCMS image path (empty string if not set)
  emoji: string          // fallback placeholder
  badge: string          // empty string if not set
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  body: string
}

export interface AboutContent {
  makerEmoji: string
  bio: string            // two paragraphs separated by \n\n
  quote: string
}

export interface FooterSettings {
  artistName: string
  instagramUrl: string
  email: string
  instagramHandle: string
}

// --- Frontmatter parser ---

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

function resolveAssetPath(path: string): string {
  if (!path) return path
  if (path.startsWith('/') && !path.startsWith(BASE + '/')) {
    return BASE + path
  }
  return path
}

export function parseFrontmatter(content: string): { data: Record<string, unknown>; body: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, body: content }

  const frontmatterStr = match[1] ?? ''
  const body = (match[2] ?? '').trim()

  let data: Record<string, unknown> = {}
  try {
    const parsed = yaml.load(frontmatterStr)
    if (parsed && typeof parsed === 'object') {
      data = parsed as Record<string, unknown>
    }
  } catch {
    data = {}
  }

  return { data, body }
}

// --- Vite glob imports for content files ---

const homeFiles = import.meta.glob('/content/home/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
const productFiles = import.meta.glob('/content/products/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
const blogFiles = import.meta.glob('/content/blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
const aboutFiles = import.meta.glob('/content/about/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
const footerFiles = import.meta.glob('/content/footer/*.json', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

// --- Content accessor functions ---

export async function getHomeContent(): Promise<HomeContent> {
  const raw = homeFiles['/content/home/index.md']
  if (!raw) {
    return { title: '', shortDesc: '', description: '', ctaLabel: '' }
  }
  const { data } = parseFrontmatter(raw)
  return {
    title: (data.title as string) ?? '',
    shortDesc: (data.shortDesc as string) ?? '',
    description: (data.description as string) ?? '',
    ctaLabel: (data.ctaLabel as string) ?? '',
  }
}

export async function getProducts(): Promise<Product[]> {
  return Object.entries(productFiles).map(([, raw]) => {
    const { data } = parseFrontmatter(raw)
    return {
      name: (data.name as string) ?? '',
      description: (data.description as string) ?? '',
      price: (data.price as string) ?? '',
      imageSrc: resolveAssetPath((data.imageSrc as string) ?? ''),
      emoji: (data.emoji as string) ?? '',
      badge: (data.badge as string) ?? '',
    }
  })
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return Object.entries(blogFiles).map(([filePath, raw]) => {
    const { data, body } = parseFrontmatter(raw)
    const slug = filePath.split('/').pop()?.replace('.md', '') ?? ''
    return {
      slug,
      title: (data.title as string) ?? '',
      date: (data.date as string) ?? '',
      body,
    }
  })
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts()
  return posts.find((p) => p.slug === slug) ?? null
}

export async function getAboutContent(): Promise<AboutContent> {
  const raw = aboutFiles['/content/about/index.md']
  if (!raw) {
    return { makerEmoji: '', bio: '', quote: '' }
  }
  const { data } = parseFrontmatter(raw)
  return {
    makerEmoji: (data.makerEmoji as string) ?? '',
    bio: (data.bio as string) ?? '',
    quote: (data.quote as string) ?? '',
  }
}

export async function getFooterSettings(): Promise<FooterSettings> {
  const raw = footerFiles['/content/footer/index.json']
  if (!raw) {
    return { artistName: '', instagramUrl: '', email: '', instagramHandle: '' }
  }
  try {
    const parsed = JSON.parse(raw)
    return {
      artistName: (parsed.artistName as string) ?? '',
      instagramUrl: (parsed.instagramUrl as string) ?? '',
      email: (parsed.email as string) ?? '',
      instagramHandle: (parsed.instagramHandle as string) ?? '',
    }
  } catch {
    return { artistName: '', instagramUrl: '', email: '', instagramHandle: '' }
  }
}
