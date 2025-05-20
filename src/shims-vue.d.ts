// src/shims-vue.d.ts
import { DefineComponent } from 'vue'

declare module '*.vue' {
  const component: DefineComponent<object, object, unknown>
  export default component
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    globalParam: string
    $router: Router
    $route: RouteLocationNormalizedLoaded
  }
}
