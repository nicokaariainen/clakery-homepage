<script setup lang="ts">
interface ProductItem {
  imageSrc: string
  emoji: string
  name: string
  description: string
  price: string
  badge?: string
}

defineProps<{
  products: ProductItem[]
}>()
</script>

<template>
  <section id="catalog" class="catalog">
    <div class="section-header">
      <div class="section-label">Shop the sweetness</div>
      <h2 class="section-title">Our Collection</h2>
      <p class="section-subtitle">Each piece is hand-sculpted, painted, and sealed with love — no two are ever the same.</p>
    </div>
    <div class="product-grid">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="product-card"
      >
        <div class="product-img">
          <div class="product-img-inner">
            <img
              v-if="product.imageSrc"
              :src="product.imageSrc"
              :alt="product.name"
              class="product-image"
            />
            <template v-else>{{ product.emoji }}</template>
          </div>
          <span v-if="product.badge" class="product-tag">{{ product.badge }}</span>
        </div>
        <div class="product-info">
          <div class="product-name">{{ product.name }}</div>
          <div class="product-desc">{{ product.description }}</div>
          <div class="product-bottom">
            <span class="product-price">{{ product.price }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.catalog {
  padding: 100px 60px 120px;
  background: var(--off-white);
  position: relative;
}

.catalog::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--terracotta-light), transparent);
  border-radius: 2px;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-label {
  display: inline-block;
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--terracotta);
  margin-bottom: 14px;
  font-weight: 500;
}

.section-title {
  font-family: 'DM Serif Display', serif;
  font-size: 44px;
  color: var(--dark-brown);
  font-weight: 400;
  margin-bottom: 12px;
}

.section-subtitle {
  font-size: 15px;
  color: var(--soft-brown);
  font-weight: 300;
  max-width: 400px;
  margin: 0 auto;
  line-height: 1.6;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1100px;
  margin: 0 auto;
}

.product-card {
  background: var(--cream);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
  cursor: pointer;
  border: 1px solid rgba(196, 168, 130, 0.12);
  opacity: 0;
  animation: fadeUpCard 0.6s ease-out forwards;
}

.product-card:nth-child(1) { animation-delay: 0.1s; }
.product-card:nth-child(2) { animation-delay: 0.2s; }
.product-card:nth-child(3) { animation-delay: 0.3s; }
.product-card:nth-child(4) { animation-delay: 0.4s; }
.product-card:nth-child(5) { animation-delay: 0.5s; }
.product-card:nth-child(6) { animation-delay: 0.6s; }

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(92, 74, 50, 0.1);
  border-color: rgba(192, 139, 92, 0.2);
}

.product-img {
  width: 100%;
  aspect-ratio: 1;
  position: relative;
  overflow: hidden;
}

.product-img-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 56px;
  transition: transform 0.5s ease;
  background: linear-gradient(145deg, var(--beige), var(--beige-dark));
}

.product-card:hover .product-img-inner {
  transform: scale(1.05);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-tag {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 5px 12px;
  background: rgba(255, 252, 247, 0.85);
  backdrop-filter: blur(8px);
  border-radius: 50px;
  font-size: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--terracotta);
  font-weight: 500;
}

.product-info {
  padding: 20px 22px 24px;
}

.product-name {
  font-family: 'DM Serif Display', serif;
  font-size: 18px;
  color: var(--dark-brown);
  margin-bottom: 4px;
}

.product-desc {
  font-size: 13px;
  color: var(--warm-brown);
  font-weight: 300;
  margin-bottom: 14px;
}

.product-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 16px;
  font-weight: 500;
  color: var(--terracotta);
}

/* Responsive: 2 columns tablet */
@media (max-width: 900px) {
  .catalog {
    padding: 80px 30px 100px;
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

/* Responsive: 1 column mobile */
@media (max-width: 600px) {
  .catalog {
    padding: 60px 20px 80px;
  }

  .product-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .section-title {
    font-size: 34px;
  }
}
</style>
