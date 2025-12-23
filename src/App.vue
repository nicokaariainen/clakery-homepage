<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>

  <main>
    <HelloWorld msg="Clakery home page incoming!" />
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

header {
  line-height: 1.5;
}

@media (min-width: 1024px) {

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
