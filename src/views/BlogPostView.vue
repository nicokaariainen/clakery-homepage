<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownRenderer from '../components/MarkdownRenderer.vue'
import { getBlogPost, type BlogPost } from '../content'

const route = useRoute()
const post = ref<BlogPost | null>(null)
const loading = ref(true)
const contentUnavailable = ref(false)

onMounted(async () => {
  try {
    const slug = route.params.slug as string
    post.value = await getBlogPost(slug)
  } catch {
    contentUnavailable.value = true
  } finally {
    loading.value = false
  }
})

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="blog-post-view">
    <div v-if="loading" class="blog-post__loading">Loading...</div>

    <div v-else-if="contentUnavailable" class="content-unavailable">
      Content is currently unavailable
    </div>

    <template v-else-if="post">
      <article class="blog-post">
        <header class="blog-post__header">
          <h1 class="blog-post__title">{{ post.title }}</h1>
          <time class="blog-post__date" :datetime="post.date">{{ formatDate(post.date) }}</time>
        </header>
        <MarkdownRenderer :content="post.body" class="blog-post__body" />
      </article>
      <router-link to="/blog" class="blog-post__back">&larr; Back to Blog</router-link>
    </template>

    <div v-else class="blog-post__not-found">
      <h1>Post not found</h1>
      <p>The blog post you're looking for doesn't exist.</p>
      <router-link to="/blog" class="blog-post__back">&larr; Back to Blog</router-link>
    </div>
  </div>
</template>

<style scoped>
.blog-post-view {
  max-width: 720px;
  margin: 2rem auto;
  padding: 0 1.5rem;
}

.blog-post__loading {
  text-align: center;
  padding: 3rem 0;
  color: var(--color-brown);
}

.content-unavailable {
  text-align: center;
  padding: 2rem;
  color: var(--color-brown);
  font-style: italic;
}

.blog-post__header {
  margin-bottom: 2rem;
  text-align: center;
}

.blog-post__title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-dark-brown);
  margin: 0 0 0.5rem;
}

.blog-post__date {
  font-size: 0.9rem;
  color: var(--color-brown);
}

.blog-post__body {
  margin-bottom: 2rem;
}

.blog-post__back {
  display: inline-block;
  margin-top: 1.5rem;
  color: var(--color-dark-red);
  text-decoration: none;
  font-weight: 500;
}

.blog-post__back:hover {
  text-decoration: underline;
}

.blog-post__not-found {
  text-align: center;
  padding: 3rem 0;
}

.blog-post__not-found h1 {
  font-size: 1.8rem;
  color: var(--color-dark-brown);
  margin-bottom: 0.5rem;
}

.blog-post__not-found p {
  color: var(--color-brown);
  margin-bottom: 1.5rem;
}
</style>
