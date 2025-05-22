<template>
  <div>
    <h3>Счетчик из Pinia: {{ store.count }}</h3>
    <button @click="store.increment">Увеличить</button>
    <button @click="store.decrement">Уменьшить</button>
  </div>
  <div>
    <div v-if="store.loading">Загрузка...</div>
    <div v-else-if="store.error">{{ store.error }}</div>
    <div v-else-if="store.cards">
      <ul>
        <li v-for="card in store.cards" :key="card.id">
          {{ card.title }}
        </li>
      </ul>
    </div>
    <div v-else>Нет данных</div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/stores/main'

const store = useStore()
</script>
