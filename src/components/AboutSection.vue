<template>
  <section id="about" class="about">
    <div class="about-deco"></div>
    <div class="about-deco-2"></div>
    <div class="about-inner">
      <div class="about-image-wrap">
        <div
          class="about-image"
          @mouseenter="hovered = true"
          @mouseleave="hovered = false"
        >
          <template v-if="images.length > 0">
            <img
              v-for="(src, imgIdx) in images"
              :key="src + imgIdx"
              :src="src"
              alt="About photo"
              class="about-image-img"
              :class="{ 'is-active': activeIndex === imgIdx }"
              loading="lazy"
            />
            <div v-if="images.length > 1" class="about-image-dots" aria-hidden="true">
              <span
                v-for="(_, imgIdx) in images"
                :key="imgIdx"
                class="about-image-dot"
                :class="{ 'is-active': activeIndex === imgIdx }"
              />
            </div>
          </template>
        </div>
      </div>
      <div class="about-text">
        <div class="section-label">Nice to meet you</div>
        <h2 class="about-heading">The Maker Behind<br><em>c.clakery</em></h2>
        <p v-for="(paragraph, index) in bioParagraphs" :key="index" class="about-body">
          {{ paragraph }}
        </p>
        <div v-if="quote" class="about-divider"></div>
        <p v-if="quote" class="about-quote">"{{ quote }}"</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps<{
  images: string[]
  bio: string
  quote: string
}>()

const bioParagraphs = computed(() =>
  props.bio.split('\n\n').filter((p) => p.trim().length > 0)
)

const ROTATE_MS = 5000

const activeIndex = ref(0)
const hovered = ref(false)
let intervalId: number | undefined

const prefersReducedMotion = computed(() => {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

function startTimer() {
  stopTimer()
  activeIndex.value = 0
  if (prefersReducedMotion.value) return
  if (props.images.length <= 1) return
  intervalId = window.setInterval(() => {
    if (hovered.value) return
    activeIndex.value = (activeIndex.value + 1) % props.images.length
  }, ROTATE_MS)
}

function stopTimer() {
  if (intervalId !== undefined) {
    window.clearInterval(intervalId)
    intervalId = undefined
  }
}

watch(() => props.images, () => startTimer(), { immediate: true, deep: false })

onBeforeUnmount(stopTimer)
</script>

<style scoped>
.about {
  padding: 120px 60px;
  background: var(--beige);
  position: relative;
  overflow: hidden;
}

.about-deco {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(192, 139, 92, 0.08);
  top: -100px;
  right: -60px;
}

.about-deco-2 {
  position: absolute;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: rgba(197, 206, 186, 0.15);
  bottom: -40px;
  left: -40px;
}

.about-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  max-width: 1100px;
  margin: 0 auto;
  align-items: center;
  position: relative;
  z-index: 2;
}

.about-image-wrap {
  position: relative;
}

.about-image {
  width: 100%;
  aspect-ratio: 4/5;
  background: linear-gradient(145deg, var(--blush), var(--beige-dark));
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.about-image::before {
  content: '';
  position: absolute;
  inset: 8px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 18px;
  pointer-events: none;
  z-index: 2;
}

.about-image-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.about-image-img.is-active {
  opacity: 1;
}

.about-image-dots {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  padding: 5px 9px;
  background: rgba(255, 252, 247, 0.7);
  backdrop-filter: blur(8px);
  border-radius: 50px;
  z-index: 3;
}

.about-image-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(92, 74, 50, 0.25);
  transition: background 0.3s ease, transform 0.3s ease;
}

.about-image-dot.is-active {
  background: var(--terracotta);
  transform: scale(1.2);
}

.about-text .section-label {
  display: inline-block;
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--terracotta);
  font-weight: 500;
  text-align: left;
  margin-bottom: 14px;
}

.about-heading {
  font-family: 'DM Serif Display', serif;
  font-size: 40px;
  color: var(--dark-brown);
  margin-bottom: 24px;
  line-height: 1.2;
  font-weight: 400;
}

.about-heading em {
  color: var(--terracotta);
  font-style: italic;
}

.about-body {
  font-size: 15px;
  line-height: 1.8;
  color: var(--soft-brown);
  margin-bottom: 20px;
  font-weight: 300;
}

.about-divider {
  width: 50px;
  height: 2px;
  background: var(--terracotta-light);
  border-radius: 2px;
  margin-bottom: 20px;
}

.about-quote {
  font-family: 'DM Serif Display', serif;
  font-style: italic;
  font-size: 17px;
  color: var(--terracotta);
  padding-left: 20px;
  border-left: 2px solid var(--terracotta-light);
}

@media (max-width: 768px) {
  .about {
    padding: 80px 24px;
  }

  .about-inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>
