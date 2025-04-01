# @lcooper/eslint-config-jest

[![npm](https://img.shields.io/npm/v/@lcooper/eslint-config-jest?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@lcooper/eslint-config-jest)
[![ci](https://img.shields.io/github/actions/workflow/status/luciancooper/eslint-configs/ci.yml?logo=github&style=for-the-badge)](https://github.com/luciancooper/eslint-configs/actions/workflows/ci.yml)
[![license](https://img.shields.io/github/license/luciancooper/eslint-configs?color=yellow&style=for-the-badge)](#license)

An ESlint [shareable flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new) for [Jest](https://jestjs.io/) testing environments.

## Installation

The peer dependency [`eslint`](https://www.npmjs.com/package/eslint) must be installed alongside this package.

> install with npm:
```bash
npm install -D eslint @lcooper/eslint-config-jest
```

> install with yarn:
```bash
yarn add -D eslint @lcooper/eslint-config-jest
```

> Note: This project requires Eslint version `>=9.0`, and NodeJS version `^18.18.0 || ^20.9.0 || >=21.1.0`.

## Usage

Add an `eslint.config.js` config file to your project's root directory. This config is meant to be used in addition to the base [`@lcooper/eslint-config`](../eslint-config) config or [`@lcooper/eslint-config-typescript`](../eslint-config-typescript) config.

> Note: this package exports a single flat config object, so no need for the `...` spread syntax when using it.

```js
import baseConfig from '@lcooper/eslint-config';
import jestConfig from '@lcooper/eslint-config-jest';

export default [
    ...baseConfig,
    jestConfig,
];
```

If your project does not specify `"type": "module"` in its `package.json` file, then `eslint.config.js` must be in CommonJS format:

```js
const baseConfig = require('@lcooper/eslint-config'),
    jestConfig = require('@lcooper/eslint-config-jest');

module.exports = [
    ...baseConfig,
    jestConfig,
];
```

This project is no longer compatable with the legacy eslintrc format, and requires you use the flat config format. Check out [this page](https://eslint.org/docs/latest/use/configure/migration-guide) for more details about migrating from the eslintrc format to the flat config format.

## File Matching

This config is meant to be used on top of a base ESLint configuration. It uses the [`files`](https://eslint.org/docs/latest/use/configure/configuration-files-new#specifying-files-and-ignores) field to apply itself only to files matched by the following glob patterns:

 * `**/setupTests.?([cm])[jt]s?(x)` → Test setup files.
 * `**/jest.setup.?([cm])[jt]s?(x)` → Test setup files.
 * `**/test?(s)/**/*.?([cm])[jt]s?(x)` → Directories named `test` / `tests`.
 * `**/__@(tests|mocks)__/**/*.?([cm])[jt]s?(x)` → Directories named `__tests__` / `__mocks__`.
 * `**/+(*.)@(spec|test).?([cm])[jt]s?(x)` → Files with a `.test.*` / `.spec.*` suffix.
 * `**/test.?([cm])[jt]s?(x)` → Files named `test`.

> **Note:** the pattern `.?([cm])[jt]s?(x)` matches the file extensions `.js`, `.mjs`, `.cjs`, `.jsx`, `.ts`, `.mts`, `.cts`, and `.tsx`.

Additionally, this config uses the `ignores` field so that it is not applied to any files matched by `**/fixtures/**` or `**/__fixtures__/**`.

If you would like to control what files this config is applied to, you can override the `files` field and use your own glob patterns in your `eslint.config.js` file:

```js
import jestConfig from '@lcooper/eslint-config-jest';

export default [
    {
        ...jestConfig,
        files: [
            // ... your globs here ...
        ],
    },
];
```

## Related

This package is intended to enhance one of these base configs:

 * [`@lcooper/eslint-config`](../eslint-config) - Base config for standard JavaScript projects
 * [`@lcooper/eslint-config-typescript`](../eslint-config-typescript) - Base config for TypeScript projects

See also:

 * [`@lcooper/eslint-config-react`](../eslint-config-react) - Enhancement config for React projects
 * [`@lcooper/eslint-config-typescript-react`](../eslint-config-typescript-react) - Enhancement config for React projects that use TypeScript
 * [`@lcooper/eslint-plugin`](../eslint-plugin) - Plugin with awesome extra ESLint rules

## License

[MIT](../../LICENSE)
