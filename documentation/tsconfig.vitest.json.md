# Структура файла `tsconfig.vitest.json` в контексте Vue.js

Файл `tsconfig.vitest.json` — конфигурация TypeScript для тестов, запускаемых с помощью Vitest в проекте Vue.js. Он настраивает проверку типов и компиляцию тестовых файлов, обеспечивая их совместимость с тестовой средой, включая эмуляцию DOM.

## Основные функции

- Настройка TypeScript для тестовых файлов, находящихся в `src/**/__tests__/*`.
- Интеграция с Vitest и тестовой средой (например, `jsdom`).
- Наследование настроек клиентского приложения для согласованности.

## Разбор `tsconfig.vitest.json`

```json
{
  "extends": "./tsconfig.app.json",
  "include": ["src/**/__tests__/*", "env.d.ts"],
  "exclude": [],
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.vitest.tsbuildinfo",
    "lib": [],
    "types": ["node", "jsdom"]
  }
}
```

### Поля файла

- **`"extends": "./tsconfig.app.json"`**  
  Наследует настройки из `tsconfig.app.json`, включая поддержку `.vue` файлов, псевдонимы путей (`@/*`) и настройки для Vite. Это обеспечивает согласованность между кодом приложения и тестами.

- **`"include": ["src/**/**tests**/_", "env.d.ts"]`**  
Включает тестовые файлы в папке `src/\*\*/**tests**/_`и`env.d.ts`(глобальные переменные окружения, например,`import.meta.env`).

  - Фокусируется только на тестах, в отличие от `tsconfig.app.json`, который включает весь код `src`.

- **`"exclude": []`**  
  Пустой массив, означающий, что никакие файлы не исключаются. Тестовые файлы уже ограничены через `include`.

- **`"compilerOptions": { ... }`**  
  Дополнительные настройки компилятора TypeScript.

  - **`"tsBuildInfoFile": "./node_modules/.tmp/tsconfig.vitest.tsbuildinfo"`**  
    Указывает путь для кэша компиляции тестов. Хранится в `node_modules/.tmp` для ускорения инкрементальной сборки и исключения из Git.

  - **`"lib": []`**  
    Отключает стандартные библиотеки (например, `DOM`, `ESNext`), унаследованные из `tsconfig.app.json`. Это позволяет явно управлять типами через `types`.

  - **`"types": ["node", "jsdom"]`**  
    Включает типы для Node.js (`node`) и `jsdom` (эмулятор DOM для тестов).
    - `node` — для доступа к API Node.js (например, `process` или `require`).
    - `jsdom` — для браузерных API (например, `document`, `window`) в тестовой среде Vitest.
