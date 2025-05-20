<template>
  <div class="child">
    <slot :item="item" :index="index"> {{ item.name }} (Index: {{ index }}) </slot>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const item = ref({ name: 'Item 1' })
const index = ref(1)
</script>
