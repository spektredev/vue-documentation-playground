<template>
  <div>hello</div>
  <p>Счётчик: {{ counter }}</p>
  <button @click="increment">Увеличить</button>
  <PropsTestOptions :message="parentMessage" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PropsTestOptions from './PropsTestOptions.vue'

export default defineComponent({
  components: { PropsTestOptions },
  data() {
    return {
      counter: 0,
      parentMessage: 'Hello from parent',
    }
  },
  beforeCreate() {
    console.log('beforeCreate: Компонент ещё не инициализирован')
    console.log('counter:', this.counter)
  },
  created() {
    console.log('created: Компонент инициализирован, данные доступны')
    console.log('counter:', this.counter)
  },
  beforeMount() {
    console.log('beforeMount: Компонент скоро будет добавлен в DOM')
    console.log('counter:', this.counter)
  },
  mounted() {
    console.log('mounted: Компонент добавлен в DOM')
    const div = document.querySelector('div')
    console.log('DOM элемент:', div?.textContent)
  },
  beforeUpdate() {
    console.log('beforeUpdate: DOM будет обновлён, counter:', this.counter)
  },
  updated() {
    console.log('updated: DOM обновлён, counter:', this.counter)
  },
  beforeUnmount() {
    console.log('beforeUnmount: Компонент будет удалён из DOM')
  },
  unmounted() {
    console.log('unmounted: Компонент удалён из DOM')
  },
  methods: {
    increment() {
      this.counter++
    },
  },
})
</script>
