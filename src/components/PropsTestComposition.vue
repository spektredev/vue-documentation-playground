<template>
  <div>Message from composition: {{ message }}</div>
</template>

<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>
