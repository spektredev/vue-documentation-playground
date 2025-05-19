<template>
  <div>Hello</div>
  <p>Значение input: {{ inputValue }}</p>
  <p>Значение 2input: {{ secondInputValue }}</p>
  <p>Значение 3input: {{ thirdInputValue }}</p>
  <p>Значение 4input: {{ fourthInputValue }}</p>
  <p>Сообщение от button: {{ buttonMessage }}</p>
  <p>{{ watcherLog }}</p>
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
import { ref, watch, watchEffect } from 'vue'
import SimpleList from './list/SimpleList.vue'

const inputValue = ref('')
const secondInputValue = ref('')
const thirdInputValue = ref('')
const fourthInputValue = ref('')
const buttonMessage = ref('default')
const watcherLog = ref('startValue')
const actualWidth = ref(0)

watch(buttonMessage, (newValue, oldValue) => {
  watcherLog.value = `buttonMessage изменился с ${oldValue} на ${newValue}`
})

watch(
  inputValue,
  () => {
    console.log('watcherCalledWhenLoaded!')
  },
  { immediate: true },
)

watch([secondInputValue, thirdInputValue], ([newFirst, newSecond], [oldFirst, oldSecond]) => {
  console.log(`Первый старый input: ${oldFirst}, Второй старый input: ${oldSecond}`)
  console.log(`Первый новый input: ${newFirst}, Второй новый input: ${newSecond}`)
})

watchEffect(() => {
  const conf = {
    a: inputValue.value,
  }
  console.log('something has changed', conf)
})

watchEffect(
  () => {
    const rootEl = document.querySelector('#app')
    actualWidth.value = rootEl ? rootEl.getBoundingClientRect().width : 0
    console.log(`Ширина изменилась: ${actualWidth.value}px`)
  },
  { flush: 'post' },
)

const stopWatch = watch(fourthInputValue, () => {
  if (fourthInputValue.value.length > 10) {
    stopWatch()
  }
  console.log('Новое значение 4 input: ', fourthInputValue.value)
})

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
