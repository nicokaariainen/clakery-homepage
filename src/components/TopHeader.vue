<script setup lang="ts">
  import OrderButton from './OrderButton.vue'
defineProps<{
  logoSrc?: string
  title?: string
  shortDesc?: string
  backgroundImageSrc?: string
}>()

function onImageError(event: Event) {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}
</script>

<template>
  <header class="intro-header">
    <img
      v-if="backgroundImageSrc"
      :src="backgroundImageSrc"
      alt="Background"
      class="background-image"
      @error="onImageError"
    />
    <div v-else class="background-placeholder"></div>

    <div class="overlay">
      <div class="logo-container">
        <img v-if="logoSrc" :src="logoSrc" alt="Logo" class="logo" @error="onImageError" />
        <div v-else class="logo-placeholder">Logo</div>
      </div>

      <h1 class="title">{{ title || 'Welcome' }}</h1>
      <p class="short-desc">{{ shortDesc || 'to the Page' }}</p>
      <OrderButton class="button" href="https://example.com/order" label="Order Now" />
    </div>
  </header>
</template>

<style scoped>
.intro-header {
  position: relative;
  width: 100%;
  min-height: 80vh;
  max-height: 80vh;
  overflow: hidden;
}

.background-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.background-placeholder {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--color-dark-brown) 0%, var(--color-brown) 100%);
  z-index: 0;
}

.button {
  margin-top: auto;
  align-self: center;
}

.overlay {
  position: absolute;
  left: 5%;
  top: 0;
  bottom: 5%;
  width: 30%;
  border-radius: 0rem 0rem 1rem 1rem;
  background: color-mix(in srgb, var(--color-dark-brown) 70%, transparent);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 5% 3% 3% 3%;
  z-index: 1;
}

.logo-container {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
}

.logo {
  max-height: 80px;
  align-self: center;
  justify-content: center;
  width: auto;
  object-fit: contain;
}

.logo-placeholder {
  width: 120px;
  height: 80px;
  align-content: center;
  border: 2px dashed var(--color-cream);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-cream);
  font-size: 1rem;
}

.title {
  align-self: center;
  font-size: 3.5rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
  color: var(--color-cream);
}

.short-desc {
  align-self: center;
  font-size: 1.5rem;
  font-weight: 300;
  margin: 0;
  color: var(--color-cream);
}

@media (max-width: 768px) {
  .intro-header {
    min-height: 60vh;
    max-height: 60vh;
  }

  .overlay {
    left: 0;
    top: auto;
    bottom: 0;
    width: 100%;
    border-radius: 0;
    background: linear-gradient(
      to top,
      color-mix(in srgb, var(--color-dark-brown) 95%, transparent) 0%,
      color-mix(in srgb, var(--color-dark-brown) 70%, transparent) 50%,
      transparent 100%
    );
    justify-content: flex-end;
    align-items: center;
    padding: 3rem 1.5rem 1.5rem;
    text-align: center;
  }

  .logo-container {
    margin-bottom: 0.75rem;
  }

  .logo-placeholder {
    width: 80px;
    height: 50px;
    font-size: 0.85rem;
  }

  .title {
    font-size: 1.75rem;
    margin-bottom: 0.25rem;
  }

  .short-desc {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .button {
    margin-top: 0.75rem;
  }
}
</style>
