# @lcooper/eslint-config-typescript

[![npm](https://img.shields.io/npm/v/@lcooper/eslint-config-typescript?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@lcooper/eslint-config-typescript)
[![ci](https://img.shields.io/github/actions/workflow/status/luciancooper/eslint-configs/ci.yml?logo=github&style=for-the-badge)](https://github.com/luciancooper/eslint-configs/actions/workflows/ci.yml)
[![license](https://img.shields.io/github/license/luciancooper/eslint-configs?color=yellow&style=for-the-badge)](#license)

An ESlint [shareable flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new) for [TypeScript](https://www.typescriptlang.org) projects. Extends [`@lcooper/eslint-config`](../eslint-config).

## Installation

The peer dependency [`eslint`](https://www.npmjs.com/package/eslint) must be installed alongside this package.

> install with npm:
```bash
npm install -D eslint @lcooper/eslint-config-typescript
```

> install with yarn:
```bash
yarn add -D eslint @lcooper/eslint-config-typescript
```

Additionally, [`typescript`](https://www.npmjs.com/package/typescript) must be installed.

> Note: This project requires Eslint version `>=8.56`, NodeJS version `^18.18.0 || >=20.0.0`, and Typescript version `>=4.7.4`.

## Usage

This config enables some of the type-aware rules provided by `@typescript-eslint/eslint-plugin`, so you must provide a tsconfig file to the `parserOptions.project` field within the `languageOptions` in your `eslint.config.js` file. See [this page](https://typescript-eslint.io/getting-started/typed-linting) in the typescript-eslint docs for more info.

Additionally, you must provide your tsconfig file to the `import/resolver` typescript setting for [`eslint-plugin-import`](https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#typescript) to work properly.

The best way to do this is to create a `tsconfig.eslint.json` file that will just be used for linting. It can extend your base `tsconfig.json`.

`tsconfig.eslint.json`

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": true
  },
  "include": ["**/*", "eslint.config.js"]
}
```

Then, create an `eslint.config.js` file in your project's root directory:

```js
import config from '@lcooper/eslint-config-typescript';

export default [
    ...config,
    {
        languageOptions: {
            parserOptions: {
                project: './tsconfig.eslint.json',
                tsconfigRootDir: import.meta.dirname,
            },
        },
        settings: {
            'import/resolver': {
                typescript: {
                    project: './tsconfig.eslint.json',
                },
            },
        },
    },
];
```

If your project does not specify `"type": "module"` in its `package.json` file, then `eslint.config.js` must be in CommonJS format:

```js
const config = require('@lcooper/eslint-config-typescript');

module.exports = [
    ...config,
    {
        languageOptions: {
            parserOptions: {
                project: './tsconfig.eslint.json',
                tsconfigRootDir: __dirname,
            },
        },
        settings: {
            'import/resolver': {
                typescript: {
                    project: './tsconfig.eslint.json',
                },
            },
        },
    },
];
```

This project is no longer compatable with the legacy eslintrc format, and requires you use the flat config format. Check out [this page](https://eslint.org/docs/latest/use/configure/migration-guide) for more details about migrating from the eslintrc format to the flat config format.

## Related

 * [`@lcooper/eslint-config`](../eslint-config) - Base config for standard JavaScript projects
 * [`@lcooper/eslint-plugin`](../eslint-plugin) - Plugin with awesome extra ESLint rules used by this config
 * [`@lcooper/eslint-config-react`](../eslint-config-react) - Enhancement config for React projects
 * [`@lcooper/eslint-config-typescript-react`](../eslint-config-typescript-react) - Enhancement config for React projects that use TypeScript
 * [`@lcooper/eslint-config-jest`](../eslint-config-jest) - Enhancement config for projects using Jest

## License

[MIT](../../LICENSE)
