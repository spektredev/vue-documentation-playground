import { createRouter, createWebHistory } from 'vue-router'
import BaseComponent from '@/components/BaseComponent.vue'
import LifecycleTestComposition from '@/components/LifecycleTestComposition.vue'
import LifecycleTestOptions from '@/components/LifecycleTestOptions.vue'
import TypescriptLearn from '@/components/TypescriptLearn.vue'

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
  {
    path: '/ts',
    name: 'typescript',
    component: TypescriptLearn,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
