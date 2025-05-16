<template>
  <div class="card" style="display: flex; justify-content: space-between">
    <div>{{ card.id }}</div>
    <div>{{ card.title }}</div>
    <div>{{ card.description }}</div>
    <div>{{ card.demo ? 'Да' : 'Нет' }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Card } from '@/types/card'
defineProps<{
  card: Card
}>()
</script>

<style scoped>
.card {
  border: 1px solid;
  border-color: #444444;
  margin-top: 10px;
  padding: 10px;
}
</style>
