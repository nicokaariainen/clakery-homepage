<script setup lang="ts">
import OrderButton from '@/components/OrderButton.vue'
import { onMounted, ref } from 'vue'
import { getProducts, type Product } from '../content'

// Fallback defaults
const defaultProducts: Product[] = [
  {
    imageSrc: '/images/products/clay-mug.jpg',
    name: 'Handcrafted Clay Mug',
    description: 'A cozy, hand-thrown mug with a warm glaze finish. Perfect for your morning coffee.',
    price: '€25.00',
    orderUrl: 'https://example.com/order/clay-mug',
  },
  {
    imageSrc: '/images/products/ceramic-bowl.jpg',
    name: 'Ceramic Serving Bowl',
    description: 'A beautifully shaped bowl ideal for salads, pasta, or as a decorative centerpiece.',
    price: '€35.00',
    orderUrl: 'https://example.com/order/ceramic-bowl',
  },
  {
    imageSrc: '/images/products/clay-vase.jpg',
    name: 'Rustic Clay Vase',
    description: 'An elegant vase with earthy tones, perfect for dried flowers or as a standalone piece.',
    price: '€40.00',
    orderUrl: 'https://example.com/order/clay-vase',
  },
]

const products = ref<Product[]>(defaultProducts)
const contentUnavailable = ref(false)

onMounted(async () => {
  try {
    const data = await getProducts()
    if (data.length > 0) {
      products.value = data
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
  <div class="products-view">
    <h1 class="products-heading">Our Products</h1>

    <div v-if="contentUnavailable" class="content-unavailable">
      Content is currently unavailable
    </div>

    <div class="products-grid">
      <div v-for="(product, index) in products" :key="index" class="product-card">
        <div class="image-wrapper">
          <img
            :src="product.imageSrc"
            :alt="product.name"
            class="product-image"
            @error="onImageError"
          />
        </div>
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">{{ product.price }}</p>
        <OrderButton :href="product.orderUrl" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.products-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.products-heading {
  font-family: 'Bitter', serif;
  font-size: 2rem;
  font-weight: 700;
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

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.product-card {
  display: flex;
  flex-direction: column;
  background: var(--color-cream);
  border-radius: 1rem;
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;
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
  margin: 0 1rem 0.5rem;
  font-size: 0.95rem;
  color: var(--color-brown);
  line-height: 1.5;
  flex: 1;
}

.product-price {
  margin: 0 1rem 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-dark-red);
}

.product-card :deep(.order-button) {
  margin: 0 1rem 1rem;
  width: auto;
  text-align: center;
  font-size: 1rem;
  padding: 0.6rem 1.5rem;
}

@media (max-width: 900px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 600px) {
  .products-view {
    padding: 1rem;
  }

  .products-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
