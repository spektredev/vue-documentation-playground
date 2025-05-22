<template>
  <div><slot>Default slot content</slot></div>
  <button @click="showModal = true">Open Modal</button>
  <Teleport to="#modalTeleport">
    <KeepAlive><FormModal v-if="showModal" @close="showModal = false" /></KeepAlive>
  </Teleport>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import FormModal from '../other/ModalTeleport.vue'

const showModal = ref(false)
</script>
