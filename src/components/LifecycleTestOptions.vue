<template>
  <div>hello, you're testing Options API</div>
  <p>Счётчик: {{ counter }}</p>
  <button @click="increment">Увеличить</button>
  <PropsTestOptions :message="parentMessage" @increment="increment" />
  <PropsTestComposition :message="parentMessage" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PropsTestOptions from './level1/PropsTestOptions.vue'
import PropsTestComposition from './level1/PropsTestComposition.vue'

export default defineComponent({
  components: { PropsTestOptions, PropsTestComposition },
  data() {
    return {
      counter: 0,
      parentMessage: 'Hello from parent',
    }
  },
  provide() {
    return {
      globalParam: `I'm global!`,
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
    console.log('DOM элемент:', div)
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
