/\*

# API приложения Vue.js 3

Этот раздел документирует API приложения для Vue.js 3, описывая методы и свойства, доступные для конфигурации и управления экземпляром приложения Vue. API сосредоточен вокруг функции `createApp` и возвращаемого ею объекта `app`.

---

## `createApp()`

Создает экземпляр приложения.

**Тип**:

```ts
function createApp(rootComponent: Component, rootProps?: object): App
```

**Описание**:

- Первый аргумент, `rootComponent`, — корневой компонент, который может быть объектом опций или импортированным файлом `.vue`.
- Второй необязательный аргумент, `rootProps`, — объект пропсов, передаваемых корневому компоненту.
- Возвращает экземпляр `App`, который предоставляет методы для конфигурации приложения (например, регистрация компонентов, директив или плагинов) перед его монтированием.

**Пример**:
С встроенным корневым компонентом:

```js
import { createApp } from 'vue'

const app = createApp({
  template: '<div>Привет, Vue!</div>',
})
console.log(app) // Экземпляр приложения с методами: component, directive, mount и т.д.
```

С импортированным компонентом:

```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
console.log(app) // Экземпляр приложения
```

**См. также**: [Руководство - Создание приложения Vue](https://vuejs.org/guide/essentials/application.html)

---

## `createSSRApp()`

Создает экземпляр приложения в режиме гидратации серверного рендеринга (SSR).

**Тип**:

```ts
function createSSRApp(rootComponent: Component, rootProps?: object): App
```

**Описание**:

- Использование идентично `createApp`, но инициализирует приложение в режиме гидратации SSR, где клиент восстанавливает предварительно отрендеренную разметку сервера.
- Возвращает экземпляр `App` с теми же методами, что и `createApp`.

**Пример**:

```js
import { createSSRApp } from 'vue'
import App from './App.vue'

const app = createSSRApp(App)
console.log(app) // Экземпляр приложения в режиме SSR
```

**См. также**: [Руководство - Серверный рендеринг](https://vuejs.org/guide/scaling-up/ssr.html)

---

## `app.mount()`

Монтирует экземпляр приложения в контейнерный элемент.

**Тип**:

```ts
interface App {
  mount(rootContainer: Element | string): ComponentPublicInstance
}
```

**Описание**:

- Аргумент `rootContainer` — это DOM-элемент или CSS-селектор (используется первый найденный элемент).
- Возвращает экземпляр корневого компонента, предоставляющий доступ к данным, методам и другим свойствам компонента.
- Если у корневого компонента есть `template` или функция `render`, содержимое контейнера заменяется. Если доступен компилятор во время выполнения, `innerHTML` контейнера используется как шаблон.
- В режиме гидратации SSR выполняет гидратацию существующих DOM-узлов, преобразуя их при несоответствиях.
- Может быть вызван только один раз для каждого экземпляра приложения.

**Пример**:

```js
import { createApp } from 'vue'

const app = createApp({
  template: '<div>Привет</div>',
})
const rootComponent = app.mount('#app')
console.log(rootComponent) // Proxy { $data: {}, $props: {}, ... }
console.log(document.querySelector('#app').innerHTML) // <div>Привет</div>
```

Монтирование на DOM-элемент:

```js
app.mount(document.body.firstChild)
console.log(document.body.firstChild.innerHTML) // <div>Привет</div>
```

**См. также**: [Руководство - Монтирование приложения](https://vuejs.org/guide/essentials/application.html#mounting-the-app)

---

## `app.unmount()`

Размонтирует смонтированное приложение, вызывая хуки жизненного цикла размонтирования для всех компонентов в дереве компонентов приложения.

**Тип**:

```ts
interface App {
  unmount(): void
}
```

**Описание**:

- Очищает все ресурсы (реактивные связи, слушатели событий и DOM-узлы).
- Вызывает хуки `beforeUnmount` и `unmounted` для всех компонентов.
- Не возвращает значение.

**Пример**:

```js
import { createApp } from 'vue'

const app = createApp({
  template: '<div>Привет</div>',
})
app.mount('#app')
console.log(document.querySelector('#app').innerHTML) // <div>Привет</div>

app.unmount()
console.log(document.querySelector('#app').innerHTML) // '' (пусто)
```

**См. также**: [Руководство - Хуки жизненного цикла](https://vuejs.org/guide/essentials/lifecycle.html)

---

## `app.onUnmount()`

Регистрирует callback, который будет вызван при размонтировании приложения.

**Тип**:

```ts
interface App {
  onUnmount(callback: () => any): void
}
```

**Описание**:

- Callback выполняется после размонтирования приложения, позволяя выполнять очистку или логирование.
- Не возвращает значение.

**Пример**:

```js
import { createApp } from 'vue'

const app = createApp({
  template: '<div>Привет</div>',
})
app.onUnmount(() => {
  console.log('Приложение размонтировано')
})
app.mount('#app')
app.unmount() // Логирует: Приложение размонтировано
```

**См. также**: [Руководство - Хуки жизненного цикла](https://vuejs.org/guide/essentials/lifecycle.html)

---

## `app.component()`

Регистрирует глобальный компонент, если переданы имя и определение компонента, или получает уже зарегистрированный компонент, если передано только имя.

**Тип**:

```ts
interface App {
  component(name: string): Component | undefined
  component(name: string, component: Component): this
}
```

**Описание**:

- При регистрации `name` — имя тега компонента (например, `'MyComponent'`), а `component` — объект опций или конструктор.
- При получении передается только `name`, возвращается компонент или `undefined`.
- Зарегистрированные компоненты доступны во всех шаблонах приложения.
- Возвращает экземпляр `App` при регистрации (для цепочки вызовов) или компонент при получении.

**Пример**:

```js
import { createApp } from 'vue'

const app = createApp({})
app.component('MyComponent', {
  template: '<div>Привет, это пользовательский компонент!</div>',
  data() {
    return { message: 'Привет!' }
  },
})
console.log(app.component('MyComponent')) // { template: '<div>...</div>', data: [Function], ... }
console.log(app.component('NonExistent')) // undefined

const chain = app.component('AnotherComponent', { template: '<div>Другой</div>' })
console.log(chain === app) // true
```

**Использование в шаблоне**:

```js
const app = createApp({
  template: '<MyComponent />',
})
app.component('MyComponent', {
  template: '<div>Привет, это пользовательский компонент!</div>',
})
app.mount('#app')
// Рендерит: <div>Привет, это пользовательский компонент!</div>
```

**См. также**: [Регистрация компонентов](https://vuejs.org/guide/components/registration.html)

---

## `app.directive()`

Регистрирует глобальную пользовательскую директиву, если переданы имя и определение директивы, или получает уже зарегистрированную директиву, если передано только имя.

**Тип**:

```ts
interface App {
  directive(name: string): Directive | undefined
  directive(name: string, directive: Directive): this
}
```

**Описание**:

- При регистрации `name` — имя директивы (например, `'my-directive'` для `v-my-directive`), а `directive` — объект с хуками или функция (сокращение для `mounted`).
- При получении передается только `name`, возвращается директива или `undefined`.
- Возвращает экземпляр `App` при регистрации или директиву при получении.

**Пример**:

```js
import { createApp } from 'vue'

const app = createApp({})
app.directive('focus', {
  mounted(el) {
    el.focus()
  },
})
console.log(app.directive('focus')) // { mounted: [Function] }
console.log(app.directive('unknown')) // undefined

app.directive('highlight', () => {
  /* сокращение */
})
console.log(app.directive('highlight')) // [Function]

const chain = app.directive('another', {})
console.log(chain === app) // true
```

**Использование в шаблоне**:

```js
const app = createApp({
  template: '<input v-focus>',
})
app.directive('focus', {
  mounted(el) {
    el.focus()
  },
})
app.mount('#app')
// Элемент input получает фокус
```

**См. также**: [Пользовательские директивы](https://vuejs.org/guide/reusability/custom-directives.html)

---

## `app.use()`

Устанавливает плагин для расширения функциональности приложения.

**Тип**:

```ts
interface App {
  use(plugin: Plugin, ...options: any[]): this
}
```

**Описание**:

- `plugin` — объект с методом `install` или функция, выполняющая роль `install`.
- `options` передаются в метод `install` плагина.
- Возвращает экземпляр `App` для цепочки вызовов.
- Предотвращает повторную установку одного и того же плагина.

**Пример**:

```js
import { createApp } from 'vue'

const MyPlugin = {
  install(app, options) {
    app.config.globalProperties.$myPlugin = () => {
      console.log('Плагин:', options)
    }
  },
}

const app = createApp({})
app.use(MyPlugin, { someOption: true })
console.log(app.config.globalProperties.$myPlugin) // [Function]

app.mount('#app')
const instance = app._instance
instance.$myPlugin() // Логирует: Плагин: { someOption: true }

const chain = app.use(MyPlugin, { anotherOption: false })
console.log(chain === app) // true
```

**См. также**: [Плагины](https://vuejs.org/guide/reusability/plugins.html)

---

## `app.mixin()`

Применяет глобальный миксин ко всем компонентам приложения. **Не рекомендуется** для кода приложения; используйте вместо этого Composable.

**Тип**:

```ts
interface App {
  mixin(mixin: ComponentOptions): this
}
```

**Описание**:

- `mixin` — объект опций, применяемый к каждому экземпляру компонента.
- Возвращает экземпляр `App` для цепочки вызовов.
- Поддерживается для обратной совместимости, но не рекомендуется из-за неявного поведения.

**Пример**:

```js
import { createApp } from 'vue'

const app = createApp({
  template: '<div>{{ message }}</div>',
})
app.mixin({
  data() {
    return { message: 'Привет от миксина!' }
  },
  mounted() {
    console.log('Миксин смонтирован')
  },
})
app.mount('#app')
// Рендерит: <div>Привет от миксина!</div>
// Логирует: Миксин смонтирован
```

**См. также**: [Глобальные миксины](https://vuejs.org/api/application.html#app-mixin)

---

## `app.provide()`

Предоставляет значение, которое может быть получено через `inject` во всех дочерних компонентах приложения.

**Тип**:

```ts
interface App {
  provide<T>(key: InjectionKey<T> | symbol | string, value: T): this
}
```

**Описание**:

- `key` — ключ инъекции (строка, символ или `InjectionKey`).
- `value` — предоставляемое значение (любой тип, включая реактивные).
- Возвращает экземпляр `App` для цепочки вызовов.

**Пример**:

```js
import { createApp, inject } from 'vue'

const app = createApp({
  template: '<div>{{ message }}</div>',
  setup() {
    const message = inject('message')
    return { message }
  },
})
app.provide('message', 'привет')
app.mount('#app')
// Рендерит: <div>привет</div>

console.log(app._provided) // { message: 'привет' }
```

**См. также**: [Provide / Inject](https://vuejs.org/guide/components/provide-inject.html)

---

## `app.runWithContext()`

Выполняет callback с текущим приложением в качестве контекста инъекции. Поддерживается в Vue 3.3+.

**Тип**:

```ts
interface App {
  runWithContext<T>(fn: () => T): T
}
```

**Описание**:

- `fn` — callback-функция, выполняемая немедленно.
- Во время выполнения `inject()` может получать значения, предоставленные приложением.
- Возвращает значение, возвращенное callback.

**Пример**:

```js
import { createApp, inject } from 'vue'

const app = createApp({})
app.provide('id', 1)

const result = app.runWithContext(() => {
  return inject('id')
})
console.log(result) // 1
```

**См. также**: [Provide / Inject](https://vuejs.org/guide/components/provide-inject.html)

---

## `app.version`

Предоставляет версию Vue, используемую приложением.

**Тип**:

```ts
interface App {
  version: string
}
```

**Описание**:

- Возвращает строку с версией Vue (например, `'3.4.21'`).
- Полезно для плагинов, требующих логики в зависимости от версии.

**Пример**:

```js
import { createApp } from 'vue'

const app = createApp({})
console.log(app.version) // например, '3.4.21'
```

Пример в плагине:

```js
const plugin = {
  install(app) {
    const version = Number(app.version.split('.')[0])
    if (version < 3) {
      console.warn('Этот плагин требует Vue 3')
    }
  },
}
app.use(plugin)
```

**См. также**: [Глобальный API - version](https://vuejs.org/api/application.html#app-version)

---

## `app.config`

Объект, содержащий настройки конфигурации приложения.

**Тип**:

```ts
interface AppConfig {
  // Свойства описаны ниже
}
```

**Описание**:

- Изменяйте свойства до монтирования приложения.
- Влияет на все компоненты приложения, если не переопределено.

---

### `app.config.errorHandler`

Назначает глобальный обработчик для необработанных ошибок.

**Тип**:

```ts
interface AppConfig {
  errorHandler?: (err: unknown, instance: ComponentPublicInstance | null, info: string) => void
}
```

**Описание**:

- Получает ошибку, экземпляр компонента и строку информации (например, хук жизненного цикла).
- Перехватывает ошибки из рендеринга, обработчиков событий, хуков жизненного цикла, `setup`, наблюдателей, директив и переходов.
- В продакшене `info` — сокращенный код (см. [Справочник кодов ошибок продакшена](https://vuejs.org/)).

**Пример**:

```js
import { createApp } from 'vue'

const app = createApp({
  template: '<div @click="throwError">Клик</div>',
  methods: {
    throwError() {
      throw new Error('Тестовая ошибка')
    },
  },
})
app.config.errorHandler = (err, instance, info) => {
  console.error('Ошибка:', err.message, 'Инфо:', info)
}
app.mount('#app')
// Клик логирует: Ошибка: Тестовая ошибка Инфо: [хук или рендеринг]
```

---

### `app.config.warnHandler`

Назначает пользовательский обработчик для предупреждений во время разработки.

**Тип**:

```ts
interface AppConfig {
  warnHandler?: (msg: string, instance: ComponentPublicInstance | null, trace: string) => void
}
```

**Описание**:

- Получает сообщение предупреждения, экземпляр компонента и трассировку компонентов.
- Полезно для фильтрации предупреждений во время отладки.

**Пример**:

```js
import { createApp } from 'vue'

const app = createApp({})
app.config.warnHandler = (msg, instance, trace) => {
  console.warn('Предупреждение:', msg, 'Трассировка:', trace)
}
app.mount('#app')
// Логирует предупреждения с трассировкой
```

---

### `app.config.performance`

Включает трассировку производительности в devtools браузера (только в режиме разработки).

**Тип**:

```ts
boolean
```

**Описание**:

- Установите в `true` для трассировки операций инициализации, компиляции, рендеринга и обновления компонентов.
- Требует поддержку браузером `performance.mark`.

**Пример**:

```js
import { createApp } from 'vue'

const app = createApp({})
app.config.performance = true
app.mount('#app')
// Трассировка производительности видна в devtools
```

**См. также**: [Руководство - Производительность](https://vuejs.org/guide/best-practices/performance.html)

---

### `app.config.compilerOptions`

Настраивает опции компилятора шаблонов в браузере.

**Тип**:

```ts
interface AppConfig {
  compilerOptions: {
    isCustomElement?: (tag: string) => boolean
    whitespace?: 'condense' | 'preserve'
    delimiters?: [string, string]
    comments?: boolean
  }
}
```

**Описание**:

- Уважается только в полной сборке (с компилятором в браузере).
- Для сборок только с runtime настройте через инструменты сборки (например, `@vue/compiler-dom`).

#### `isCustomElement`

Указывает, какие теги считаются нативными пользовательскими элементами.

**Тип**: `(tag: string) => boolean`

**Пример**:

```js
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('ion-')
console.log(app.config.compilerOptions.isCustomElement('ion-button')) // true
```

#### `whitespace`

Настраивает обработку пробелов в шаблонах.

**Тип**: `'condense' | 'preserve'`

**По умолчанию**: `'condense'`

**Пример**:

```js
app.config.compilerOptions.whitespace = 'preserve'
console.log(app.config.compilerOptions.whitespace) // 'preserve'
```

#### `delimiters`

Изменяет разделители для интерполяции текста.

**Тип**: `[string, string]`

**По умолчанию**: `['{{', '}}']`

**Пример**:

```js
app.config.compilerOptions.delimiters = ['${', '}']
console.log(app.config.compilerOptions.delimiters) // ['${', '}']
```

#### `comments`

Сохраняет HTML-комментарии в шаблонах.

**Тип**: `boolean`

**По умолчанию**: `false`

**Пример**:

```js
app.config.compilerOptions.comments = true
console.log(app.config.compilerOptions.comments) // true
```

**См. также**: [Vue и веб-компоненты](https://vuejs.org/guide/extras/web-components.html)

---

### `app.config.globalProperties`

Регистрирует глобальные свойства, доступные через `this` во всех компонентах.

**Тип**:

```ts
interface AppConfig {
  globalProperties: Record<string, any>
}
```

**Описание**:

- Заменяет `Vue.prototype` из Vue 2.
- Свойства компонента имеют приоритет над глобальными.

**Пример**:

```js
import { createApp } from 'vue'

const app = createApp({
  mounted() {
    console.log(this.msg) // 'привет'
  },
})
app.config.globalProperties.msg = 'привет'
app.mount('#app')
// Логирует: привет
console.log(app.config.globalProperties.msg) // 'привет'
```

**См. также**: [Руководство - Расширение глобальных свойств](https://vuejs.org/guide/typescript/options-api.html#augmenting-global-properties)

---

### `app.config.optionMergeStrategies`

Определяет стратегии слияния для пользовательских опций компонентов.

**Тип**:

```ts
interface AppConfig {
  optionMergeStrategies: Record<string, OptionMergeFunction>
}
type OptionMergeFunction = (to: unknown, from: unknown) => any
```

**Описание**:

- Используется для пользовательских опций (например, из плагинов или миксинов).
- Получает значения родителя и потомка, возвращая объединенный результат.

**Пример**:

```js
import { createApp } from 'vue'

const app = createApp({
  msg: 'Vue',
  mixins: [{ msg: 'Привет ' }],
  mounted() {
    console.log(this.$options.msg) // 'Привет Vue'
  },
})
app.config.optionMergeStrategies.msg = (parent, child) => {
  return (parent || '') + (child || '')
}
app.mount('#app')
// Логирует: Привет Vue
```

**См. также**: [Экземпляр компонента - $options](https://vuejs.org/api/component-instance.html#options)

---

### `app.config.idPrefix`

Настраивает префикс для идентификаторов, генерируемых через `useId()`.

**Тип**:

```ts
string
```

**По умолчанию**: `undefined`

**Пример**:

```js
import { createApp, useId } from 'vue'

const app = createApp({
  setup() {
    const id = useId()
    console.log(id) // 'myApp:0'
    return {}
  },
})
app.config.idPrefix = 'myApp'
app.mount('#app')
// Логирует: myApp:0
```

---

### `app.config.throwUnhandledErrorInProduction`

Форсирует выбрасывание необработанных ошибок в продакшен-режиме.

**Тип**:

```ts
boolean
```

**По умолчанию**: `false`

**Описание**:

- В разработке необработанные ошибки выбрасываются.
- В продакшене они только логируются, если не установлено `true`.

**Пример**:

```js
import { createApp } from 'vue'

const app = createApp({
  mounted() {
    throw new Error('Тестовая ошибка')
  },
})
app.config.throwUnhandledErrorInProduction = true
app.mount('#app')
// Выбрасывает ошибку в продакшене
console.log(app.config.throwUnhandledErrorInProduction) // true
```

\*/
