<template>
  <div>[lvl1] Composition child resloved props: {{ message }}</div>
  <PropsTestLevel2Composition />
</template>

<script setup lang="ts">
import PropsTestLevel2Composition from './level2/PropsTestLevel2Composition.vue'
defineProps<{
  message: string
}>()
</script>
