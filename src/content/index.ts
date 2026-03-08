import yaml from 'js-yaml'

// --- Types ---

export interface HomeContent {
  title: string
  shortDesc: string
  logoSrc: string
  backgroundImageSrc: string
  orderButtonHref: string
}

export interface Product {
  imageSrc: string
  name: string
  description: string
  price: string
  orderUrl: string
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  body: string
}

export interface AboutContent {
  images: Array<{ src: string; alt: string }>
  description: string
}

export interface FooterSettings {
  artistName: string
  instagramUrl: string
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

function parseFrontmatter(content: string): { data: Record<string, unknown>; body: string } {
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
    return { title: '', shortDesc: '', logoSrc: '', backgroundImageSrc: '', orderButtonHref: '' }
  }
  const { data } = parseFrontmatter(raw)
  return {
    title: (data.title as string) ?? '',
    shortDesc: (data.shortDesc as string) ?? '',
    logoSrc: resolveAssetPath((data.logoSrc as string) ?? ''),
    backgroundImageSrc: resolveAssetPath((data.backgroundImageSrc as string) ?? ''),
    orderButtonHref: (data.orderButtonHref as string) ?? '',
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
      orderUrl: (data.orderUrl as string) ?? '',
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
    return { images: [], description: '' }
  }
  const { data, body } = parseFrontmatter(raw)
  const images = Array.isArray(data.images)
    ? (data.images as Array<{ src: string; alt: string }>).map((img) => ({
        src: resolveAssetPath(img?.src ?? ''),
        alt: img?.alt ?? '',
      }))
    : []
  return { images, description: body }
}

export async function getFooterSettings(): Promise<FooterSettings> {
  const raw = footerFiles['/content/footer/index.json']
  if (!raw) {
    return { artistName: '', instagramUrl: '' }
  }
  try {
    const parsed = JSON.parse(raw)
    return {
      artistName: (parsed.artistName as string) ?? '',
      instagramUrl: (parsed.instagramUrl as string) ?? '',
    }
  } catch {
    return { artistName: '', instagramUrl: '' }
  }
}
