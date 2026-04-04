<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  getHomeContent,
  getProducts,
  getAboutContent,
  type HomeContent,
  type Product,
  type AboutContent,
} from '@/content'
import HeroSection from '@/components/HeroSection.vue'
import ProductCatalog from '@/components/ProductCatalog.vue'
import AboutSection from '@/components/AboutSection.vue'
import ContactSection from '@/components/ContactSection.vue'

const home = ref<HomeContent>({ title: '', shortDesc: '', description: '', ctaLabel: '', logoSrc: '' })
const products = ref<Product[]>([])
const about = ref<AboutContent>({ makerEmoji: '', bio: '', quote: '' })

function handleCtaClick() {
  document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(async () => {
  const [homeData, productData, aboutData] = await Promise.all([
    getHomeContent(),
    getProducts(),
    getAboutContent(),
  ])
  home.value = homeData
  products.value = productData
  about.value = aboutData
})
</script>

<template>
  <div class="home-view">
    <HeroSection
      :brand-name="home.title"
      :tagline="home.shortDesc"
      :description="home.description"
      :cta-label="home.ctaLabel"
      :logo-src="home.logoSrc"
      @cta-click="handleCtaClick"
    />
    <ProductCatalog :products="products" />
    <AboutSection
      :maker-emoji="about.makerEmoji"
      :bio="about.bio"
      :quote="about.quote"
    />
    <ContactSection />
  </div>
</template>
