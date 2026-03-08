<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MarkdownRenderer from '../components/MarkdownRenderer.vue'
import { getAboutContent } from '../content'

interface AboutImage {
  src: string
  alt: string
}

// Fallback defaults
const defaultImages: AboutImage[] = [
  { src: '/images/about/artist-1.jpg', alt: 'Artist at work in the studio' },
  { src: '/images/about/artist-2.jpg', alt: 'Handcrafted clay pieces on display' },
]

const defaultDescription = `## Hello, I'm the maker behind C.Clakery

I create handcrafted clay pieces inspired by the warmth and charm of a bakery. Each item is shaped, painted, and finished by hand in my small studio.

What started as a hobby quickly became a passion. I love experimenting with colors, textures, and shapes to bring a little joy into everyday objects.

When I'm not working with clay, you can find me exploring local markets, sketching new designs, or enjoying a good cup of coffee.

Thank you for visiting — I hope my creations bring a smile to your day!`

const images = ref<AboutImage[]>(defaultImages)
const description = ref(defaultDescription)
const contentUnavailable = ref(false)

onMounted(async () => {
  try {
    const about = await getAboutContent()
    if (about.images?.length > 0) {
      images.value = about.images.map((img) => ({
        src: img?.src ?? '',
        alt: img?.alt ?? '',
      }))
    }
    if (about.description) {
      description.value = about.description
    }
  } catch {
    contentUnavailable.value = true
  }
})

function onImageError(event: Event) {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}
</script>

<template>
  <div class="about-view">
    <h1 class="about-view__heading">About Me</h1>

    <div v-if="contentUnavailable" class="content-unavailable">
      Content is currently unavailable
    </div>

    <section class="about-view__gallery" aria-label="Artist photos">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image.src"
        :alt="image.alt"
        class="about-view__image"
        @error="onImageError"
      />
    </section>

    <section class="about-view__description">
      <MarkdownRenderer :content="description" />
    </section>
  </div>
</template>

<style scoped>
.about-view {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.about-view__heading {
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-dark-brown);
  text-align: center;
  margin-bottom: 2rem;
}

.content-unavailable {
  text-align: center;
  padding: 2rem;
  color: var(--color-brown);
  font-style: italic;
}

.about-view__gallery {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.about-view__image {
  width: 100%;
  max-width: 440px;
  border-radius: 0.75rem;
  object-fit: cover;
  aspect-ratio: 4 / 3;
}

.about-view__description {
  background: var(--color-cream);
  border-radius: 0.75rem;
  padding: 2rem;
}

@media (max-width: 768px) {
  .about-view__heading {
    font-size: 1.5rem;
  }

  .about-view__image {
    max-width: 100%;
  }

  .about-view__description {
    padding: 1.25rem;
  }
}
</style>
