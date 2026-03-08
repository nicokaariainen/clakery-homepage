<script setup lang="ts">
import { onMounted, ref } from 'vue'
import NavigationBar from './components/NavigationBar.vue'
import FooterComponent from './components/FooterComponent.vue'
import { getFooterSettings } from './content'

// Fallback defaults
const artistName = ref('C.Clakery')
const instagramUrl = ref('https://instagram.com/c.clakery')

onMounted(async () => {
  try {
    const settings = await getFooterSettings()
    if (settings.artistName) {
      artistName.value = settings.artistName
    }
    if (settings.instagramUrl) {
      instagramUrl.value = settings.instagramUrl
    }
  } catch {
    // Fallback defaults already set
  }
})
</script>

<template>
  <div class="app-layout">
    <NavigationBar />
    <main>
      <router-view />
    </main>
    <FooterComponent :artist-name="artistName" :instagram-url="instagramUrl" />
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
}
</style>
