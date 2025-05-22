<template>
  <div class="modal-overlay" @click.self="emitClose">
    <div class="modal">
      <h2>Form</h2>
      <form @submit.prevent="handleSubmit">
        <input v-model="name" type="text" placeholder="Enter name" />
        <button type="submit">Submit</button>
        <button type="button" @click="emitClose">Close</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['close'])
const name = ref('')

const handleSubmit = () => {
  if (!name.value.trim()) {
    alert('Name is required')
    return
  }
  alert(`Submitted: ${name.value}`)
  emit('close')
}

const emitClose = () => {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}
</style>
