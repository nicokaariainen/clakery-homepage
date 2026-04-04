<script setup lang="ts">
import { onMounted, ref } from 'vue'
import NavigationBar from './components/NavigationBar.vue'
import FooterComponent from './components/FooterComponent.vue'
import { getFooterSettings, getHomeContent } from './content'

// Fallback defaults
const artistName = ref('C.Clakery')
const instagramUrl = ref('https://instagram.com/c.clakery')
const email = ref('hello@cclakery.com')
const instagramHandle = ref('@c.clakery')
const logoSrc = ref('')

onMounted(async () => {
  try {
    const [settings, homeContent] = await Promise.all([getFooterSettings(), getHomeContent()])
    if (settings.artistName) artistName.value = settings.artistName
    if (settings.instagramUrl) instagramUrl.value = settings.instagramUrl
    if (settings.email) email.value = settings.email
    if (settings.instagramHandle) instagramHandle.value = settings.instagramHandle
    if (homeContent.logoSrc) logoSrc.value = homeContent.logoSrc
  } catch {
    // Fallback defaults already set
  }
})
</script>

<template>
  <div class="app-layout">
    <NavigationBar :logo-src="logoSrc" />
    <main>
      <router-view />
    </main>
    <FooterComponent :artist-name="artistName" :instagram-url="instagramUrl" :email="email" :instagram-handle="instagramHandle" />
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

main {
  flex: 1;
  width: 100%;
  padding-top: 70px;
}
</style>
