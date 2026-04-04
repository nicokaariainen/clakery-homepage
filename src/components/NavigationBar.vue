<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isMobileMenuOpen = ref(false)

interface NavLink {
  label: string
  hash?: string
  route?: string
}

const navLinks: NavLink[] = [
  { label: 'Home', hash: '#hero' },
  { label: 'Catalog', hash: '#catalog' },
  { label: 'About', hash: '#about' },
  { label: 'Contact', hash: '#contact' },
]

function toggleMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function handleNavClick(link: NavLink) {
  isMobileMenuOpen.value = false

  if (link.route) {
    router.push(link.route)
    return
  }

  if (link.hash) {
    if (route.path === '/') {
      const el = document.querySelector(link.hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      router.push('/' + link.hash)
    }
  }
}
</script>

<template>
  <nav class="navigation-bar" aria-label="Main navigation">
    <div class="nav-logo">c.<span>clakery</span></div>
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
      <li v-for="link in navLinks" :key="link.label">
        <a
          href="#"
          @click.prevent="handleNavClick(link)"
        >
          {{ link.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>


<style scoped>
.navigation-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  background: rgba(251, 247, 240, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(196, 168, 130, 0.15);
  animation: fadeDown 0.8s ease-out;
}

.nav-logo {
  font-family: 'DM Serif Display', serif;
  font-size: 22px;
  color: var(--dark-brown);
  letter-spacing: 0.5px;
}

.nav-logo span {
  color: var(--terracotta);
}

.nav-links {
  display: flex;
  gap: 36px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: var(--soft-brown);
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  position: relative;
  transition: color 0.3s;
  cursor: pointer;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1.5px;
  background: var(--terracotta);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.nav-links a:hover {
  color: var(--terracotta);
}

.nav-links a:hover::after {
  width: 100%;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger-line {
  display: block;
  width: 22px;
  height: 2px;
  background-color: var(--dark-brown);
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s;
}

@media (max-width: 767px) {
  .navigation-bar {
    padding: 16px 24px;
  }

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
    background: rgba(251, 247, 240, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 16px 24px;
    gap: 0;
    border-bottom: 1px solid rgba(196, 168, 130, 0.15);
  }

  .nav-links.open {
    display: flex;
  }

  .nav-links li {
    padding: 12px 0;
  }
}
</style>
