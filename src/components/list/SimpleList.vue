<template>
  <input type="text" @input="handleInput" />
  <input type="text" @input="handleSecondInput" />
  <input type="text" @input="handleThirdInput" />
  <input type="text" v-model="fourthInputValue" />
  <div>
    <button @click="handleClick">Нажми</button>
    <div>
      <button :class="'editable'" @click="addValue">+</button>
      <span>Кликнуто: {{ count }} раз</span>
      <div>Computed x2: {{ doubleCount }}</div>
    </div>
  </div>
  <div v-if="cards">
    <div v-for="card in cards" :key="card.id">
      <SimpleCard :card="card" />
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { useFetch } from '@/composables/useFetch'
import SimpleCard from '../card/SimpleCard.vue'
import { ref, computed, nextTick } from 'vue'

const { data: cards } = useFetch()
const count = ref(0)

defineProps<{
  modelValue: string
  secondInputValue: string
  changeThird: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'update:secondInputValue', value: string): void
  (e: 'change:changeThird', value: string): void
  (e: 'buttonClicked', message: string): void
}>()

const fourthInputValue = defineModel<string>('fourthInputValue')

const changeText = async () => {
  await nextTick()
  const el = document.querySelector('.editable') as HTMLButtonElement | null
  if (el) {
    el.textContent = 'Add'
    console.log('Add button size: ' + el.getBoundingClientRect().width + 'px')
  }
}
changeText()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (target) {
    emit('update:modelValue', target.value)
  }
}

const handleSecondInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (target) {
    emit('update:secondInputValue', target.value)
  }
}

const handleThirdInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (target) {
    emit('change:changeThird', target.value)
  }
}

const handleClick = () => {
  emit('buttonClicked', 'Button has pressed')
}

const addValue = () => {
  count.value += 1
}

const doubleCount = computed(() => {
  return count.value * 2
})
</script>

<style scoped></style>
