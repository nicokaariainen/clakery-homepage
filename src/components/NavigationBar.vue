<script setup lang="ts">
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Blog', to: '/blog' },
  { label: 'About Me', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

function toggleMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <nav class="navigation-bar" aria-label="Main navigation">
    <button
      class="hamburger"
      type="button"
      :aria-expanded="isMobileMenuOpen"
      aria-controls="nav-links"
      aria-label="Toggle navigation menu"
      @click="toggleMenu"
    >
      <span class="hamburger-line" />
      <span class="hamburger-line" />
      <span class="hamburger-line" />
    </button>
    <ul id="nav-links" class="nav-links" :class="{ open: isMobileMenuOpen }">
      <li v-for="link in navLinks" :key="link.to">
        <router-link
          :to="link.to"
          active-class="active"
          :exact="link.to === '/'"
          @click="isMobileMenuOpen = false"
        >
          {{ link.label }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navigation-bar {
  display: flex;
  align-items: center;
  background-color: var(--color-dark-brown);
  padding: 0 1.5rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger-line {
  display: block;
  width: 24px;
  height: 3px;
  background-color: var(--color-cream);
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.25rem;
}

.nav-links a {
  display: block;
  padding: 1rem 1.25rem;
  color: var(--color-cream);
  font-family: 'Bitter', serif;
  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;
}

.nav-links a:hover {
  background-color: var(--color-brown);
}

.nav-links a.active {
  background-color: var(--color-brown);
  color: #fff;
}

@media (max-width: 767px) {
  .hamburger {
    display: flex;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--color-dark-brown);
    padding: 0.5rem 0;
  }

  .nav-links.open {
    display: flex;
  }

  .nav-links a {
    padding: 0.75rem 1.5rem;
  }
}
</style>
