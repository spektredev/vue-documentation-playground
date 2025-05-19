import { createRouter, createWebHistory } from 'vue-router'
import BaseComponent from '@/components/BaseComponent.vue'
import LifecycleTestComposition from '@/components/LifecycleTestComposition.vue'
import LifecycleTestOptions from '@/components/LifecycleTestOptions.vue'

const routes = [
  {
    path: '/',
    name: 'base',
    component: BaseComponent,
  },
  {
    path: '/lifecycle',
    name: 'lifecycle',
    component: LifecycleTestComposition,
  },
  {
    path: '/lifecycle2',
    name: 'lifecycle2',
    component: LifecycleTestOptions,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
