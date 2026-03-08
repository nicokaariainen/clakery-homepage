<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  products: Array<{
    imageSrc: string
    name: string
    description: string
    href: string
  }>
}>()

const visibleCount = ref(3)

function updateVisibleCount() {
  const w = window.innerWidth
  if (w <= 600) visibleCount.value = 1
  else if (w <= 900) visibleCount.value = 2
  else visibleCount.value = 3
}

onMounted(() => {
  updateVisibleCount()
  window.addEventListener('resize', updateVisibleCount)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateVisibleCount)
})

const isMobile = computed(() => visibleCount.value === 1)
const currentIndex = ref(0)
const isScrollable = computed(() => props.products.length > visibleCount.value)
const maxIndex = computed(() => Math.max(0, props.products.length - visibleCount.value))

watch(maxIndex, (newMax) => {
  if (currentIndex.value > newMax) {
    currentIndex.value = newMax
  }
})

function scrollLeft() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

function scrollRight() {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value++
  }
}

// Touch swipe support with drag-follow
const dragOffset = ref(0)
const isDragging = ref(false)
let touchStartX = 0
const SWIPE_THRESHOLD = 50

const scrollTransform = computed(() => {
  if (!isScrollable.value) return {}
  const base = `calc(-${currentIndex.value} * (var(--card-width) + var(--card-gap)))`
  if (isDragging.value && dragOffset.value !== 0) {
    return { transform: `translateX(calc(${base} + ${dragOffset.value}px))` }
  }
  return { transform: `translateX(${base})` }
})

function onTouchStart(e: TouchEvent) {
  touchStartX = e.touches[0].clientX
  isDragging.value = true
  dragOffset.value = 0
}

function onTouchMove(e: TouchEvent) {
  if (!isDragging.value) return
  const currentX = e.touches[0].clientX
  dragOffset.value = currentX - touchStartX
}

function onTouchEnd() {
  isDragging.value = false
  if (Math.abs(dragOffset.value) > SWIPE_THRESHOLD) {
    if (dragOffset.value < 0) scrollRight()
    else scrollLeft()
  }
  dragOffset.value = 0
}
</script>

<template>
  <section class="product-catalog">
    <button
      v-if="isScrollable && !isMobile"
      class="scroll-btn scroll-btn-left"
      :disabled="currentIndex === 0"
      @click="scrollLeft"
    >
      ‹
    </button>

    <div
      class="products-wrapper"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <div
        class="products-grid"
        :class="{ 'is-scrollable': isScrollable, 'is-dragging': isDragging }"
        :style="scrollTransform"
      >
      <a
        v-for="(product, index) in products"
        :key="index"
        :href="product.href"
        class="product-card"
      >
        <div class="image-wrapper">
          <img :src="product.imageSrc" :alt="product.name" class="product-image" />
        </div>
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-description">{{ product.description }}</p>
      </a>
      </div>

      <div v-if="isMobile && isScrollable" class="swipe-dots">
        <span
          v-for="i in products.length"
          :key="i"
          class="dot"
          :class="{ active: currentIndex === i - 1 }"
        />
      </div>
    </div>

    <button
      v-if="isScrollable && !isMobile"
      class="scroll-btn scroll-btn-right"
      :disabled="currentIndex === maxIndex"
      @click="scrollRight"
    >
      ›
    </button>
  </section>
</template>

<style scoped>
.product-catalog {
  width: 100%;
  padding: 2rem;
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.products-wrapper {
  --card-max-width: 400px;
  --card-width: min(calc((100% - 4rem) / 3), var(--card-max-width));
  --card-gap: max(2rem, calc((100% - var(--card-max-width) * 3) / 2));
  flex: 1;
  overflow-x: clip;
  overflow-y: visible;
  padding: 15px 0;
}

.products-grid {
  display: flex;
  gap: var(--card-gap);
  transition: transform 0.4s ease;
  justify-content: center;
}

.products-grid.is-scrollable {
  justify-content: flex-start;
}

.products-grid.is-dragging {
  transition: none;
}

.product-card {
  flex: 0 0 var(--card-width);
}

.product-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  background: var(--color-cream);
  border-radius: 1rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.image-wrapper {
  margin: 0.25rem 0.25rem 0;
  border-radius: 0.75rem;
  aspect-ratio: 1;
  overflow: hidden;
  transition: transform 0.3s;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-name {
  margin: 1rem 1rem 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-dark-brown);
}

.product-description {
  margin: 0 1rem 1rem;
  font-size: 0.95rem;
  color: var(--color-brown);
  line-height: 1.5;
}

.scroll-btn {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 50%;
  background: var(--color-dark-brown);
  color: var(--color-cream);
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s, opacity 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-btn:hover:not(:disabled) {
  background: var(--color-brown);
}

.scroll-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

@media (max-width: 900px) {
  .product-catalog {
    padding: 1.5rem 0.5rem;
    gap: 0.5rem;
  }

  .products-wrapper {
    --card-width: calc((100% - 1rem) / 2);
    --card-gap: 1rem;
  }

  .product-card {
    flex: 0 0 var(--card-width);
  }
}

@media (max-width: 600px) {
  .product-catalog {
    padding: 1rem;
    gap: 0;
  }

  .products-wrapper {
    --card-width: 100%;
    --card-gap: 1rem;
    overflow: hidden;
    max-width: 100%;
  }

  .product-card {
    flex: 0 0 100%;
    min-width: 0;
  }

  .scroll-btn {
    display: none;
  }
}

.swipe-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 0 0;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-brown);
  opacity: 0.35;
  transition: opacity 0.3s;
}

.dot.active {
  opacity: 1;
  background: var(--color-dark-brown);
}
</style>
