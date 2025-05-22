<template>
  <div>
    <div class="tab-buttons">
      <button @click="currentTab = 'TabOne'">Tab One</button>
      <button @click="currentTab = 'TabTwo'">Tab Two</button>
    </div>

    <KeepAlive>
      <component :is="currentTabComponent" />
    </KeepAlive>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import TabOne from './TabOne.vue'
import TabTwo from './TabTwo.vue'

const currentTab = ref<'TabOne' | 'TabTwo'>('TabOne')

const tabComponents = {
  TabOne,
  TabTwo,
}

const currentTabComponent = computed(() => tabComponents[currentTab.value])
</script>

<style scoped>
.tab-buttons {
  margin-bottom: 10px;
}
button {
  margin-right: 10px;
}
</style>
