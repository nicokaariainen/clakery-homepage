<script setup lang="ts">
defineProps<{
  artistName: string
  instagramUrl: string
}>()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <p class="footer-text">
      &copy; {{ currentYear }} {{ artistName }}
    </p>
    <a
      :href="instagramUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="footer-instagram"
      aria-label="Instagram"
    >
      Instagram
    </a>
  </footer>
</template>

<style scoped>
.site-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 1.25rem 2rem;
  background-color: var(--color-dark-brown);
  color: var(--color-cream);
  font-family: 'Bitter', serif;
  font-size: 0.9rem;
}

.footer-text {
  margin: 0;
}

.footer-instagram {
  color: var(--color-cream);
  text-decoration: underline;
  transition: color 0.2s;
}

.footer-instagram:hover {
  color: var(--color-tan);
}
</style>
