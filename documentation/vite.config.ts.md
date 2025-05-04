# Структура файла `vite.config.ts`

Файл `vite.config.ts` — конфигурационный файл для Vite, современного инструмента сборки и разработки, используемого в проекте Vue.js. Он определяет плагины, псевдонимы путей и другие настройки для разработки и продакшен-сборки.

## Основные функции

- Настройка плагинов для поддержки Vue и инструментов разработки.
- Определение псевдонимов путей для упрощения импорта модулей.
- Управление поведением Vite в режимах разработки и сборки.

## Разбор `vite.config.ts`

```typescript
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

### Поля файла

- **`import { fileURLToPath, URL } from 'node:url'`**  
  Импортирует утилиты из встроенного модуля Node.js `url`.

  - `fileURLToPath` преобразует URL в путь файловой системы.
  - `URL` создаёт объект URL для работы с путями.
  - Используются для определения псевдонима `@` относительно папки `src`.

- **`import { defineConfig } from 'vite'`**  
  Импортирует функцию `defineConfig` из Vite для создания типизированной конфигурации.

  - Обеспечивает автодополнение и проверку типов в редакторах.

- **`import vue from '@vitejs/plugin-vue'`**  
  Импортирует плагин `@vitejs/plugin-vue` для поддержки однофайловых компонентов `.vue`.

  - Необходим для компиляции `<template>`, `<script>` и `<style>` в `.vue`-файлах.

- **`import vueDevTools from 'vite-plugin-vue-devtools'`**  
  Импортирует плагин `vite-plugin-vue-devtools` для интеграции с Vue Devtools.

  - Улучшает отладку компонентов Vue в браузере (например, в Chrome DevTools).

- **`// https://vite.dev/config/`**  
  Комментарий с ссылкой на официальную документацию Vite, указывающей на страницу конфигурации.

- **`export default defineConfig({ ... })`**  
  Экспортирует конфигурацию Vite, созданную с помощью `defineConfig`.

  - Объект внутри определяет настройки Vite.

- **`plugins: [ vue(), vueDevTools() ]`**  
  Список плагинов, используемых Vite.

  - `vue()` — активирует поддержку `.vue`-файлов, включая компиляцию шаблонов и скриптов.
  - `vueDevTools()` — подключает Vue Devtools для режима разработки, упрощая инспекцию компонентов.

- **`resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } }`**  
  Настраивает псевдонимы путей для импорта модулей.
  - `alias: { '@': ... }` — задаёт псевдоним `@` для директории `src`.
  - `new URL('./src', import.meta.url)` — создаёт URL, указывающий на папку `src` относительно текущего файла (`vite.config.ts`).
  - `fileURLToPath(...)` — преобразует URL в абсолютный путь файловой системы.
  - Позволяет использовать `import Component from '@/components/MyComponent.vue'` вместо относительных путей вроде `../../src/components/MyComponent.vue`.
  - Согласуется с настройкой `paths` в `tsconfig.app.json` (`"@/*": ["./src/*"]`).
