<script setup lang="ts">
defineProps<{
  href: string
  label?: string
}>()
</script>

<template>
  <a :href="href" class="order-button">
    {{ label || 'Order Now' }}
  </a>
</template>

<style scoped>
.order-button {
  width: 60%;
  align-self: center;
  text-align: center;
  display: inline-block;
  padding: 2.5% 10%;
  background-color: var(--color-dark-red);
  color: var(--color-cream);
  font-size: 1.5rem;
  font-weight: 500;
  text-decoration: none;
  border-radius: 2rem;
  transition: background-color 0.3s, transform 0.2s;
}

.order-button:hover {
  background-color: var(--color-brown);
  transform: scale(1.05);
}

.order-button:active {
  transform: scale(0.98);
}
</style>
