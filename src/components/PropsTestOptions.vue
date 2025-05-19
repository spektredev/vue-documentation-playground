<template>
  <div>Message from options: {{ message }}</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    message: {
      type: String,
      required: true,
    },
  },
})
</script>
