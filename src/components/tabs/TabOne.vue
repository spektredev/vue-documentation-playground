<template>
  <div>
    <h2>Tab One</h2>
    <input v-model="text" placeholder="Type something..." />
    <p>You typed: {{ text }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
</script>
