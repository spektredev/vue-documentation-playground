import { ref } from 'vue'
import { CardData } from '@/mocks/mocks'
import type { Card } from '@/types/card'

export function useFetch() {
  const data = ref<Card[] | null>(null)
  const loading = ref<boolean>(true)
  const error = ref<string | null>(null)

  const fetchData = async (): Promise<void> => {
    try {
      const response = await new Promise<Card[]>((resolve) => {
        setTimeout(() => {
          resolve(CardData)
        }, 100)
      })
      data.value = response
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  fetchData()

  return { data, loading, error }
}
