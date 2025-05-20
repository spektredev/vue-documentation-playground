<template>
  <div>[lvl2] {{ globalMsg }}</div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
console.log('composition-router: ', router)
console.log('composition-router: ', route.path)

const globalMsg = inject<string>('globalMsg', 'Global props is missing! Default message')
</script>
