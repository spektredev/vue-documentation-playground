<!-- SuspenceAsync.vue -->
<template>
  <div>{{ content }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const content = ref<string>('')

const getContent = async () => {
  const result = await new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello from Suspence Async')
    }, 1000)
  })
  return result as string
}

content.value = await getContent()
</script>
