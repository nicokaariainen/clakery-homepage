<script setup lang="ts">
defineProps<{
  brandName: string
  tagline: string
  description: string
  ctaLabel: string
  logoSrc: string
}>()

const emit = defineEmits<{
  (e: 'cta-click'): void
}>()

function handleCtaClick() {
  emit('cta-click')
}
</script>

<template>
  <section class="hero" id="hero">
    <div class="hero-bg-shapes">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>
    <div class="hero-content">
      <img v-if="logoSrc" :src="logoSrc" alt="c.clakery logo" class="hero-logo" />
      <h1 class="hero-title">c.<span class="accent">clakery</span></h1>
      <p class="hero-tagline">{{ tagline }}</p>
      <p class="hero-desc">{{ description }}</p>
      <button class="hero-cta" @click="handleCtaClick">
        {{ ctaLabel }}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>
    <div class="hero-scroll-hint">
      <span>Scroll</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(160deg, var(--off-white) 0%, var(--beige) 50%, var(--blush) 100%);
}

.hero-bg-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.hero-bg-shapes .blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.25;
}

.blob-1 {
  width: 500px;
  height: 500px;
  background: var(--blush);
  top: -100px;
  right: -100px;
  animation: floatBlob 12s ease-in-out infinite;
}

.blob-2 {
  width: 350px;
  height: 350px;
  background: var(--beige-dark);
  bottom: -50px;
  left: -80px;
  animation: floatBlob 10s ease-in-out infinite reverse;
}

.blob-3 {
  width: 200px;
  height: 200px;
  background: var(--sage);
  top: 30%;
  left: 10%;
  animation: floatBlob 14s ease-in-out infinite 2s;
}

.hero-content {
  text-align: center;
  z-index: 2;
  padding: 0 40px;
  animation: fadeUp 1s ease-out 0.3s both;
}

.hero-logo {
  width: 120px;
  height: auto;
  margin-bottom: 16px;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: 86px;
  font-weight: 400;
  line-height: 1;
  color: var(--dark-brown);
  margin-bottom: 8px;
  letter-spacing: -1px;
}

.hero-title .accent {
  color: var(--terracotta);
  font-style: italic;
}

.hero-tagline {
  font-family: var(--font-heading);
  font-size: 20px;
  font-style: italic;
  color: var(--terracotta-light);
  margin-bottom: 28px;
  font-weight: 400;
}

.hero-desc {
  font-size: 15px;
  color: var(--soft-brown);
  max-width: 440px;
  margin: 0 auto 40px;
  line-height: 1.7;
  font-weight: 300;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 36px;
  background: var(--dark-brown);
  color: var(--cream);
  border: none;
  border-radius: 50px;
  font-family: var(--font-body);
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 4px 20px rgba(92, 74, 50, 0.15);
}

.hero-cta:hover {
  background: var(--terracotta);
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(192, 139, 92, 0.25);
}

.hero-cta svg {
  transition: transform 0.3s;
}

.hero-cta:hover svg {
  transform: translateX(3px);
}

.hero-scroll-hint {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--warm-brown);
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  animation: bounce 2s ease-in-out infinite;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 48px;
  }

  .hero-tagline {
    font-size: 16px;
  }

  .hero-desc {
    font-size: 14px;
    max-width: 320px;
  }

  .hero-cta {
    font-size: 12px;
    padding: 12px 28px;
  }

  .hero-content {
    padding: 0 20px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 40px;
  }
}
</style>
