<template>
  <div>[lvl2] {{ globalParam }}</div>
  <button @click="sendIncrement">Emit Button</button>
</template>

<script lang="ts">
export default {
  inject: ['globalParam'],
  methods: {
    sendIncrement() {
      this.$emit('increment')
    },
    getRouter() {
      console.log('options-router: ', this.$router)
      console.log('options-router: ', this.$route.path)
    },
    getInfo() {
      console.log('options-component-data: ', this.$data)
      console.log('options-component-props: ', this.$props)
      console.log('options-component-refs: ', this.$refs)
      console.log('options-component-el: ', this.$el)
    },
  },
  emits: ['increment'],
  mounted() {
    this.getRouter()
    this.getInfo()
  },
}
</script>
