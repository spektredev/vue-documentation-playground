# Структура файла `eslint.config.ts`

Файл `eslint.config.ts` — это конфигурационный файл для ESLint, написанный в формате TypeScript с использованием современного "flat config" API (начиная с ESLint 9). Он определяет правила линтинга, настройки для TypeScript и Vue, а также интеграцию с Vitest и Prettier. Этот файл используется для проверки и поддержания качества кода в проекте.

## Основные функции

- **Определение правил линтинга**: Устанавливает правила для JavaScript, TypeScript, Vue и тестов (Vitest).
- **Игнорирование файлов**: Исключает определённые файлы или папки из линтинга.
- **Интеграция с инструментами**: Настраивает совместимость с Vue, TypeScript, Vitest и Prettier.
- **Гибкость**: Позволяет задавать разные правила для разных типов файлов (например, тесты или исходный код).

## Разбор `eslint.config.ts`

```typescript
import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
  skipFormatting,
)
```

### Поля файла

- **`import { globalIgnores } from 'eslint/config'`**  
  Импортирует утилиту `globalIgnores` из стандартного модуля ESLint. Она используется для задания глобальных игнорируемых путей, которые не будут линтиться.

- **`import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'`**  
  Импортирует функции и конфигурации из пакета `@vue/eslint-config-typescript`.

  - `defineConfigWithVueTs` — обёртка для создания ESLint-конфигурации, адаптированная для Vue и TypeScript.
  - `vueTsConfigs` — набор рекомендуемых конфигураций для TypeScript в Vue-проектах.

- **`import pluginVue from 'eslint-plugin-vue'`**  
  Импортирует плагин ESLint для поддержки правил, специфичных для Vue (например, проверка синтаксиса однофайловых компонентов `.vue`).

- **`import pluginVitest from '@vitest/eslint-plugin'`**  
  Импортирует плагин ESLint для Vitest, добавляющий правила для тестового кода, написанного с использованием фреймворка Vitest.

- **`import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'`**  
  Импортирует конфигурацию, которая отключает правила ESLint, связанные с форматированием кода, чтобы избежать конфликтов с Prettier (форматирование делегируется Prettier).

- **Комментарий: `// To allow more languages other than 'ts' in '.vue' files, ...`**  
  Закомментированный код и ссылка на документацию. Показывает, как можно разрешить использование других языков (например, `tsx`) в `<script>`-блоках файлов `.vue`.

  - `configureVueProject({ scriptLangs: ['ts', 'tsx'] })` — если раскомментировать, позволит использовать `tsx` в `.vue`-файлах.
  - Ссылка ведёт на документацию `@vue/eslint-config-typescript` для продвинутой настройки.

- **`export default defineConfigWithVueTs(...)`**  
  Экспортирует конфигурацию ESLint, созданную с помощью `defineConfigWithVueTs`. Функция принимает несколько аргументов, каждый из которых задаёт часть конфигурации.

- **Аргумент 1: `{ name: 'app/files-to-lint', files: ['**/\*.{ts,mts,tsx,vue}'] }`\*\*  
  Определяет группу файлов, к которым будут применяться правила линтинга.

  - `name: 'app/files-to-lint'` — имя конфигурации для удобства (используется в логах или отчётах ESLint).
  - `files: ['**/*.{ts,mts,tsx,vue}']` — шаблон, указывающий, что линтинг применяется к файлам с расширениями `.ts`, `.mts` (модули TypeScript), `.tsx` (TypeScript с JSX) и `.vue`.

- **`globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**'])`**  
  Задаёт глобальные игнорируемые пути. Файлы в папках `dist`, `dist-ssr` (для серверного рендеринга) и `coverage` (для отчётов покрытия тестами) не будут линтиться.

- **`pluginVue.configs['flat/essential']`**  
  Включает базовый набор правил из `eslint-plugin-vue` (конфигурация `flat/essential`). Эти правила обеспечивают минимальную проверку синтаксиса и структуры `.vue`-файлов, предотвращая основные ошибки.

- **`vueTsConfigs.recommended`**  
  Включает рекомендуемый набор правил из `@vue/eslint-config-typescript` для TypeScript в Vue-проектах. Эти правила проверяют корректность использования TypeScript в `.vue`-файлах и других TypeScript-файлах.

- **Аргумент 4: `{ ...pluginVitest.configs.recommended, files: ['src/**/**tests**/_'] }`**  
Применяет рекомендуемые правила плагина Vitest, но только к файлам в папке `src/\*\*/**tests**/_` (где обычно хранятся тесты).

  - `...pluginVitest.configs.recommended` — разворачивает объект с рекомендуемыми правилами Vitest.
  - `files: ['src/**/__tests__/*']` — ограничивает применение этих правил только тестовыми файлами.

- **`skipFormatting`**  
  Включает конфигурацию из `@vue/eslint-config-prettier/skip-formatting`, которая отключает правила ESLint, связанные с форматированием (например, отступы, кавычки). Это предотвращает конфликты с Prettier, который берёт на себя форматирование.
