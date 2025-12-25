<script setup lang="ts">
import TopHeader from './components/TopHeader.vue'
import mokkapala from './assets/mokkapala.png'
import ProductCatalog from './components/ProductCatalog.vue'
const products = [
  {
    imageSrc: mokkapala,
    name: 'Product 1',
    description: 'Description for product 1',
    href: '/products/1'
  },
  {
    imageSrc: mokkapala,
    name: 'Product 2',
    description: 'Description for product 2',
    href: '/products/2'
  },
  {
    imageSrc: mokkapala,
    name: 'Product 3',
    description: 'Description for product 3',
    href: '/products/3'
  },
  {
    imageSrc: mokkapala,
    name: 'Product 4',
    description: 'Description for product 4',
    href: '/products/4'
  },
  {
    imageSrc: mokkapala,
    name: 'Product 5',
    description: 'Description for product 5',
    href: '/products/5'
  }
]
</script>

<template>
  <main>
    <TopHeader
      title="C.Clakery"
      short-desc="-where clay meets bakery-"
      :background-image-src="mokkapala"
    />
    <ProductCatalog :products="products" />
  </main>
</template>

<style scoped>
main {
  width: 100%;
}
</style>
