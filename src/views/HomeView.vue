<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  getHomeContent,
  getProducts,
  getAboutContent,
  getCatalogSection,
  getContactSection,
  type HomeContent,
  type Product,
  type AboutContent,
  type SectionHeader,
} from '@/content'
import HeroSection from '@/components/HeroSection.vue'
import ProductCatalog from '@/components/ProductCatalog.vue'
import AboutSection from '@/components/AboutSection.vue'
import ContactSection from '@/components/ContactSection.vue'

const home = ref<HomeContent>({ title: '', shortDesc: '', description: '', ctaLabel: '', logoSrc: '' })
const products = ref<Product[]>([])
const about = ref<AboutContent>({ images: [], bio: '', quote: '' })
const catalogSection = ref<SectionHeader>({ label: '', title: '', subtitle: '' })
const contactSection = ref<SectionHeader>({ label: '', title: '', subtitle: '' })

function handleCtaClick() {
  document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(async () => {
  const [homeData, productData, aboutData, catalogData, contactData] = await Promise.all([
    getHomeContent(),
    getProducts(),
    getAboutContent(),
    getCatalogSection(),
    getContactSection(),
  ])
  home.value = homeData
  products.value = productData
  about.value = aboutData
  catalogSection.value = catalogData
  contactSection.value = contactData
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
    <ProductCatalog
      :products="products"
      :section-label="catalogSection.label"
      :section-title="catalogSection.title"
      :section-subtitle="catalogSection.subtitle"
    />
    <AboutSection
      :images="about.images"
      :bio="about.bio"
      :quote="about.quote"
    />
    <ContactSection
      :section-label="contactSection.label"
      :section-title="contactSection.title"
      :section-subtitle="contactSection.subtitle"
    />
  </div>
</template>
