<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getBlogPosts, type BlogPost } from '../content'

// Fallback defaults
const defaultPosts: BlogPost[] = [
  { slug: 'welcome-to-cclakery', title: 'Welcome to C.Clakery', date: '2025-06-01', body: '' },
  { slug: 'summer-collection-2025', title: 'Summer Collection 2025', date: '2025-05-20', body: '' },
  { slug: 'behind-the-scenes', title: 'Behind the Scenes', date: '2025-05-10', body: '' },
  { slug: 'first-craft-fair', title: 'My First Craft Fair', date: '2025-04-01', body: '' },
]

const blogPosts = ref<BlogPost[]>(defaultPosts)
const contentUnavailable = ref(false)

onMounted(async () => {
  try {
    const posts = await getBlogPosts()
    if (posts.length > 0) {
      blogPosts.value = posts
    }
  } catch {
    contentUnavailable.value = true
  }
})

const sortedPosts = computed(() =>
  [...blogPosts.value].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
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
  <div class="blog-view">
    <h1 class="blog-view__heading">Blog</h1>

    <div v-if="contentUnavailable" class="content-unavailable">
      Content is currently unavailable
    </div>

    <ul class="blog-view__list">
      <li v-for="post in sortedPosts" :key="post.slug" class="blog-view__item">
        <router-link :to="`/blog/${post.slug}`" class="blog-view__link">
          <h2 class="blog-view__title">{{ post.title }}</h2>
          <time class="blog-view__date" :datetime="post.date">{{ formatDate(post.date) }}</time>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.blog-view {
  max-width: 720px;
  margin: 2rem auto;
  padding: 0 1.5rem;
}

.blog-view__heading {
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-dark-brown);
  margin-bottom: 1.5rem;
  text-align: center;
}

.content-unavailable {
  text-align: center;
  padding: 2rem;
  color: var(--color-brown);
  font-style: italic;
}

.blog-view__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.blog-view__item {
  border-bottom: 1px solid var(--color-cream);
}

.blog-view__item:last-child {
  border-bottom: none;
}

.blog-view__link {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 1.25rem 0.5rem;
  text-decoration: none;
  color: var(--color-dark-brown);
  transition: background-color 0.15s ease;
  gap: 1rem;
}

.blog-view__link:hover {
  background-color: var(--color-cream);
  border-radius: 0.5rem;
}

.blog-view__title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

.blog-view__date {
  font-size: 0.85rem;
  color: var(--color-brown);
  white-space: nowrap;
}

@media (max-width: 600px) {
  .blog-view__link {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>
