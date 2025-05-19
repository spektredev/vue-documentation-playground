<template>
  <div>hello</div>
  <p>Счётчик: {{ counter }}</p>
  <button @click="counter++">Увеличить</button>
  <PropsTestOptions :message="parentMessage" />
  <PropsTestComposition :message="parentMessage" />
</template>

<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from 'vue'
import PropsTestOptions from './PropsTestOptions.vue'
import PropsTestComposition from './PropsTestComposition.vue'

const counter = ref(0)
const parentMessage = ref('Hello from parent')

console.log('Скрипт выполняется на этапе компиляции <script setup>')

onBeforeMount(() => {
  console.log('beforeMount: Компонент скоро будет добавлен в DOM')
  console.log('counter.value:', counter.value)
})

onMounted(() => {
  console.log('mounted: Компонент добавлен в DOM')
  const div = document.querySelector('div')
  console.log('DOM элемент:', div)
})

onBeforeUpdate(() => {
  console.log('beforeUpdate: DOM будет обновлён, counter:', counter.value)
})

onUpdated(() => {
  console.log('updated: DOM обновлён, counter:', counter.value)
})

onBeforeUnmount(() => {
  console.log('beforeUnmount: Компонент будет удалён из DOM')
})

onUnmounted(() => {
  console.log('unmounted: Компонент удалён из DOM')
})
</script>
