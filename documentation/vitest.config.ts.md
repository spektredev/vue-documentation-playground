# Структура файла `vitest.config.ts`

Файл `vitest.config.ts` — конфигурационный файл для Vitest, тестового фреймворка, используемого в проекте Vue.js. Он задаёт настройки для запуска юнит-тестов, интегрируясь с Vite и настраивая тестовую среду.

## Основные функции

- Настройка тестовой среды для юнит-тестов.
- Интеграция с конфигурацией Vite для согласованности.
- Определение корневой директории и исключение ненужных файлов.

## Разбор `vitest.config.ts`

```typescript
import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
)
```

### Поля файла

- **`import { fileURLToPath } from 'node:url'`**  
  Импортирует утилиту `fileURLToPath` из модуля Node.js `url` для преобразования URL в путь файловой системы. Используется для указания корневой директории.

- **`import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'`**  
  Импортирует функции и объект из Vitest:

  - `mergeConfig` — объединяет конфигурации Vitest и Vite.
  - `defineConfig` — создаёт типизированную конфигурацию Vitest.
  - `configDefaults` — содержит стандартные настройки Vitest.

- **`import viteConfig from './vite.config'`**  
  Импортирует конфигурацию Vite из `vite.config.ts` для повторного использования настроек, таких как псевдонимы путей (`@`) и плагины.

- **`export default mergeConfig(...)`**  
  Экспортирует объединённую конфигурацию, комбинирующую настройки Vite и Vitest.

  - Позволяет Vitest использовать плагины Vite (например, `@vitejs/plugin-vue`) и псевдонимы.

- **`viteConfig`**  
  Первый аргумент `mergeConfig`, передающий настройки из `vite.config.ts` (плагины `vue`, `vueDevTools`, псевдоним `@`).

- **`defineConfig({ test: { ... } })`**  
  Второй аргумент `mergeConfig`, создающий специфичные для Vitest настройки внутри объекта `test`.

- **`test: { environment: 'jsdom' }`**  
  Устанавливает тестовую среду `jsdom`, эмулирующую браузерный DOM.

  - Необходим для тестирования Vue-компонентов, использующих API, такие как `document` или `window`.

- **`exclude: [...configDefaults.exclude, 'e2e/**']`\*\*  
  Определяет файлы, исключаемые из тестирования.

  - `[...configDefaults.exclude]` — включает стандартные исключения Vitest (например, `node_modules`, `dist`).
  - `'e2e/**'` — дополнительно исключает файлы end-to-end тестов, чтобы Vitest обрабатывал только юнит-тесты.

- **`root: fileURLToPath(new URL('./', import.meta.url))`**  
  Указывает корневую директорию проекта для Vitest.
  - `new URL('./', import.meta.url)` — создаёт URL, указывающий на текущую директорию (где находится `vitest.config.ts`).
  - `fileURLToPath(...)` — преобразует URL в путь файловой системы.
  - Определяет, где Vitest ищет тестовые файлы (например, в `src/**/__tests__/*`).
