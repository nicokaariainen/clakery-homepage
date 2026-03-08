<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const props = defineProps<{
  content: string
}>()

const renderedHtml = computed(() => {
  if (!props.content) return ''
  const rawHtml = marked.parse(props.content, { async: false }) as string
  return DOMPurify.sanitize(rawHtml)
})
</script>

<template>
  <div class="markdown-content" v-html="renderedHtml"></div>
</template>

<style scoped>
.markdown-content {
  font-family: 'Bitter', serif;
  color: var(--color-dark-brown);
  line-height: 1.8;
}

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4),
.markdown-content :deep(h5),
.markdown-content :deep(h6) {
  color: var(--color-dark-brown);
  font-weight: 600;
  margin: 1.5em 0 0.5em;
}

.markdown-content :deep(h1) { font-size: 2rem; }
.markdown-content :deep(h2) { font-size: 1.6rem; }
.markdown-content :deep(h3) { font-size: 1.35rem; }

.markdown-content :deep(p) {
  margin: 0.75em 0;
}

.markdown-content :deep(a) {
  color: var(--color-dark-red);
  text-decoration: underline;
}

.markdown-content :deep(a:hover) {
  color: var(--color-brown);
}

.markdown-content :deep(strong) {
  font-weight: 700;
}

.markdown-content :deep(em) {
  font-style: italic;
}

.markdown-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1em 0;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  padding-left: 1.5em;
  margin: 0.75em 0;
}

.markdown-content :deep(li) {
  margin: 0.25em 0;
}

.markdown-content :deep(pre) {
  background: var(--color-dark-brown);
  color: var(--color-cream);
  padding: 1em;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1em 0;
}

.markdown-content :deep(code) {
  font-family: monospace;
  font-size: 0.9em;
}

.markdown-content :deep(:not(pre) > code) {
  background: var(--color-cream);
  padding: 0.15em 0.4em;
  border-radius: 0.25rem;
  color: var(--color-dark-red);
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid var(--color-brown);
  padding-left: 1em;
  margin: 1em 0;
  color: var(--color-brown);
  font-style: italic;
}
</style>
