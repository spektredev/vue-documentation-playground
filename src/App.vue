<template>
  <div>Hello</div>
  <p>Значение input: {{ inputValue }}</p>
  <p>Значение 2input: {{ secondInputValue }}</p>
  <p>Значение 3input: {{ thirdInputValue }}</p>
  <p>Значение 4input: {{ fourthInputValue }}</p>
  <p>Сообщение от button: {{ buttonMessage }}</p>
  <div>
    <SimpleList
      v-model="inputValue"
      v-model:secondInputValue="secondInputValue"
      v-model:fourthInputValue="fourthInputValue"
      :changeThird="thirdInputValue"
      @change:changeThird="changeThirdValue"
      @buttonClicked="onButtonClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SimpleList from './components/list/SimpleList.vue'

const inputValue = ref('')
const secondInputValue = ref('')
const thirdInputValue = ref('')
const fourthInputValue = ref('')
const buttonMessage = ref('default')

const onButtonClick = (message: string) => {
  buttonMessage.value = message
  setTimeout(() => {
    buttonMessage.value = 'default'
  }, 2000)
}

const changeThirdValue = (val: string) => {
  thirdInputValue.value = val
}
</script>

<style scoped></style>
