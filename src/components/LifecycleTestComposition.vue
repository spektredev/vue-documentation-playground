<template>
  <div>hello, you're testing Composition API</div>
  <p>Счётчик: {{ counter }}</p>
  <button @click="counter++">Увеличить</button>
  <PropsTestOptions :message="parentMessage" />
  <PropsTestComposition :message="parentMessage" />
  <DefaultSlot>
    <p>Parent slot content!</p>
  </DefaultSlot>
  <NamedSlots>
    <template #header>
      <div>Parent Custom Header</div>
    </template>
    <template #content>
      <div>Parent Custom Content</div>
    </template>
    <template #footer>
      <div>Parent Custom Footer</div>
    </template>
  </NamedSlots>
  <ScopedSlots>
    <template #default="{ item, index }">
      <p>Child Custom: {{ item.name.toUpperCase() }} (Index: {{ index }})</p>
    </template>
  </ScopedSlots>
  <DynamicSlots>
    <template v-for="slotName in ['slot1', 'slot2']" :key="slotName" #[slotName]>
      <p>Dynamic {{ slotName }}</p>
    </template>
  </DynamicSlots>
  <Suspense>
    <template #default>
      <AsyncChild />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
  <p>ShallowRef (obj.a.b): {{ obj.a.b }}</p>
  <button @click="changeShallow">ChangeShallow</button>
  <p>Then click any render trigger, like the counter button</p>
</template>

<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  provide,
  defineAsyncComponent,
  shallowRef,
} from 'vue'
import PropsTestOptions from './level1/PropsTestOptions.vue'
import PropsTestComposition from './level1/PropsTestComposition.vue'
import DefaultSlot from './level1/DefaultSlot.vue'
import NamedSlots from './level1/NamedSlots.vue'
import ScopedSlots from './level1/ScopedSlots.vue'
import DynamicSlots from './level1/DynamicSlots.vue'
const counter = ref(0)
const obj = shallowRef({ a: { b: 1 } })
const changeShallow = () => {
  obj.value.a.b += 1
}
const parentMessage = ref('Hello from parent')
const AsyncChild = defineAsyncComponent(() => import('./level1/SuspenceAsync.vue'))
console.log('Скрипт выполняется на этапе компиляции <script setup>')

provide('globalMsg', `Hello composition, I'm native global!`)
provide('globalParam', `Hello, options! I'm global from composition!`)

onBeforeMount(() => {
  console.log('beforeMount: Компонент скоро будет добавлен в DOM')
  console.log('counter.value:', counter.value)
})

onMounted(() => {
  console.log('mounted: Компонент добавлен в DOM')
  const div = document.querySelector('div')
  console.log('DOM элемент:', div)
})

onBeforeUpdate(() => {
  console.log('beforeUpdate: DOM будет обновлён, counter:', counter.value)
})

onUpdated(() => {
  console.log('updated: DOM обновлён, counter:', counter.value)
})

onBeforeUnmount(() => {
  console.log('beforeUnmount: Компонент будет удалён из DOM')
})

onUnmounted(() => {
  console.log('unmounted: Компонент удалён из DOM')
})
</script>
