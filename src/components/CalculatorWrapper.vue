<script setup lang="ts">
import Calculator from './Calculator.vue'
</script>

<template>
  <v-container fluid class="wrapper d-flex align-center flex-column justify-center">
    <Calculator />
  </v-container>
</template>

<style scoped>
.wrapper {
  height: 100vh;
  background: rgb(97, 133, 186);
  background: linear-gradient(0deg, rgba(97, 133, 186, 1) 0%, rgba(145, 168, 203, 1) 100%);
}
</style>
