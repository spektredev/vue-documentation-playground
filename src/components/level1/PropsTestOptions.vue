<template>
  <div>[lvl1] Options child resolved props: {{ message }}</div>
  <PropsTestLevel2Options @increment="handleIncrement" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import PropsTestLevel2Options from './level2/PropsTestLevel2Options.vue'

export default defineComponent({
  components: { PropsTestLevel2Options },
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleIncrement() {
      this.$emit('increment')
    },
  },
  emits: ['increment'],
})
</script>
