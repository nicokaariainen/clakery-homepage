<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  products: Array<{
    imageSrc: string
    name: string
    description: string
    href: string
  }>
}>()

const currentIndex = ref(0)
const isScrollable = computed(() => props.products.length > 3)
const maxIndex = computed(() => Math.max(0, props.products.length - 3))

const scrollTransform = computed(() => {
  if (!isScrollable.value) return {}
  return { transform: `translateX(calc(-${currentIndex.value} * (var(--card-width) + var(--card-gap))))` }
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
</script>

<template>
  <section class="product-catalog">
    <button
      v-if="isScrollable"
      class="scroll-btn scroll-btn-left"
      :disabled="currentIndex === 0"
      @click="scrollLeft"
    >
      ‹
    </button>

    <div class="products-wrapper">
      <div
        class="products-grid"
        :class="{ 'is-scrollable': isScrollable }"
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
    </div>

    <button
      v-if="isScrollable"
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
  width: 100%;
  border-radius: 1rem;
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
  .product-card {
    flex: 0 0 calc((100% - 2rem) / 2);
  }
}

@media (max-width: 600px) {
  .product-card {
    flex: 0 0 100%;
  }

  .scroll-btn {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.25rem;
  }
}
</style>
