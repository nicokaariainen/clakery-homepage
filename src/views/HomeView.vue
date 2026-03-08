<script setup lang="ts">
import TopHeader from '../components/TopHeader.vue'
import { computed, onMounted, ref } from 'vue'
import { getHomeContent, getBlogPosts, type HomeContent, type BlogPost } from '../content'

interface BlogPostSummary {
  slug: string
  title: string
  excerpt: string
  date: string
}

// Fallback defaults
const defaultHero: HomeContent = {
  title: 'C.Clakery',
  shortDesc: '-where clay meets bakery-',
  logoSrc: '/images/logo.png',
  backgroundImageSrc: '/images/hero-bg.jpg',
  orderButtonHref: 'https://example.com/order',
}

const hero = ref<HomeContent>(defaultHero)
const blogPosts = ref<BlogPostSummary[]>([])
const contentUnavailable = ref(false)

function extractExcerpt(body: string, maxLength = 120): string {
  // Strip markdown headings and trim
  const plain = body
    .replace(/^#{1,6}\s+.*$/gm, '')
    .replace(/\n{2,}/g, '\n')
    .trim()
  if (plain.length <= maxLength) return plain
  return plain.slice(0, maxLength).trimEnd() + '...'
}

onMounted(async () => {
  try {
    const [homeData, posts] = await Promise.all([getHomeContent(), getBlogPosts()])
    hero.value = {
      title: homeData.title || defaultHero.title,
      shortDesc: homeData.shortDesc || defaultHero.shortDesc,
      logoSrc: homeData.logoSrc || defaultHero.logoSrc,
      backgroundImageSrc: homeData.backgroundImageSrc || defaultHero.backgroundImageSrc,
      orderButtonHref: homeData.orderButtonHref || defaultHero.orderButtonHref,
    }
    blogPosts.value = posts.map((p: BlogPost) => ({
      slug: p.slug,
      title: p.title,
      excerpt: extractExcerpt(p.body),
      date: p.date,
    }))
  } catch {
    contentUnavailable.value = true
  }
})

const recentPosts = computed(() =>
  [...blogPosts.value]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3),
)

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="home-view">
    <TopHeader
      :title="hero.title"
      :short-desc="hero.shortDesc"
      :background-image-src="hero.backgroundImageSrc"
      :logo-src="hero.logoSrc"
    />

    <div v-if="contentUnavailable" class="content-unavailable">
      Content is currently unavailable
    </div>

    <section class="blog-preview" aria-label="Recent blog posts">
      <h2 class="blog-preview__heading">Latest from the Blog</h2>
      <div class="blog-preview__list">
        <router-link
          v-for="post in recentPosts"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="blog-preview__item"
        >
          <h3 class="blog-preview__title">{{ post.title }}</h3>
          <p class="blog-preview__excerpt">{{ post.excerpt }}</p>
          <time class="blog-preview__date" :datetime="post.date">{{ formatDate(post.date) }}</time>
        </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.content-unavailable {
  text-align: center;
  padding: 2rem;
  color: var(--color-brown);
  font-style: italic;
}

.blog-preview {
  max-width: 960px;
  margin: 3rem auto;
  padding: 0 1.5rem;
}

.blog-preview__heading {
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-dark-brown);
  margin-bottom: 1.5rem;
  text-align: center;
}

.blog-preview__list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.blog-preview__item {
  background: var(--color-cream);
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-decoration: none;
  color: var(--color-dark-brown);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  display: flex;
  flex-direction: column;
}

.blog-preview__item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(67, 40, 24, 0.15);
}

.blog-preview__title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}

.blog-preview__excerpt {
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0 0 auto;
  padding-bottom: 0.75rem;
}

.blog-preview__date {
  font-size: 0.85rem;
  color: var(--color-brown);
}

@media (max-width: 768px) {
  .blog-preview__list {
    grid-template-columns: 1fr;
  }

  .blog-preview__heading {
    font-size: 1.5rem;
  }
}

@media (min-width: 769px) and (max-width: 960px) {
  .blog-preview__list {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
