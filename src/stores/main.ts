import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFetch } from '@/composables/useFetch'

export const useStore = defineStore('main', () => {
  const count = ref<number>(0)
  const { data: cards, loading, error } = useFetch()

  const increment = (): void => {
    count.value++
  }

  const decrement = (): void => {
    count.value--
  }

  return { count, increment, decrement, cards, loading, error }
})
